const { getDb } = require("../database/database.config");

const listApartments = async (filter) => {
  try {
    let collection = await getDb().collection("flats_processed");

    const apartments = await collection.find(filter).limit(100).toArray();

    return apartments;
  } catch (e) {
    console.log("Couldn't list flats collection");
    console.log(e);
  }
};

const apartmentsDetails = async (residentialId) => {
  try {
    let collection = await getDb().collection("flats");
    const filter = { id: residentialId };
    const result = collection.findOne(filter);
    return result;
  } catch (e) {
    console.log("Couldn't list flats collection");
    console.log(e);
  }
};

const addApartments = async (newResidential) => {
  try {
    let collection = await getDb().collection("flats");

    const addedResidential = await collection.insertOne(newResidential);

    return addedResidential;
  } catch (e) {
    console.log("Error inserting new flats");
    console.log(e);
  }
};

const updateApartments = async (residentialId, updatedResidential) => {
  try {
    let collection = await getDb().collection("flats");

    const filter = { id: residentialId };

    return collection.updateOne(filter, updatedResidential);
  } catch (e) {
    console.log("Error updating flats");
    console.log(e);
  }
};

const deleteApartments = async (residentialId) => {
  try {
    let collection = await getDb().collection("flats");

    const filter = { id: residentialId };

    return collection.deleteOne(filter);
  } catch (e) {
    console.log("Error deleting flats");
    console.log(e);
  }
};

module.exports = {
  listApartments,
  addApartments,
  updateApartments,
  deleteApartments,
  apartmentsDetails,
};
