import { GET_NUMERIC } from "./actionTypes";

export const numericForecastInfo = (state = {}, action) => {
  switch (action.type) {
    case GET_NUMERIC:
      let newState = {...state};
      return {
        ...newState,
          [action.id] : action.days
      }
    default:
      return state;
  }
};
