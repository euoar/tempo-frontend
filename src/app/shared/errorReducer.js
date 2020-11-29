import {SET_ERROR} from './actionTypes';

const error = (state = {error: null}, action) => {
    if(action.type === SET_ERROR) {
        return {
            error
        }
    }
    return state;
  };

  export default errors;