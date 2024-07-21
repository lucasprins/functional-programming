module Chapter1 where

import Prelude hiding (head, product, sum)

double :: (Num a) => a -> a
double x = x * 2

sum :: (Num a) => [a] -> a
sum [] = 0
sum (n : ns) = n + sum ns

qsort :: (Ord a) => [a] -> [a]
qsort [] = []
qsort (x : xs) = qsort smaller ++ [x] ++ qsort larger
  where
    smaller = [a | a <- xs, a <= x]
    larger = [b | b <- xs, b > x]

seqn :: [IO a] -> IO [a]
-- seqn :: Monad m => [m a] -> m [a] -- more general monadic definition
seqn [] = return []
seqn (act : acts) = do
  x <- act
  xs <- seqn acts
  return (x : xs)

head :: [a] -> a
head (x : xs) = x

product :: (Num a) => [a] -> a
product [] = 1
product (x : xs) = 1 * x * product xs

qsortReverse :: (Ord a) => [a] -> [a]
qsortReverse [] = []
qsortReverse (x : xs) = qsortReverse larger ++ [x] ++ qsortReverse smaller
  where
    smaller = [a | a <- xs, a <= x]
    larger = [b | b <- xs, b > x]

tail :: (Num a) => [a] -> a
tail (x : xs) = head (reverse xs)