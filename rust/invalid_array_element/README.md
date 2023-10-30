# Invalid Array Element

> Let’s see what happens if you try to access an element of an array that is past the end of the array. Say you run this code, similar to the guessing game in Chapter 2, to get an array index from the user:
> This code compiles successfully. If you run this code using cargo run and enter 0, 1, 2, 3, or 4, the program will print out the corresponding value at that index in the array. If you instead enter a number past the end of the array, such as 10, you’ll see output like this:
>
> ```rust
> thread 'main' panicked at 'index out of bounds: the len is 5 but the index is 10', src/main.rs:19:19
> note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
> ```
>
> The program resulted in a runtime error at the point of using an invalid value in the indexing operation.
> The program exited with an error message and didn’t execute the final `println!` statement.
> When you attempt to access an element using indexing,
> Rust will check that the index you’ve specified is less than the array length.
> If the index is greater than or equal to the length, Rust will panic.
> This check has to happen at runtime, especially in this case,
> because the compiler can’t possibly know what value a user will enter when they run the code later.
>
> This is an example of Rust’s memory safety principles in action.
> In many low-level languages, this kind of check is not done,
> and when you provide an incorrect index, invalid memory can be accessed.
> Rust protects you against this kind of error by immediately exiting instead of allowing the memory access and continuing.

:exploding-head:
