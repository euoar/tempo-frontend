import {GET_RSS_XERAL } from './actionTypes';
import SERVER_DOMAIN from '../../../environment';
import {setError} from '../../shared/errorAction'

const general = (day, json) => ({
    type: GET_RSS_XERAL,
    day: day,
    description: json.rss.channel.item['CPrazo:variables'][0]._text
});

export const getGeneralForecast = (day) => {
    return dispatch => {
        return fetch(SERVER_DOMAIN + `/rss/predicion/rssCPrazo.action?dia=${day}&request_locale=gl`)
            .then(res => res.json())
            .then(json => {
                dispatch(general(day, json));
            })
            .catch(err => dispatch(setError(err)));
    }
}