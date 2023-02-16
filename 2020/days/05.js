const fs = require("fs");

var data = fs.readFileSync("./inputs/05.txt", "utf8").split(/\r\n/);

function seatFinder(front = true, possibleRange = []) {
  var seatsRangeAdjust = (possibleRange[1] - possibleRange[0]) / 2;
  var newRange = [];
  if (front) {
    newRange = [
      possibleRange[0],
      possibleRange[1] - Math.ceil(seatsRangeAdjust),
    ];
  } else {
    newRange = [
      possibleRange[0] + Math.ceil(seatsRangeAdjust),
      possibleRange[1],
    ];
  }
  return newRange;
}

function moveFrontBack(
  seatingChart,
  startingRange = [],
  startingColumnRange = []
) {
  const seatingMoves = seatingChart.split("").slice(0, 7);
  const columnMoves = seatingChart.split("").slice(7);
  var newRange = Array.from(startingRange);
  var columnRange = Array.from(startingColumnRange);
  seatingMoves.forEach((char) => {
    newRange = seatFinder((front = char === "F" ? true : false), newRange);
  });
  columnMoves.forEach((char) => {
    columnRange = seatFinder(
      (front = char === "L" ? true : false),
      columnRange
    );
  });
  return newRange[0] * 8 + columnRange[0];
}

const seatIds = [];

data.forEach((seatingArrangement) => {
  const seatid = moveFrontBack(seatingArrangement, [0, 127], [0, 7]);
  seatIds.push(seatid);
});

// Part one
// console.log(Math.max(...seatIds));

// Part two
const startingSeat = Math.min(...seatIds);
const endingSeat = Math.max(...seatIds);

for (let i = startingSeat; i < endingSeat - startingSeat; i++) {
  const nextSeat = startingSeat + i;
  const inList = seatIds.includes(nextSeat);
  if (inList) {
    continue;
  } else {
    return console.log(nextSeat);
  }
}
