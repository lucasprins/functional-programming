export const id = <T>(x: T) => x;

export const unit = () => {};

export const compose =
  <A, B, C>(f: (x: A) => B, g: (y: B) => C) =>
  (x: A) =>
    g(f(x));
