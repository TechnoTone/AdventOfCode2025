const { sum } = require("./utils");

module.exports.part1 = (input) => countSplits(parseInput(input));

module.exports.part2 = (input) => countTimelines(parseInput(input));

const parseInput = (input) => ({
  beam: input[0].indexOf("S"),
  manifold: input
    .slice(1)
    .map(
      (line) =>
        new Set(
          line
            .split("")
            .map((c, ix) => (c === "^" ? ix : -1))
            .filter((v) => v >= 0)
        )
    )
    // Minor optimisation - remove empty rows
    .filter((s) => s.size > 0),
});

const countSplits = ({ beam, manifold }) =>
  manifold.reduce(
    ({ beams, count }, row) => {
      const newBeams = new Set();
      let newCount = count;
      [...beams].forEach((b) => {
        if (row.has(b)) {
          newBeams.add(b - 1);
          newBeams.add(b + 1);
          newCount += 1;
        } else newBeams.add(b);
      });
      return { beams: newBeams, count: newCount };
    },
    { beams: new Set([beam]), count: 0 }
  ).count;

const countTimelines = ({ beam, manifold }) => {
  const finalBeams = manifold.reduce((beams, row) => {
    const newBeams = new Map();
    beams.forEach((beamValue, b) => {
      if (row.has(b)) {
        if (newBeams.has(b - 1))
          newBeams.set(b - 1, newBeams.get(b - 1) + beamValue);
        else newBeams.set(b - 1, beamValue);
        if (newBeams.has(b + 1))
          newBeams.set(b + 1, newBeams.get(b + 1) + beamValue);
        else newBeams.set(b + 1, beamValue);
      } else {
        if (newBeams.has(b)) newBeams.set(b, newBeams.get(b) + beamValue);
        else newBeams.set(b, beamValue);
      }
    });
    return newBeams;
  }, new Map([[beam, 1]]));
  return [...finalBeams.values()].reduce(sum);
};
