use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1..=100);

    loop {
        
        
        println!("Please input your guess.");
        
        let mut guess = String::new();
        
        // Could also implement std::io::stdin without the use statement
        io::stdin()
        .read_line(&mut guess)
        // The right way to suppress the warning is to actually write error-handling code,
        // but in our case we just want to crash this program when a problem occurs,
        // so we can use expect. 
        .expect("Failed to read line");
    
        // We switch from an expect call to a match expression
        // to move from crashing on an error to handling the error. 
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };
        
        println!("You guessed: {guess}");
        
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Equal => {
                println!("You win!");
                break;
            },
            Ordering::Greater => println!("Too big!"),
        }
    }
}
