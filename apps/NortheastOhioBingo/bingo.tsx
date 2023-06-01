import { useEffect, useState } from 'react';
import { Alert, useColorScheme } from 'react-native';
import { GameContext, Game } from './gameContext';
import Banner from './banner';
import { createGame, setGamePlay } from './gameData';
import Playable from './playable';

function getSavedGameIfAny(realm: Realm) {
  const savedGames = realm.objects<Game>('Game');
  console.log("Found "+savedGames.length+" saved games")
  if (savedGames.filtered('active = $0', true).length === 0) {
    const newGame = createGame(realm);
    console.log(newGame)
    console.log("Created new game with id "+newGame._id)
    return newGame;
  } else {
    console.log("Loading last of "+savedGames.filtered('active = $0', true).length+" active games")
    console.log(savedGames.filtered('active = $0', false).length+" inactive games")
    const activeGames = savedGames.filtered('active = $0', true);
    return activeGames[activeGames.length - 1];
  };
}

export default function Bingo({}) {
  const realm = GameContext.useRealm();
  const [gameId, setGameId] = useState(getSavedGameIfAny(realm)._id);
  const game = GameContext.useObject(Game, gameId);
  const isDarkMode = useColorScheme() === 'dark';
  const [winningCells, setWinningCells] = useState(new Set<string>)

  function handleBingo(mode: string) {
    console.log("Bingo win type: " + mode);
    setGamePlay(realm, game, false)
    Alert.alert(
      "BINGO",
      "You won! New game?",
      [
        {text: 'Yes!', onPress: () => handleNewGame()},
        {text: 'No', onPress: () => setGamePlay(realm, game, false), style: 'cancel'}
      ]
      );
  }

  // THIS RUNS AFTER EVERY RENDER
  useEffect(() => {
    if (!game?.active) {return;}
    if (game?.selectedIds === undefined) {
      console.log("Selected ids undefined")
    }

    if (game?.mode === "simple") {
      // Check for row bingo
      [0, 1, 2, 3, 4].map((row, _) => {
        if (isRowBingo(row)) {
          // TODO: How to safely set winning cells?
          // setWinningCells(
          //   new Set(['b0', 'i0', 'n0'])
          // )
          handleBingo("Row");
        }
      });

      // Check for column bingo
      ['b', 'i', 'n', 'e', 'o'].map((column, _) => {
        if (isColumnBingo(column)) {
          handleBingo("Column");
        }
      });

      if (isCrossBingo()) {
        handleBingo("Cross");
      }
    } else if (game?.mode === "blackout") {
      if (isBlackout()) {
        handleBingo("Blackout");
      }
    }
  });
  // END OF RUNS AFTER EVERY RENDER

  function selectNewCards() {
    setGamePlay(
      realm,
      game,
      false
      );
    const newGame = createGame(realm);
    setGameId(newGame._id);
  }

  function handleNewGame() {
    selectNewCards();
    setGamePlay(realm, game, true);
  }

  function clearGames() {
    realm.write(() => {
      const games = realm.objects<Game>('Game').filtered('_id != $0', gameId);
      console.log("Deleting "+games.length+" games")
      games.forEach(game => {
        console.log("Deleting game with id "+game._id)
        realm.delete(
          game
        );
      })
    });
  }

  function isBlackout() {
    return game?.boardValues.every(cell => game?.selectedIds.has(cell.position));
  }

  function isRowBingo(rowNum: number) {
    return game?.boardValues.filter(cell => cell.position[1] === rowNum.toString()).every(
      cell => game?.selectedIds.has(
        cell.position
      )
    );
  };

  function isColumnBingo(column: string) {

    return game?.boardValues.filter(cell => cell.position[0] === column).every(
      cell => game?.selectedIds.has(
        cell.position
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
    return cross1.every(cell => game?.selectedIds.has(cell)) || cross2.every(cell => game?.selectedIds.has(cell));
  }

  function makeRowKey(row_index: string) {
    return "row_" + row_index.split("")[1];
  }

  return (
    <>
      <Banner
        handleNewGame={handleNewGame}
        handleClearGames={clearGames}
        game={game}
        realm={realm}
        />
      <Playable
        boardValues={game?.boardValues}
        selectedIds={game?.selectedIds}
        makeRowKey={makeRowKey}
        gamePlay={game?.active}
        winningCells={winningCells}
        game={game}
        realm={realm}
      />
    </>
  )
}
