const { sum } = require("./utils");

module.exports.part1 = (input) => {
  const { shapes, regions } = parseInput(input);
  const validityCheck = regions.map(isValid(shapes));
  return validityCheck.filter((v) => v).length;
};

module.exports.part2 = (input) => {};

const parseInput = (input) => {
  const shapes = [];
  const regions = [];

  let currentShape = null;

  input.forEach((line) => {
    if (line.length === 2) {
      currentShape = [];
    }
    if (line.length === 3) {
      currentShape.push(line);
    }
    if (line.length === 0) {
      shapes.push(currentShape);
    }
    if (line.length > 4) {
      const [size, presents] = line.split(": ");
      const [width, height] = size.split("x").map(Number);
      const presentList = presents.split(" ").map(Number);
      regions.push({ width, height, presentList });
    }
  });

  return { shapes, regions };
};

const isValid = (shapes) => (region) => {
  if (
    region.presentList.reduce(sum) <=
    Math.floor(region.width / 3) * Math.floor(region.height / 3)
  ) {
    // Presents fit easily
    return true;
  }

  if (
    region.presentList.reduce(
      (total, quantity, ix) =>
        total + shapes[ix].join("").replaceAll(".", "").length * quantity,
      0
    ) >
    region.width * region.height
  )
    return false;

  throw new Error(
    "Not implemented - but only the example input needs this so 🤷"
  );
};
