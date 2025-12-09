const { sum } = require("./utils");

module.exports.part1 = (input) => input.map(calculateMaxJoltage(2)).reduce(sum);

module.exports.part2 = (input) =>
  input.map(calculateMaxJoltage(12)).reduce(sum);

const calculateMaxJoltage = (count) => (line) => {
  const batteries = [];
  const bank = line.split("").map(Number);
  const len = line.length;

  let pos = 0;
  while (batteries.length < count) {
    const max = bank
      .slice(pos, len - count + batteries.length + 1)
      .reduce((a, b) => Math.max(a, b), 0);
    batteries.push(max);
    pos = bank.indexOf(max, pos) + 1;
  }

  return Number(batteries.join(""));
};
