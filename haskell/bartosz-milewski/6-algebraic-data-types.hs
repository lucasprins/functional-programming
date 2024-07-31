module AlgebraicDataTypes where

import Data.List (isPrefixOf)

-- namespaces for type and data constructurs are separate so
-- the same name can be used on both sides of the declaration
data Pair a b = Pair a b

f :: Pair String Bool
f = Pair "This statements is" False

g :: (String, Bool)
g = (,) "This statements is" False

-- Records

-- startsWithSymbol :: (String, String, Int) -> Bool
-- startsWithSymbol (name, symbol, _) = symbol `isPrefixOf` name

data Element = Element
  { name :: String,
    symbol :: String,
    atomicNumber :: Int
  }

-- Names of record field serve as functions to retrieve the values.
-- i.e. atomicNumber :: Element -> Int

startsWithSymbol :: Element -> Bool
startsWithSymbol e = (symbol e) `isPrefixOf` (name e)

-- Sum types

-- Think of Either as plus and Void (the unit element) as 0
-- data Either a b = Left a | Right b

data OneOfThree a b c = Sinistral a | Medial b | Dextral c

-- data Maybe a = Nothing | Just a -- a sum of two types

-- List as a recursive sum type
data List a = Nil | Cons a (List a)

maybeTail :: List a -> Maybe (List a)
maybeTail Nil = Nothing
maybeTail (Cons _ t) = Just t

-- Challenges
--
-- 1.1 Show the isomorphism between Maybe a and Either () a
--
-- fromMaybe :: Prelude.Maybe a -> Either () a
-- fromMaybe (Just a) = Right a
-- fromMaybe Nothing = Left ()
--
-- toMaybe :: Either () a -> Maybe a
-- toMaybe (Left ()) = Nothing
-- toMaybe (Right a) = Just a
--
-- fromMaybe (Just a) = Right a
-- toMaybe (Right a) = Just a