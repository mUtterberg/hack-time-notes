import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Banner from './banner';
import Cell from './cell';
import { BingoMaker } from './content';
import { ClevelandData } from './contentTypes';

type HeaderCellProps = {
  contents: string
};

function HeaderCell ({ contents }: HeaderCellProps) {
  return (
    <>
    <View style={styles.headerCell}>
      <Text>{contents}</Text>
    </View>
    </>
  )
};
  
function HeaderRow() {
  const bineo = ['B', 'I', 'N', 'E', 'O'];
  const headers = bineo.map(letter => 
    <HeaderCell contents={letter} key={letter}/>
  );
  return (
    <>
    <View style={styles.headerRow}>
      {headers}
    </View>
    </>
  )
};

function Board({}) {
  const [gamePlay, setGamePlay] = useState(true);
  const [selectedIds, setSelectedIds] = useState(new Set(["n2"]));
  const [bingoOptions, setBingoOptions] = useState(BingoMaker.create());

  function handleBingo(mode: string) {
    Alert.alert(
      "Bingo! (" + mode + ")",
      "You won! New game?",
      [
        {text: 'Yes!', onPress: () => handleNewGame()},
        {text: 'No', onPress: () => setGamePlay(false), style: 'cancel'}
      ]
      );
  }

  useEffect(() => {
    if (!gamePlay) {return;}
    bingoOptions.boardValues.map(row => {
      if (isRowBingo(row, bingoOptions.boardValues.indexOf(row))) {
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

  function isRowBingo(row: Array<ClevelandData>, rowNum: number) {
    return row.every(cell => selectedIds.has(getCellId(cell, rowNum)));
  };

  function isColumnBingo(column: Array<ClevelandData>) {

    const indices = [0, 1, 2, 3, 4];
    return indices.every(rowNum => selectedIds.has(getCellId(column[rowNum], rowNum)));
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

  function getCellId(cell: ClevelandData, rowNum: number) {
    return cell.category + rowNum.toString();
  }

  function makeCellKey(cell: ClevelandData, row: Array<ClevelandData>) {
    const rowIndex = row.findIndex(y => y.name === cell.name)
    if (rowIndex === undefined) {
      throw new Error("Could not find cell in row");
    }
    return cell.category.toString() + rowIndex.toString();
  };

  function makeRowKey(row: Array<ClevelandData>, board: Array<Array<ClevelandData>>) {
    return "row_" + board.findIndex(y => y === row).toString();
  }

  const board = bingoOptions.boardValues.map(row =>
    (
      <View style={styles.row} key={makeRowKey(row, bingoOptions.boardValues)}>
      {row.map(cell =>
        <Cell
          contents={cell}
          id={makeCellKey(cell, bingoOptions.boardMap[cell.category])}
          selectedIds={selectedIds}
          addSelectedId={addSelectedId}
          gamePlay={gamePlay}
          key={makeCellKey(cell, bingoOptions.boardMap[cell.category])}
        />
        )}
      </View>
    )
  );

  return (
    <>
    <Banner handleNewGame={handleNewGame} />
    <HeaderRow />
    {board}
    </>
  )
}

export default Board;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
  },
  headerCell: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flex: 1,
    height: 40,
    fontWeight: 'bold',
    backgroundColor: 'yellow'
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    height: 50,
    padding: 2,
    backgroundColor: 'pink'
  }
});
