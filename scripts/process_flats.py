from database import MongoManager
from generate_content import get_location_keys
from places import get_places

collection = MongoManager.getInstance()['DomceDB']['flats']

batch_size = 10
cursor = collection.find().skip(20).limit(100)
current_batch = []

count = 0
for doc in cursor:
    try:
        string_to_process = doc['title'] + doc['description']
        processed_doc = {**doc}
        location_keys = get_location_keys(string_to_process)
        if (location_keys == None or location_keys == "None"):
            continue
        places_response = get_places(location_keys.replace(",", " "))
        location = places_response['results'][0]['geometry']['location']
        processed_doc['location_keys'] = location_keys
        processed_doc['lat'] = location['lat']
        processed_doc['lng'] = location['lng']
        
        MongoManager.getInstance()['DomceDB']['flats_processed'].insert_one(
            processed_doc)
    except Exception as e:
        print(e)
