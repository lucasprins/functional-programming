///
/// Product
///

type Func<A, B> = (_: A) => B;

type Product<A, B> = [A, B]; // Pair<A, B>

/**
 * @param p1 - projection
 * @param p2 - projection
 */
type Factorizer = <C, A, B>(
  p1: (_: C) => A,
  p2: (_: C) => B
) => (_: C) => Product<A, B>;

/**
 * A (higher order) function that produces the factorizing function m from
 * two candidates is sometimes called the factorizer
 */
const factorize: Factorizer = (p1, p2) => (c) => [p1(c), p2(c)];

const Product = {
  factorize,
};

///
/// Product Usage
///

type Order = {
  items: { name: string; price: number; quantity: number }[];
};

type OrderSummary = Product<number, number>;

const getTotalPrice = (order: Order) =>
  order.items.reduce((total, item) => total + item.price * item.quantity, 0);

const getTotalItems = (order: Order) =>
  order.items.reduce((total, item) => total + item.quantity, 0);

const order = {
  items: [
    { name: "Laptop", price: 1000, quantity: 1 },
    { name: "Mouse", price: 50, quantity: 2 },
    { name: "Keyboard", price: 100, quantity: 1 },
  ],
};

const getOrderSummary: Func<Order, OrderSummary> = Product.factorize(
  getTotalPrice,
  getTotalItems
);

console.log(getOrderSummary(order));

///
/// Coproduct
///
/// Can be implemented in typescript using discriminated unions (tagged unions/variants). In Haskell
/// coproducts are implemented as the data type called `Either` (a SUM type)

// type Coproduct<A, B> = { tag: "left"; value: A } | { tag: "right"; value: B };

// type CoproductFactorizer = <C, A, B>(
//   i: (_: A) => C,
//   j: (_: B) => C
// ) => (_: Coproduct<A, B>) => C;

type Either<A, B> = { tag: "left"; value: A } | { tag: "right"; value: B };

/**
 * @param i - injection
 * @param j - injection
 */
type EitherFactorizer = <Left, Right, Result>(
  i: (a: Left) => Result,
  j: (b: Right) => Result
) => (either: Either<Left, Right>) => Result;

const factorizeEither: EitherFactorizer = (i, j) => (either) =>
  either.tag === "left" ? i(either.value) : j(either.value);

const Either = {
  match: factorizeEither,
};

///
/// Coproduct Usage
///
type UserData = { username: string; token: string };
type ErrorMessage = { message: string };

type LoginResult = Either<UserData, ErrorMessage>;

const handleSuccess = (user: UserData) => {
  return `Welcome, ${user.username}! Your token is ${user.token}.`;
};

const handleFailure = (error: ErrorMessage) => {
  return `Login failed: ${error.message}`;
};

const handleLoginResult = Either.match(handleSuccess, handleFailure);

const successfulLogin: LoginResult = {
  tag: "left",
  value: { username: "john_doe", token: "abc123" },
};
const failedLogin: LoginResult = {
  tag: "right",
  value: { message: "Invalid credentials" },
};

console.log(handleLoginResult(successfulLogin));
console.log(handleLoginResult(failedLogin));

export { Product, Either };
