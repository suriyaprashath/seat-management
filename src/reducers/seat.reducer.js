import { INITIALIZE_SEAT_DATA } from "../actions/seat.action";
import { UPDATE_SEAT_DATA } from "../actions/seat.action";
import { UPDATE_SELECTED_LOCATION } from "../actions/seat.action";
import { UPDATE_SELECTED_CUBICLE } from "../actions/seat.action";
import { UPDATE_SELECTED_PHASE } from "../actions/seat.action";

const initialState = {
  selectedLocation: "",
  selectedPhase: {},
  selectedCubicle: {},
  selectedSeat: {},
  seatInfo: {}
};

export default (state = initialState, action) => {
  let selectedLocation;
  let seatInfo;

  switch (action.type) {
    case INITIALIZE_SEAT_DATA:
      seatInfo = action.data;
      selectedLocation =
        Object.keys(seatInfo).length !== 0 ? Object.keys(seatInfo)[0] : "";
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

    case UPDATE_SEAT_DATA:
      seatInfo = action.data;

      return {
        ...state,
        seatInfo
      };
    // Update Location and reset the Phase on changing the Location
    case UPDATE_SELECTED_LOCATION:
      selectedLocation = action.location;

      return {
        ...state,
        selectedLocation,
        selectedPhase:
          selectedLocation !== ""
            ? state.seatInfo[selectedLocation].phases[0]
            : {}
      };

    case UPDATE_SELECTED_CUBICLE:
      return {
        ...state,
        selectedCubicle: action.cubicle
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
