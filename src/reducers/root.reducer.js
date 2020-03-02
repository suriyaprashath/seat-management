import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import seatReducer from "./seat.reducer";

export default combineReducers({
  seatData: seatReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});
