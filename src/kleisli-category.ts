type Pair<A, B> = [A, B];

const makePair = <A, B>(x: A, y: B): Pair<A, B> => [x, y];

// const negate = (x: boolean): Pair<boolean, string> => makePair(!x, "negate");

/**
 * Moving aggregation of logging out of individual functions.
 * Embellishment,
 */
type Writer<T> = Pair<T, string>;

const toUpper = (x: string): Writer<string> =>
  makePair(x.toUpperCase(), "toUpper");

const toWords = (x: string): Writer<string[]> =>
  makePair(x.split(" "), "toWords");

const process = (x: string) => {
  const p1: Writer<string> = toUpper(x);
  const p2: Writer<string[]> = toWords(x);
  return makePair(p2[0], p1[1] + p2[1]);
};

/**
 * Composed
 */
const composeWriter = <A, B, C>(
  f: (x: A) => Writer<B>,
  g: (y: B) => Writer<C>
) => {
  return (z: A) => {
    const [p1, s1] = f(z);
    const [p2, s2] = g(p1[0]);
    return makePair(p2, s1 + s2);
  };
};

const processComposed = (s: string): Writer<string[]> =>
  composeWriter(toUpper, toWords)(s);

const identity = <A>(x: A): Writer<A> => makePair(x, "");

/**
 * Can be generalized even further to support any monoid, not just the string
 *
 * - using `mappend` in the compose function (in place of the + )
 * - using `mempty` inside identity (in place of the empty string)
 *
 * the only requirement is the monoidal properties
 */

/**
 * Construct the Kleisli category for partial functions (define composition and identity).
 *
 * ANSWER:
 *
 * Given 2 functions f : A -> Optional<B> and g : B -> Optional<C>
 * their composition is defined as (g . f)(x) = Optional<C>
 *
 * where
 *
 * f(x) is computed first
 * if f(x) is valid, g is applied to the return value of f(x)
 * otherwise the result is an invalid optional
 *
 * identity:
 * id_A x = Optional<A>(x)
 */
type Optional<T> = { isValid: false } | { isValid: true; value: T };

const Optional = {
  createInvalid: <T>(): Optional<T> => ({ isValid: false }),
  createValid: <T>(value: T): Optional<T> => ({ isValid: true, value }),
};

const _identity: <T>(_: T) => Optional<T> = Optional.createValid;

const safeRoot = (x: number): Optional<number> =>
  x >= 0 ? Optional.createValid(Math.sqrt(x)) : Optional.createInvalid();

const safeReciprocal = (x: number): Optional<number> =>
  x != 0 ? Optional.createValid(1 / x) : Optional.createInvalid();

const safeRootReciprocal = (x: number): Optional<number> => {
  const res1 = safeRoot(x);

  if (res1.isValid) {
    return safeReciprocal(res1.value);
  }

  return Optional.createInvalid();
};
