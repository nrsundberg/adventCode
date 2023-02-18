import { readFileSync } from "fs";
const data = readFileSync("./inputs/11.txt", "utf8").split(/\r\n/);

function createSeatState(inputData) {
  var cleanedData = [];
  inputData.forEach((row) => {
    cleanedData.push(row.split(""));
  });
  return cleanedData;
}

function checkNewCordinates(seatCordinates, movement, currentSeatState) {
  const newCordinates = seatCordinates.map((num, ind) => {
    return num + movement[ind];
  });
  const invalidRowCordinates =
    newCordinates[0] < 0 || newCordinates[0] >= currentSeatState.length;
  const invalidColumnCordinates =
    newCordinates[1] < 0 || newCordinates[1] >= currentSeatState[0].length;
  if (invalidRowCordinates || invalidColumnCordinates) {
    return [[], false, false, false];
  }
  const adjacentSeatValue =
    currentSeatState[newCordinates[0]][newCordinates[1]];
  const isOccupied = adjacentSeatValue === "#";
  const isFloor = adjacentSeatValue === ".";
  const isEmpty = adjacentSeatValue === "L";
  return [newCordinates, isOccupied, isFloor, isEmpty];
}

// cord[0] row           cord[1] column
function numberOfAdjacents(
  seatCordinates,
  currentSeatState,
  lookOverFloor = false
) {
  seatCordinates = seatCordinates.map((str) => parseInt(str));
  const seatCombos = [
    [1, 0],
    [0, 1],
    [1, 1],
    [-1, 0],
    [0, -1],
    [-1, -1],
    [-1, 1],
    [1, -1],
  ];
  var adjacentSeats = 0;
  seatCombos.forEach((movement) => {
    var [newCordinates, isOccupied, isFloor, isEmpty] = checkNewCordinates(
      seatCordinates,
      movement,
      currentSeatState
    );
    if (newCordinates.length === 0) {
      return;
    }
    if (isOccupied) {
      adjacentSeats++;
    }
    if (lookOverFloor && isFloor) {
      while (isFloor) {
        [newCordinates, isOccupied, isFloor, isEmpty] = checkNewCordinates(
          newCordinates,
          movement,
          currentSeatState
        );
      }
      if (newCordinates.length === 0) {
        return;
      }
      if (isOccupied) {
        adjacentSeats++;
      }
    }
  });
  return adjacentSeats;
}

function findSeatsToChange(
  currentSeatState,
  adjacentTolerance,
  lookOverFloor = false
) {
  var toChange = {
    L: [],
    "#": [],
  };
  for (let i = 0; i < currentSeatState.length; i++) {
    for (let j = 0; j < currentSeatState[0].length; j++) {
      const seatValue = currentSeatState[i][j];
      switch (seatValue) {
        case "L":
          var adjacents = numberOfAdjacents(
            [i, j],
            currentSeatState,
            lookOverFloor
          );
          if (adjacents === 0) {
            toChange["L"].push([i, j]);
          }
          break;
        case "#":
          var adjacents = numberOfAdjacents(
            [i, j],
            currentSeatState,
            lookOverFloor
          );
          if (adjacents >= parseInt(adjacentTolerance)) {
            toChange["#"].push([i, j]);
          }
          break;
        case ".":
          break;
      }
    }
  }
  return toChange;
}

function changeSeats(currentSeatState, seatsToChange) {
  var newSeatState = Array.from(currentSeatState);
  const emptyChange = seatsToChange["L"].length > 0;
  const filledChange = seatsToChange["#"].length > 0;
  if (emptyChange) {
    seatsToChange["L"].forEach((cord) => {
      newSeatState[cord[0]][cord[1]] = "#";
    });
  }
  if (filledChange) {
    seatsToChange["#"].forEach((cord) => {
      newSeatState[cord[0]][cord[1]] = "L";
    });
  }
  return newSeatState;
}

function fillAllSeats(initialSeats, adjacentTolerance, lookOverFloor = false) {
  var seatsToChange = findSeatsToChange(
    initialSeats,
    adjacentTolerance,
    lookOverFloor
  );
  var newSeats = changeSeats(initialSeats, seatsToChange);
  while (seatsToChange["L"].length > 0 || seatsToChange["#"].length > 0) {
    seatsToChange = findSeatsToChange(
      newSeats,
      adjacentTolerance,
      lookOverFloor
    );
    newSeats = changeSeats(newSeats, seatsToChange);
  }
  return newSeats;
}

function logSeatingArrangement(currentSeatState) {
  var toPrint = [];
  currentSeatState.forEach((grp) => {
    toPrint.push(grp.join(""));
  });
  return console.log(toPrint.join("\r\n"));
}

function findOccupiedSeats(currentSeatState) {
  var seatsOccupied = 0;
  currentSeatState.forEach((row) => {
    seatsOccupied += [...row.join("").matchAll("#")].length;
  });
  return seatsOccupied;
}

const initialSeats = createSeatState(data);

// Part one
// const finalSeats = fillAllSeats(initialSeats, 4, false);

// Part two
const finalSeats = fillAllSeats(initialSeats, 5, true);

const finalSeatsOccupied = findOccupiedSeats(finalSeats);
console.log(finalSeatsOccupied);

// logSeatingArrangement(finalSeats);
