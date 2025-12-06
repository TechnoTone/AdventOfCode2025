const { test } = require("@jest/globals");
const { part1, part2 } = require("./day06");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "123 328  51 64 ",
  " 45 64  387 23 ",
  "  6 98  215 314",
  "*   +   *   +  ",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(4277556);
});

test("Part 1", () => {
  const input = new Input(6).fromLines().get();
  expect(part1(input)).toBe(5873191732773);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(3263827);
});

test("Part 2", () => {
  const input = new Input(6).fromLines().get();
  expect(part2(input)).toBe(11386445308378);
});
