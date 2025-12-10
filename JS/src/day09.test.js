const { test } = require("@jest/globals");
const { part1, part2 } = require("./day09");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "7,1",
  "11,1",
  "11,7",
  "9,7",
  "9,5",
  "2,5",
  "2,3",
  "7,3",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(50);
});

test("Part 1", () => {
  const input = new Input(9).fromLines().get();
  expect(part1(input)).toBe(4746238001);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(24);
});

test("Part 2", () => {
  const input = new Input(9).fromLines().get();
  expect(part2(input)).toBe(1552139370);
});
