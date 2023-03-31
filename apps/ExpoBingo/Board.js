import { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Cell from './Cell';

class HeaderCell extends Component {
  render () {
    return (
      <View style={styles.bingo.headerCell}>
        <Button title={this.props.contents} />
      </View>
    )
  }
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
  
class GameRows extends Component {
  render () {
    let staticOptions = {
      b: ['b1', 'b2', 'b3', 'b4', 'b5'],
      i: ['i6', 'i7', 'i8', 'i9', 'i10'],
      n: ['n11', 'n12', 'n13', 'n14', 'n15'],
      e: ['e16', 'e17', 'e18', 'e19', 'e20'],
      o: ['o21', 'o22', 'o23', 'o24', 'o25'],
    };
      
    return (
      <> 
        <Row rowValues={staticOptions.b}/>
        <Row rowValues={staticOptions.i}/>
        <Row rowValues={staticOptions.n}/>
        <Row rowValues={staticOptions.e}/>
        <Row rowValues={staticOptions.o}/>
      </>
    );
  }
};
  
class HeaderRow extends Component {
  render () {
    return (
      <View style={styles.bingo.headerRow}>
        <HeaderCell contents='B'/>
        <HeaderCell contents='I'/>
        <HeaderCell contents='N'/>
        <HeaderCell contents='E'/>
        <HeaderCell contents='O'/>
      </View>
    )
  }
};

class Board extends Component {
  render () {
    return (
      <>
      <HeaderRow />
      <GameRows />
      </>
    )
  }
};

export default Board;

const styles = StyleSheet.create({
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
