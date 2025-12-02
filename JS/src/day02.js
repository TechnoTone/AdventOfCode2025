const { sum } = require("./utils");

module.exports.part1 = (input) => {
  return parseRanges(input).map(findInvalidIDs(2)).flat().reduce(sum);
};

module.exports.part2 = (input) => {
  return parseRanges(input).map(findInvalidIDs(10)).flat().reduce(sum);
};

const parseRanges = (input) => input.split(",").map(parseRange);
const parseRange = (rangeString) => {
  const parts = rangeString.split("-");
  return {
    start: parts[0],
    end: parts[1],
  };
};

const findInvalidIDs = (maxRepetitions) => (range) => {
  const length = range.start.length;

  if (length !== range.end.length) {
    return [
      findInvalidIDs(maxRepetitions)({
        start: range.start,
        end: "9".repeat(range.start.length),
      }),
      findInvalidIDs(maxRepetitions)({
        start: "1".padEnd(range.end.length, "0"),
        end: range.end,
      }),
    ].flat();
  }

  //Set required as sometimes duplicates can occur with the different chunk sizes
  const results = new Set();

  for (let chunkSize = 1; chunkSize <= length / 2; chunkSize++) {
    if (length % chunkSize > 0) continue;
    if (length / chunkSize > maxRepetitions) continue;

    const repStart = Number(range.start.slice(0, chunkSize));
    const repEnd = Number(range.end.slice(0, chunkSize));
    const repCount = repEnd - repStart + 1;

    const startId = Number(range.start);
    const endId = Number(range.end);

    Array(repCount)
      .fill(0)
      .map((_, ix) => repStart + ix)
      .map((r) => Number("".padEnd(length, r.toString())))
      .filter((id) => id >= Number(startId) && id <= Number(endId))
      .forEach((r) => results.add(r));
  }

  return [...results];
};
