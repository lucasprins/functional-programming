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

/**
 * Acts as a factorizer, applies functions to the contents
 */
const fold = <L, R, T>(
  either: Either<L, R>,
  onLeft: (left: L) => T,
  onRight: (right: R) => T
): T => {
  return isLeft(either) ? onLeft(either.value) : onRight(either.value);
};

const Either = { left, right, fold, isLeft, isRight };

export default Either;

export type { Left, Right };
