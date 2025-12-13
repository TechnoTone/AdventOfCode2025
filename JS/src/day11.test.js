const { test } = require("@jest/globals");
const { part1, part2 } = require("./day11");
const Input = require("./input");
const EXAMPLE_INPUT_1 = [
  "aaa: you hhh",
  "you: bbb ccc",
  "bbb: ddd eee",
  "ccc: ddd eee fff",
  "ddd: ggg",
  "eee: out",
  "fff: out",
  "ggg: out",
  "hhh: ccc fff iii",
  "iii: out",
];
const EXAMPLE_INPUT_2 = [
  "svr: aaa bbb",
  "aaa: fft",
  "fft: ccc",
  "bbb: tty",
  "tty: ccc",
  "ccc: ddd eee",
  "ddd: hub",
  "hub: fff",
  "eee: dac",
  "dac: fff",
  "fff: ggg hhh",
  "ggg: out",
  "hhh: out",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT_1)).toBe(5);
});

test("Part 1", () => {
  const input = new Input(11).fromLines().get();
  expect(part1(input)).toBe(708);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT_2)).toBe(2);
});

test("Part 2", () => {
  const input = new Input(11).fromLines().get();
  expect(part2(input)).toBe(545394698933400);
});
