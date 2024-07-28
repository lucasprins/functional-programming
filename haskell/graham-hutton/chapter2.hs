module Chapter2 where

import Prelude hiding (length, reverse, sum)

length :: (Num a) => [a] -> a
length [] = 0
length (x : xs) = 1 + length xs

sum :: (Num a) => [a] -> a
sum [] = 0
sum (x : xs) = x + sum xs

append :: [a] -> [a] -> [a]
append x y = x ++ y

reverse :: [a] -> [a]
reverse [] = []
reverse (x : xs) = reverse xs ++ [x]

n :: Int
n = a `div` length xs
  where
    a = 10
    xs = [1, 2, 3, 4, 5]

last :: [a] -> a
last xs = head (reverse xs)

init :: [a] -> [a]
init [] = []
init xs = reverse (tail (reverse xs))

-- When you get to the last element in the recursion you will have an array with
-- one element which will give you the empty array back
init1 :: [a] -> [a]
init1 [x] = []
init1 (x : xs) = x : init1 xs
