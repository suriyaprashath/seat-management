import { INITIALIZE_SEAT_DATA } from "../actions/seat.action";

export default (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_SEAT_DATA:
      return action.data;
    default:
      return state;
  }
};
