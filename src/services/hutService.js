import { getReservations, getSessionId } from "./../clients/davClient.js";

export async function getHutsAvailabilities(hutsToWatch, datesToWatch) {
  const availabilities = await Promise.all(
    hutsToWatch.map(async (hut) => {
      const sessionId = await getSessionId(hut.id);
      const reservationsObj = await getReservations({
        initialDate: datesToWatch[0], // Todo: iterate peer dates
        sessionId,
      });

      // TODO: filter by date, currently i know the first result its the given date
      const availabilitiesForDate = Object.values(
        Object.values(reservationsObj)[0]
      );

      const availableBeds = availabilitiesForDate
        .filter(
          (hutBed) => hutBed.bedCategoryType === "ROOM" && hutBed.freeRoom > 0
        )
        .map((hutBed) => ({
          bedCategoryId: hutBed.bedCategoryId,
          freeRoom: hutBed.freeRoom,
        }));

      if (!availableBeds.length) {
        return null;
      }

      return {
        hutName: hut.name,
        availableBeds: availableBeds.flatMap((availableBed) => availableBed),
      };
    })
  );

  return availabilities;
}
