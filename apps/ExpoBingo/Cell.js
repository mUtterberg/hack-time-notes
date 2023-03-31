import { Component } from 'react';
import { Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

  
class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
    this.getStyle = this.getStyle.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleLongPress = this.handleLongPress.bind(this);
  }

  getStyle() {
    return this.state.isSelected ? styles.cell.selected : styles.cell.available;
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
      <TouchableHighlight style={this.getStyle()} onPress={this.handlePress} onLongPress={this.handleLongPress}>
      <View style={this.getStyle()}>
        <Pressable title={this.props.contents} onPress={this.handlePress} onLongPress={this.handleLongPress}>
          <Text>{this.props.contents}</Text>
        </Pressable>
      </View>
      </TouchableHighlight>
    );
  }
}

export default Cell;

const styles = StyleSheet.create({
  cell: {
    available: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      flex: 1,
      height: 40,
      backgroundColor: 'yellow'
    },
    selected: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      flex: 1,
      height: 40,
      backgroundColor: 'green'
    }
  }

});
