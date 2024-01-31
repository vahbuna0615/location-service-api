const asyncHandler = require('express-async-handler');
const Location = require('../models/LocationModel');

//@desc Accepts POST requests with JSON data containing GPS coordinates
//@route POST /api/location
//@access Private

const createCoords = asyncHandler (async(req, res) => {
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  if (( latitude < -90 || latitude > 90)){
    res.status(400);
    throw new Error('Latitudinal value outside of range [-90, 90]');
  }
  if (longitude < -180 || longitude > 180 ){
    res.status(400);
    throw new Error('Longitudinal value outside of range [-180, 180]');
  }
  const location = await Location.create({
    user: req.body.user,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });

  res.status(200).json(location);
});

//@desc Computes the distance between 2 sets of coordinates using Haversine formula
//@route GET /api/distance
//@access Private

const getDistance = asyncHandler(async(req, res) => {
  const set1 = {
    latitude: req.body.lat1,
    longitude: req.body.lon1
  };

  const set2 = {
    latitude: req.body.lat2,
    longitude: req.body.lon2
  }

  const isMiles = req.body.convMiles;

  const haversineDistance = (coords1, coords2, isMiles) => {
    const toRad = (x) => {
      return x * Math.PI / 180;
    }

    const R = 6371; //km

    const lat1 = coords1.latitude;
    const lon1 = coords1.longitude;

    const lat2 = coords2.latitude;
    const lon2 = coords2.longitude;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;

    if (isMiles){
      d = d / 1.60934; //distance in miles
    }

    return d; // distance in km
  }

  const distance = haversineDistance(set1, set2, isMiles);

  res.json({
    result: distance
  });
});

module.exports = { createCoords, getDistance };