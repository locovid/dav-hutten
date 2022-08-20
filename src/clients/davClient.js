import fetch from "node-fetch";
import { getInitialDates } from "./../services/dateService.js";

const baseReservationUrl = "https://www.alpsonline.org/reservation";

export async function getSessionId(hutId) {
  try {
    const url = `${baseReservationUrl}/calendar?hut_id=${hutId}&lang=de_DE`;
    const response = await fetch(url);
    const cookies = response.headers.get("set-cookie");
    return cookies.match(new RegExp("(^| )JSESSIONID=([^;]+)"))[2];
  } catch (error) {
    console.log(error);
  }
}

export async function getReservations(params) {
  const initialDate = getInitialDates(params.datesToWatch);
  try {
    const response = await fetch(
      `${baseReservationUrl}/selectDate?date=${initialDate}`,
      {
        headers: {
          cookie: `SRVGROUP=common; JSESSIONID=${params.sessionId}`,
        },
      }
    );
    // TODO: the response bring only 13 dates from initial date, bring batch if the desired dates are not in that range
    const reservations = await response.json();
    return reservations;
  } catch (error) {
    console.log(error);
  }
}
