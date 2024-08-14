import { List } from "immutable";
import { Func } from "../core";

// data constructors
type Nothing = { kind: "nothing" };
type Just<a> = { kind: "just"; value: a };
type Maybe<a> = Nothing | Just<a>; // <-- parameterized type constructor

// type constructors
const nothing = (): Nothing => ({ kind: "nothing" });
const just = <A>(value: A): Just<A> => ({ kind: "just", value });

// type assertions
const isJust = <A>(m: Maybe<A>): m is Just<A> => m.kind === "just";
const isNothing = <A>(m: Maybe<A>): m is Nothing => m.kind === "nothing";

// mappings
const fmap =
  <A, B>(f: Func<A, B>) =>
  (m: Maybe<A>): Maybe<B> =>
    Maybe.match<A, Maybe<B>>(
      () => Maybe.nothing(),
      (just) => Maybe.just(f(fromJust(just)))
    )(m);

// utils
const match =
  <A, R>(onNothing: Func<Nothing, R>, onJust: Func<Just<A>, R>) =>
  (m: Maybe<A>): R =>
    m.kind === "just" ? onJust(m) : onNothing(m);

const fromJust = <A>(j: Just<A>): A => j.value;
const fromMaybe = <A>(x: A, m: Maybe<A>) => (isNothing(m) ? x : fromJust(m));

const listToMaybe = <A>([x]: List<A>) => (!x ? nothing() : just(x));
const maybeToList = <A>(m: Maybe<A>) => (isNothing(m) ? List() : List.of(fromJust(m)));

const catMaybes = <A>(ms: List<Maybe<A>>): List<A> => List(ms.filter(isJust).map(fromJust));

// monad
type MaybeUnit = <A>(value: A) => Just<A>;
const unit: MaybeUnit = just;

type MaybeJoin = <A>(mm: Maybe<Maybe<A>>) => Maybe<A>;
const join: MaybeJoin = (mm) => (isJust(mm) ? mm.value : nothing());

type MaybeBind = <A, B>(m: Maybe<A>, f: Func<A, Maybe<B>>) => Maybe<B>;
const bind: MaybeBind = (m, f) => (isNothing(m) ? nothing() : f(fromJust(m)));

const Maybe = {
  nothing,
  just,
  isJust,
  isNothing,
  fmap,
  match,
  fromJust,
  fromMaybe,
  listToMaybe,
  maybeToList,
  catMaybes,
  unit,
  join,
  bind,
};

export { Maybe };

export type { Nothing, Just };

export type { MaybeUnit, MaybeJoin, MaybeBind };
