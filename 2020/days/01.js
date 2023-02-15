var fs = require("fs");

try {
  var data = fs.readFileSync("./inputs/01.txt", "utf8");
} catch (e) {
  console.log("Error:", e.stack);
}

const numberList = data.split("\r\n").map((str) => parseInt(str));

function twoNumberSolution() {
  for (let i = 0; i < numberList.length; i++) {
    const numberAddsToTarget = 2020 - numberList.at(i);
    const pairInList = numberList.includes(numberAddsToTarget);
    if (pairInList) {
      return console.log(numberAddsToTarget * numberList.at(i));
    }
  }
}

function threeNumberSolution() {
  for (let i = 0; i < numberList.length; i++) {
    const firstNumber = numberList.at(i);
    const numberMaximunToTarget = 2020 - firstNumber;
    var allowableNumbers = numberList
      .slice(i + 1)
      .filter((num) => num <= numberMaximunToTarget);
    for (let j = 0; j < allowableNumbers.length; j++) {
      const secondNumber = allowableNumbers.at(j);
      const thirdNumberNeeded = 2020 - secondNumber - firstNumber;
      const correctTrio = allowableNumbers.includes(thirdNumberNeeded);
      if (correctTrio) {
        return console.log(firstNumber * secondNumber * thirdNumberNeeded);
      }
    }
  }
}

twoNumberSolution();

threeNumberSolution();
