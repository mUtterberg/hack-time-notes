import { Component, useState } from 'react';
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
  
class Row extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isBingo: false
    };
    this.getStyle = this.getStyle.bind(this);
    this.checkRowBingo = this.checkRowBingo.bind(this);
  }

  checkRowBingo () {
    let cellsSelected = [];
  }

  getStyle() {
    return this.state.isBingo ? styles.row.bingo : styles.row.normal;
  }

  render () {
    return (
      <View style={this.getStyle()}>
        <Cell contents={this.props.rowValues[0]}/>
        <Cell contents={this.props.rowValues[1]}/>
        <Cell contents={this.props.rowValues[2]}/>
        <Cell contents={this.props.rowValues[3]}/>
        <Cell contents={this.props.rowValues[4]}/>
      </View>
    );
  }
};
  
function GameRows(props) {
  const rows = [0, 1, 2, 3, 4].map(row_ix => {
    <Row rowValues={props.rowValues[row_ix]}/>  
  });

  return (
    <> 
      <Row rowValues={props.rowValues[0]} newGame={props.newGame}/>
      <Row rowValues={props.rowValues[1]}/>
      <Row rowValues={props.rowValues[2]}/>
      <Row rowValues={props.rowValues[3]}/>
      <Row rowValues={props.rowValues[4]}/>
      {/* {rows} */}
    </>
  );
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

  function handleNewGame() {
    alert("Resetting the game board...");
  }

  let staticOptions = [
    ['b1', 'b2', 'b3', 'b4', 'b5'],
    ['i6', 'i7', 'i8', 'i9', 'i10'],
    ['n11', 'n12', 'n13', 'n14', 'n15'],
    ['e16', 'e17', 'e18', 'e19', 'e20'],
    ['o21', 'o22', 'o23', 'o24', 'o25'],
  ]

  return (
    <>
    <Banner newGame={newGame} />
    <HeaderRow />
    <GameRows rowValues={staticOptions} newGame={newGame} />
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
