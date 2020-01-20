import { location as locationMapping } from "../translation/seatInfo.translation";

export const getDetailsForSeat = (seatInfo, seat) => {
  let seatIdList = seat.id.split('-');
  let location = locationMapping[seatIdList[0]];
  let phaseIndex = seatInfo[location].phases.findIndex(phase => {
    return phase.id.split('-')[1] === seatIdList[1];
  });
  let cubicleIndex = seatInfo[location].phases[phaseIndex].cubicles.findIndex(
    cubicle => {
      return cubicle.id.split('-')[2] === seatIdList[2];
    }
  );
  let seatIndex = seatInfo[location].phases[phaseIndex].cubicles[
    cubicleIndex
  ].seats.findIndex(seat => {
    return seat.id.split('-')[3] === seatIdList[3];
  });

  return [location, phaseIndex, cubicleIndex, seatIndex];
};
