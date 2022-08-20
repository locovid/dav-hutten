export function buildMessage(availabilities, preferredHut) {
  const availableHutBeds = availabilities.filter((a) => !!a);
  const messageParts = [];

  if (availableHutBeds.length) {
    messageParts.push("Reserve!");

    availableHutBeds.forEach((hut) => {
      const datesMessage = hut.availableBeds
        .map(
          ({ freeRoom, reservationDate }) =>
            `on ${reservationDate} available beds -> ${freeRoom}`
        )
        .join("\n");
      messageParts.push(`${hut.hutName}: \n${datesMessage}\n\n`);
    });
  }

  const shouldAddPreferredHutWarning =
    preferredHut &&
    availableHutBeds.some((r) => r.hutName === preferredHut.name);

  if (shouldAddPreferredHutWarning) {
    messageParts.push(`${preferredHut.name} available!!!!!`);
  }

  return messageParts.join("\n");
}
