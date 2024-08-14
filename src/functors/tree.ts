// type constructors
type Leaf<A> = { type: "leaf"; value: A };
type Node<A> = { type: "node"; left: Tree<A>; right: Tree<A> };
type Tree<A> = Leaf<A> | Node<A>;

// data constructors
const leaf = <A>(value: A): Leaf<A> => ({ type: "leaf", value });
const node = <A>(left: Tree<A>, right: Tree<A>): Node<A> => ({ type: "node", left, right });

// type assertions
const isLeaf = <A>(t: Tree<A>): t is Leaf<A> => t.type === "leaf";
const isNode = <A>(t: Tree<A>): t is Node<A> => t.type === "node";

// mappings
const fmap = <A, B>(t: Tree<A>, f: (_: A) => B): Tree<B> =>
  isLeaf(t) ? leaf(f(t.value)) : node(fmap(t.left, f), fmap(t.right, f));

const Tree = { leaf, node, isLeaf, isNode, fmap };

export { Tree };
export type { Leaf, Node };
