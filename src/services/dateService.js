export function getInitialDates(dates) {
  const sorted = dates.sort((a, b) => {
    const newA = a.split(".").reverse().join("-");
    const newB = b.split(".").reverse().join("-");
    return +new Date(newA) - +new Date(newB);
  });
  return sorted[0];
}
