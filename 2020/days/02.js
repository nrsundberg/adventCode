var fs = require("fs");

try {
  var data = fs.readFileSync("./inputs/02.txt", "utf8").split("\r\n");
} catch (e) {
  console.log("Error:", e.stack);
}

function partOne() {
  var validPasswordCounter = 0;
  for (let i = 0; i < data.length; i++) {
    var [acceptableRange, charNeeded, password] = data[i].split(" ");
    const [minRange, maxRange] = acceptableRange.split("-");
    const numCharOccurances = [...password.matchAll(charNeeded[0])].length;
    const validPassword =
      numCharOccurances >= parseInt(minRange) &&
      numCharOccurances <= parseInt(maxRange);
    if (validPassword) {
      validPasswordCounter++;
    }
  }
  console.log(validPasswordCounter);
}

function partTwo() {
  var validPasswordCounter = 0;
  for (let i = 0; i < data.length; i++) {
    var [acceptableRange, charNeeded, password] = data[i].split(" ");
    const [firstIndex, secondIndex] = acceptableRange.split("-");
    const firstPosition = password.at(firstIndex - 1) === charNeeded[0];
    const secondPosition = password.at(secondIndex - 1) === charNeeded[0];
    if (firstPosition + secondPosition === 1) {
      validPasswordCounter++;
    }
  }
  console.log(validPasswordCounter);
}

// partOne()
partTwo();
