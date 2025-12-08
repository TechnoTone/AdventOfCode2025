const utils = require("./utils");

module.exports.part1 = (input, maxConnections) => {
  const boxes = parseBoxes(input);
  const pairs = closestPairs(utils.combinations(boxes, 2));
  const { circuits } = connect(pairs, { maxConnections });
  return circuits
    .toSorted((a, b) => b.size - a.size)
    .slice(0, 3)
    .map((c) => c.size)
    .reduce(utils.product);
};

module.exports.part2 = (input) => {
  const boxes = parseBoxes(input);
  const pairs = closestPairs(utils.combinations(boxes, 2));
  const { lastPair } = connect(pairs, { totalBoxes: boxes.length });
  return lastPair.a.x * lastPair.b.x;
};

class Box {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  inspect() {
    return `Box(${this.x},${this.y},${this.z})`;
  }
}

const parseBoxes = (input) => input.map(parseBox);
const parseBox = (line) => {
  const [x, y, z] = line.split(",").map(Number);
  return new Box(x, y, z);
};

const closestPairs = (pairs) =>
  pairs
    .map(([a, b]) => ({ distance: distance(a, b), a, b }))
    .sort((a, b) => a.distance - b.distance);

const distance = (a, b) => {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  const dz = Math.abs(a.z - b.z);
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

const connect = (pairs, { maxConnections, totalBoxes }) => {
  const circuits = [];
  let connections = 0;
  let lastPair = null;

  while (
    (maxConnections && connections < maxConnections) ||
    (totalBoxes && circuits[0]?.size !== totalBoxes)
  ) {
    lastPair = pairs.shift();
    if (!lastPair) break;
    connections++;

    const circuitA = circuits.find((circuit) => circuit.has(lastPair.a));
    const circuitB = circuits.find((circuit) => circuit.has(lastPair.b));

    if (circuitA === undefined && circuitB === undefined) {
      // Neither box is in a circuit, create a new one
      circuits.push(new Set([lastPair.a, lastPair.b]));
    } else if (circuitA !== undefined && circuitB !== undefined) {
      if (circuitA === circuitB) {
        // Both boxes are already in the same circuit, skip
        continue;
      } else {
        // Boxes are in two different circuits, merge them
        for (let box of circuitB) {
          circuitA.add(box);
        }
        circuits.splice(circuits.indexOf(circuitB), 1);
      }
    } else if (circuitA !== undefined) {
      // Box A is in a circuit, add Box B
      circuitA.add(lastPair.b);
    } else if (circuitB !== undefined) {
      // Box B is in a circuit, add Box A
      circuitB.add(lastPair.a);
    }
  }
  return { circuits, lastPair };
};
