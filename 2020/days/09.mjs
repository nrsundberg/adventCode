// read data from file
import { readFileSync } from "fs";
const data = readFileSync("./inputs/09.txt", "utf8").split(/\r\n/);

var numberPreamble = data.map((str) => parseInt(str)); // Mutate data to be integers

function getValidNumbers(lengthOfLookback, currentNumberList, currentIndex) {
  // sample is 5 and part one is 25
  lengthOfLookback = parseInt(lengthOfLookback);
  // subset array of numbers to all possible numbers that can be pairs
  const PairNumberSlice = currentNumberList.slice(
    currentIndex - lengthOfLookback,
    currentIndex
  );
  return PairNumberSlice;
}

function getValidPairs(validNumberList) {
  var pairs = [];
  for (let i = 0; i < validNumberList.length - 1; i++) {
    var smallPairs = [];
    const pairAddList = validNumberList.slice(i + 1);
    for (let j = 0; j < pairAddList.length; j++) {
      const pairValue = validNumberList[i] + pairAddList[j];
      smallPairs.push(pairValue);
    }
    pairs.push(...smallPairs);
  }
  return pairs;
}

function validateNextNumber(numberToCheck, pairList) {
  return pairList.includes(numberToCheck);
}

const lookback = 25;

function compareNumbers(a, b) {
  return a - b;
}

for (let ind = lookback; ind < numberPreamble.length - lookback; ind++) {
  const newNumset = getValidNumbers(lookback, numberPreamble, ind);
  const pairSubList = getValidPairs(newNumset);
  const checker = validateNextNumber(numberPreamble[ind], pairSubList);
  // console.log(newNumset, "\r\n", pairSubList, "\r\n", checker);
  if (!checker) {
    console.log(numberPreamble[ind]);
    // console.log(pairSubList.sort(compareNumbers));
    break;
  }
}

// Part one
const targetNumber = 21806024;
var [summedContiguous, sumArray, startingIndex] = [0, [], 0];

while (summedContiguous !== targetNumber) {
  summedContiguous = 0;
  sumArray = [];
  const subPreamble = numberPreamble.slice(startingIndex);
  for (let i = 0; i < subPreamble.length; i++) {
    summedContiguous += subPreamble[i];
    sumArray.push(subPreamble[i]);
    if (summedContiguous >= targetNumber) {
      startingIndex += 1;
      break;
    }
  }
}
console.log(Math.min(...sumArray) + Math.max(...sumArray));
