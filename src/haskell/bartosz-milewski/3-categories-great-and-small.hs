module BartoszMilewski3 where

import Prelude hiding (Monoid)

class Monoid m where
  mempty :: m
  mappend :: m -> m -> m

instance Monoid String where
  mempty = ""

  -- "Hello " ++ "world!" == (++) "Hello " "world!"
  mappend = (++)
