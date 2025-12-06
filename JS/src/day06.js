module.exports.part1 = (input) =>
  parseLines1(input).reduce((acc, problem) => acc + calculate(problem), 0);

module.exports.part2 = (input) =>
  parseLines2(input).reduce((acc, problem) => acc + calculate(problem), 0);

const parseLines1 = (lines) => {
  const splitLines = lines.map((line) =>
    line.trim().replace(/\s+/g, ",").split(",")
  );
  const problems = splitLines
    .pop()
    .map((op) => ({ numbers: [], operation: op }));
  splitLines.forEach((line) => {
    line.forEach((num, ix) => {
      problems[ix].numbers.push(Number(num));
    });
  });
  return problems;
};

const parseLines2 = (lines) => {
  const problems = [];
  let next = { numbers: [], operation: null };
  const maxLength = lines.reduce((acc, line) => Math.max(acc, line.length), 0);

  for (let i = maxLength - 1; i >= 0; i--) {
    let number = 0;
    lines.forEach((line, ix) => {
      if (ix < lines.length - 1) {
        if (!!line[i] && line[i] !== " ") {
          number = number * 10 + Number(line[i]);
        }
      } else {
        if (number > 0) next.numbers.unshift(number);
        if (!!line[i] && line[i] !== " ") {
          next.operation = line[i];
          problems.unshift(next);
          next = { numbers: [], operation: null };
        }
      }
    });
  }

  return problems;
};

const calculate = (problem) => {
  switch (problem.operation) {
    case "*":
      return problem.numbers.reduce((acc, n) => acc * n, 1);
    case "+":
      return problem.numbers.reduce((acc, n) => acc + n, 0);
    default:
      throw new Error(`Unknown operation: ${problem.operation}`);
  }
};
