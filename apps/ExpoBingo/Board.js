import { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Cell from './Cell';
import Banner from './Banner';

function HeaderCell ({ contents }) {
  return (
    <>
    <View style={styles.bingo.headerCell}>
      <Button title={contents} />
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
    <View style={styles.bingo.headerRow}>
      {headers}
    </View>
    </>
  )
};

function Board({}) {
  const [newGame, setNewGame] = useState(true);
  const [selectedIds, setSelectedIds] = useState(new Set());

  useEffect(() => {
    bingoValues.map(row => {
      if (isRowBingo(row)) {
        alert("Bingo!");
        setNewGame(false);
        setSelectedIds(new Set());
      }
    })
  });

  function handleNewGame() {
    setNewGame(true);
    setSelectedIds(new Set());
  }

  function addSelectedId(id) {
    setSelectedIds(new Set(selectedIds).add(id));
  }

  const staticCellKeys = {
    b: ['B1', 'B2', 'B3', 'B4', 'B5'],
    i: ['I6', 'I7', 'I8', 'I9', 'I10'],
    n: ['N11', 'N12', 'N13', 'N14', 'N15'],
    e: ['E16', 'E17', 'E18', 'E19', 'E20'],
    o: ['O21', 'O22', 'O23', 'O24', 'O25'],
  };

  function isRowBingo(row) {
    // console.log("Checking row: " + row + "; selected ids: " + Array.from(selectedIds))
    return row.every(cell => selectedIds.has(cell));
  };

  const orderedCellKeys = Object.values(staticCellKeys)

    
  function transposeSelectedValues(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
  }
  
  const bingoValues = transposeSelectedValues(orderedCellKeys)
  const board = bingoValues.map(row =>
    (
      <View style={styles.row.normal} key={row[0]}>
      {row.map(cell =>
        <Cell
          contents={cell}
          selectedIds={selectedIds}
          addSelectedId={addSelectedId}
          key={cell}
        />
        )}
      </View>
    )
  );

  return (
    <>
    <Banner newGame={newGame} handleNewGame={handleNewGame} />
    <HeaderRow />
    {board}
    </>
  )
}

export default Board;

const styles = StyleSheet.create({
  board: {},
  bingo: {
    headerRow: {
      flexDirection: 'row',
      // fontWeight: 'bold',
    },
  },
  row: {
    normal: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'black',
      flexDirection: 'row',
      height: 50,
      padding: 2,
      backgroundColor: 'pink'
    },
    bingo: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'black',
      flexDirection: 'row',
      height: 50,
      padding: 2,
      backgroundColor: 'pink'
    }
  }
});
