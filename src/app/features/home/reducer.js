import { GET_SOL, GET_TIDES_RSS } from "./actionTypes";

export const solarInfo = (state = {geometry: null, days: null}, action) => {
  switch (action.type) {
    case GET_SOL:
      let newState = {...state};
      return {
        ...newState,
        geometry: action.geometry,
        days: action.days
      }
    default:
      return state;
  }
};

export const tidesRss = (state = {}, action) => {
  // let newState = {...state};
  switch (action.type) {
    case GET_TIDES_RSS:
      var newState = {...state};
      return {
        ...newState,
        mareas: action.tides
      }
    default:
      return state;
  }
};
