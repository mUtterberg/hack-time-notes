fn main() {
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
