import { Product as Pair } from "./products-coproducts";
import type { Func } from "./core";

// type constructors
type Nothing = { kind: "nothing" };
type Just<A> = { kind: "just"; value: A };
type Maybe<A> = Nothing | Just<A>;

// data constructors
const Maybe = {
  Nothing: (): Nothing => ({ kind: "nothing" }),
  Just: <A>(value: A): Just<A> => ({ kind: "just", value }),
  HasValue: <A>(m: Maybe<A>): m is Just<A> => m.kind === "just",
  Match: <A>(
    m: Maybe<A>,
    {
      Just,
      Nothing,
    }: { Just: Func<Just<A>, void>; Nothing: Func<Nothing, void> }
  ) => (m.kind === "just" ? Just(m) : Nothing(m)),
};

const f = (x: Maybe<string>) => {
  if (x.kind === "just") {
    console.log(x.value);
  }
};

type MaybeAsEither<A> = Either<Nothing, Just<A>>;

/**
 * Products can be implemented in TypeScript and Haskell as pairs.
 *
 * Pairs are not commutative. A pair [Int, Bool] can not be subbed for a pair [Bool, Int]
 * even though they carry the same information. They are commutative up to isomorphism.
 * One is the inverse of the other. The isomorphism is the swap function
 */

// isomorphic, running it twice == id
const swap = <A, B>([x, y]: Pair<A, B>): Pair<B, A> => [y, x];

// Combining three types: [A, [B, C]] or [[A, B], C]
// They are different types but the elements are the same
// You can have a function that maps one to the other and a function
// that is the inverse of that. So it is an isomorphism

// If you look as creation products as a binary operation, it looks
// similar to the associativity law
//
// (a * b) * c = a * (b * c)
//
// in case of monoids, they were equal. In this case they are equal
// up to isomorphism

/**
 * The Unit type is the unit of the product in the same way that 1 is
 * the unit of multiplication, 0 is the unit of addition etc.
 *
 * Type: [A, Unit]
 *
 * rho :: (a, ()) -> a
 * rho (x, ()) = x
 *
 * rho_inv :: a -> (a, ())
 * rho_inv x = (x, ())
 */

/**
 * Sum types
 */
const maybeTail = <A>(array: Array<A>): Maybe<Array<A>> => {
  if (array.length === 0) return Maybe.Nothing();
  const [_, ...t] = array;
  return Maybe.Just(t);
};

const process = (array: number[]) => {
  const tail = maybeTail(array);

  Maybe.Match(tail, {
    Just: (m) => {
      console.log(m.value);
    },
    Nothing: () => {
      console.log("nothing");
    },
  });
};

process([]);
process([1]);
process([1, 2]);
process([1, 2, 3]);

// distributive property
// [A, Either<B, C>] == Either<[A, B], [A, C]>

// type constructors
type Left<L> = { tag: "left"; value: L };
type Right<R> = { tag: "right"; value: R };
type Either<L, R> = Left<L> | Right<R>;

// data constructors
const Either = {
  left: <L>(value: L): Left<L> => ({ tag: "left", value }),
  right: <R>(value: R): Right<R> => ({ tag: "right", value }),
  fold: <L, R, T>(
    either: Either<L, R>,
    onLeft: (left: L) => T,
    onRight: (right: R) => T
  ): T => {
    return either.tag === "left" ? onLeft(either.value) : onRight(either.value);
  },
};

// is a natural transformation (structure preserving morphism between functors)
const prodToSum = <A, B, C>(
  p: Pair<A, Either<B, C>>
): Either<Pair<A, B>, Pair<A, C>> => {
  const [x, e] = p;

  return Either.fold<B, C, Either<Pair<A, B>, Pair<A, C>>>(
    e,
    (y) => Either.left([x, y]),
    (z) => Either.right([x, z])
  );
};

/**
 * Challenges
 */

// 6.5.2

type Circle = { type: "circle"; radius: number };
type Rect = { type: "rect"; width: number; height: number };
type Square = { type: "square"; size: number };
type Shape = Circle | Rect | Square;

const Shape = {
  circle: (radius: number): Circle => ({ type: "circle", radius }),
  rect: (width: number, height: number): Rect => ({
    type: "rect",
    width,
    height,
  }),
  match: <R>(
    shape: Shape,
    onCircle: (c: Circle) => R,
    onRect: (r: Rect) => R,
    onSquare: (s: Square) => R
  ): R => {
    return shape.type === "circle"
      ? onCircle(shape)
      : shape.type === "rect"
      ? onRect(shape)
      : onSquare(shape);
  },
};

// const area = (shape: Shape): number =>
//   shape.type === "circle"
//     ? Math.PI * shape.radius * shape.radius
//     : shape.width * shape.height;

const area = (shape: Shape): number =>
  Shape.match<number>(
    shape,
    (circle) => Math.PI * circle.radius * circle.radius,
    (rect) => rect.width * rect.height,
    (square) => square.size * square.size
  );

const circ = (shape: Shape): number =>
  Shape.match<number>(
    shape,
    (c) => 2.0 * Math.PI * c.radius,
    (r) => 2.0 * area(r),
    (s) => 2.0 * area(s)
  );

// interface Shape {
//   area(): number;
// }

// class Circle implements Shape {
//   private radius: number;

//   constructor(radius: number) {
//     this.radius = radius;
//   }

//   // Implement the area method
//   area(): number {
//     return Math.PI * this.radius * this.radius;
//   }
// }

// class Rect implements Shape {
//   private width: number;
//   private height: number;

//   constructor(width: number, height: number) {
//     this.width = width;
//     this.height = height;
//   }

//   area(): number {
//     return this.width * this.height;
//   }
// }
