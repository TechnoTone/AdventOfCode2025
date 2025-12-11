const { test } = require("@jest/globals");
const { part1, part2 } = require("./day10");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}",
  "[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}",
  "[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(7);
});

test("Part 1", () => {
  const input = new Input(10).fromLines().get();
  expect(part1(input)).toBe(532);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(33);
});

test("Part 2", () => {
  const input = new Input(10).fromLines().get();
  expect(part2(input)).toBe(0);
});

// (3,6,8)             000100101
// (1,2,3,4,5,6,7)     011111110
// (5,6)               000001100
// (0,1,3,4)           110110000
// (1,2,3,4,5,7,8)     011111011
// (0,1,3,4,8)         110110001
// (0,1,2,3,4,5,7,8)   111111011
// (0,2,4,5,6,8)       101011101
// (4,8)               000010001

// { 37, 50, 37, 52, 77, 41, 26, 26, 54 }
