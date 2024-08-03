module Functors where

-- Equality

data Point = Pt Float Float

instance Eq Point where
  (==) :: Point -> Point -> Bool
  (Pt x y) == (Pt x' y') = x == x' && y == y'

class Functor f where
  fmap :: (a -> b) -> f a -> f b

instance Functors.Functor Maybe where
  fmap _ Nothing = Nothing
  fmap f (Just x) = Just (f x)