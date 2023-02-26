import { readFileSync } from "fs";
const data = readFileSync("./inputs/sample.txt", "utf8").split(/\r\n/);
// const data = readFileSync("./inputs/24.txt", "utf8").split(/\r\n/);

function getTileCordinates(instruction) {
  var refTile = [0, 0];
  for (let i = 0; i < instruction.length; i++) {
    const [char, nextChar] = [instruction[i], instruction[i + 1]];
    switch (char) {
      case "e":
        refTile[1]++;
        break;
      case "w":
        refTile[1]--;
        break;
      case "s":
        refTile[0]--;
        if (nextChar === "e") {
          refTile[1] += 0.5;
        } else {
          refTile[1] -= 0.5;
        }
        i++;
        break;
      case "n":
        refTile[0]++;
        if (nextChar === "e") {
          refTile[1] += 0.5;
        } else {
          refTile[1] -= 0.5;
        }
        i++;
        break;
    }
    // console.log(refTile);
  }
  return refTile;
}

class tiles {
  constructor(tileCordinates) {
    const cordinates = JSON.parse(tileCordinates);
    this.cordinates = cordinates;

    const surroundingTiles = this.makeSurrounding();
    this.surroundingTiles = surroundingTiles;
  }
  makeSurrounding() {
    const tileMoves = [
      [1, 0.5],
      [1, -0.5],
      [0, 1],
      [0, -1],
      [-1, 0.5],
      [-1, -0.5],
    ];
    var surrounding = [];
    tileMoves.forEach((move) => {
      var surroundingCodinates = [
        this.cordinates[0] + move[0],
        this.cordinates[1] + move[1],
      ];
      surrounding.push(JSON.stringify(surroundingCodinates));
    });
    return surrounding;
  }
  get returnBlacks() {
    return this.countSurrounding(tileObject);
  }
  countSurrounding(tileObject) {
    var adjBlacks = 0;
    this.surroundingTiles.forEach((key) => {
      if (tileObject[key] === 0) {
        adjBlacks++;
      } else {
        // console.log("white")
      }
    });
    return adjBlacks;
  }
}

function getSurroundingTiles(tileCordinates, tileObject) {
  const tileMoves = [
    [1, 0.5],
    [1, -0.5],
    [0, 1],
    [0, -1],
    [-1, 0.5],
    [-1, -0.5],
  ];
  var numberOfAdjacentBlacks = 0;
  var numberOfAdjacent = 0;
  tileCordinates = JSON.parse(tileCordinates);
  tileMoves.forEach((move) => {
    var testCodinates = [
      tileCordinates[0] + move[0],
      tileCordinates[1] + move[1],
    ];
    if (tileObject[JSON.stringify(testCodinates)] === undefined) {
      return;
    }
    numberOfAdjacent++;
    if (tileObject[JSON.stringify(testCodinates)] === 0) {
      console.log("yes");
      numberOfAdjacentBlacks++;
    }
  });
  return [numberOfAdjacentBlacks, numberOfAdjacent];
}

function tilesToMove(tileCordinates, numberOfAdjacentBlacks, tileObject) {
  const isCurrentlyWhite = tileObject[tileCordinates] === 1;
  if (isCurrentlyWhite && numberOfAdjacentBlacks == 2) {
    return true;
  }
  if (!isCurrentlyWhite && numberOfAdjacentBlacks != 1) {
    return true;
  }
  return false;
}

function numberOfBlacks(tilesObject) {
  var tilesBlack = 0;
  Object.keys(tilesObject).forEach((key) => {
    const blackTile = tilesObject[key] % 2 !== 0;
    if (blackTile) {
      tilesBlack++;
    }
  });
  console.log(tilesBlack);
}

function partOne() {
  data.forEach((ele) => {
    const tileChanged = JSON.stringify(getTileCordinates(ele));
    //   console.log(Object.keys(tilesToChange), tileChanged);
    const alreadyFound = Object.keys(tilesToChange).includes(tileChanged);
    //   console.log(alreadyFound);
    if (alreadyFound) {
      tilesToChange[tileChanged]++;
    } else {
      tilesToChange[tileChanged] = 1;
    }
  });
  numberOfBlacks(tilesToChange);
}

// partOne();
function makeTiles(initialInstructions) {
  var tilesToChange = {};
  initialInstructions.forEach((ele) => {
    const tileChanged = JSON.stringify(getTileCordinates(ele));
    const alreadyFound = Object.keys(tilesToChange).includes(tileChanged);
    //   console.log(alreadyFound);
    if (alreadyFound) {
      return;
    } else {
      tilesToChange[tileChanged] = 0;
    }
  });
  return tilesToChange;
}

function expandTiles(tileObject) {
  var flattened = Object.values(tileObject).flatMap(
    (value) => value.surroundingTiles
  );
  flattened = Array.from(new Set(flattened));
  flattened.forEach((tile) => {
    const inTilesObject = tileObject[tile] !== undefined;
    if (inTilesObject) {
      return;
    }
    tileObject[tile] = new tiles(tile);
  });
  return tileObject;
}

var initialTiles = makeTiles(data);
var newTiles = {};
Object.keys(initialTiles).forEach((key) => {
  newTiles[key] = new tiles(key);
});
newTiles = expandTiles(newTiles);
console.log(Object.keys(newTiles).length);
// console.log(tile1.countSurrounding(initialTiles));
