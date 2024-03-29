import { useEffect, useState } from 'react';
import { Alert, ScrollView, useColorScheme } from 'react-native';
import { GameContext, Game } from './gameContext';
import { getBackgroundColor } from './styles';
import Banner from './banner';
import ImageButton from './imageButton';
import { createGame, setGamePlay, setResolution, setWinningIds } from './gameData';
import Playable from './playable';
import { NativeStackNavigatorProps } from '@react-navigation/native-stack/lib/typescript/src/types';

function getSavedGameIfAny(realm: Realm) {
  const savedGames = realm.objects<Game>('Game');
  console.log(
    "Found "+savedGames.length+" saved games ("
    +savedGames.filtered('active = $0', true).length+" active & "
    +savedGames.filtered('active = $0', false).length+" inactive)"
  )
  if (savedGames.length === 0) {
    console.log("No saved games found. Creating new game.")
    return createGame(realm);
  } else if (savedGames.filtered('active = $0', true).length === 0) {
    console.log("No active games found. Loading last inactive game.")
    const inactiveGames = savedGames.filtered('active = $0', false);
    return inactiveGames[inactiveGames.length - 1];
  } else {
    console.log("Loading last active game.")
    const activeGames = savedGames.filtered('active = $0', true);
    return activeGames[activeGames.length - 1];
  };
}

export default function Bingo({ navigation }: { navigation: NativeStackNavigatorProps }) {
  const realm = GameContext.useRealm();
  const [gameId, setGameId] = useState(getSavedGameIfAny(realm)._id);
  const game = GameContext.useObject(Game, gameId);
  const isDarkMode = useColorScheme() === 'dark';

  function handleBingo(mode: string, winningIds: Array<string>) {
    console.log("Bingo win type: " + mode);
    setResolution(realm, game, mode);
    setWinningIds(realm, game, winningIds);
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
          const rowIds = ['b'+row, 'i'+row, 'n'+row, 'e'+row, 'o'+row];
          handleBingo("Row", rowIds);
        }
      });

      // Check for column bingo
      ['b', 'i', 'n', 'e', 'o'].map((column, _) => {
        if (isColumnBingo(column)) {
          const colIds = [column+'0', column+'1', column+'2', column+'3', column+'4']
          handleBingo("Column", colIds);
        }
      });

      if (isCrossBingo()) {
        handleBingo("Cross", whichCross());
      }
    } else if (game?.mode === "blackout") {
      if (isBlackout()) {
        handleBingo("Blackout", game.selectedIds);
      }
    }
  });
  // END OF RUNS AFTER EVERY RENDER

  function handleNewGame() {
    setGamePlay(
      realm,
      game,
      false
      );
    const newGame = createGame(realm);
    setGameId(newGame._id);
  }

  // Currently unused due to bug in my implementation
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
  
  function whichCross() {
    const cross1 = [
      "b0", "i1", "n2", "e3", "o4"
    ];
    const cross2 = [
      "b4", "i3", "n2", "e1", "o0"
    ];
    if (cross1.every(cell => game?.selectedIds.has(cell))) {
      return cross1;
    } else if (cross2.every(cell => game?.selectedIds.has(cell))) {
      return cross2;
    }
    return [];
  }

  function makeRowKey(row_index: string) {
    return "row_" + row_index.split("")[1];
  }

  const backgroundStyle = {
    backgroundColor: getBackgroundColor(isDarkMode),
  };

  return (
    <>
    <ImageButton />
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}
      contentContainerStyle={{ flexGrow: 1 }}
    >
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
      winningCells={game?.winningIds}
      game={game}
      realm={realm}
      />
    </ScrollView>
    </>
  )
}
