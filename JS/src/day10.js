const { combinations, memoize, min, sum } = require("./utils");

module.exports.part1 = (input) =>
  input.map(Machine.parseInput).map(configureLights).reduce(sum);

module.exports.part2 = (input) =>
  input.map(Machine.parseInput).map(configureJoltages).reduce(sum);

const configureLights = (machine) => {
  return machine.lightsLookup
    .get(machine.lights.toKey())
    .map(({ presses }) => presses)
    .reduce((a, b) => Math.min(a, b));
};

const configureJoltages = (machine) => {
  const f = memoize((remainingJoltages) => {
    if (remainingJoltages.isZero()) return 0; // Finished

    const results = machine.lightsLookup
      .get(remainingJoltages.toLightsKey()) // Returns array of { presses, joltages }
      ?.filter(({ joltages }) => !joltages.exceeds(remainingJoltages))
      ?.map(({ presses, joltages }) => ({
        presses,
        joltages: remainingJoltages.subtract(joltages),
      }));

    if (results === undefined || results.length === 0) return Infinity; // No eligible moves

    return results
      .map(({ presses, joltages }) => presses + 2 * f(joltages.halved()))
      .reduce(min);
  });

  return f(new Joltages([...machine.joltages.values]));
};

class Machine {
  static parseInput(input) {
    return new Machine(input);
  }

  constructor(input) {
    this.buttons = [];
    input
      .split(" ")
      .map((section) => ({ prefix: section[0], content: section.slice(1, -1) }))
      .forEach(({ prefix, content }) => {
        switch (prefix) {
          case "[":
            this.lights = Lights.parseInput(content);
            break;
          case "(":
            this.buttons.push(Button.parseInput(content));
            break;
          case "{":
            this.joltages = Joltages.parseInput(content);
            break;
          default:
            throw new Error(`Unknown section prefix: ${prefix}`);
        }
      });

    const emptyJoltages = new Joltages(this.joltages.length);
    this.lightsLookup = new Map(); // lightsKey -> [{ presses, joltages }]

    [[], ...combinations(this.buttons)]
      .map((combo) => ({
        presses: combo.length,
        lights: combo
          .reduce((l, b) => l.pressed(b), new Lights(this.lights.length))
          .toKey(),
        joltages: combo.reduce((j, b) => j.pressed(b), emptyJoltages),
      }))
      .toSorted((a, b) => a.presses - b.presses) // fewest presses first
      .forEach(({ presses, lights, joltages }) => {
        if (this.lightsLookup.has(lights)) {
          this.lightsLookup.get(lights).push({ presses, joltages });
        } else {
          this.lightsLookup.set(lights, [{ presses, joltages }]);
        }
      });
  }

  toString() {
    return `Machine: ${this.lights} ${this.buttons.join(" ")} ${this.joltages}`;
  }

  inspect() {
    return this.toString();
  }
}

class Lights {
  static parseInput(input) {
    return new Lights(input.split("").map((s) => s === "#"));
  }

  constructor(options) {
    if (typeof options === "number") {
      this.states = Array(options).fill(false);
      this.length = options;
      return;
    }
    if (typeof options === "object" && Array.isArray(options)) {
      this.states = options;
      this.length = options.length;
      return;
    }
    this.states = [];
    this.length = 0;
  }

  pressed(button) {
    const newLights = new Lights([...this.states]);
    button.values.forEach(
      (ix) => (newLights.states[ix] = !newLights.states[ix])
    );
    return newLights;
  }

  equals(other) {
    if (this.states === undefined)
      throw new Error("This lights object has no states");
    if (other.states === undefined)
      throw new Error("Other lights object has no states");
    if (this.states.length !== other.states.length)
      throw new Error("Lights objects have different lengths");
    return this.states.every((state, i) => state === other.states[i]);
  }

  toKey() {
    return this.states.map((s) => (s ? "#" : ".")).join("");
  }

  toString() {
    return `[${this.states.map((s) => (s ? "#" : ".")).join("")}]`;
  }
  inspect() {
    return this.toString();
  }
}

class Button {
  static parseInput(input) {
    return new Button(input.split(",").map(Number));
  }

  constructor(options) {
    if (typeof options === "object" && Array.isArray(options)) {
      this.values = options;
      return;
    }
  }

  toString() {
    return `(${this.values.join(",")})`;
  }
  inspect() {
    return this.toString();
  }
}

class Joltages {
  static parseInput(input) {
    return new Joltages(input.split(",").map(Number));
  }

  constructor(options) {
    if (typeof options === "number") {
      this.values = Array(options).fill(0);
      this.length = options;
      return;
    }
    if (typeof options === "object" && Array.isArray(options)) {
      this.values = options;
      this.length = options.length;
      return;
    }
    this.values = [];
    this.length = 0;
  }

  equals(other) {
    return this.values.every((value, i) => value === other.values[i]);
  }

  exceeds(other) {
    return this.values.some((value, i) => value > other.values[i]);
  }

  pressed(button) {
    const newJoltages = new Joltages([...this.values]);
    button.values.forEach((ix) => (newJoltages.values[ix] += 1));
    return newJoltages;
  }

  pressedInv(button) {
    const newJoltages = new Joltages([...this.values]);
    button.values.forEach((ix) => (newJoltages.values[ix] -= 1));
    return newJoltages;
  }

  subtract(other) {
    const newJoltages = new Joltages([...this.values]);
    other.values.forEach((v, ix) => (newJoltages.values[ix] -= v));
    return newJoltages;
  }

  halved() {
    return new Joltages(this.values.map((v) => v / 2));
  }

  isZero() {
    return this.values.every((v) => v === 0);
  }

  toLightsKey() {
    return this.values.map((v) => (v % 2 === 0 ? "." : "#")).join("");
  }

  toString() {
    return `{${this.values.join(",")}}`;
  }
  inspect() {
    return this.toString();
  }
}
