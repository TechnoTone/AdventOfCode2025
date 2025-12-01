module.exports.ignoreErrors = function (fn) {
  return function () {
    try {
      return fn.apply(this, arguments);
    } catch {}
  };
};

module.exports.sum = (a, b) => a + b;
module.exports.product = (a, b) => a * b;
module.exports.min = (a, b) => Math.min(a, b);

/**
 * Repeats a given function a specified number of times.
 *
 * @param {number} times - The number of times to repeat the function.
 * @param {Function} fn - The function to be repeated.
 */
module.exports.repeat = (times, fn) => {
  for (let i = 0; i < times; i++) {
    fn();
  }
};

/**
 * Memoizes a function by caching its results.
 * The arguments are serialized to JSON to be used as keys in the cache.
 *
 * WARNING - Non-primitive arguments will be serialized to the same
 * values so be careful when using them as arguments.
 *
 * @param {Function} fn - The function to be memoized
 * @returns {Function} - A memoized version of the function
 */
module.exports.memoize = (fn) => {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);

    const result = fn.apply(this, args);
    cache.set(key, result);

    return result;
  };
};

/**
 *
 * @param {*} R Current clique (or empty set)
 * @param {*} P Remaining vertices to consider
 * @param {*} X Vertices already considered
 * @param {*} graph Adjacency list representation of the graph
 * @returns
 */
module.exports.bronKerbosch = (R, P, X, graph) => {
  let cliques = new Set();
  if (P.size === 0 && X.size === 0) {
    cliques.add(new Set(R));
  }
  for (let v of P) {
    let newR = new Set(R);
    newR.add(v);
    let newP = new Set([...P].filter((x) => graph.get(v).has(x)));
    let newX = new Set([...X].filter((x) => graph.get(v).has(x)));
    cliques = new Set([
      ...cliques,
      ...this.bronKerbosch(newR, newP, newX, graph),
    ]);
    P.delete(v);
    X.add(v);
  }
  return cliques;
};

module.exports.combinations = (array) =>
  array.flatMap((a, i) => array.slice(i + 1).map((b) => [a, b]));
