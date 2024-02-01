const HaversineDistance = (coords1, coords2, isMiles) => {
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
};

module.exports = HaversineDistance;