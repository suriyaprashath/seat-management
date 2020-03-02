export const INITIALIZE_SEAT_DATA = 'INITIALIZE_SEAT_DATA';
export const UPDATE_SEAT_DATA = 'UPDATE_SEAT_DATA';
export const UPDATE_SELECTED_LOCATION = 'UPDATE_SELECTED_LOCATION';
export const UPDATE_SELECTED_CUBICLE = 'UPDATE_SELECTED_CUBICLE';
export const UPDATE_SELECTED_PHASE = 'UPDATE_SELECTED_PHASE';

export const initializeSeatData = (data) => {
  return {
    type: INITIALIZE_SEAT_DATA,
    data
  }
}

export const updateSeatData = (data) => {
  return {
    type: UPDATE_SEAT_DATA,
    data
  }
}

export const updateSelectedLocation = location => {
  return {
    type: UPDATE_SELECTED_LOCATION,
    location
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