const fs = require("fs");

var data = fs.readFileSync("./inputs/04.txt", "utf8");

data = data.split(/\r?\ns*\r?\n/);

class Passport {
  constructor(str) {
    const strSplit = str.replaceAll(/\r\n/g, " ").split(" ");
    const information = {
      byr: [],
      iyr: [],
      eyr: [],
      hgt: [],
      hcl: [],
      ecl: [],
      pid: [],
      cid: [],
    };
    strSplit.forEach((str) => {
      const [identifier, value] = str.split(":");
      information[identifier] = value;
    });
    const informationWithoutOptional = (({ cid, ...object }) => object)(
      information
    );
    const allPresent = Object.values(informationWithoutOptional).every(
      function (str) {
        return str.length > 0;
      }
    );
    const allValid = [];
    Object.entries(informationWithoutOptional).forEach((ele) => {
      var valueFromPassport = ele[1];
      if (typeof valueFromPassport !== "string") {
        return allValid.push(false);
      }
      switch (ele[0]) {
        case "byr":
          var lengthOfNumber = valueFromPassport.length;
          valueFromPassport = parseInt(valueFromPassport);
          allValid.push(
            valueFromPassport >= 1920 &&
              valueFromPassport <= 2002 &&
              lengthOfNumber === 4
          );
          break;

        case "iyr":
          var lengthOfNumber = valueFromPassport.length;
          valueFromPassport = parseInt(valueFromPassport);
          allValid.push(
            valueFromPassport >= 2010 &&
              valueFromPassport <= 2020 &&
              lengthOfNumber === 4
          );
          break;

        case "eyr":
          var lengthOfNumber = valueFromPassport.length;
          valueFromPassport = parseInt(valueFromPassport);
          allValid.push(
            valueFromPassport >= 2020 &&
              valueFromPassport <= 2030 &&
              lengthOfNumber === 4
          );
          break;

        case "hgt":
          const inches = valueFromPassport.includes("in");
          const height = parseInt(
            valueFromPassport.split(inches ? "in" : "cm")[0]
          );
          allValid.push(
            height >= (inches ? 59 : 150) && height <= (inches ? 76 : 193)
          );
          break;

        case "hcl":
          const secondHalf = valueFromPassport.slice(1);
          allValid.push(
            valueFromPassport[0] === "#" &&
              [...secondHalf.matchAll(/[a-f0-9]/g)].length === 6 &&
              secondHalf.length === 6
          );
          break;

        case "ecl":
          const acceptableColors = [
            "amb",
            "blu",
            "brn",
            "gry",
            "grn",
            "hzl",
            "oth",
          ];
          allValid.push(acceptableColors.includes(valueFromPassport));
          break;

        case "pid":
          allValid.push(
            [...valueFromPassport.matchAll(/[0-9]/g)].length === 9 &&
              valueFromPassport.length === 9
          );
          break;
      }
    });
    this.information = information;
    this.informationWithoutOptional = informationWithoutOptional;
    this.allPresent = allPresent;
    this.allValid = allValid.every((ele) => ele === true);
  }
}

var validPassports = 0;
for (let i = 0; i < data.length; i++) {
  var passport = new Passport(data[i]);
  // part one
  //   if (passport.allPresent) {
  // validPassports++;
  //   }
  // part two
  if (passport.allValid) {
    validPassports++;
  }
}
console.log(validPassports);
