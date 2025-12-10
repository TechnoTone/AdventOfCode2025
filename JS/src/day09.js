const utils = require("./utils");

module.exports.part1 = (input) =>
  utils
    .combinations(parseCoordinates(input), 2)
    .map(([a, b]) => new Area(a, b).size)
    .reduce((max, size) => Math.max(max, size), 0);

module.exports.part2 = (input) => {
  const coordinates = parseCoordinates(input);
  const edges = getEdges(coordinates);

  return utils
    .combinations(coordinates, 2)
    .map(([a, b]) => new Area(a, b))
    .toSorted((a, b) => b.size - a.size)
    .find((area) => !area.intersects(edges)).size;
};

const parseCoordinates = (input) =>
  input.map((line) => {
    const [x, y] = line.split(",").map((s) => Number(s));
    return new Coordinate(x, y);
  });

const getEdges = (tiles) =>
  tiles.reduce(
    ({ previous, horizontals, verticals }, current) => {
      if (current.y === previous.y) {
        const min = Math.min(current.x, previous.x);
        const max = Math.max(current.x, previous.x);
        horizontals.push({ pos: current.y, min, max });
      }
      if (current.x === previous.x) {
        const min = Math.min(current.y, previous.y);
        const max = Math.max(current.y, previous.y);
        verticals.push({ pos: current.x, min, max });
      }
      return { previous: current, horizontals, verticals };
    },
    { previous: tiles[tiles.length - 1], horizontals: [], verticals: [] }
  );

class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  key() {
    return `${this.x},${this.y}`;
  }
}

class Area {
  constructor(coordinateA, coordinateB) {
    this.top = Math.min(coordinateA.y, coordinateB.y);
    this.bottom = Math.max(coordinateA.y, coordinateB.y);
    this.left = Math.min(coordinateA.x, coordinateB.x);
    this.right = Math.max(coordinateA.x, coordinateB.x);

    this.width = this.right - this.left + 1;
    this.height = this.bottom - this.top + 1;

    this.size = this.width * this.height;
  }

  intersects(edges) {
    return (
      edges.horizontals.some(
        (edge) =>
          edge.pos > this.top &&
          edge.pos < this.bottom &&
          ((edge.min <= this.left && edge.max > this.left) ||
            (edge.min < this.right && edge.max >= this.right))
      ) ||
      edges.verticals.some(
        (edge) =>
          edge.pos > this.left &&
          edge.pos < this.right &&
          ((edge.min <= this.top && edge.max > this.top) ||
            (edge.min < this.bottom && edge.max >= this.bottom))
      )
    );
  }
}
