import { getHutsAvailabilities } from "./src/services/hutService.js";
import { buildMessage } from "./src/services/notificationMessageBuilder.js";
import { huts } from "./src/models/huts.js";

const intervalToCheckInMins = 5;
console.log(`Starting to check every ${intervalToCheckInMins} mins...`);
checkHuts();

setInterval(async function () {
  await checkHuts();
}, 60 * 1000 * intervalToCheckInMins);

async function checkHuts() {
  const hutsToWatch = [huts.knorrHut, huts.reintalangerHut];

  const datesToWatch = ["02.09.2022", "03.09.2022", "04.09.2022", "01.09.2022"];

  const availability = await getHutsAvailabilities(hutsToWatch, datesToWatch);

  const messageToPrint = buildMessage(availability, huts.knorrHut);

  console.log(messageToPrint);
}
