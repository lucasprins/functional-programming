module BartoszMilewski1 where

import Data.Void

id :: a -> a -- type definition
id x = x -- function definition, the body of a function is always an expression

-- names of concrete types start with a capital letter ( Bool )
-- names of type variables start with a lower case letter ( a )

safeDivide :: Double -> Double -> Maybe Double
safeDivide _ 0 = Nothing
safeDivide x y = Just (x / y)

example1 :: Maybe Int
example1 = (+ 1) <$> Just 5

f :: Bool -> Bool
f = undefined

fact :: (Num a, Enum a) => a -> a
fact n = product [1 .. n]

-- pure functions: functions without side effects that produce the same result given the same input

absurd :: Void -> a
absurd = undefined

-- () is known as unit
-- singleton set: () -- type, constructor and value all use the () symbol corresponding to the singleton set
f44 :: () -> Int
f44 () = 44

fInt :: Integer -> ()
fInt _ = ()

-- parametrically polymorphic: function that can be implemented with the same formula for any type
unit :: a -> ()
unit _ = ()

-- Functions to Bool are called predicates.