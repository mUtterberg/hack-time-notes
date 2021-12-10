puzzle_data_source = "./day_1_input.txt"

def readInput(sourceFile)
    file = File.open(sourceFile)
    puzzle_input = file.readlines.map(&:chomp).map(&:to_i)
    file.close
    return puzzle_input
end

puzzle_input = readInput(puzzle_data_source)

previous_window = [0, 0, 0]
previous_sum = 0
n_increases = 0
puzzle_input.each do |next_input|
    previous_window = previous_window.push(next_input)
    previous_window.shift
    current_sum = previous_window.sum
    
    if (previous_sum > 0) && (current_sum > previous_sum)
        n_increases += 1
    end

    if previous_window[0] != 0
        previous_sum = current_sum
    end
end

puts n_increases.to_s + " measurements are larger than the previous."
