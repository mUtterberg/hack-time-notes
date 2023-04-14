import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Banner from './banner';
import Cell from './cell';
import { BingoMaker } from './content';

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
  const [selectedIds, setSelectedIds] = useState(new Set<string>());
  const [bingoOptions, setBingoOptions] = useState(BingoMaker.create());
  // const [bingoOptions, setBingoOptions] = useState(bingoShuffle());

  const orderedCellKeys = Object.values(bingoOptions.boardMap)
  const bingoValues = transposeSelectedValues(orderedCellKeys)

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
      if (isRowBingo(row)) {
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
    setSelectedIds(new Set<string>());
    selectNewCards();
    setGamePlay(true);
  }

  function addSelectedId(id: string) {
    setSelectedIds(new Set(selectedIds).add(id));
  }

  function isRowBingo(row: Array<string>) {
    return row.every(cell => selectedIds.has(cell));
  };

  function isColumnBingo(column: Array<string>) {
    return column.every(cell => selectedIds.has(cell));
  }

  function isCrossBingo() {
    const cross1 = [
      bingoOptions.boardMap.b[0], bingoOptions.boardMap.i[1], bingoOptions.boardMap.n[2], bingoOptions.boardMap.e[3], bingoOptions.boardMap.o[4]
    ];
    const cross2 = [
      bingoOptions.boardMap.b[4], bingoOptions.boardMap.i[3], bingoOptions.boardMap.n[2], bingoOptions.boardMap.e[1], bingoOptions.boardMap.o[0]
    ];
    return cross1.every(cell => selectedIds.has(cell)) || cross2.every(cell => selectedIds.has(cell));
  }

  function transposeSelectedValues(matrix: string[][]) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
  }

  const board = bingoOptions.boardValues.map(row =>
    (
      <View style={styles.row} key={row[0]}>
      {row.map(cell =>
        <Cell
          contents={cell}
          selectedIds={selectedIds}
          addSelectedId={addSelectedId}
          gamePlay={gamePlay}
          key={cell}
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
