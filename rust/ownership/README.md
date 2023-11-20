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
  - Rust *automatically* frees a box's heap memory.
- A Box's owner manages deallocation
  - If a variable owns a box, when Rust deallocates the variable's frame, then Rust deallocates the box's heap memory.
- Collections use Boxes
- Variables cannot be used after being moved

```rust
fn main() {
    let a_num = 4; // At this point, `a_num` is on the main stack with a copy of 4
    make_and_drop(); // when the `make_and_drop` scope ends, rust drops the `a_box` pointer from the stack & also deallocates the heap copy of 5 that `a_box` owned
}

fn make_and_drop() {
    let a_box = Box::new(5); // `a_box` stores a pointer & owns the copy of 5 on the heap
    let b_box = a_box; // Ownership of the box **moves** from `a_box` to `b_box`; `a_box` can no longer be used
}
```

- Cloning avoids moves

```rust
fn main() {
    let first = String::from("Ferris"); // first points to "Ferris" in heap memory
    let first_clone = first.clone(); // first_clone points to "Ferris" in a separate heap memory location
    let full = add_suffix(first_clone); // full points to a copy of "Ferris Jr." and first_clone points to deallocated memory (previously the separate heap copy of "Ferris")
    println!("{full}, originally {first}");
}

fn add_suffix(mut name: String) -> String {
    name.push_str(" Jr."); // Allocates new memory on the heap for f"{name} Jr.", updates the pointer, and deallocates the previous heap memory
    name
}
```
