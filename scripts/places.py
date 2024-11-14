import os
import requests
from dotenv import load_dotenv

load_dotenv()


def get_places(query, location="41.997345%2C21.427996", radius=5):
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    params = {
        "location": location,
        "query": query,
        "radius": radius,
        "key": os.getenv('PLACES_API_KEY')
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        results = response.json()
        return results
    else:
        print(f"Error: {response.status_code}")
        return None
