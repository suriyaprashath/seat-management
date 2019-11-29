import { combineReducers } from "redux";

import seatReducer from './seat.reducer';

export default combineReducers({
  seatData: seatReducer
});