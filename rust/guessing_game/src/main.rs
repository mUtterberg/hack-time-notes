use std::io;

fn main() {
    println!("Guess the number!");

    println!("Please input your guess.");

    let mut guess = String::new();

    // Could also implement std::io::stdin without the use statement
    io::stdin()
        .read_line(&mut guess)
        // The right way to suppress the warning is to actually write error-handling code,
        // but in our case we just want to crash this program when a problem occurs,
        // so we can use expect. 
        .expect("Failed to read line");

    println!("You guessed: {guess}");
}
