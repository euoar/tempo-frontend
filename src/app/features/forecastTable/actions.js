import { GET_NUMERIC, GET_BEACH_XML, GET_RSS_XERAL} from "./actionTypes";
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

const waterTemp = temp => ({
  type: GET_BEACH_XML,
  waterTemp: temp
});

/**
 * El backend ya nos da el rss convertido a json, utilizando allá
 * xml-js
 * @param {*} day 
 * @param {*} json 
 */
const xeral = (day, json) => ({
  type: GET_RSS_XERAL,
  day: day,
  description: json.rss.channel.item['CPrazo:variables'][0]._text
});


export const getWaterTemp = () => {
  return dispatch => {
    return fetch('https://servizos.meteogalicia.es/rss/predicion/georssPraias.action?idZona=1999&dia=1', {
      mode: 'no-cors'
    })
      .then(res => res.text())
      .then(text => {
        return new DOMParser().parseFromString(text, "text/xml");
      })
      .then(xmlDoc => {
        let valor = xmlDoc.getElementsByTagName('Praias:temperaturaAuga')[0].innerHTML;
        //console.log("este es el valor" + valor);
        dispatch(waterTemp(xmlDoc.getElementsByTagName('Praias:temperaturaAuga')[0].innerHTML))
      })
      .catch(err => dispatch(setError(err)));
  }
}

export const getLocationRss = (idZona, day=0) => {
  return dispatch => {
    return fetch(SERVER_DOMAIN + `/rss/predicion/rssLocalidades.action?` +
      `idZona=${idZona}&dia=${day}&request_locale=gl`)
      .then(res => res.json())
      .then(json => {
        dispatch(xeral(json));
      })
      .catch(err => dispatch(setError(err)));
  }
}