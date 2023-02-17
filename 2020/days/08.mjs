import { readFileSync } from "fs";
var data = readFileSync("./inputs/08.txt", "utf8").split(/\r\n/);

var accumulator = 0;

function nextInstruction(instructionList, oldIndex, instructionModifier) {
  const modifiedIndex = oldIndex + instructionModifier;
  return [instructionList[modifiedIndex], modifiedIndex];
}

function dealWithInstruction(dataLine, index) {
  const [instruction, value] = dataLine.split(" ");
  switch (instruction) {
    case "acc":
      accumulator += parseInt(value);
      var [newInstruction, newIndex] = nextInstruction(data, index, 1);
      break;
    case "jmp":
      var [newInstruction, newIndex] = nextInstruction(
        data,
        index,
        parseInt(value)
      );
      break;
    case "nop":
      var [newInstruction, newIndex] = nextInstruction(data, index, 1);
      break;
  }
  return [newInstruction, newIndex];
}

// Part one
function partOne() {
  var indexesVisited = [];
  var [newInstruction, newIndex] = [data[0], 0];
  while (!indexesVisited.includes(newIndex)) {
    indexesVisited.push(newIndex);
    var [newInstruction, newIndex] = dealWithInstruction(
      newInstruction,
      newIndex
    );
  }
}
// partOne();
// console.log(accumulator);
var indexesTried = Array();
var hasNotChanged = false;
var indexesVisited = [];

function dealWithInstructionMod(dataLine, index) {
  var [instruction, value] = dataLine.split(" ");

  switch (instruction) {
    case "acc":
      accumulator += parseInt(value);
      var [newInstruction, newIndex] = nextInstruction(data, index, 1);
      break;

    case "jmp":
      if (hasNotChanged && !indexesTried.includes(index)) {
        value = 1;
        hasNotChanged = false;
        indexesTried.push(index);
        console.log(66);
      }
      var [newInstruction, newIndex] = nextInstruction(
        data,
        index,
        parseInt(value)
      );
      break;

    case "nop":
      // console.log(12);
      if (hasNotChanged && !indexesTried.includes(index)) {
        hasNotChanged = false;
        indexesTried.push(index);
        console.log(88);
      } else {
        value = 1;
      }
      var [newInstruction, newIndex] = nextInstruction(
        data,
        index,
        parseInt(value)
      );
      // console.log(value);
      break;
  }
  return [newInstruction, newIndex];
}

function loopThroughInstructions(newInstruction, newIndex) {
  // console.log(indexesVisited);
  while (newIndex < data.length && !indexesVisited.includes(newIndex)) {
    indexesVisited.push(newIndex);
    var [newInstruction, newIndex] = dealWithInstructionMod(
      newInstruction,
      newIndex
    );
  }
  return newIndex;
}

function partTwo() {
  accumulator = 0;
  var [newInstruction, newIndex] = [data[0], 0];
  while (newIndex !== data.length) {
    [newInstruction, newIndex] = [data[0], 0];
    indexesVisited = [];
    hasNotChanged = true;
    // console.log(newIndex, data.length);
    newIndex = loopThroughInstructions(newInstruction, newIndex);
  }
  // console.log(accumulator);
}

partTwo();
console.log(indexesTried);
console.log(indexesVisited);
var accumulator = 0;
indexesVisited.forEach((ind) => {
  const [instruction, value] = data[ind].split(" ");
  if (instruction == "acc") {
    accumulator += parseInt(value);
  }
});
console.log(accumulator);
// 265 too low
