const { test } = require("@jest/globals");
const { part1, part2 } = require("./day08");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "162,817,812",
  "57,618,57",
  "906,360,560",
  "592,479,940",
  "352,342,300",
  "466,668,158",
  "542,29,236",
  "431,825,988",
  "739,650,466",
  "52,470,668",
  "216,146,977",
  "819,987,18",
  "117,168,530",
  "805,96,715",
  "346,949,466",
  "970,615,88",
  "941,993,340",
  "862,61,35",
  "984,92,344",
  "425,690,689",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT, 10)).toBe(40);
});

test("Part 1", () => {
  const input = new Input(8).fromLines().get();
  expect(part1(input, 1000)).toBe(80446);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(25272);
});

test("Part 2", () => {
  const input = new Input(8).fromLines().get();
  expect(part2(input)).toBe(51294528);
});
