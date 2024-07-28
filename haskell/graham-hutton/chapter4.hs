module Chapter4 where

-- Defining functions

-- New from old
even :: (Integral a) => a -> Bool
even n = n `mod` 2 == 0

-- Conditional expressions
abs :: Int -> Int
abs n = if n >= 0 then n else -n

-- signum :: Int -> Int
-- signum n = if n < 0 then -1 else if n == 0 then 0 else 1

-- Guarded equations
signum :: Int -> Int
signum n
  | n < 0 = -1
  | n == 0 = 0
  | otherwise = 1

absGuarded :: Int -> Int
absGuarded n
  | n >= 0 = n
  | otherwise = -n

-- pattern matching
not :: Bool -> Bool
not True = False
not False = True

-- pattern matching with multiple arguments
(&&) :: Bool -> Bool -> Bool
True && True = True
_ && _ = False

-- tuple patterns
fst :: (a, b) -> a
fst (x, _) = x

snd :: (a, b) -> b
snd (_, y) = y

-- list patterns
-- test :: [Char] -> Bool
-- test ['a', _, _] = True
-- test _ = False

test :: [Char] -> Bool
test ('a' : _) = True
test _ = False

-- lambda expressions
-- \x -> x + x

add :: Int -> (Int -> Int)
add = \x -> (\y -> x + y)

const :: a -> (b -> a)
const x = (\_ -> x)

odds :: Int -> [Int]
odds n = map (\x -> x * 2 + 1) [0 .. n - 1]

-- operator sections

double :: Int -> Int
double = (* 2)

-- exercises
-- 1

-- 2
-- third :: [a] -> a
-- third (x:xs) = head (tail xs)

-- third :: [a] -> a
-- third xs = xs !! 2

third :: [a] -> a
third (x : y : z : _) = z

-- -- 3
-- safetail :: [a] -> [a]
-- safetail xs = if null xs then xs else tail xs

-- safetail :: [a] -> [a]
-- safetail xs = if null xs then xs else tail xs

-- safetail :: [a] -> [a]
-- safetail xs
--   | null xs = xs
--   | otherwise = tail xs

safetail :: [a] -> [a]
safetail [] = []
safetail (_ : xs) = xs

-- 4

(||) :: Bool -> Bool -> Bool
True || _ = True
_ || True = True
_ || _ = False

-- 5
and1 :: Bool -> Bool -> Bool
and1 x y = if x then if y then True else False else False

-- 6
and2 :: Bool -> Bool -> Bool
and2 a b = if a then b else False

-- 7
-- mult :: Int -> (Int -> (Int -> Int))
-- mult x y z = x * y * z
mult :: Int -> (Int -> (Int -> Int))
mult = (\x -> (\y -> (\z -> x * y * z)))

-- 8
luhnDouble :: Int -> Int
luhnDouble x
  | doubled > 9 = doubled - 9
  | otherwise = doubled
  where
    doubled = x * 2

luhn :: Int -> Int -> Int -> Int -> Bool
luhn d1 d2 d3 d4 = total `mod` 10 == 0
  where
    -- Arrange the digits as per the Luhn algorithm
    digits = [d1, d2, d3, d4]
    -- Double every second digit from the right (cycle applies id or luhnDouble based on the iteration
    -- (cycles through them))
    processedDigits = zipWith ($) (cycle [id, luhnDouble]) (reverse digits)
    -- Calculate the total
    total = sum processedDigits