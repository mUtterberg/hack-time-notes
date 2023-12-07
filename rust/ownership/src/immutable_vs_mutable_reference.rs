fn main() {
    immutable_reference();
    mutable_reference();
}

fn immutable_reference() {
    println!("immutable_reference:");
    let v: Vec<i32> = vec![1, 2, 3];
    let num: &i32 = &v[2];
    println!("\tThird element is {}", *num); // 3
    println!("\tVector is {:?}", v); // [1, 2, 3]
}

fn mutable_reference() {
    println!("mutable_reference:");
    let mut v: Vec<i32> = vec![1, 2, 3];
    let num: &mut i32 = &mut v[2];
    *num += 1;
    println!("\tThird element is {}", *num); // 4
    println!("\tVector is now {:?}", v); // [1, 2, 4]
}
