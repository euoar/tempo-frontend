import { CLEAR_RESULTS, 
  GET_STATIONS, 
  GET_CLOSEST_STATION, 
  SET_TEXT, 
  SEARCH_LOCATION, 
  GET_GEOLOCATION, 
  REVERSE_GEO } from "./actionTypes";

/**
 * geoLocation almacena las coordenadas del lugar, que vienen de la caja de búsqueda
 * y cambian cada vez que el usuario pulsa el botón de geolocation o cuando se pulsa
 * en uno de los resultados que se encontraron a través de la caja de búsqueda
 * El comportamiento que se busca es que cada vez que cambie este valor cambien también
 * los datos que se muestran el la página en que está el usuario
 */
const initialState = {
  //text: '',
  searchText: '',
  results: null,
  geoLocation: null,
  reversedGeoLocationName: null
}

export const search = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEXT:
      return {
        ...state,
        searchText: action.text
      }
    case SEARCH_LOCATION:
      return {
        ...state,
        results: action.results
      };
    case GET_GEOLOCATION:
      return {
        ...state,
        geoLocation: action.geoLocation
      }
    case REVERSE_GEO:
      return {
        ...state,
        reversedGeoLocationName: action.reversed
      }
    case CLEAR_RESULTS:
      return {
        ...state,
        results: action.results
      }
    default:
      return state;
  }
};

export const stations = (state = {stationsList: null, closestStation: null}, action) => {
  switch (action.type) {
    case GET_STATIONS:
      let newState = {...state};
      return {
        ...newState,
        stationsList: action.stationsList
      }
      case GET_CLOSEST_STATION:
      newState = {...state};
      return {
        ...newState,
        closestStation: action.closestStation
      }
    default:
      return state;
  }
};