export const INITIALIZE_SEAT_DATA = 'INITIALIZE_SEAT_DATA';

export const initializeSeatData = (data) => {
  return {
    type: INITIALIZE_SEAT_DATA,
    data
  }
}