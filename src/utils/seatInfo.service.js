import { location as locationMapping } from "../translation/seatInfo.translation";

export const getDetailsForSeat = (seatInfo, seat) => {
  let seatIdList = seat.id.split("-");
  let location = locationMapping[seatIdList[0]];
  let phaseIndex = seatInfo[location].phases.findIndex(phase => {
    return phase.id.split("-")[1] === seatIdList[1];
  });
  let cubicleIndex = seatInfo[location].phases[phaseIndex].cubicles.findIndex(
    cubicle => {
      return cubicle.id.split("-")[2] === seatIdList[2];
    }
  );
  let seatIndex = seatInfo[location].phases[phaseIndex].cubicles[
    cubicleIndex
  ].seats.findIndex(seat => {
    return seat.id.split("-")[3] === seatIdList[3];
  });

  return [location, phaseIndex, cubicleIndex, seatIndex];
};

export const getSeatPath = (seatInfo, seat) => {
  let [location, phaseIndex, cubicleIndex] = getDetailsForSeat(seatInfo, seat);
  let phase = seatInfo[location].phases[phaseIndex];
  let cubicle = phase.cubicles[cubicleIndex];

  return `${location}-${phase.name}-${cubicle.name}-${seat.name}`;
};

/**
 * Update the app seatInfo with the seat obtained from firestore
 * @param  {object} seatInfo - App seat info
 * @param  {object} seat - Firebase seat
 * @returns {object} - updated seat info
 */
export const updateSeatInfo = (seatInfo, seat) => {
  // eslint-disable-next-line no-unused-vars
  let appSeat = seatInfo[seat.location.name].phases
    .find(phase => {
      return phase.id === seat.phase.id;
    })
    .cubicles.find(cubicle => {
      return cubicle.id === seat.cubicle.id;
    })
    .seats.find(appSeat => {
      return appSeat.id === seat.id;
    });

  appSeat = {
    ...seat
  };

  return seatInfo;
};
