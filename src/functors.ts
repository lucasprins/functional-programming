import { List } from "immutable";

import { Func } from "./core";

/**
 * Functors
 *
 * object mapping & morphism mapping
 *
 * Haskell:
 * data Maybe a = Nothing | Just a
 * fmap_Maybe :: (a -> b) -> (Maybe a -> Maybe b)
 */

// f :: a -> b becomes F f :: F a -> F b

type Nothing = { kind: "nothing" };
type Just<a> = { kind: "just"; value: a };
type Maybe<a> = Nothing | Just<a>; // <-- parameterized type constructor

const Maybe = {
  nothing: (): Nothing => ({ kind: "nothing" }),
  just: <A>(value: A): Just<A> => ({ kind: "just", value }),
  match: <A, R>(
    m: Maybe<A>,
    onNothing: Func<Nothing, R>,
    onJust: Func<Just<A>, R>
  ): R => (m.kind === "just" ? onJust(m) : onNothing(m)),
};

// f :: a -> b
const isZero = (x: number) => x === 0;

// const isZeroMaybe = (x: Maybe<number>): Maybe<boolean> =>
//   Maybe.match<number, Maybe<boolean>>(
//     x,
//     () => Maybe.nothing(),
//     (just) => Maybe.just(just.value === 0)
//   );

type FMap = <A, B>(f: Func<A, B>) => Func<Maybe<A>, Maybe<B>>;

const fmapMaybe =
  <A, B>(f: Func<A, B>) =>
  (m: Maybe<A>): Maybe<B> =>
    Maybe.match<A, Maybe<B>>(
      m,
      () => Maybe.nothing(),
      (just) => Maybe.just(f(just.value))
    );

const maybeIsZero = fmapMaybe(isZero);

const xyz = maybeIsZero(Maybe.just(5));

console.log(xyz);

const fmapList =
  <A, B>(f: Func<A, B>) =>
  (l: List<A>): List<B> =>
    l.map(f);

const list: List<string> = List.of(...["Lucas Prins", "John Doe"]);

const doctorize = (str: string) => `Dr. ${str}`;

const doctorizeList = fmapList(doctorize);

console.log(doctorizeList(list));

const tail = <A>(l: List<A>) => l.slice(1);

const maybeTail = <A>(l: List<A>): Maybe<List<A>> =>
  l.isEmpty() ? Maybe.nothing() : Maybe.just(l.slice(1));

const emptyList = List();

console.log(maybeTail(list));
console.log(maybeTail(emptyList));

/**
 * Functor composition
 */
const composeFmap = <A, B>(f: Func<A, B>) => fmapMaybe(fmapList(f));

const square = (x: number) => x * x;

const mis: Maybe<List<number>> = Maybe.just(List([1, 2, 3]));
const mis2 = composeFmap(square)(mis);

console.log(mis2.kind === "just" ? mis2.value.map((v) => v) : ""); // Output: { kind: 'just', value: List [ 1, 4, 9 ] }
