import { combineReducers } from "redux";
import {numericForecastInfo} from './features/forecastTable';
import {rssInfo} from './features/carousel';
import {search, stations} from './features/search/reducer';
import {solarInfo, tidesRss} from './features/home/reducer';

const rootReducer = combineReducers({
  search,
  numericForecastInfo,
  solarInfo,
  stations,
  rssInfo,
  tidesRss
});

export default rootReducer;