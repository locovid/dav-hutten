import { getReservations, getSessionId } from "./src/clients/davClient.js";
import { huts } from "./src/models/huts.js";

const hutsToWatch = [huts.knorrHut, huts.reintalangerHut];
const datesToWatch = ["02.09.2022"];

const availability = await Promise.all(
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

const results = availability.filter((a) => !!a);
if (results.length) {
  console.log("Reserve!");
  console.log(JSON.stringify(result));
}
