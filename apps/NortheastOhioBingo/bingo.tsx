import { useEffect, useState } from 'react';
import { Alert, useColorScheme, View } from 'react-native';
import { GameContext, Game } from './gameContext';
import Banner from './banner';
import Cell from './cell';
import { BingoMaker } from './content';
import { ClevelandData, GameContent } from './contentTypes';
import { boardStyles } from './styles';

function updateOrCreateSavedGame(realm: Realm, mode: string, selectedIds: Set<string>, boardMap: GameContent) {
  const savedGames = realm.objects<Game>('Game');
  if (savedGames.length === 0) {
    console.log("Creating new game");
    realm.write(() => {
      realm.create('Game', {
        name: "New Game",
        mode: mode,
        _id: new Realm.BSON.ObjectId(),
        gameState: {
          _id: new Realm.BSON.ObjectId(),
          selectedIds: Array.from(selectedIds),
          boardMap: boardMap,
        }
      });
    });
  } else {
    console.log("Saved games: " + savedGames.length);
    console.log("Saving game state");
    realm.write(() => {
      savedGames[0].gameState.selectedIds = Array.from(selectedIds);
    });
    console.log(
      savedGames[0].gameState
    )
  };
};

function loadOrCreateGame(realm: Realm) {
  const savedGames = realm.objects<Game>('Game');
  if (savedGames.length === 0) {
    console.log("Creating new game");
    return BingoMaker.create()
  } else {
    console.log("Loading saved game (eventually)");
    return BingoMaker.load(realm)
  };
};

function loadOrCreateInitialSelections(realm: Realm) {
  const savedGames = realm.objects<Game>('Game');
  if (savedGames.length === 0) {
    return new Set(["n2"]);
  } else {
    console.log("Loading saved options");
    return new Set(savedGames[0].gameState.selectedIds);
  };
};

function Board({}) {
  const [bingoOptions, setBingoOptions] = useState(loadOrCreateGame(GameContext.useRealm()));
  const [gamePlay, setGamePlay] = useState(true);
  const [gameMode, setGameMode] = useState("simple");
  const [selectedIds, setSelectedIds] = useState(loadOrCreateInitialSelections(GameContext.useRealm()));
  const isDarkMode = useColorScheme() === 'dark';
  const [winningCells, setWinningCells] = useState(new Set<string>)
  const realm = GameContext.useRealm();

  function handleBingo(mode: string) {
    console.log("Bingo win type: " + mode);
    Alert.alert(
      "BINGO",
      "You won! New game?",
      [
        {text: 'Yes!', onPress: () => handleNewGame()},
        {text: 'No', onPress: () => setGamePlay(false), style: 'cancel'}
      ]
      );
  }

  useEffect(() => {
    if (!gamePlay) {return;}
    updateOrCreateSavedGame(realm, gameMode, selectedIds, bingoOptions.boardMap);
    if (gameMode === "simple") {
    bingoOptions.boardValues.map(row => {
      if (isRowBingo(row, bingoOptions.boardValues.indexOf(row))) {
        // TODO: How to safely set winning cells?
        // setWinningCells(
        //   new Set(['b0', 'i0', 'n0'])
        // )
        handleBingo("Row");
      }
    })

    Object.values(bingoOptions.boardMap).map(column => {
      if (isColumnBingo(column)) {
        handleBingo("Column");
      }
    })

    if (isCrossBingo()) {
      handleBingo("Cross");
    }
  } else if (gameMode === "blackout") {
    if (isBlackout()) {
      handleBingo("Blackout");
    }
  }
  });

  function selectNewCards() {
    setBingoOptions(BingoMaker.create());
  }

  function handleNewGame() {
    setSelectedIds(new Set(["n2"]));
    selectNewCards();
    setGamePlay(true);
  }

  function addSelectedId(id: string) {
    setSelectedIds(new Set(selectedIds).add(id));
  }

  function isBlackout() {
    return bingoOptions.boardValues.every(
      row => row.every(
        cell => selectedIds.has(
          getCellId(
            cell, bingoOptions.boardValues.indexOf(row)
          )
        )
      )
    );
  }

  function isRowBingo(row: Array<ClevelandData>, rowNum: number) {
    return row.every(
      cell => selectedIds.has(
        getCellId(cell, rowNum)
      )
    );
  };

  function isColumnBingo(column: Array<ClevelandData>) {

    const indices = [0, 1, 2, 3, 4];
    return indices.every(
      rowNum => selectedIds.has(
        getCellId(column[rowNum], rowNum)
      )
    );
  }

  function isCrossBingo() {
    const cross1 = [
      "b0", "i1", "n2", "e3", "o4"
    ];
    const cross2 = [
      "b4", "i3", "n2", "e1", "o0"
    ];
    return cross1.every(cell => selectedIds.has(cell)) || cross2.every(cell => selectedIds.has(cell));
  }

  // Cell ID format: b0, b1, b2, ..., o2, o3, o4
  function getCellId(cell: ClevelandData, rowNum: number) {
    return cell.category + rowNum.toString();
  }

  function makeCellKey(cell: ClevelandData, col: Array<ClevelandData>) {
    const rowNum = col.findIndex(y => y.name === cell.name)
    if (rowNum === undefined) {
      throw new Error("Could not find cell in column");
    }
    return getCellId(cell, rowNum);
  };

  function makeRowKey(row: Array<ClevelandData>, board: Array<Array<ClevelandData>>) {
    return "row_" + board.findIndex(y => y === row).toString();
  }

  const board = bingoOptions.boardValues.map(row =>
    (
      <View style={boardStyles.row} key={makeRowKey(row, bingoOptions.boardValues)}>
      {row.map(cell =>
        <Cell
          contents={cell}
          id={makeCellKey(cell, bingoOptions.boardMap[cell.category])}
          selectedIds={selectedIds}
          addSelectedId={addSelectedId}
          gamePlay={gamePlay}
          winningIds={winningCells}
          key={makeCellKey(cell, bingoOptions.boardMap[cell.category])}
        />
        )}
      </View>
    )
  );

  return (
    <>
      <Banner
        handleNewGame={handleNewGame}
        gameMode={gameMode}
        setGameMode={setGameMode}
        />
      {board}
    </>
  )
}

export default Board;
