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

> If you’re benchmarking your code’s running time,
> be sure to run `cargo build --release`
> and benchmark with the executable in `target/release`.
> ([source](https://rust-book.cs.brown.edu/ch01-03-hello-cargo.html#building-for-release))
