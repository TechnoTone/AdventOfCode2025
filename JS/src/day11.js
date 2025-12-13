const { sum, memoize } = require("./utils");

module.exports.part1 = (input) => {
  const devices = parseInputs(input);
  return countPathsToOut(devices, "you");
};

module.exports.part2 = (input) => {
  const devices = parseInputs(input);
  const result = countPathsToOut2(devices, "svr");
  return result;
};

const parseInputs = (input) =>
  input.reduce((devices, line) => {
    const [name, connections] = line.split(":").map((s) => s.trim());
    devices.set(name, connections.split(" "));
    return devices;
  }, new Map());

const countPathsToOut = (devices, start) => {
  if (start === "out") return 1;
  return devices
    .get(start)
    .map((device) => countPathsToOut(devices, device))
    .reduce(sum);
};

countPathsToOut2 = (devices, start) => {
  const memoizedCount = memoize((current, dac, fft) => {
    if (current === "out") return dac && fft ? 1 : 0;

    if (current === "dac") dac = true;
    if (current === "fft") fft = true;

    return devices
      .get(current)
      .map((next) => memoizedCount(next, dac, fft))
      .reduce(sum);
  });
  return memoizedCount(start, false, false);
};
