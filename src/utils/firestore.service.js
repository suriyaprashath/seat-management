import firebase from "../firebaseSetup";
import { getDetailsForSeat } from "./seatInfo.service";

const firestore = firebase.firestore();

/**
 * Find the phase for the seat to update and replaces the phase in the firestore
 * @param  {object} seatInfo - entire seat data
 * @param  {object} seat - seat to update
 * @return {promise} - resolves when the seat is updated
 */
export const updateSeat = (seatInfo, seat) => {
  let [location, phaseIndex, cubicleIndex, seatIndex] = getDetailsForSeat(
    seatInfo,
    seat
  );
  let phaseToEdit = seatInfo[location].phases;
  phaseToEdit[phaseIndex].cubicles[cubicleIndex].seats[seatIndex] = seat;

  //TODO Handle no internet case
  return firestore
    .collection("seat")
    .doc(location)
    .update("phases", phaseToEdit);
};
