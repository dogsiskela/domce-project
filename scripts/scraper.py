from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
import json
import requests
from bs4 import BeautifulSoup
from const import months, descriptions, amenities, tags


url = "https://www.pazar3.mk/oglasi/zivealista/stanovi?Page="

last_date = None

def get_page_links(page):
    soup = BeautifulSoup(requests.get(url+str(page)).content, "html.parser")
    script = soup.find("script", type="application/ld+json")
    data = json.loads(script.string)
    links = []
    for i in range(len(data['@graph'][4]['itemListElement'])):
        links.append(data['@graph'][4]['itemListElement'][i]['item']['url'])
    return links


def get_date_time(month, day, year, time):
    date_str = month+'/'+day+'/'+year + ' '+time
    date_format = '%m/%d/%Y %H:%M'
    return datetime.strptime(date_str, date_format)


def fetch_link(link):
    try:
        text = BeautifulSoup(requests.get(link).content, "html.parser")
        script_item = text.find("script", type="application/ld+json")
        data_item = json.loads(script_item.string)
        if ('url' not in data_item['@graph'][3]):
            return None
        url_item = data_item['@graph'][3]['url']
        title_item = data_item['@graph'][3]['name']
        images_item = data_item['@graph'][3]['image']
        description_item = data_item['@graph'][3]['description']
        price_item = data_item['@graph'][3]['offers']['price']
        currency_item = data_item['@graph'][3]['offers']['priceCurrency']
        date_item = text.find('bdi', class_='published-date').get_text()
        month, day, year = date_item.split()
        month = months.get(month)
        time_item = text.find('span', class_='pull-right ci-text-right').get_text()
        print(time_item)
        oglas = {
            "url": url_item,
            "title": title_item,
            "date_published": get_date_time(month, day, year, time_item),
            "description": description_item,
            "images": images_item,
            "price": price_item,
            "currency": currency_item,
            # "lat": round(random.uniform(41.981256, 42.004422), 6),
            # "lng": round(random.uniform(21.371459, 21.506766), 6),
        }
        oglas = {**oglas, **descriptions}
        tags_item = text.find('div', class_='tags-area')
        separate_items = tags_item.find_all('a')
        for separate_item in separate_items:
            tag = separate_item.find('span').get_text()
            if tag == 'За живеалиштето:':
                tags_list = separate_item.find('bdi').get_text()
                tags_list = tags_list.replace("\n", "")
                tags_list = tags_list.split(sep=", ")
                for i in range(len(tags_list)):
                    oglas[amenities[tags_list[i]]] = True
            if tag in tags:
                oglas[tags[tag]] = separate_item.find(
                    'bdi').get_text().replace("\n", "")
        return oglas
    except Exception as e:
        print(e, link)
        return


def get_last_page(first):
    soup = BeautifulSoup(requests.get(first).content, "html.parser")
    pages = soup.find_all('li', class_="prevnext")
    if pages:
        last = pages[-1].find('a')
        last_no = last['page-no']
        return int(last_no)
    else:
        return 0


for i in range(1, 100):
    print("Fetching page:"+str(i))
    links = get_page_links(i)
    with ThreadPoolExecutor() as executor:
        futures = {executor.submit(fetch_link, link): link for link in links}
        results = []
        for future in futures:
            response = future.result()
            if (response):
                results.append(response)
    # if i == 1:
    #     first = results[0]
    #     first_date = first.get('date_published')
    #     print(first_date)
    #     MongoManager.getInstance()['DomceDB']['dates'].update_one(
    #         {"id": 1}, {"$set": {"date": first_date}}, upsert=True)

    # last_date = results[-1].get('date_published')
    # MongoManager.getInstance()['DomceDB']['flats'].insert_many(results)
