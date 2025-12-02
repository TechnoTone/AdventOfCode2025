const { test } = require("@jest/globals");
const { part1, part2 } = require("./day02");
const Input = require("./input");
const EXAMPLE_INPUT =
  "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(1227775554);
});

test("Part 1", () => {
  const input = new Input(2).get();
  expect(part1(input)).toBe(12586854255);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(4174379265);
});

test("Part 2", () => {
  const input = new Input(2).get();
  expect(part2(input)).toBe(17298174201);
});
