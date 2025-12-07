const { test } = require("@jest/globals");
const { part1, part2 } = require("./day07");
const Input = require("./input");
const EXAMPLE_INPUT = [
  ".......S.......",
  "...............",
  ".......^.......",
  "...............",
  "......^.^......",
  "...............",
  ".....^.^.^.....",
  "...............",
  "....^.^...^....",
  "...............",
  "...^.^...^.^...",
  "...............",
  "..^...^.....^..",
  "...............",
  ".^.^.^.^.^...^.",
  "...............",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(21);
});

test("Part 1", () => {
  const input = new Input(7).fromLines().get();
  expect(part1(input)).toBe(1539);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(40);
});

test("Part 2", () => {
  const input = new Input(7).fromLines().get();
  expect(part2(input)).toBe(6479180385864);
});
