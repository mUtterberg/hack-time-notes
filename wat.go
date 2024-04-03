package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"sort"
	"strings" // Assumes utf-8 encoding
)

// Using struct to get expected key order when encoded
type WordCount struct {
	W string `json:"w"`
	N int    `json:"n"`
}

func GetSortedWordCount(inputJson []byte) ([]byte, error) {
	// Decoding JSON
	var text map[string]string
	json.Unmarshal(inputJson, &text)

	// Counting words
	// Section notes: If s does not contain sep and sep is not empty, Split returns a slice of length 1 whose only element is s.
	//     I considered validating that the "text" key was present, but decided to treat incorrect key the same as empty cases
	split_text := strings.Split(strings.ToLower(strings.TrimSpace(text["text"])), " ")
	words := make(map[string]int)
	for _, word := range split_text {
		if word != "" { // Handle empty word case
			words[word]++
		}
	}

	// Converting map to slice of structs
	// Section notes: Struct did not marshal as expected until adding json:"w" :thinking:
	wordCounts := []WordCount{}
	for word, count := range words {
		wordCounts = append(wordCounts, WordCount{word, count})
	}

	// Lexicographical ordering
	// Section notes: sort.Slice requires type func(i int, j int) bool
	//     Similar to python lambda functions. Nice!
	sort.Slice(wordCounts, func(i, j int) bool {
		return wordCounts[i].W < wordCounts[j].W
	})

	// Encoding JSON
	out, err := json.Marshal(wordCounts)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func TestGetSortedWordCount() {
	runTest := func(in string, expectedOut string) {
		out, _ := GetSortedWordCount([]byte(in))
		if string(out) != expectedOut {
			fmt.Printf("FAIL: input = %s\n\texpected = %s\n\tgot = %s\n\n", in, expectedOut, out)
		}
	}

	runTest(`{"text":"hat cat MaT bat cat bat CAT"}`,
		`[{"w":"bat","n":2},{"w":"cat","n":3},{"w":"hat","n":1},{"w":"mat","n":1}]`)

	runTest(`{"text":"Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo"}`,
		`[{"w":"buffalo","n":8}]`)

	runTest(`{}`, `[]`)

	runTest(``, `[]`)

	runTest(`{"test":"invalid"}`, `[]`)

	runTest(`{"text":"@ 2 @ 2 @ 2 @"}`, `[{"w":"2","n":3},{"w":"@","n":4}]`)
}

func main() {
	// Read input line from Stdin
	r := bufio.NewReader(os.Stdin)
	input, err := r.ReadBytes('\n')
	if err != nil {
		panic(err)
	}
	input = input[:len(input)-1] // trim trailing \n

	// Run test function on input "go test"
	if string(input) == "go test" {
		TestGetSortedWordCount()
		return
	}

	output, err := GetSortedWordCount(input)
	if err != nil {
		fmt.Printf("ERROR")
	} else {
		fmt.Printf("%s", output)
	}
}
