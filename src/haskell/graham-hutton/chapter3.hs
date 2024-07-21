module Chapter3 where

-- A type is a collection of related values
-- For example, the type Bool contains the two logical values False and True
-- The type Bool -> Bool contains all functions that map arguments from Bool to results from Bool
-- we use the notation v :: T to mean that v is a value in type T (and say that v has type T)

not :: () -> Bool
not x = True

first :: (Bool, (Int, Bool)) -> Bool
first (x, (y, z)) = x && z

zeroto :: Int -> [Int]
zeroto n = [0 .. n]

-- Currying (curried functions)
add :: Int -> (Int -> Int)
add x y = x + y

mult :: Int -> (Int -> (Int -> Int))
mult x y z = x * y * z

addOne :: Int -> Int
addOne = add 1

length :: [a] -> Int
length [] = 0
length (x : xs) = 1 + Chapter3.length xs

-- Class constraints
-- A type that contains one or more class constraints is called overloaded
f :: (Num a) => a -> a
f x = x

-- g :: (Eq a) => a -> a

-- Exercises

palindrome :: (Eq a) => [a] -> Bool
palindrome xs = reverse xs == xs

copy :: a -> (a, a)
copy x = (x, x)

apply :: (a -> b) -> a -> b
apply x y = x y

second :: [a] -> a
second xs = head (tail xs)

swap :: (a, b) -> (b, a)
swap (x, y) = (y, x)

dereverse = reverse . reverse

id :: a -> a
id x = x