const fs = require("fs");

var data = fs.readFileSync("./inputs/06.txt", "utf8").split(/\r?\ns*\r?\n/);

// Part one
var cleanedData = [];
data.forEach((group) =>
  cleanedData.push(new Set(group.replaceAll("\r\n", "")))
);

var totalDeclarations = 0;
cleanedData.forEach((group) => {
  totalDeclarations += Array.from(group).length;
});

console.log(totalDeclarations);

// Part two
var matchingDeclaration = 0;
data.forEach((group) => {
  const numberOfGroupMembers = (group.match(/\r\n/g) || []).length + 1;
  const cleanedGroup = new Set(group.replaceAll("\r\n", ""));
  Array.from(cleanedGroup).forEach((char) => {
    const regexToUse = new RegExp(char, "g");
    var numOccurance = (group.match(regexToUse) || []).length;
    const matchesGroupNumber = numOccurance === numberOfGroupMembers;
    if (matchesGroupNumber) {
      matchingDeclaration++;
    }
  });
});

console.log(matchingDeclaration);
