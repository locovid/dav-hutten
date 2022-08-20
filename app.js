import { getReservations, getSessionId } from "./src/clients/davClient.js";
import { huts } from "./src/models/huts.js";

console.log("Availablility");
const knorrHutId = huts.knorrHut.id;
const sessionId = await getSessionId(knorrHutId);

const reservations = await getReservations({
  initialDate: "27.08.2022",
  sessionId,
});

console.log(reservations);
