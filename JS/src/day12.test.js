const { test } = require("@jest/globals");
const { part1, part2 } = require("./day12");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "0:",
  "###",
  "##.",
  "##.",
  "",
  "1:",
  "###",
  "##.",
  ".##",
  "",
  "2:",
  ".##",
  "###",
  "##.",
  "",
  "3:",
  "##.",
  "###",
  "##.",
  "",
  "4:",
  "###",
  "#..",
  "###",
  "",
  "5:",
  "###",
  ".#.",
  "###",
  "",
  "4x4: 0 0 0 0 2 0",
  "12x5: 1 0 1 0 2 2",
  "12x5: 1 0 1 0 3 2",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(2);
});

test("Part 1", () => {
  const input = new Input(12).fromLines().get();
  expect(part1(input)).toBe(528);
});

test.skip("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(0);
});

test.skip("Part 2", () => {
  const input = new Input(12).fromLines().get();
  expect(part2(input)).toBe(0);
});
