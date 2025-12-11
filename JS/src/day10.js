const { sum } = require("./utils");

module.exports.part1 = (input) =>
  input.map(Machine.parseInput).map(configureLights).reduce(sum);

module.exports.part2 = (input) =>
  input.map(Machine.parseInput).map(configureJoltages).reduce(sum);

const configureLights = (machine) => {
  const stack = [{ lights: new Lights(machine.lights.length), steps: 0 }];
  const configurations = new Set(); //used to avoid repetitions

  while (stack.length > 0) {
    const next = stack.shift();

    if (configurations.has(next.lights.toString())) continue;
    if (machine.lights.equals(next.lights)) return next.steps;

    configurations.add(next.lights.toString());

    machine.buttons.forEach((b) =>
      stack.push({
        lights: next.lights.pressed(b),
        steps: next.steps + 1,
      })
    );
  }

  throw new Error("No solution found");
};

const configureJoltages1 = (machine) => {
  const stack = [{ joltages: new Joltages(machine.joltages.length), steps: 0 }];
  const configurations = new Set(); //used to avoid repetitions

  while (stack.length > 0) {
    const next = stack.shift();

    if (configurations.has(next.joltages.toString())) continue;
    if (next.joltages.exceeds(machine.joltages)) continue;
    if (machine.joltages.equals(next.joltages)) {
      return next.steps;
    }

    configurations.add(next.joltages.toString());

    machine.buttons.forEach((b) =>
      stack.push({
        joltages: next.joltages.pressed(b),
        steps: next.steps + 1,
      })
    );
  }

  throw new Error("No solution found");
};

const configureJoltages = (machine) => {
  const buttons = machine.buttons.toSorted(
    (a, b) => b.values.length - a.values.length
  );
  const stack = [
    {
      pressed: [],
      joltages: new Joltages(machine.joltages.length),
      buttonsRemaining: buttons,
    },
  ];

  while (stack.length > 0) {
    const next = stack.shift();

    if (next.joltages.equals(machine.joltages)) {
      return next.pressed.reduce((total, p) => total + p.presses, 0);
    }

    while (next.buttonsRemaining.length > 0) {
      const button = next.buttonsRemaining.pop();
      let newJoltages = next.joltages.pressed(button);
      let presses = 1;
      while (!newJoltages.exceeds(machine.joltages)) {
        stack.push({
          pressed: [...next.pressed, { button, presses }],
          joltages: newJoltages,
          buttonsRemaining: [...next.buttonsRemaining],
        });
        newJoltages = newJoltages.pressed(button);
        presses += 1;
      }
    }
  }

  throw new Error("No solution found");
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

  toString() {
    return this.states.map((s) => (s ? "#" : ".")).join("");
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
    if (this.values === undefined)
      throw new Error("This joltages object has no values");
    if (other.values === undefined)
      throw new Error("Other joltages object has no values");
    if (this.values.length !== other.values.length)
      throw new Error("Joltages objects have different lengths");
    return this.values.every((value, i) => value === other.values[i]);
  }

  exceeds(other) {
    if (this.values === undefined)
      throw new Error("This joltages object has no values");
    if (other.values === undefined)
      throw new Error("Other joltages object has no values");
    if (this.values.length !== other.values.length)
      throw new Error("Joltages objects have different lengths");
    return this.values.some((value, i) => value > other.values[i]);
  }

  pressed(button) {
    const newJoltages = new Joltages([...this.values]);
    button.values.forEach((ix) => (newJoltages.values[ix] += 1));
    return newJoltages;
  }

  toString() {
    return this.values.join(",");
  }
  inspect() {
    return this.toString();
  }
}
