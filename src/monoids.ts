/**
 * Considering that Bool is a set of two values True and False, show
 * that it forms two (set-theoretical) monoids with respect to, respectively,
 * operator && (AND) and || (OR).
 *
 * CLOSURE: For a set 𝑀 with a binary operation ⋅, if 𝑎 and 𝑏 are elements of 𝑀, then 𝑎 ⋅ 𝑏 is also an element of 𝑀.
 *     -- The result of composing a and b must also be an element of M.
 *
 * ANSWER:
 *
 * Set: True, False
 * Operation: && (AND)
 * Identity: True
 *     -- True && a == a
 *
 * Associativity: (True && True) && False == True && (True && False)                        (Result = FALSE)
 * Closure:
 *     -- True && True = True
 *
 * ------------------------------------------------------------------
 *
 * Set: True, False
 * Operation: || (OR)
 * Identity: False
 *     -- False || a == a
 *
 * Associativity: (False || True) || False == False || (True || False)                      (Result = TRUE)
 */
