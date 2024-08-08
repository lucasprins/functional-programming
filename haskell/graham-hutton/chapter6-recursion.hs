module Recursion where

-- fac :: Int -> Int
-- fac n = product [1 .. n]

fac :: Int -> Int
fac 0 = 1 -- base case
fac n
  | n < 0 = n * fac (n + 1)
  | otherwise = n * fac (n - 1)

length :: [a] -> Int
length [] = 0
length (_ : xs) = 1 + Recursion.length xs

reverse :: [a] -> [a]
reverse [] = []
reverse (x : xs) = Recursion.reverse xs ++ [x]

insert :: (Ord a) => a -> [a] -> [a]
insert x [] = [x]
insert x (y : ys)
  | x <= y = x : y : ys
  | otherwise = y : insert x ys

isort :: (Ord a) => [a] -> [a]
isort [] = []
isort (x : xs) = insert x (isort xs)

-- multiple arguments
zip :: [a] -> [b] -> [(a, b)]
zip [] _ = []
zip _ [] = []
zip (x : xs) (y : ys) = (x, y) : Recursion.zip xs ys

drop :: Int -> [a] -> [a]
drop 0 xs = xs
drop _ [] = []
drop n (_ : xs) = Recursion.drop (n - 1) xs

-- multiple recursion
fib :: Int -> Int
fib 0 = 0
fib 1 = 1
fib n = fib (n - 2) + fib (n - 1)

-- mutual recursion
even :: Int -> Bool
even 0 = True
even n = Recursion.odd (n - 1)

odd :: Int -> Bool
odd 0 = False
odd n = Recursion.even (n - 1)

evens :: [a] -> [a]
evens [] = []
evens (x : xs) = x : odds xs

odds :: [a] -> [a]
odds [] = []
odds (_ : xs) = evens xs

product :: (Num a) => [a] -> a
-- product xs = foldr (*) 1 xs
product = foldr (*) 1

init :: [a] -> [a]
init [_] = []
init (x : xs) = x : Recursion.init xs

sumdown :: Int -> Int
sumdown 0 = 0
sumdown n = n + sumdown (n - 1)

-- (*) :: Int -> Int -> Int
-- m * 0 = 0
-- m * n = m + (m Recursion.* (n - 1))

(^) :: Int -> Int -> Int
m ^ 0 = 1
m ^ n = m * (m Recursion.^ (n - 1))

merge :: (Ord a) => [a] -> [a] -> [a]
merge [] ys = ys
merge xs [] = xs
merge (x : xs) (y : ys)
  | x < y = x : merge xs (y : ys)
  | otherwise = y : merge (x : xs) ys

halve :: [a] -> ([a], [a])
halve xs = splitAt (Prelude.length xs `div` 2) xs

msort :: (Ord a) => [a] -> [a]
msort [] = []
msort [x] = [x]
msort xs = merge (msort left) (msort right)
  where
    (left, right) = halve xs

-- 9

sum :: (Num a) => [a] -> a
-- sum [] = 0
-- sum (x : xs) = x + Recursion.sum xs
sum = foldr (+) 0

take :: Int -> [a] -> [a]
take 0 xs = []
take _ [] = []
take n (x : xs) = x : Recursion.take (n - 1) xs

last :: [a] -> a
last [x] = x
last (x : xs) = Recursion.last xs

and :: [Bool] -> Bool
and [] = True
and [x] = x
and (x : xs) = x && Recursion.and xs