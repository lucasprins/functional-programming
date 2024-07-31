-- List comprehensions

module Chapter5 where

import Data.Char

{-
  List comprehension notation is quite similar to set notation;

  Set: { (a, b ) | a ∈ A, b ∈ B }
  Haskell: [(a, b) | a < A, b <- B]
-}
myZip :: [a] -> [b] -> [(a, b)]
myZip a' b' = [(a, b) | a <- a', b <- b']

{-
    BASICS
-}
-- [x^2 | x <- [1..5]] (generator)

-- |    =   such that
-- <-   =   is drawn from

-- multiple generators
-- [(x ^ 2, y * 2) | x <- [1 .. 5], y <- [1 .. 5]]
-- later generators are more deeply nested and thus change the values of their
-- variables more frequently

-- take every list and for every list take every element and only those elements are used
concat :: [[a]] -> [a]
concat xss = [x | xs <- xss, x <- xs]

-- using wildcard patterm
firsts :: [(a, b)] -> [a]
firsts ps = [x | (x, _) <- ps]

-- using the generator just as a counter
length :: [a] -> Int
length xs = sum [1 | _ <- xs]

{-
    GUARDS
-}

-- evenTillN :: Int -> [Int]
-- evenTillN n = [x | x <- [0 .. n], x `mod` 2 == 0]
evenTillN :: Int -> [Int]
evenTillN n = [x | x <- [0 .. n - 1], even x]

factors :: Int -> [Int]
factors n = [x | x <- [1 .. n - 1], mod n x == 0]

prime :: Int -> Bool
prime n = factors n == [1, n]

primes :: Int -> [Int]
primes n = [x | x <- [2 .. n], prime x]

find :: (Eq a) => a -> [(a, b)] -> [b]
find k t = [v | (k', v) <- t, k == k']

{-
    ZIP
-}

-- pairs [1,2,3,4]
-- [(1,2),(2,3),(3,4)]
pairs :: [a] -> [(a, a)]
pairs xs = zip xs (tail xs)

-- sorted [1,2,3,4] = True
-- sorted [1,2,4,3] = False
sorted :: (Ord a) => [a] -> Bool
sorted xs = and [x <= y | (x, y) <- pairs xs]

positions :: (Eq a) => a -> [a] -> [Int]
positions x xs = [i | (x', i) <- zip xs [0 ..], x == x']

{-
    String comprehensions
-}
lowers :: String -> Int
lowers s = Prelude.length [x | x <- s, x >= 'a' && x <= 'z']

count :: Char -> String -> Int
count x s = Prelude.length [x' | x' <- s, x == x']

{-
    CAESAR CIPHER
-}
let2int :: Char -> Int
let2int c = ord c - ord 'a'

int2let :: Int -> Char
int2let n = chr (ord 'a' + n)

shift :: Int -> Char -> Char
shift n c
  | isLower c = int2let ((let2int c + n) `mod` 26)
  | otherwise = c

encode :: Int -> String -> String
encode n xs = [shift n x | x <- xs]

table :: [Float]
table =
  [ 8.1,
    1.5,
    2.8,
    4.2,
    12.7,
    2.2,
    2.0,
    6.1,
    7.0,
    0.2,
    0.8,
    4.0,
    2.4,
    6.7,
    7.5,
    1.9,
    0.1,
    6.0,
    6.3,
    9.0,
    2.8,
    1.0,
    2.4,
    0.2,
    2.0,
    0.1
  ]

percent :: Int -> Int -> Float
percent n m = (fromIntegral n / fromIntegral m) * 100

freqs :: String -> [Float]
freqs xs = [percent (count x xs) n | x <- ['a' .. 'z']]
  where
    n = lowers xs

chisqr :: [Float] -> [Float] -> Float
chisqr os es = sum [((o - e) ^ 2) / e | (o, e) <- zip os es]

rotate :: Int -> [a] -> [a]
rotate n xs = drop n xs ++ take n xs

crack :: String -> String
crack xs = encode (-factor) xs
  where
    factor = head (positions (minimum chitab) chitab)
    chitab = [chisqr (rotate n table') table | n <- [0 .. 25]]
    table' = freqs xs

-- Exercises

-- 1
sumSquare :: Int -> Int
sumSquare _ = sum [x ^ 2 | x <- [1 .. 100]]

grid :: Int -> Int -> [(Int, Int)]
grid m n = [(x, y) | x <- [0 .. m], y <- [0 .. n]]

square :: Int -> [(Int, Int)]
square n = [(x, y) | (x, y) <- grid n n, x /= y]

replicate :: Int -> a -> [a]
replicate x y = [y | _ <- [0 .. x - 1]]

pyths :: Int -> [(Int, Int, Int)]
pyths n =
  [ (x, y, z)
    | x <- [1 .. n],
      y <- [1 .. n],
      z <- [1 .. n],
      x ^ 2 + y ^ 2 == z ^ 2
  ]

perfects :: Int -> [Int]
perfects n = [x | x <- [1 .. n], x == sum (factors x)]

test :: Int -> [(Int, Int)]
test b = Prelude.concat [[(x, y) | y <- [3, 4]] | x <- [1, 2]]

positions2 :: (Eq a) => a -> [a] -> [Int]
positions2 x xs = find x (zip xs [0 ..])

scalarproduct :: [Int] -> [Int] -> Int
scalarproduct xs ys = sum [x * y | (x, y) <- zip xs ys]