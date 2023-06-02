import { View } from 'react-native';
import { Game, StatefulActivity } from './gameContext';
import Cell from './cell';
import { boardStyles } from "./styles";

export default function Playable(
  { boardValues, selectedIds, makeRowKey, gamePlay, winningCells, realm, game }:
  {
    boardValues: StatefulActivity[],
    selectedIds: Realm.Set<string>,
    makeRowKey: (row_index: string) => string,
    gamePlay: boolean,
    winningCells: Set<string>
    realm: Realm,
    game: Game
  }) {
  
  function getCell(cell: StatefulActivity) {
    return (
      <Cell
        contents={cell}
        selectedIds={selectedIds}
        gamePlay={gamePlay}
        winningIds={winningCells}
        key={cell.position}
        realm={realm}
        game={game}
      />
    );
  };

  function getRow(row: StatefulActivity[]) {
    const cells = row?.map(cell => getCell(cell));
    const rowKey = row?.length > 0? row[0].position: "empty";
    return (
      <View style={boardStyles.row} key={makeRowKey(rowKey)}>
        {cells}
      </View>
    );
  };

  function getBoard() {
    return (
      [0, 1, 2, 3, 4].map((row, _) =>
      getRow(
        boardValues?.filter(
          (cell, _) => (cell.position[1] === row.toString())
          )
        )
      )
    );
  }

  return (
    <View style={boardStyles.playable}>
      {getBoard()}
    </View>
  );
};
