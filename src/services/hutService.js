import { getReservations, getSessionId } from "./../clients/davClient.js";

export async function getHutsAvailabilities(hutsToWatch, datesToWatch) {
  const availabilities = await Promise.all(
    hutsToWatch.map(async (hut) => {
      const sessionId = await getSessionId(hut.id);

      const reservationsObj = await getReservations({
        datesToWatch,
        sessionId,
      });

      const availabilitiesForDates = Object.values(
        Object.values(reservationsObj).flat()
      );

      const availableBeds = availabilitiesForDates
        .filter(
          (hutBed) =>
            hutBed.bedCategoryType === "ROOM" &&
            hutBed.freeRoom > 0 &&
            datesToWatch.includes(hutBed.reservationDate)
        )
        .map((hutBed) => ({
          bedCategoryId: hutBed.bedCategoryId,
          freeRoom: hutBed.freeRoom,
          reservationDate: hutBed.reservationDate,
        }));

      if (!availableBeds.length) {
        return null;
      }

      return {
        hutName: hut.name,
        availableBeds: availableBeds.flat(),
      };
    })
  );

  return availabilities;
}
