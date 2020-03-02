export const getAvailableSeatsInALocation = (seatInfo, location) => {
  let seatCount = 0;
  let phases = seatInfo[location] ? seatInfo[location].phases : [];

  if (Array.isArray(phases) && phases.length !== 0) {
    phases.forEach(phase => {
      seatCount += getAvailableSeatsInAPhase(phase);
    });
  }

  return seatCount;
};

export const getAvailableSeatsInAPhase = phase => {
  let availableSeats = 0;

  if (phase.cubicles) {
    phase.cubicles.forEach(cubicle => {
      cubicle.seats &&
        cubicle.seats.forEach(seat => {
          if (!seat.occupied) {
            availableSeats++;
          }
        });
    });
  }

  return availableSeats;
};

export const getOccupiedSeatsInALocation = (seatInfo, location) => {
  let seatCount = 0;
  let phases = seatInfo[location] ? seatInfo[location].phases : [];

  if (Array.isArray(phases) && phases.length !== 0) {
    phases.forEach(phase => {
      seatCount += getOccupiedSeatsInAPhase(phase);
    });
  }

  return seatCount;
};

export const getOccupiedSeatsInAPhase = phase => {
  let occupiedSeats = 0;

  if (phase.cubicles) {
    phase.cubicles.forEach(cubicle => {
      cubicle.seats &&
        cubicle.seats.forEach(seat => {
          if (seat.occupied) {
            occupiedSeats++;
          }
        });
    });
  }

  return occupiedSeats;
};

export const getTotalSeatsInALocation = (seatInfo, location) => {
  let seatCount = 0;
  let phases = seatInfo[location] ? seatInfo[location].phases : [];

  if (Array.isArray(phases) && phases.length !== 0) {
    phases.forEach(phase => {
      seatCount += getTotalSeatsInAPhase(phase);
    });
  }

  return seatCount;
};

export const getTotalSeatsInAPhase = phase => {
  let seatCount = 0;

  if (phase.cubicles) {
    phase.cubicles.forEach(cubicle => {
      cubicle.seats &&
        cubicle.seats.forEach(seat => {
          seatCount++;
        });
    });
  }

  return seatCount;
};

/**
 * Use this function to display full name
 * @param {string} firstName
 * @param {string} lastName
 */
export const getFullName = (firstName, lastName) => {
  return `${firstName}${lastName ? " " + lastName : ""}`;
};

/**
 * Use this function to display full name when the input is an object
 * containing firstName and lastName
 * @param {object} occupant - contains {firstName, lastName}
 */
export const getFullNameFromObj = occupant => {
  return getFullName(occupant.firstName, occupant.lastName);
};
