const fs = require("fs");
var data = fs.readFileSync("./inputs/07.txt", "utf8").split(/\r\n/);

class Bag {
  constructor(str) {
    const outerBagColor = str.split(" bags ")[0];
    var subs = str.split("contain ")[1];
    // return early if no sub bags
    if (subs.includes("no other bags")) {
      return (this.outerBagColor = outerBagColor);
    }
    var subBags = {};
    subs = subs.split(", ");
    subs.forEach((subBag) => {
      const positionOfFirstSpace = subBag.indexOf(" ");
      const numberOfBags = subBag.slice(0, positionOfFirstSpace);
      const colorOfBags = subBag
        .slice(positionOfFirstSpace + 1)
        .replace(/ bags?.?/, "");
      subBags[colorOfBags] = parseInt(numberOfBags);
    });
    this.outerBagColor = outerBagColor;
    this.subBags = subBags;
  }
}

// Part one
function partOne() {
  var bagDirectory = {};
  var [holdBagDirectly, holdBagIndirectly] = [[], []];

  data.forEach((ele) => {
    const bag = new Bag(ele);
    bagDirectory[bag.outerBagColor] = bag.subBags;
    if (bag.subBags === undefined) {
      return;
    }
    const subBagCheck = bag.subBags;
    Object.keys(subBagCheck).forEach((ele) => {
      if (ele === "shiny gold") {
        holdBagDirectly.push(bag.outerBagColor);
      }
    });
  });

  holdBagDirectly.forEach((ele) => {
    Object.keys(bagDirectory).forEach((val) => {
      if (bagDirectory[val] === undefined) {
        return;
      }
      if (ele in bagDirectory[val]) {
        holdBagIndirectly.push(val);
      }
    });
  });

  var cleanedBagList = Array.from(new Set(holdBagIndirectly));
  var oldListLength = 2;
  var newListLength = 0;

  while (newListLength !== oldListLength) {
    oldListLength = cleanedBagList.length;
    cleanedBagList.forEach((ele) => {
      Object.keys(bagDirectory).forEach((val) => {
        if (bagDirectory[val] === undefined) {
          return;
        }
        if (ele in bagDirectory[val]) {
          holdBagIndirectly.push(val);
        }
      });
    });
    cleanedBagList = Array.from(new Set(holdBagIndirectly));
    newListLength = cleanedBagList.length;
  }
  var bagDirectory = {};
  var [holdBagDirectly, holdBagIndirectly] = [[], []];

  data.forEach((ele) => {
    const bag = new Bag(ele);
    bagDirectory[bag.outerBagColor] = bag.subBags;
    if (bag.subBags === undefined) {
      return;
    }
    const subBagCheck = bag.subBags;
    Object.keys(subBagCheck).forEach((ele) => {
      if (ele === "shiny gold") {
        holdBagDirectly.push(bag.outerBagColor);
      }
    });
  });

  holdBagDirectly.forEach((ele) => {
    Object.keys(bagDirectory).forEach((val) => {
      if (bagDirectory[val] === undefined) {
        return;
      }
      if (ele in bagDirectory[val]) {
        holdBagIndirectly.push(val);
      }
    });
  });

  var cleanedBagList = Array.from(new Set(holdBagIndirectly));
  var oldListLength = 2;
  var newListLength = 0;

  while (newListLength !== oldListLength) {
    oldListLength = cleanedBagList.length;
    cleanedBagList.forEach((ele) => {
      Object.keys(bagDirectory).forEach((val) => {
        if (bagDirectory[val] === undefined) {
          return;
        }
        if (ele in bagDirectory[val]) {
          holdBagIndirectly.push(val);
        }
      });
    });
    cleanedBagList = Array.from(new Set(holdBagIndirectly));
    newListLength = cleanedBagList.length;
  }
  return console.log(cleanedBagList.length + holdBagDirectly.length);
}

function partTwo() {
  // Part two
  var shinyBagHolding = {};
  var bagDirectory = {};
  var [holdBagDirectly, holdBagIndirectly] = [[], []];
  data.forEach((ele) => {
    const bag = new Bag(ele);
    bagDirectory[bag.outerBagColor] = bag.subBags;
    shinyBagHolding[bag.outerBagColor] = 0;
    if (bag.outerBagColor === "shiny gold") {
      holdBagDirectly.push(bag.subBags);
    }
  });

  Object.keys(holdBagDirectly[0]).forEach((ele) => {
    shinyBagHolding[ele] += holdBagDirectly[0][ele];
    if (bagDirectory[ele] === undefined) {
      return;
    }
    for (let i = 0; i < holdBagDirectly[0][ele]; i++) {
      holdBagIndirectly.push(bagDirectory[ele]);
    }
  });

  while (holdBagIndirectly.length > 0) {
    var newBagHolding = [];
    holdBagIndirectly.forEach((ara) => {
      Object.keys(ara).forEach((ele) => {
        shinyBagHolding[ele] += ara[ele];
        if (bagDirectory[ele] === undefined) {
          return;
        }
        for (let i = 0; i < ara[ele]; i++) {
          newBagHolding.push(bagDirectory[ele]);
        }
      });
    });
    holdBagIndirectly = Array.from(newBagHolding);
  }

  const totalBags = Object.values(shinyBagHolding).reduce((a, b) => {
    return a + b;
  });

  return console.log(totalBags);
}

partOne();

partTwo();
