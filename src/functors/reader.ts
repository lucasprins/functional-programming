type Reader<R, A> = (r: R) => A;

const map = <R, A, B>(reader: Reader<R, A>, f: (a: A) => B): Reader<R, B> => {
  return (r: R) => f(reader(r));
};

const of = <R, A>(a: A): Reader<R, A> => {
  return (_: R) => a;
};

const flatMap = <R, A, B>(reader: Reader<R, A>, f: (a: A) => Reader<R, B>): Reader<R, B> => {
  return (r: R) => f(reader(r))(r);
};

const ask = <R>(): Reader<R, R> => {
  return (r: R) => r;
};

const asks = <R, A>(f: (r: R) => A): Reader<R, A> => {
  return (r: R) => f(r);
};

const run = <R, A>(reader: Reader<R, A>, env: R): A => {
  return reader(env);
};

const Reader = {
  map,
  of,
  flatMap,
  ask,
  asks,
  run,
};

export { Reader };

/**
 * Usage
 */
type Env = { value: number };

// A Reader that doubles the `value` in the environment.
const doubleValue: Reader<Env, number> = map(ask<Env>(), (env) => env.value * 2);

// A Reader that adds 5 to the doubled value.
const addFive: Reader<Env, number> = flatMap(doubleValue, (doubled) => of(doubled + 5));

// Running the Reader with an environment
const env = { value: 10 };
const result = run(addFive, env);

console.log(result); // Output: 25
