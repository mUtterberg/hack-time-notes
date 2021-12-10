from collections import deque
from pathlib import Path
from typing import List


def read_input(source_file: str) -> List[int]:
    '''Open txt file of data, return array of values'''
    puzzle_input = []
    with Path(source_file).open('r', encoding='utf-8') as in_file:
        for row in in_file.readlines():
            puzzle_input.append(int(row.strip()))
    return puzzle_input


def main():
    '''Controller'''
    puzzle_data_source = "./day_1_input.txt"
    puzzle_input = read_input(puzzle_data_source)

    previous_window = deque(maxlen=3)
    previous_sum = 0
    current_sum = 0
    n_increases = 0

    for next_input in puzzle_input:
        previous_window.append(next_input)
        current_sum = sum(previous_window)
        if (previous_sum > 0) and (current_sum > previous_sum):
            n_increases += 1
        if len(previous_window) == 3:
            previous_sum = current_sum

    print(f'{n_increases} measurements are larger than the previous')


if __name__ == '__main__':
    main()
