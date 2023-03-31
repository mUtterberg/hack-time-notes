import { Component } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

  
class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
    this.handlePress = this.handlePress.bind(this);
    this.handleLongPress = this.handleLongPress.bind(this);
  }

  handlePress() {
    this.setState({isSelected: !this.state.isSelected});
    alert("You selected " + this.props.contents + "!");
  }
  handleLongPress() {
    alert("You long-pressed " + this.props.contents + "!");
  }

  render () {
    return (
      <View style={styles.bingo.cell}>
        <Pressable title={this.props.contents} onPress={this.handlePress} onLongPress={this.handleLongPress}>
          <Text>{this.props.contents}</Text>
        </Pressable>
      </View>
    );
  }
}

export default Cell;

const styles = StyleSheet.create({
  bingo: {
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
