import { readFileSync } from "fs";
import { clearScreenDown } from "readline";

class tile {
  constructor(tileInput) {
    const [tileId, tileSpots] = [
      tileInput.split(/\r\n/)[0].replace(":", "").split(" ")[1],
      tileInput.split(/\r\n/).slice(1),
    ];
    var edgeMatches = {
      left: undefined,
      right: undefined,
      top: undefined,
      bottom: undefined,
    };
    this.tileId = tileId;
    this.tileSpots = tileSpots;
    this.edgeMatches = edgeMatches;

    this.edges = this.findEdges();
  }

  findEdges() {
    const height = this.tileSpots.length;
    const width = this.tileSpots[0].length;
    var edges = {
      left: [],
      right: [],
      top: [],
      bottom: [],
    };
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < height; j++) {
        const tileVal = this.tileSpots[j][i * (width - 1)];
        if (tileVal === "#") {
          if (i === 0) {
            edges.left.push(j);
          } else {
            edges.right.push(j);
          }
        }
      }
    }
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < width; j++) {
        const tileVal = this.tileSpots[i * (height - 1)][j];
        if (tileVal === "#") {
          if (i === 0) {
            edges.top.push(j);
          } else {
            edges.bottom.push(j);
          }
        }
      }
    }
    return edges;
  }
}

function createTilesObject(sample = true) {
  var data = [];
  if (sample) {
    data = readFileSync("./inputs/sample.txt", "utf-8").split(/\r\n\r\n/);
  } else {
    data = readFileSync("./inputs/20.txt", "utf-8").split(/\r\n\r\n/);
  }
  var tiles = {};
  data.forEach((tileStr, index) => {
    tiles[index] = new tile(tileStr);
  });
  return tiles;
}

function findPairs(tileObject, lengthOfEdge = 9) {
  var flattened = Object.values(tileObject).flatMap((value) => [
    value.tileId,
    value.edges,
  ]);
  for (let i = 0; i < flattened.length; i += 2) {
    const currentTileId = i / 2;
    const currentEdges = flattened[i + 1];
    // console.log(currentEdges);
    var matchLoop = Array.from(flattened);
    matchLoop.splice(i, 2);
    for (let topKey in currentEdges) {
      // for (topKey in currentEdges) {
      const currentEdgeStr = JSON.stringify(currentEdges[topKey]);
      // console.log(currentEdgeStr, currentTileId, topKey);
      // console.log(currentTileId, secKey);
      var foundEdgeMatch = false;
      for (let ind = 0; ind < matchLoop.length; ind += 2) {
        if (foundEdgeMatch) {
          break;
        }
        const compareEdges = matchLoop[ind + 1];
        for (let innerKey in compareEdges) {
          // for (innerKey in compareEdges) {
          const compareEdgesStr = JSON.stringify(compareEdges[innerKey]);

          const matchedEdgeTogether = compareEdgesStr === currentEdgeStr;

          if (matchedEdgeTogether) {
            tileObject[currentTileId].edgeMatches[topKey] = matchLoop[ind];
            foundEdgeMatch = true;
            break;
          }

          const reverseEdge = compareEdges[innerKey]
            .map((val) => lengthOfEdge - val)
            .sort((a, b) => a - b);

          // if not match then 9 - index for reversed string
          const reversedMatch = JSON.stringify(reverseEdge) === currentEdgeStr;
          // if (currentTileId === 8 && innerKey === "right") {
          //   console.log(reverseEdge, currentEdgeStr);
          // }
          if (reversedMatch) {
            tileObject[currentTileId].edgeMatches[topKey] = matchLoop[ind];
            foundEdgeMatch = true;
            break;
          }
        }
      }
    }
  }
  return tileObject;
}

function cornerTiles(tileObject, multiply = true) {
  var flattened = Object.values(tileObject).flatMap((value) => [
    value.tileId,
    value.edgeMatches,
  ]);
  var corners = 1;
  var cornerTiles = [];
  for (let i = 0; i < flattened.length; i += 2) {
    const isCorner =
      Object.values(flattened[i + 1]).filter((val) => val === undefined)
        .length === 2;
    if (isCorner) {
      corners *= parseInt(flattened[i]);
      cornerTiles.push(flattened[i]);
    }
  }
  if (multiply) {
    return corners;
  }
  return cornerTiles;
}

// part one
{
  // create tiles and get edge index
  var tiles = createTilesObject(false);
  // find edgePairs
  const newTiles = findPairs(tiles);
  console.log(newTiles);
  // multiply corner tileIds
  const cornerVal = cornerTiles(newTiles, true);
  console.log(cornerVal);
}

// Part two -- didn't finish -- puzzle rotation...
{
  var tiles = createTilesObject(true);
  const newTiles = findPairs(tiles);
  const cornerTileIds = cornerTiles(newTiles, false);
  class board {
    constructor(tileObject, cornerPieces) {
      this.tileObject = tileObject;
      this.cornerPieces = cornerPieces;
      // const corners = this.cornerConstruction();
      this.edges = this.edgeFinder();
      this.edging = this.edgeContructor();
    }
    edgeFinder() {
      var flattened = Object.values(this.tileObject).flatMap((value) => [
        value.tileId,
        value.edgeMatches,
      ]);
      // console.log(flattened.length);
      var edgeTiles = [];
      for (let i = 0; i < flattened.length; i += 2) {
        const isEdge =
          Object.values(flattened[i + 1]).filter((val) => val !== undefined)
            .length === 3;
        if (isEdge) {
          edgeTiles.push(flattened[i]);
        }
      }
      return edgeTiles;
    }
    findTile(tileIdNumber) {
      const correctPiece = Object.fromEntries(
        Object.entries(this.tileObject).filter(
          ([key, value]) => value.tileId === tileIdNumber
        )
      );
      return correctPiece;
    }

    edgeContructor() {
      var boardPieces = {
        0: [],
        1: [],
        2: [],
        3: [],
      };
      Object.values(this.edges).forEach((edgePiece, index) => {
        const tilePiece = this.findTile(edgePiece);
        const checkMatches = Object.values(tilePiece)[0].edgeMatches;
        boardPieces[index].push(edgePiece);
        Object.values(checkMatches).forEach((val) => {
          const touchingEdge = Object.values(this.edges).includes(val);
          if (touchingEdge) {
            boardPieces[index].push(val);
          }
        });
      });
      this.cornerPieces.forEach((val) => {
        const tilePiece = this.findTile(val);
        Object.values(Object.values(tilePiece)[0].edgeMatches);
      });
      return boardPieces;
    }
  }
  // console.log(newTiles);
  const test = new board(newTiles, cornerTileIds);
  console.log(test);
}
