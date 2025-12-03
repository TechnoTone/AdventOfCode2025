const { test } = require("@jest/globals");
const { part1, part2 } = require("./day03");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "987654321111111",
  "811111111111119",
  "234234234234278",
  "818181911112111",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(357);
});

test("Part 1", () => {
  const input = new Input(3).fromLines().get();
  expect(part1(input)).toBe(17493);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(3121910778619);
});

test("Part 2", () => {
  const input = new Input(3).fromLines().get();
  expect(part2(input)).toBe(173685428989126);
});
