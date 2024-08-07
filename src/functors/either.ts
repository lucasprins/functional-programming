import { List } from "immutable";

// type constructors
type Left<L> = { tag: "left"; value: L };
type Right<R> = { tag: "right"; value: R };
type Either<L, R> = Left<L> | Right<R>;

// data constructors
const left = <L>(value: L): Left<L> => ({ tag: "left", value });

const right = <R>(value: R): Right<R> => ({ tag: "right", value });

// assertions
const isLeft = <L, R>(e: Either<L, R>): e is Left<L> => e.tag === "left";

const isRight = <L, R>(e: Either<L, R>): e is Right<R> => e.tag === "right";

// Acts as a factorizer, applies functions to the contents
// The fold function (or either in some libraries) is used to extract
// or process the value within an Either by applying one of two functions:
// one for the Left case and one for the Right case. It doesn’t transform the
// Either itself but rather produces a single value based on its contents.
const fold = <L, R, T>(
  either: Either<L, R>,
  onLeft: (left: L) => T,
  onRight: (right: R) => T
): T => {
  return isLeft(either) ? onLeft(either.value) : onRight(either.value);
};

// `Left` values will be ignored
const fmapEither =
  <L, A, B>(f: (a: A) => B) =>
  (e: Either<L, A>): Either<L, B> => {
    return isRight(e) ? right(f(e.value)) : e;
  };

// Additional functions on Either

const extract = <L, R>(e: Either<L, R>): L | R => e.value;

const lefts = <A, B>(es: List<Either<A, B>>): List<A> => es.filter(isLeft).map(extract);

const rights = <A, B>(es: List<Either<A, B>>): List<B> => es.filter(isRight).map(extract);

const Either = { left, right, fold, fmap: fmapEither, isLeft, isRight, extract, lefts, rights };

export default Either;

export type { Left, Right };

// bi-functor

/**
 * The bimap function allows you to apply a different function to the Left and
 * Right values of an Either. It transforms both parts of the Either independently
 * and returns a new Either with the transformed values.
 */
const bimapEither = <L, R, M, N>(e: Either<L, R>, f: (l: L) => M, g: (r: R) => N): Either<M, N> => {
  return isLeft(e) ? left(f(e.value)) : right(g(e.value));
};

const example1: Either<string, number> = right(42);
const example2: Either<string, number> = left("Error");

const result1 = bimapEither(
  example1,
  (err) => `Failed with error: ${err}`,
  (value) => `Succeeded with value: ${value}`
);

const result2 = bimapEither(
  example2,
  (err) => `Failed with error: ${err}`,
  (value) => `Succeeded with value: ${value}`
);

console.log(result1); // Output: { tag: 'right', value: 'Succeeded with value: 42' }
console.log(result2); // Output: { tag: 'left', value: 'Failed with error: Error' }
