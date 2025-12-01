module.exports.part1 = (input) => {};

module.exports.part2 = (input) => {};

function parseInput(input) {
  return input.reduce(
    (acc, line) => {
      const [a, b] = line.split(/\s+/).map(Number);
      acc[0].push(a);
      acc[1].push(b);
      return acc;
    },
    [[], []]
  );
}
