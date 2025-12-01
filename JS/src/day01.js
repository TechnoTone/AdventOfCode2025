module.exports.part1 = (input) => {
  let position = 50;
  let count = 0;
  input.forEach((element) => {
    const [direction, distance] = parseInput(element);
    if (direction === "L") {
      position -= distance;
    } else {
      position += distance;
    }
    position = (position + 100) % 100;
    if (position === 0) count++;
  });

  return count;
};

module.exports.part2 = (input) => {
  let position = 50;
  let count = 0;
  let log = "";
  input.forEach((instruction) => {
    const [direction, distance] = parseInput(instruction);
    if (direction === "L") {
      if (position === 0) position += 100;
      position -= distance;
      while (position < 0) {
        position += 100;
        count++;
      }
      if (position === 0) count++;
    } else {
      position += distance;
      while (position > 99) {
        position -= 100;
        count++;
      }
    }
    log += `${instruction}, ${position}, ${count}\n`;
  });

  console.log(log);
  return count;
};

function parseInput(input) {
  return [input.slice(0, 1), Number(input.slice(1))];
}
