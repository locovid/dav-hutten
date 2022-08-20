import fetch from "node-fetch";

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
  try {
    const response = await fetch(
      `${baseReservationUrl}/selectDate?date=${params.initialDate}`,
      {
        headers: {
          cookie: `SRVGROUP=common; JSESSIONID=${params.sessionId}`,
        },
      }
    );

    const reservations = await response.json();
    return reservations;
  } catch (error) {
    console.log(error);
  }
}
