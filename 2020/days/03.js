const fs = require("fs");
var data = fs.readFileSync("./inputs/03.txt", "utf8").split("\r\n");

function findAllTrees(treePattern) {
  var trees = {};
  for (let i = 0; i < treePattern.length; i++) {
    const treeMatches = [...treePattern[i].matchAll("#")];
    var indexes = [];
    treeMatches.forEach((match) => {
      indexes.push(match.index);
    });
    trees[i] = indexes;
  }
  return trees;
}

function treeChecker(trees, paths, originalTreePattern) {
  const treeRowWidth = originalTreePattern[0].length;
  const treeTotalRows = originalTreePattern.length;
  treesTouchedArray = [];
  paths.forEach((path) => {
    const numberOfMovesNeeded = treeTotalRows / path[1];
    var cordinates = [0, 0];
    var numberOfTreesTouched = 0;
    for (let i = 1; i < numberOfMovesNeeded; i++) {
      cordinates = [cordinates[0] + path[0], cordinates[1] + path[1]];
      const lateralPosition = cordinates[0] % treeRowWidth;
      const treeInSpot = trees[cordinates[1]].includes(lateralPosition);
      if (treeInSpot) {
        numberOfTreesTouched++;
      }
    }
    treesTouchedArray.push(numberOfTreesTouched);
  });
  const treesMultiplied = treesTouchedArray.reduce((a, b) => a * b, 1);
  return treesMultiplied;
}
const trees = findAllTrees(data);

// part one
// const numberOfTreesTouched = treeChecker(trees, [3, 1], data);

// part two
const pathList = new Array([1, 1], [3, 1], [5, 1], [7, 1], [1, 2]);
const numberOfTreesTouched = treeChecker(trees, pathList, data);

console.log(numberOfTreesTouched);
