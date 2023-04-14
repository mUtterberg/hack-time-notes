import * as clevelandData from "./cleveland.json";

function getRandomSubarray(arr: Array<string>) {

  var shuffled = arr.slice(0);
  var i = arr.length, temp, index;
  const size = 5;

  while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
};

export class BingoMaker {
  static create() {
    const gameContent = {
      b: [], i: [], n: [], e: [], o: []
    }
    for (const [key, values] of Object.entries(clevelandData.default)) {
      const sample = getRandomSubarray(values);
      for (var i in sample) {
        gameContent[key].push(sample[i]);
      }
    }

    function transposeSelectedValues(matrix: string[][]) {
      return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
    }

    return {boardMap: gameContent, boardValues: transposeSelectedValues(Object.values(gameContent))};
  }
}
