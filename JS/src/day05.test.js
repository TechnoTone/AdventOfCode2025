const { test } = require("@jest/globals");
const { part1, part2 } = require("./day05");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "3-5",
  "10-14",
  "16-20",
  "12-18",
  "",
  "1",
  "5",
  "8",
  "11",
  "17",
  "32",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(3);
});

test("Part 1", () => {
  const input = new Input(5).fromLines().get();
  expect(part1(input)).toBe(558);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(14);
});

test("Part 2", () => {
  const input = new Input(5).fromLines().get();
  expect(part2(input)).toBe(344813017450467);
});
