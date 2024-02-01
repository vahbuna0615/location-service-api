const validateLatitude = require('./validateLatitude');
const validateLongitude = require('./validateLongitude');

const validateCoordinates = (lat, lon, res) => {
  if (!(validateLatitude(lat))){
    res.status(400);
    throw new Error('Latitudinal value is missing or is outside of range - (-90, 90)');
  }
  if (!(validateLongitude(lon))){
    res.status(400);
    throw new Error('Longitudinal value is missing or is outside of range - (-180, 180)');
  }
};

module.exports = validateCoordinates;