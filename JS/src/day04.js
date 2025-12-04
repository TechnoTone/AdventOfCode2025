module.exports.part1 = (input) => {
  return allRemovable(input).length;
};

module.exports.part2 = (input) => {
  let totalRemoved = 0;

  while (true) {
    const removable = allRemovable(input);
    if (removable.length === 0) break;

    for (const { x, y } of removable) {
      input[y] = input[y].substring(0, x) + "." + input[y].substring(x + 1);
    }
    totalRemoved += removable.length;
  }

  return totalRemoved;
};

const allRemovable = (input) => {
  const width = input[0].length;
  const height = input.length;
  const occupied = (x, y) =>
    x >= 0 && y >= 0 && x < width && y < height && input[y][x] === "@";

  const result = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (
        occupied(x, y) &&
        [
          occupied(x - 1, y - 1),
          occupied(x, y - 1),
          occupied(x + 1, y - 1),
          occupied(x - 1, y),
          occupied(x + 1, y),
          occupied(x - 1, y + 1),
          occupied(x, y + 1),
          occupied(x + 1, y + 1),
        ].filter((c) => c).length < 4
      )
        result.push({ x, y });
    }
  }

  return result;
};
