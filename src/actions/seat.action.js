export const INITIALIZE_SEAT_DATA = 'INITIALIZE_SEAT_DATA';
export const UPDATE_SELECTED_CUBICLE = 'UPDATE_SELECTED_CUBICLE';
export const UPDATE_SELECTED_PHASE = 'UPDATE_SELECTED_PHASE';
export const UPDATE_SEAT = 'UPDATE_SEAT';

export const initializeSeatData = (data) => {
  return {
    type: INITIALIZE_SEAT_DATA,
    data
  }
}

export const updateSelectedCubicle = cubicle => {
  return {
    type: UPDATE_SELECTED_CUBICLE,
    cubicle
  }
}

export const updateSelectedPhase = phase => {
  return {
    type: UPDATE_SELECTED_PHASE,
    phase
  }
}

export const updateSeat = seat => {
  return {
    type: UPDATE_SEAT,
    seat
  }
}