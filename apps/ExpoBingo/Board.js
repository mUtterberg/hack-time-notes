import { useState } from 'react';
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
  const [selectedIds, setSelectedIds] = useState([]);

  function handleNewGame() {
    alert("You tapped New Game!");
    setNewGame(true);
    setSelectedIds([]);
  }

  function addSelectedId(id) {
    setSelectedIds([...selectedIds, id]);
  }

  const staticOptions = [
    ['b1', 'i6', 'n11', 'e16', 'o21'],
    ['b2', 'i7', 'n12', 'e17', 'o22'],
    ['b3', 'i8', 'n13', 'e18', 'o23'],
    ['b4', 'i9', 'n14', 'e19', 'o24'],
    ['b5', 'i10', 'n15', 'e20', 'o25'],
  ]

  const board = staticOptions.map(row =>
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
