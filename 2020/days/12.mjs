import { readFileSync } from "fs";
const data = readFileSync("./inputs/12.txt", "utf8").split(/\r\n/);

class Ship {
  constructor() {
    var location = {
      E: 0,
      W: 0,
      N: 0,
      S: 0,
      degree: 0,
    };
    var currentDirection = "E";
    this.location = location;
    this.currentDirection = currentDirection;
  }
}

class Waypoint {
  constructor(initalPoint) {
    var location = {
      E: 0,
      W: 0,
      N: 0,
      S: 0,
    };
    Object.keys(initalPoint).forEach((key) => {
      location[key] = initalPoint[key];
    });
    this.location = location;
  }
  get currentLocation() {
    return this.filterPoints();
  }
  filterPoints() {
    const filteredEntries = new Map(
      Object.entries(this.location).filter(([a, b]) => b > 0)
    );
    return Object.fromEntries(filteredEntries);
  }
}

function processInstruction(instruction) {
  const [direction, value] = [instruction[0], parseInt(instruction.slice(1))];
  return [direction, value];
}

function rotateWaypoint(
  shipObject,
  waypointObject,
  direction,
  waypointMultiplier
) {
  const directionalChanges = ["N", "E", "S", "W"];
  const currentDegree = shipObject.location["degree"];
  var rotations = 0;
  if (currentDegree >= 90) {
    rotations = Math.floor(shipObject.location["degree"] / 90);
  } else {
    rotations = Math.ceil(shipObject.location["degree"] / 90);
  }
  const currentDirectionIndex = directionalChanges.indexOf(direction);
  var newIndex = (currentDirectionIndex + rotations) % 4;
  if (newIndex === -1) {
    waypointObject.location[directionalChanges.slice(-1)[0]] =
      waypointMultiplier[direction];
  } else {
    waypointObject.location[
      directionalChanges.slice(newIndex, newIndex + 1)[0]
    ] = waypointMultiplier[direction];
  }
  return [shipObject, waypointObject];
}

function rotateShip(shipObject) {
  const directionalChanges = ["N", "E", "S", "W"];
  const currentDegree = shipObject.location["degree"];
  var rotations = 0;
  if (currentDegree >= 90) {
    rotations = Math.floor(shipObject.location["degree"] / 90);
  } else {
    rotations = Math.ceil(shipObject.location["degree"] / 90);
  }
  const currentDirectionIndex = directionalChanges.indexOf(
    shipObject.currentDirection
  );
  var newIndex = (currentDirectionIndex + rotations) % 4;
  shipObject.location["degree"] = shipObject.location["degree"] % 90;
  if (newIndex === -1) {
    shipObject.currentDirection = directionalChanges.slice(-1)[0];
  } else {
    shipObject.currentDirection = directionalChanges.slice(
      newIndex,
      newIndex + 1
    )[0];
  }
  return shipObject;
}

function moveShip(shipObject, instruction, waypointObject, waypoint = false) {
  var [direction, value] = instruction;
  if (!waypoint) {
    if (direction === "F") {
      direction = shipObject.currentDirection;
    }
    if (direction === "L" || direction === "R") {
      shipObject.location["degree"] += direction === "L" ? -value : value;
      if (Math.abs(shipObject.location["degree"]) >= 90) {
        shipObject = rotateShip(shipObject);
      }
    } else {
      shipObject.location[direction] += value;
    }
    return shipObject;
  } else {
    if (direction === "F") {
      const waypointMultiplier = waypointObject.currentLocation;
      Object.keys(waypointMultiplier).forEach((direction) => {
        shipObject.location[direction] += waypointMultiplier[direction] * value;
      });
    } else if (direction === "L" || direction === "R") {
      shipObject.location["degree"] += direction === "L" ? -value : value;
      const waypointMultiplier = Object.assign(waypointObject.currentLocation);
      Object.keys(waypointMultiplier).forEach((direction) => {
        waypointObject.location[direction] = 0;
      });
      Object.keys(waypointMultiplier).forEach((direction) => {
        [shipObject, waypointObject] = rotateWaypoint(
          shipObject,
          waypointObject,
          direction,
          waypointMultiplier
        );
      });
      shipObject.location["degree"] = shipObject.location["degree"] % 90;
    } else {
      waypointObject.location[direction] += value;
    }
    return [shipObject, waypointObject];
  }
}

function manhattanDistance(shipObject) {
  const northSouth = Math.abs(
    shipObject.location["N"] - shipObject.location["S"]
  );
  const eastWest = Math.abs(
    shipObject.location["E"] - shipObject.location["W"]
  );
  return northSouth + eastWest;
}

function makeMoves(moveList, partOne = true, showLocation = false) {
  if (partOne) {
    moveList.forEach((move) => {
      var cleanedMove = processInstruction(move);
      movedShip = moveShip(movedShip, cleanedMove);
    });
  } else {
    moveList.forEach((move) => {
      var cleanedMove = processInstruction(move);
      [movedShip, movedWaypoint] = moveShip(
        movedShip,
        cleanedMove,
        movedWaypoint,
        true
      );
    });
  }
  if (showLocation) {
    console.log(movedShip.location);
  }
  const finalDistance = manhattanDistance(movedShip);
  console.log(finalDistance);
}

var movedShip = new Ship();
var movedWaypoint = new Waypoint({ N: 1, E: 10 });

// Part one
// makeMoves(data, { showLocation: true });

// Part two
makeMoves(data, false, false);
