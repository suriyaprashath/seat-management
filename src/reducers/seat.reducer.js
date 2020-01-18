import { INITIALIZE_SEAT_DATA } from "../actions/seat.action";
import { UPDATE_SELECTED_PHASE } from "../actions/seat.action";

const initialState = {
  selectedLocation: "",
  selectedPhase: {},
  selectedCubicle: {},
  selectedSeat: {},
  seatInfo: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SEAT_DATA:
      let seatInfo = action.data;
      let selectedLocation = Object.keys(seatInfo)[0];
      let selectedPhase =
        selectedLocation !== "" ? seatInfo[selectedLocation].phases[0] : {};
      let selectedCubicle =
        selectedPhase.cubicles && selectedPhase.cubicles.length !== 0
          ? selectedPhase.cubicles[0]
          : {};
      let selectedSeat =
        selectedCubicle.seats && selectedCubicle.seats.length !== 0
          ? selectedCubicle.seats[0]
          : {};

      return {
        ...state,
        selectedLocation,
        selectedPhase,
        selectedCubicle,
        selectedSeat,
        seatInfo
      };

    case UPDATE_SELECTED_PHASE:
      return {
        ...state,
        selectedPhase: action.phase
      };

    default:
      return state;
  }
};
