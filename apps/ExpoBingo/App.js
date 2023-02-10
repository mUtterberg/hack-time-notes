import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

type CellProps = {
  contents: string
};

type RowProps = {
  rowValues: Array
};

const Cell  = (props: CellProps) => {
  return (
    <View style={styles.bingo.cell}>
      <Button title={props.contents} onPress={() => alert("You tapped " + props.contents + "!")}/>
    </View>
  );
};

const Row = (props: RowProps) => {
  return (
    <View style={styles.bingo.row}>
      <Cell contents={props.rowValues[0]}/>
      <Cell contents={props.rowValues[1]}/>
      <Cell contents={props.rowValues[2]}/>
      <Cell contents={props.rowValues[3]}/>
      <Cell contents={props.rowValues[4]}/>
    </View>
  );
};

const GameRows = () => {
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
};

const HeaderRow = (props: RowProps) => {
  return (
    <View style={styles.bingo.headerRow}>
      <Cell contents='B'/>
      <Cell contents='I'/>
      <Cell contents='N'/>
      <Cell contents='E'/>
      <Cell contents='O'/>
    </View>
  )
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <HeaderRow />
      <GameRows />
      <Text>OMG I MADE EDITS!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    backgroundColor: 'lightcyan',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  bingo: {
    headerRow: {
      flexDirection: 'row',
      // fontWeight: 'bold',
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
    },
    cell: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      flex: 1,
      height: 40,
      backgroundColor: 'yellow'
    }
  }
});
