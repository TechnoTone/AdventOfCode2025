module.exports.part1 = (input) => {
  const { ranges, ingredients } = parse(input);
  return ingredients.filter(inRanges(ranges)).length;
};

module.exports.part2 = (input) => {
  const { ranges } = parse(input);
  return coalesceRanges(ranges).reduce(totalRangeSizes, 0);
};

const parse = (input) => {
  const ranges = [];
  const ingredients = [];
  input.forEach((line) => {
    if (line.includes("-")) {
      const [min, max] = line.split("-").map(Number);
      ranges.push({ min, max });
    } else if (line !== "") {
      ingredients.push(Number(line));
    }
  });
  return { ranges, ingredients };
};

const inRanges = (ranges) => (ingredient) =>
  ranges.some(({ min, max }) => min <= ingredient && ingredient <= max);

const coalesceRanges = (ranges) => {
  const queue = [...ranges];
  const nonOverlappingRanges = [];
  nonOverlappingRanges.push(queue.shift()); // seed with first range
  while (queue.length > 0) {
    const next = queue.shift();
    let overlappingOccurred = false;
    for (const old of nonOverlappingRanges) {
      if (next.min > old.max || next.max < old.min) {
        // no overlap
        continue;
      }
      if (next.min >= old.min && next.max <= old.max) {
        // range is entirely contained within existing range so it can be ignored
        overlappingOccurred = true;
        break;
      }
      if (next.min < old.min && next.max > old.max) {
        // range completely overlaps existing range so we need both ends
        queue.push({ min: next.min, max: old.min - 1 });
        queue.push({ min: old.max + 1, max: next.max });
        overlappingOccurred = true;
        break;
      }
      if (next.min < old.min && old.min <= next.max) {
        // range overlaps start of existing range so we just need the start of it
        queue.push({ min: next.min, max: old.min - 1 });
        overlappingOccurred = true;
        break;
      }
      if (next.min <= old.max && old.max < next.max) {
        // range overlaps end of existing range so we just need the end of it
        queue.push({ min: old.max + 1, max: next.max });
        overlappingOccurred = true;
        break;
      }
    }
    if (!overlappingOccurred) {
      nonOverlappingRanges.push(next);
    }
  }

  return nonOverlappingRanges;
};

const totalRangeSizes = (acc, { min, max }) => acc + (max - min + 1);
