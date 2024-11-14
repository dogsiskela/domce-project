from database import MongoManager

collection = MongoManager.getInstance()['DomceDB']['flats_processed']

cursor = collection.find()
current_batch = []

count = 0
for doc in cursor:
    try:
        doc['rooms'] = float(doc['rooms'])
        doc['area'] = float(doc['area'].split('m')[0])

        MongoManager.getInstance()['DomceDB']['flats_processed'].update_one(
            {'_id': doc['_id']}, {'$set': doc})
    except Exception as e:
        print(e)
