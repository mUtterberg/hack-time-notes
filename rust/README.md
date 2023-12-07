# Rust

Rustaceans. Cute!

## Useful commands (so far)

```rust
cargo new <name>
// Within initialized Cargo project
cargo check // See if program will compile (without actually compiling)
// "rustc <filename>" can only build a program with no dependencies
// "cargo build" is useful as a standalone step after adding a dependency
cargo run // Compile & run
```

## Notes

### Benchmarking

> If you’re benchmarking your code’s running time,
> be sure to run `cargo build --release`
> and benchmark with the executable in `target/release`.
> ([source](https://rust-book.cs.brown.edu/ch01-03-hello-cargo.html#building-for-release))

### Array vs Vector (vs arrays in other languages)

> Unlike arrays in some other languages, arrays in Rust have a fixed length.
> An array can also only contain elements of a single type.
> ...
> Arrays are useful when you want your data allocated on the stack rather than the heap...or
> when you want to ensure you always have a fixed number of elements.
> ...
> A *vector* is a similar collection type provided by the standard library that is allowed to grow or shrink in size.
> If you’re unsure whether to use an array or a vector, chances are you should use a vector
> ([source](https://rust-book.cs.brown.edu/ch03-02-data-types.html#the-array-type))

### Ownership

> Ownership is Rust’s most unique feature and has deep implications for the rest of the language.
> It enables Rust to make memory safety guarantees without needing a garbage collector,
> so it’s important to understand how ownership works.
> In this chapter, we’ll talk about ownership as well as several related features:
> borrowing, slices, and how Rust lays data out in memory.
> ([Chapter 4.0](https://rust-book.cs.brown.edu/ch04-00-understanding-ownership.html))
