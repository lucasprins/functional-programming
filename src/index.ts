import { compose, id } from "./core";

const add1 = (x: number) => x + 1;
const double = (x: number) => x + x;
const square = (x: number) => x * x;

const add1andDouble = compose(add1, double);

console.log(add1andDouble(5));

const testCompositionRespectsIdentity = () => {
  const values = [0, 1, 2, 3, 4, 5];

  // Check for add1 function
  const composedWithIdentityLeft = compose(id<number>, add1);
  const composedWithIdentityRight = compose(add1, id);

  for (const value of values) {
    const original = add1(value);
    if (composedWithIdentityLeft(value) !== original) {
      console.error(`compose(identity, add1)(${value}) !== add1(${value})`);
    }
    if (composedWithIdentityRight(value) !== original) {
      console.error(`compose(add1, identity)(${value}) !== add1(${value})`);
    }
  }

  // Check for square function
  const composedWithIdentityLeftSquare = compose(id<number>, square);
  const composedWithIdentityRightSquare = compose(square, id);

  for (const value of values) {
    const original = square(value);
    if (composedWithIdentityLeftSquare(value) !== original) {
      console.error(`compose(identity, square)(${value}) !== square(${value})`);
    }
    if (composedWithIdentityRightSquare(value) !== original) {
      console.error(`compose(square, identity)(${value}) !== square(${value})`);
    }
  }

  console.log("All identity composition tests passed.");
};

testCompositionRespectsIdentity();

/**
 * 1. Define a higher-order function (or a function object) memoize in
 * your favorite language. This function takes a pure function f as
 * an argument and returns a function that behaves almost exactly
 * like f, except that it only calls the original function once for every
 * argument, stores the result internally, and subsequently returns
 * this stored result every time it’s called with the same argument.
 *
 * You can tell the memoized function from the original by watching its performance. For instance, try to memoize a function that
 * takes a long time to evaluate. You’ll have to wait for the result
 * the first time you call it, but on subsequent calls, with the same
 * argument, you should get the result immediately
 */
type MemoizedFunction<T extends unknown[], R> = (...args: T) => R;

function memoize<T extends unknown[], R>(
  fn: MemoizedFunction<T, R>
): MemoizedFunction<T, R> {
  const cache = new Map<string, R>();

  return function (...args: T): R {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key) as R;
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  };
}

const memoizeDouble = memoize(double);

const slowFunction = (n: number): number => {
  console.log("Calculating...");
  let result = 0;
  for (let i = 0; i <= n; i++) {
    result += i;
  }
  return result;
};

const memoizedSlowFunction = memoize(slowFunction);

console.log(memoizedSlowFunction(5000000000));
console.log(memoizedSlowFunction(5000000000));

const trueToFalse = (x: true) => false;
const falseToTrue = (x: false) => true;
const trueToTrue = (x: true) => true;
const falseToFalse = (x: false) => false;
