import { GET_SOL, GET_NUMERIC, GET_TIDES_RSS } from "./actionTypes";
import {setError} from '../../shared/errorAction';
import {parseNumericInfo} from '../../utils/numericInfoParser';
import SERVER_DOMAIN from '../../../environment';
import queryString from 'query-string';

const results = (idZona, {days}) => ({
  type: GET_NUMERIC,
  id: idZona,
  days: days
});

export const getNumericInfo = (search) => {
  // idZona
  let idZona = queryString.parse(search).idZona;
  return dispatch => {
    return fetch(SERVER_DOMAIN + '/api/getNumericForecastInfo' + search)
      .then(res => res.json())
      .then(json => {
        let days = parseNumericInfo(json);
        dispatch(results(idZona, days));
      })
      .catch(err => dispatch(setError(err)));
  }
}

const getSol = json => ({
  type: GET_SOL,
  geometry: json.features[0].geometry,
  days: json.features[0].properties.days
});


export const getSolarInfo = (coords) => {
  return dispatch => {
    return fetch(SERVER_DOMAIN + `/api/getSolarInfo?coords=` + coords)
      .then(res => res.json())
      .then(json => {
        dispatch(getSol(json));
      })
      .catch(err => dispatch(setError(err)));
  }
}

// Por defecto voy a usar el puerto 0, que es Coruña
const tidesRss = json => ({
  type: GET_TIDES_RSS,
  tides: json.rss.channel.item[0]['Mareas:mareas']
});

export const getTidesRss = () => {
  return dispatch => {
    return fetch(SERVER_DOMAIN + '/rss/predicion/rssMareas.action?request_locale=gl')
      .then(res => res.json())
      .then(json => {
        dispatch(tidesRss(json));
      })
      .catch(err => dispatch(setError(err)));
  }
}