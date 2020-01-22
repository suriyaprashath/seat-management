import { INITIALIZE_SEAT_DATA } from "../actions/seat.action";
import { UPDATE_SELECTED_CUBICLE } from "../actions/seat.action";
import { UPDATE_SELECTED_PHASE } from "../actions/seat.action";
import { UPDATE_SEAT } from "../actions/seat.action";

import { getDetailsForSeat } from "../utils/seatInfo.service";

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

    case UPDATE_SEAT:
      let [location, phaseIndex, cubicleIndex, seatIndex] = getDetailsForSeat(
        state.seatInfo,
        action.seat
      );
      state.seatInfo[location].phases[phaseIndex].cubicles[cubicleIndex].seats[
        seatIndex
      ] = action.seat;

      return {
        ...state
      };

    default:
      return state;
  }
};
