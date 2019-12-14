export const getTotalSeatsInAPhase = phase => {
  let seatCount = 0;

  if (phase.cubicles) {
    phase.cubicles.forEach(cubicle => {
      cubicle.seats && cubicle.seats.forEach(seat => {
        seatCount++;
      });
    });
  }

  return seatCount;
}

export const getAvailableSeatsInAPhase = phase => {
  let availableSeats = 0;

  if (phase.cubicles) {
    phase.cubicles.forEach(cubicle => {
      cubicle.seats && cubicle.seats.forEach(seat => {
        if (!seat.occupied) {
          availableSeats++;
        }
      });
    });
  }

  return availableSeats;
}