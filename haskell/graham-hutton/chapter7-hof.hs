module HOF where

import Data.Char
import Data.List

add :: Int -> (Int -> Int)
add = \x -> (\y -> x + y)

twice :: (a -> a) -> a -> a
twice f x = f (f x)

map :: (a -> b) -> [a] -> [b]
map f xs = [f x | x <- xs]

map' :: (a -> b) -> [a] -> [b]
map' f = foldr (\x xs -> f x : xs) []

filter :: (a -> Bool) -> [a] -> [a]
filter p xs = [x | x <- xs, p x]

filter' :: (a -> Bool) -> [a] -> [a]
filter' p = foldr (\x xs -> if p x then x : xs else xs) []

-- sumsqreven :: [Int] -> Int
-- sumsqreven ns = Prelude.sum (HOF.map (^ 2) (HOF.filter even ns))

-- sum :: [Int] -> Int
-- sum = foldr (+) 0

length :: [a] -> Int
length = foldr (\_ n -> 1 + n) 0

sum :: (Num a) => [a] -> a
sum = foldl (+) 0

-- (.) :: (b -> c) -> (a -> b) -> (a -> c)
-- f . g = \x -> f (g x)

sumsqreven :: [Int] -> Int
sumsqreven = Prelude.sum . Prelude.map (^ 2) . Prelude.filter even

compose :: [a -> a] -> (a -> a)
compose = foldr (.) id

type Bit = Int

-- bin2int :: [Bit] -> Int
-- bin2int bits = Prelude.sum [w * b | (w, b) <- zip weights bits]
--   where
--     weights = iterate (* 2) 1

bin2int :: [Bit] -> Int
bin2int = foldr (\x y -> x + 2 * y) 0

int2bin :: Int -> [Bit]
int2bin 0 = []
int2bin n = n `mod` 2 : int2bin (n `div` 2)

make8 :: [Bit] -> [Bit]
make8 bits = take 8 (bits ++ repeat 0)

encode :: String -> [Bit]
encode = concat . Prelude.map (make8 . int2bin . ord)

chop8 :: [Bit] -> [[Bit]]
chop8 [] = []
chop8 bits = take 8 bits : chop8 (drop 8 bits)

decode :: [Bit] -> String
decode = Prelude.map (chr . bin2int) . chop8

transmit :: String -> String
transmit = decode . channel . encode

channel :: [Bit] -> [Bit]
channel = id

-- Voting
votes :: [String]
votes = ["Red", "Blue", "Green", "Blue", "Blue", "Red"]

count :: (Eq a) => a -> [a] -> Int
count x = Prelude.length . Prelude.filter (== x)

rmdups :: (Eq a) => [a] -> [a]
rmdups [] = []
rmdups (x : xs) = x : Prelude.filter (/= x) (rmdups xs)

result :: (Ord a) => [a] -> [(Int, a)]
result vs = sort [(count v vs, v) | v <- rmdups vs]

winner :: (Ord a) => [a] -> a
winner = snd . last . result

all :: (a -> Bool) -> [a] -> Bool
all f xs = Prelude.length [x | x <- xs, f x] == Prelude.length xs