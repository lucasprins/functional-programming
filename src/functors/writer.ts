import { Func } from "../core";
import { Product } from "./product";

type Writer<A> = Product<A, string>;

type WriterReturn = <A>(x: A) => Writer<A>;
const unit: WriterReturn = (x) => Product.unit(x, " ");

type WriterCompose = <A, B, C>(
  f: Func<A, Writer<B>>
) => (g: Func<B, Writer<C>>) => Func<A, Writer<C>>;

const compose: WriterCompose = (f) => (g) => (x) => {
  const [p1, s1] = f(x);
  const [p2, s2] = g(p1);
  return Product.unit(p2, s1 + s2);
};

const Writer = {
  unit,
  compose,
};

export { Writer };
export type { WriterReturn, WriterCompose };
