import { GET_BEACH_XML, GET_RSS_XERAL } from "./actionTypes";

export const rssInfo = (state = {}, action) => {
  // let newState = {...state};
  switch (action.type) {
    case GET_BEACH_XML:
      let newState = {...state};
      return {
        ...newState,
        waterTemperature: action.waterTemp
      };
    case GET_RSS_XERAL:
      newState = {...state};
      return {
        ...newState,
        [action.day]: { predictionGalicia: action.description } // el número de día se usa para el nombre del objeto
      };
    default:
      return state;
  }
};


  