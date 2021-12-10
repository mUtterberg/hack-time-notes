puzzle_data_source = "./day_1_input.txt"

def readInput(sourceFile)
    file = File.open(sourceFile)
    puzzle_input = file.readlines.map(&:chomp).map(&:to_i)
    file.close
    return puzzle_input
end

puzzle_input = readInput(puzzle_data_source)

puts puzzle_input.class
puts puzzle_input.length

previous = nil
n_increases = 0
puzzle_input.each do |next_input|
    if (previous != nil) && (next_input > previous)
        n_increases += 1
    end
    previous = next_input
end

puts n_increases.to_s + " measurements are larger than the previous."
