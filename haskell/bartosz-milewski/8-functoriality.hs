{-# LANGUAGE DeriveFunctor #-}

module Functoriality where

class Bifunctor f where
  bimap :: (a -> c) -> (b -> d) -> f a b -> f c d
  bimap g h = first g . second h
  first :: (a -> c) -> f a b -> f c b
  first g = bimap g id
  second :: (b -> d) -> f a b -> f a d
  second = bimap id

newtype Identity a = Identity a

instance Functor Identity where
  fmap :: (a -> b) -> Identity a -> Identity b
  fmap f (Identity x) = Identity (f x)

newtype BiComp bf fu gu a b = BiComp (bf (fu a) (gu b))

instance (Bifunctor bf, Functor fu, Functor gu) => Bifunctor (BiComp bf fu gu) where bimap f1 f2 (BiComp x) = BiComp ((bimap (fmap f1) (fmap f2)) x)

data Maybe a = Nothing | Just a deriving (Functor)

data Tree a = Leaf a | Node (Tree a) (Tree a) deriving (Functor)

-- instance Functor Tree where
--   fmap f (Leaf a) = Leaf (f a)
--   fmap f (Node t t') = Node (fmap f t) (fmap f t')