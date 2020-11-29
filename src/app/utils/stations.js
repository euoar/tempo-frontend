import haversine from 'haversine';

export const calculateClosest = (state) => {

  const curPosition = {
    latitude: state.search.geoLocation.latitude,
    longitude: state.search.geoLocation.longitude
  }

  let accInitialValue = {
    distance: null,
    stationId: null
  }

  if (state.stations.stationsList[0]) {
    accInitialValue.distance = haversine(curPosition, { 
      latitude: state.stations.stationsList[0].lat,
      longitude: state.stations.stationsList[0].lon 
      })
  }

  let curDistance = null;

  let closestStation = state.stations.stationsList.reduce((acc, cur) => {
    curDistance = haversine(curPosition, {latitude: cur.lat, longitude: cur.lon});
    return acc.distance <  curDistance ? acc : {distance: curDistance, stationId: cur.idEstacion}
    }, accInitialValue 
  );
    
  let filtered = state.stations.stationsList.filter(station => station.idEstacion === closestStation.stationId);
  
  return filtered;
}