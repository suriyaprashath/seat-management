import firebase from "../firebaseSetup";

const firestore = firebase.firestore();

/**
 * Find the phase for the seat to update and replaces the phase in the firestore
 * @param  {object} seatInfo - entire seat data
 * @param  {object} seat - seat to update
 * @return {promise} - resolves when the seat is updated
 */
export const updateSeat = seat => {
  //TODO Handle no internet case
  return firestore
    .collection("seat")
    .doc(seat.id)
    .set(
      {
        occupant: seat.occupant,
        occupied: seat.occupied
      },
      { merge: true }
    );
};

export const transformDataForApp = seatList => {
  let seatInfo = {};

  seatList.forEach(seat => {
    // Construct Location object and create Phase array
    if (Object.keys(seatInfo).indexOf(seat.location.name) === -1) {
      seatInfo[seat.location.name] = {
        id: seat.location.id,
        name: seat.location.name,
        phases: []
      };
    }

    let phase = seatInfo[seat.location.name].phases.find(phase => {
      return phase.id === seat.phase.id;
    });
    // Construct phase object
    if (!phase) {
      phase = {
        id: seat.phase.id,
        name: seat.phase.name,
        location: seatInfo[seat.location.name],
        cubicles: []
      };
      seatInfo[seat.location.name].phases.push(phase);
    }

    let cubicle = phase.cubicles.find(cubicle => {
      return cubicle.id === seat.cubicle.id;
    });
    // Construct cubicle object
    if (!cubicle) {
      cubicle = {
        id: seat.cubicle.id,
        name: seat.cubicle.name,
        phase,
        seats: []
      };
      phase.cubicles.push(cubicle);
    }

    let appSeat = cubicle.seats.find(appSeat => {
      return appSeat.id === seat.id;
    });
    // Construct seat object
    if (!appSeat) {
      cubicle.seats.push({
        ...seat,
        cubicle
      });
    }
  });

  return seatInfo;
};
