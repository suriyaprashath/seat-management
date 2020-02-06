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
