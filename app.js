import { getHutsAvailabilities } from "./src/services/hutService.js";
import { huts } from "./src/models/huts.js";
const intervalToCheckInMins = 5;

setInterval(async function () {
  const hutsToWatch = [huts.knorrHut, huts.reintalangerHut];
  const datesToWatch = ["02.09.2022"];

  const availability = await getHutsAvailabilities(hutsToWatch, datesToWatch);

  const results = availability.filter((a) => !!a);
  if (results.length) {
    console.log("Reserve!");
    console.log(JSON.stringify(results));
  }
  if (results.length === 2) {
    console.log("knorrHut available!!!!");
  }
}, 60 * 1000 * intervalToCheckInMins);
