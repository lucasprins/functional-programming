import { add } from "./utils";

const first = add(add(1, 2), 3);
const second = add(1, add(2, 3));

const isAssociative = first === second;
console.log("isAssociative", isAssociative);
