const asyncHandler = require('express-async-handler');
const Location = require('../models/LocationModel');
const HaversineDistance = require('../utils/HaversineDistance');
const validateCoordinates = require('../utils/validateCoordinates');

//@desc Accepts POST requests with JSON data containing GPS coordinates
//@route POST /api/location
//@access Private

const createCoords = asyncHandler (async(req, res) => {

  const { latitude, longitude } = req.body;

  validateCoordinates(latitude, longitude, res);
  
  const location = await Location.create({
    user: req.user.id,
    latitude: latitude,
    longitude: longitude
  });

  res.status(201).json(location);
});

//@desc Computes the distance between 2 sets of coordinates using Haversine formula
//@route GET /api/distance
//@access Public

const getDistance = asyncHandler(async(req, res) => {
  
  const { lat1, lon1, lat2, lon2, isMiles } = req.body;

  validateCoordinates(lat1, lon1, res);
  validateCoordinates(lat2, lon2, res);

  const set1 = {
    latitude: lat1,
    longitude: lon1
  };

  const set2 = {
    latitude: lat2,
    longitude: lon2
  }

  const distance = HaversineDistance(set1, set2, isMiles);

  res.status(200).json({
    result: distance
  });
});

//@desc Takes a set of coordinates and returns the closest recorded location from the database.
//@route GET /api/closest
//@access Private

const getClosest = async(req, res) => {

  const { latitude, longitude, isMiles } = req.body;

  validateCoordinates(latitude , longitude , res);

  const givenLocation = {
    latitude: latitude,
    longitude: longitude
  };

  const userLocations = await Location.find({ user: req.user.id }).select('latitude longitude');

  if (!userLocations){
    res.status(404);
    throw new Error('No previous location records found');
  }

  let closestLocId, closestDistance = Infinity;

  userLocations.map((location) => {
    let distance = HaversineDistance(givenLocation, { latitude: location.latitude, longitude: location.longitude }, isMiles);
    if (distance < closestDistance){
      closestDistance = distance, closestLocId = location._id; 
    }
  });

  const closestLocation = await Location.findOne({_id: closestLocId});

  res.status(200).json({
    location: closestLocation,
    distance: closestDistance
  });
}

module.exports = { createCoords, getDistance, getClosest };