const validateLongitude = (long) => {
  if ((!long) || (long < -180 || long > 180)){
    return false;
  }

  return true;
};

module.exports = validateLongitude;