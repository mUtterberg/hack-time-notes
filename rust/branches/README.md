# Branches

> Rust has 3 kinds of loops: `loop`, `while`, and `for`.
> ([Chapter 3](https://rust-book.cs.brown.edu/ch03-05-control-flow.html#repetition-with-loops))

## Loop

Loop operates like `while True` in Python.
Use `break` to explicitly exit the loop.
Use `continue` to skip the remainder of the iteration, but continue looping.

Use `break <return_value>` to return a value from loop.

Label loops to disambiguate.
e.g.

```rust
'outer_loop: loop {
    ...
    loop {
        if inner_condition_violation {
            break implicit_inner_return;
        }
        if outer_condition_violation {
            break 'outer_loop;
        }
        ...
    }
    ...
    break implicit_outer_return;
}
```

## While & For

`while` and `for` behave as expected.
The blocks below behave identically, but the `for` loop is preferred in this case because

1. it's safer because it reduces the likelihood that future array length changes would lead to panicking and
2. it's faster because the compiler doesn't have to add runtime code to validate the array index.

```rust
fn main() {
    let a = [10, 20, 30, 40, 50];
    let mut index = 0;

    while index < 5 {
        // iterate
    }
}
```

```rust
fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        // iterate
    }
}
```

> The safety and conciseness of for loops make them the most commonly used loop construct in Rust.
> Even in situations in which you want to run some code a certain number of times,
> as in the countdown example that used a while loop in Listing 3-3,
> most Rustaceans would use a for loop.
> The way to do that would be to use a Range, provided by the standard library,
> which generates all numbers in sequence starting from one number and ending before another number.

Example of `for` (using `Range` and `rev`) in a countdown:

```rust
fn main() {
    for number in (1..4).rev() {
        println!("{number}!");
    }
    println!("LIFTOFF!!!");
}
```
