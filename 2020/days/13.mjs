import { readFileSync } from "fs";
// const data = readFileSync("./inputs/sample.txt", "utf8").split(/\r\n/);
const data = readFileSync("./inputs/13.txt", "utf8").split(/\r\n/);

function cleanData(data, removeX = true) {
  var earliestToLeave = data[0];
  if (removeX) {
    var buses = [
      ...data[1]
        .split(",")
        .filter((busId) => busId !== "x")
        .map((busId) => parseInt(busId)),
    ];
  } else {
    var buses = [...data[1].split(",").map((busId) => parseInt(busId))];
  }
  return [earliestToLeave, buses];
}

function getDepartureTimes(earliestToLeave, busesList) {
  var waitTimes = {};
  busesList.forEach((busId) => {
    const extraTime = earliestToLeave % busId;
    if (extraTime === 0) {
      waitTimes[busId] = 0;
    } else {
      waitTimes[busId] = busId - extraTime;
    }
  });
  return waitTimes;
}

function matchBusToList(busesList) {
  var toMatch = {};
  var timeAt = 0;
  busesList.forEach((busId) => {
    if (isNaN(busId)) {
      timeAt++;
      return;
    } else {
      toMatch[busId] = timeAt;
      timeAt++;
      return;
    }
  });
  return toMatch;
}

//  Part one
// const [earliestToLeave, buses] = cleanData(data, true);
// const waitTimes = getDepartureTimes(earliestToLeave, buses);
// const shortestBusId = Object.keys(waitTimes).reduce((busId, timeWaiting) =>
//   waitTimes[timeWaiting] < waitTimes[busId] ? timeWaiting : busId
// );
// console.log(shortestBusId * waitTimes[shortestBusId]);

// Part two
// var includingXlist = cleanData(data, false)[1];
// var toMatchObj = matchBusToList(includingXlist);
// var [earliestToLeave, buses] = cleanData(data, true);
// const growBy = 13 * 17 * 19 * 23 * 29 * 37 * 41 * 397 * 983;
// earliestToLeave = 13 * 17 * 19 * 23 * 29 * 37 * 41 * 397 * 983;
// var waitTimes = getDepartureTimes(earliestToLeave, buses);

// var allSatisfied = false;
// while (!allSatisfied) {
//   allSatisfied =
//     (earliestToLeave - 7) % 41 === 0 &&
//     (earliestToLeave - 17) % 983 === 0 &&
//     (earliestToLeave + 36) % 19 === 0;
//   earliestToLeave += growBy;
// }
// console.log(earliestToLeave, growBy);

// while (JSON.stringify(waitTimes) !== JSON.stringify(toMatchObj)) {
//   waitTimes = getDepartureTimes(earliestToLeave, buses);
//   earliestToLeave += buses[0];
// }
// console.log(earliestToLeave - buses[0]);
// console.log(toMatchObj);
