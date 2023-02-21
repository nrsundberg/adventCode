import { readFileSync } from "fs";
// const data = readFileSync("./inputs/sample.txt", "utf8").split(/\r\n/);
const data = readFileSync("./inputs/25.txt", "utf8").split(/\r\n/);

class Key {
  constructor(initialVal) {
    const publicKey = parseInt(initialVal);
    const initialSubjectValue = 7;
    this.publicKey = publicKey;
    this.initialSubjectValue = initialSubjectValue;

    var loopSize = this.findLoopSize();
    this.loopSize = loopSize;

    var encryptionKey = undefined;
    this.encryptionKey = encryptionKey;
  }
  findLoopSize() {
    var calculatedLoop = 0;
    var value = 1;
    while (this.publicKey != value) {
      value *= this.initialSubjectValue;
      value = value % 20201227;
      calculatedLoop++;
    }
    return calculatedLoop;
  }
}

function encryptionKey(cardObj, roomObj) {
  const [loopSize, subjectVal] = [cardObj.loopSize, roomObj.publicKey];
  var value = 1;
  for (let i = 0; i < loopSize; i++) {
    value *= subjectVal;
    value = value % 20201227;
  }
  return value;
}

var card = new Key(data[0]);
var room = new Key(data[1]);

console.log(card, room);
console.log(encryptionKey(card, room));
