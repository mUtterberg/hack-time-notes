import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Banner from './banner';
import Cell from './cell';

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
    bingoValues.map(row => {
      if (isRowBingo(row)) {
        handleBingo("Row");
      }
    })
    Object.values(staticCellKeys).map(column => {
      if (isColumnBingo(column)) {
        handleBingo("Column");
      }
    })
    if (isCrossBingo()) {
      handleBingo("Cross");
    }
  });

  function handleNewGame() {
    setGamePlay(true);
    setSelectedIds(new Set<string>());
  }

  function addSelectedId(id: string) {
    setSelectedIds(new Set(selectedIds).add(id));
  }

  const staticCellKeys = {
    b: ['B1', 'B2', 'B3', 'B4', 'B5'],
    i: ['I6', 'I7', 'I8', 'I9', 'I10'],
    n: ['N11', 'N12', 'N13', 'N14', 'N15'],
    e: ['E16', 'E17', 'E18', 'E19', 'E20'],
    o: ['O21', 'O22', 'O23', 'O24', 'O25'],
  };

  function isRowBingo(row: Array<string>) {
    return row.every(cell => selectedIds.has(cell));
  };

  function isColumnBingo(column: Array<string>) {
    return column.every(cell => selectedIds.has(cell));
  }

  function isCrossBingo() {
    const cross1 = ['B1', 'I7', 'N13', 'E19', 'O25'];
    const cross2 = ['B5', 'I9', 'N13', 'E17', 'O21'];
    return cross1.every(cell => selectedIds.has(cell)) || cross2.every(cell => selectedIds.has(cell));
  }

  const orderedCellKeys = Object.values(staticCellKeys)

    
  function transposeSelectedValues(matrix: string[][]) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
  }
  
  const bingoValues = transposeSelectedValues(orderedCellKeys)
  const board = bingoValues.map(row =>
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
