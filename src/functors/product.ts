import { Func } from "../core";

type Product<A, B> = [A, B];

type ProductReturn = <A, B>(x: A, y: B) => Product<A, B>;
const unit: ProductReturn = (x, y) => [x, y];

type ProductBimap = <A, B, C, D>(
  [x, y]: Product<A, B>,
  f: Func<A, C>,
  g: Func<B, D>
) => Product<C, D>;

const bimap: ProductBimap = ([x, y], f, g) => [f(x), g(y)];

const Product = {
  unit,
  bimap,
};

export { Product };
export type { ProductBimap };
