import _clevelandData from "./cleveland.json";
import { ClevelandData, GameContent } from "./contentTypes";
export const clevelandData = _clevelandData as ClevelandData[];

function getRandomSubarray(arr: Array<any>) {

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

function validateCategories(jsonCategories: Array<any>, validKeys: Array<string>) {
  for (const key of jsonCategories) {
    if (!validKeys.includes(key)) {
      throw new Error("Invalid key: " + key);
    }
  }
};

function transposeSelectedValues(matrix: ClevelandData[][]) {
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
};

export class BingoMaker {

  static create() {
    const gameContent: GameContent = {
      b: [], i: [], n: [], e: [], o: []
    }

    validateCategories(clevelandData.map( i => i.category), Object.keys(gameContent));

    for (var [key, values] of Object.entries(gameContent)) {
      const sample = getRandomSubarray(clevelandData.filter( i => i.category === key && i.freeSpace !== true ));
      for (var i in sample) {
        values.push(sample[i]);
      }
    }

    // Set free space
    const freeSpace = clevelandData.find( i => i.freeSpace === true)
    if (freeSpace === undefined) {
      throw new Error("Could not find free space");
    }
    gameContent.n[2] = freeSpace;

    return {boardMap: gameContent, boardValues: transposeSelectedValues(Object.values(gameContent))};
  }
}
