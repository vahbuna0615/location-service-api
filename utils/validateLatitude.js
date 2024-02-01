const validateLatitude = (lat) => {
  if ((!lat) || (lat < -90 || lat > 90)){
    return false;
  }

  return true;
};

module.exports = validateLatitude;