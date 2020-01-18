export const INITIALIZE_SEAT_DATA = 'INITIALIZE_SEAT_DATA';
export const UPDATE_SELECTED_PHASE = 'UPDATE_SELECTED_PHASE';

export const initializeSeatData = (data) => {
  return {
    type: INITIALIZE_SEAT_DATA,
    data
  }
}

export const updateSelectedPhase = phase => {
  return {
    type: UPDATE_SELECTED_PHASE,
    phase
  }
}