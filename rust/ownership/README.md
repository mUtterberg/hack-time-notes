# Ownership

## [What is Ownership](https://rust-book.cs.brown.edu/ch04-01-what-is-ownership.html)

> Ownership is a discipline for ensuring the safety of Rust programs. To understand ownership, we first need to understand what makes a Rust program safe (or unsafe).

- Safety is the absence of undefined behavior
  - A foundational goal of Rust is to ensure that your programs never have undefined behavior.
  - A secondary goal of Rust is to prevent undefined behavior at *compile-time* instead of *run-time*.

> The Rust Reference maintains a large list of ["Behavior considered undefined"](https://doc.rust-lang.org/reference/behavior-considered-undefined.html).
> For now, we will focus on one category: operations on memory.
>
> Rust provides a particular way to think about memory. Ownership is a discipline for safely using memory within that way of thinking.

### The Rust model of memory

- Variables live in the stack
  - Variables live in **frames**.
  - A frame is a mapping from variables to values within a single scope.
  - Frames are organized into a **stack** of currently-called functions.
  - After a function returns, Rust deallocates/frees/drops the function's frame.
  - This sequence of frames is called a stack because the most recent frame added is always the next frame freed.
  - When an expression reads a variable, the variable's value is copied from its slot in the stack frame.
- Boxes live in the heap
  - Copying data can take up a lot of memory.
  - To transfer access to data without copying it, Rust uses pointers.
  - A **pointer** is a value that describes a location in memory.
  - The value that a pointer points-to is called its **pointee**.
  - One common way to make a pointer is to allocate memory in the heap.
  - The **heap** is a separate region of memory where data can live indefinitely.
  - Heap data is not tied to a specific stack frame.
  - Rust provides a construct called `Box` for putting data on the heap.

```rust
fn large_copy {
    let a = [0; 1_000_000];
    let b = a;
}

fn pointer_pointee {
    let a = Box::new([0; 1_000_000]); // At this point, the array is allocated on the heap & a stores a pointer
    let b = a; // At this point, the array is still on the heap & the pointer is copied (moved?) from a into b
}
```

> Note: this memory model does not fully describe how Rust actually works!
> As we saw earlier with the assembly code, the Rust compiler might put n or x into a register rather than a stack frame.
> But that distinction is an implementation detail.
> It shouldn't change your understanding of safety in Rust, so we can focus on the simpler case of frame-only variables.

- Rust does not permit manual memory management
- A Box's owner manages deallocation
