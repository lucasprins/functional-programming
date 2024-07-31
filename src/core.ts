export type Func<A, B> = (_: A) => B;

export type Unit = {};

export const Unit = null;

export const id = <T>(x: T) => x;

export const compose =
  <A, B, C>(f: (x: A) => B, g: (y: B) => C) =>
  (x: A) =>
    g(f(x));
