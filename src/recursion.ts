const reverse = <T>([x, ...xs]: T[]) => (xs.length === 0 ? [x] : [...reverse(xs), x]);

console.log(reverse([1, 2, 3]));
