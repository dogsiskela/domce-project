const express = require("express");

const {
  listApartments,
  addApartments,
  updateApartments,
  deleteApartments,
  residentialDetails,
} = require("../services/apartments");

const apartmentsRouter = express.Router();
const filterItems = ['balcony','fireplace','elevator','ground_floor','parking','attic','new_building','furnished','basement','duplex','renovated']

apartmentsRouter.get("/all", async (req, res) => {
  const filter = {};
  if(req.query.min_price && req.query.max_price) {
    filter.price = {
      $gte: parseInt(req.query.min_price),  
      $lte: parseInt(req.query.max_price)  
    };
  }
  else if (req.query.min_price) {
    filter.price = { 
      $gte: parseInt(req.query.min_price) 
    };
  }
  else if (req.query.max_price) {
    filter.price = { 
      $lte: parseInt(req.query.max_price)
    };
  }
  if(req.query.min_rooms && req.query.max_rooms) {
    filter.rooms = {
      $gte: parseInt(req.query.min_rooms), 
      $lte: parseInt(req.query.max_rooms)  
    };
  }
  else if (req.query.min_rooms) {
    filter.rooms = { 
      $gte: parseInt(req.query.min_rooms) 
    };
  }
  else if (req.query.max_rooms) {
    filter.rooms = { 
      $lte: parseInt(req.query.max_rooms)
    };
  }
  if(req.query.min_area && req.query.max_area) {
    filter.area = {
      $gte: parseInt(req.query.min_area),  // Greater than or equal to minRent
      $lte: parseInt(req.query.max_area)   // Less than or equal to maxRent
    };
  }
  else if (req.query.min_area) {
    filter.area = { 
      $gte: parseInt(req.query.min_area) 
    };
  }
  else if (req.query.max_area) {
    filter.area = { 
      $lte: parseInt(req.query.max_area)
    };
  }

  for(const i in filterItems){
    if(req.query[filterItems[i]] === 'true'){
      filter[filterItems[i]] = { 
        $eq: true
      };
    }
  }

  if(req.query.searchQuery){
    filter.title = {
      $regex: req.query.searchQuery,
      $options:'i'
    }
  }
  
  if (req.query.south && req.query.east && req.query.west && req.query.north) {
    filter.lat = {
      $gte: parseFloat(req.query.south),
      $lte: parseFloat(req.query.north)
    };
    filter.lng = {
      $gte: parseFloat(req.query.west),
      $lte: parseFloat(req.query.east)
    };
  }
  

  let items = await listApartments(filter);

  res.send({ items: items });
});

apartmentsRouter.get("/get/:id", async (req, res) => {
  let data = await apartmentsDetails(req.params);

  res.send({ data: data });
});

apartmentsRouter.post("/create", async (req, res) => {
  let item = req.body;
  const newapartments = {
    ...item,
    date_added: Date.now(),
  };

  let result = await addApartments(newapartments);

  res.send({
    result: result,
  });
});

apartmentsRouter.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  let result = await updateApartments(id, data);

  res.send(result);
});

apartmentsRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  let result = await deleteApartments(id);

  res.send(result);
});

module.exports = {
  apartmentsRouter,
};
