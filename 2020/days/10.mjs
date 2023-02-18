import { readFileSync } from "fs";
const data = readFileSync("./inputs/10.txt", "utf8").split(/\r\n/);
var joltValues = data.map((str) => parseInt(str));
// Phone rating
joltValues.push(Math.max(...joltValues) + 3);
// Initial outlet rating
joltValues.push(0);

var differences = {
  1: 0,
  2: 0,
  3: 0,
};

var [outletRating, benders] = [0, []];

function getNextAdapter(listOfAdapters) {
  const nextAdapter = listOfAdapters
    .filter((a) => a - outletRating <= 3)
    .sort((a, b) => a - b);
  if (nextAdapter.length > 1) {
    benders.push(...nextAdapter);
    // console.log(nextAdapter, nextAdapter.length);
  }
  //   console.log(nextAdapter);
  const newListOfAdapters = listOfAdapters.filter(
    (ele) => ele != nextAdapter[0]
  );
  //   console.log(nextAdapter, newListOfAdapters);
  differences[nextAdapter[0] - outletRating] += 1;
  outletRating = nextAdapter[0];
  //   console.log(outletRating);
  return newListOfAdapters;
}

var subList = Array.from(joltValues);

while (subList.length != 0) {
  subList = getNextAdapter(subList);
}

var sortedJolt = joltValues.sort((a, b) => a - b);
const theExtra = Array.from(new Set(benders));

var [unbounded, bounded] = [[], []];
var isBounded = [];

theExtra.forEach((val) => {
  var notCombo =
    sortedJolt.filter((ele) => ele - val <= 2 && ele - val >= 0 && ele !== val)
      .length !== 0 &&
    sortedJolt.filter((ele) => val - ele <= 2 && val - ele >= 0 && ele !== val)
      .length !== 0;
  if (notCombo) {
    isBounded.push(val);
    return;
  }
  //   console.log(val, notCombo);
});

isBounded.forEach((val) => {
  const positionOfVal = isBounded.indexOf(val);
  var unboundedValue =
    isBounded[positionOfVal + 1] - isBounded[positionOfVal - 1] > 2;
  var endOfBoundedRange =
    isBounded[positionOfVal - 2] + 2 == val ||
    isBounded[positionOfVal + 2] - 2 == val;
  if (endOfBoundedRange) {
    return bounded.push(val);
  }
  if (unboundedValue) {
    unbounded.push(val);
  } else {
    bounded.push(val);
  }
});

var [listOfBoundedGroups, listOfUnboundedGroups] = [[], []];

var holdingArray = [];
bounded.forEach((ele) => {
  var numbersNext = bounded.includes(ele + 1);
  //   console.log(numbersNext);
  if (numbersNext) {
    holdingArray.push(ele);
  } else {
    holdingArray.push(ele);
    listOfBoundedGroups.push(holdingArray);
    holdingArray = [];
  }
});

holdingArray = [];
unbounded.forEach((ele) => {
  var numbersNext = unbounded.includes(ele + 1);
  //   console.log(numbersNext);
  if (numbersNext) {
    holdingArray.push(ele);
  } else {
    holdingArray.push(ele);
    listOfUnboundedGroups.push(holdingArray);
    holdingArray = [];
  }
});

var arrayToMultiply = [];

function getCombinations(listOfGroups, unbounded = true) {
  if (unbounded) {
    listOfGroups.forEach((ele) => {
      const lengthOfele = ele.length;
      switch (lengthOfele) {
        case 1:
          arrayToMultiply.push(2);
          break;
        case 2:
          arrayToMultiply.push(4);
          break;
      }
    });
  } else {
    listOfGroups.forEach((ele) => {
      const lengthOfele = ele.length;
      switch (lengthOfele) {
        case 3:
          arrayToMultiply.push(7);
          break;
      }
    });
  }
}
// console.log(listOfBoundedGroups, listOfUnboundedGroups);

// Part one
// console.log(differences["1"] * differences["3"]);

// Part two
getCombinations(listOfBoundedGroups, (unbounded = false));
getCombinations(listOfUnboundedGroups);

console.log(arrayToMultiply.reduce((a, b) => a * b));
