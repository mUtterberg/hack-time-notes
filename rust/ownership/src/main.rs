fn main() {
    mutable_reference();
    safe_run();
}

fn safe_run() {
    let x = true;
    read(x);
}

// fn unsafe_run() {
//     read(x);
//     let x = true;
// }

fn read(y: bool) {
    if y {
        println!("y is true!");
    }
}

fn mutable_reference() {
    let mut v: Vec<i32> = vec![1, 2, 3];
    let num: &mut i32 = &mut v[2];
    *num += 1;
    println!("Third element is {}", *num);
    println!("Vector is now {:?}", v);
}
