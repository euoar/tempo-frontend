import { CLEAR_RESULTS, 
  SEARCH_LOCATION, 
  SET_TEXT, 
  GET_GEOLOCATION, 
  REVERSE_GEO,
  GET_STATIONS,
  GET_CLOSEST_STATION
} from "./actionTypes";
import {setError} from '../../shared/errorAction';
import {parsePlaces} from '../../utils/placesParser';
import {calculateClosest} from '../../utils/stations';
import SERVER_DOMAIN from '../../../environment';

const search = text => ({
  type: SET_TEXT,
  text
});

const results = (json) => ({
  type: SEARCH_LOCATION,
  results: json
});

// Geo almacena la localización del usuario, cuando éste
// pulsa el botón de localizar
const geo = (latitude, longitude) => ({
    type: GET_GEOLOCATION,
    //invierto el orden de latitud y longitud porque
    // es como se ponen en las llamadas a la api
    geoLocation: {
      longitude,
      latitude
    }
});

const reverseGeo = (place) =>({
  type: REVERSE_GEO,
  reversed: place
});

const clear = () => ({
  type: CLEAR_RESULTS,
  results: null
});

// Nueva función, para trabajar con respuesta del back sin formatear
export const getResults = (text) => {
  return dispatch => {
    dispatch(search(text));
    return fetch(SERVER_DOMAIN + `/api/findPlaces?lugar=` + text)
      .then(res => {
        dispatch(search(text));
        return res.json()}
        )
      .then(json =>  {
        //parseamos el json
        let parsed = parsePlaces(json);
        //lanzamos la acción, pasándole el resultado parseado
        dispatch(results(parsed));
      })
      .catch(err => dispatch(setError(err)));
  }
}

// texto de búsqueda
export const searchText = (text) => {
  return dispatch => {
    dispatch(search(text));
  }
}

export const clearResults = () => {
  return dispatch => {
    dispatch(clear());
  }
}

// para localizar la posición usando geoLocation (botón al lado de la caja de búsqueda)
export const getGeoLocation = (latitude, longitude) => {
  return dispatch => {
    dispatch(geo(latitude, longitude));
    dispatch(getReverseGeo(latitude, longitude));
    //también hay que actualizar las estaciones y distancias
    dispatch(getClosestStation());
  }
}

/**
 * Obtener el nombre del lugar a partir de las coordenadas. Utiliza
 * openstreetmaps, por ser gratuito
 * @param {*} latitude 
 * @param {*} longitude 
 */
export const getReverseGeo = (latitude, longitude) => {
  
  let url = `https://nominatim.openstreetmap.org/reverse` +
  `?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`; 
  console.log("Esta es la url: " + url);
  return dispatch => {
    return fetch(url)
      .then(res => res.json())
      .then(json => {
        //parseamos el json
        const {lat, lon, address} = json;
        console.log("Este es el lugar donde estás: ", json);
        let place = '';
        if(json.address.beach) {
          place = json.address.beach;
        } else if(json.address.town) {
          place = json.address.town;
        } else if(json.address.village) {
          place = json.address.village;
        } else if(json.address.city) {
          place = json.address.city;
        } else {
          place = json.address.county;
        }
        //lanzamos la acción, pasándole el resultado parseado
        dispatch(reverseGeo(place));
      })
      .catch(err => dispatch(setError(err)));
  }
}

const stationsList = ({listEstadoActual}) => ({
  type: GET_STATIONS,
  stationsList: listEstadoActual
})
const closestStation = (items) => ({
  type: GET_CLOSEST_STATION,
  closestStation: items
});

export const getStations = () => {
  return (dispatch, getState) => {
    return fetch(SERVER_DOMAIN +`/api/getStations`)
      .then(res => res.json())
      .then(json => {
        dispatch(stationsList(json));
      })
      .then( () => dispatch(getClosestStation()) )
      .catch(err => dispatch(setError(err)));
  }
}

export const getClosestStation = () => {
  return (dispatch, getState) => {
    // si se ha fijado la geoLocation: calcular la más próxima y pasarla
    if(getState().search.geoLocation) {
      dispatch(closestStation(calculateClosest(getState())));
    }
  }
}

