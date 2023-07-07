import { StyleSheet } from "react-native";

export function getBackgroundColor(isDarkMode: boolean) {
  return isDarkMode ? "#7E252D" : "#FBF4F4"
}
export const appStyles = StyleSheet.create({
  imageContainer: {
    minHeight: 150,
    maxHeight: 200,
    flex: 1,
  },
  highlight: {
    fontWeight: '700',
  },
  banner: {
    height: 200,
    resizeMode: 'cover',
    justifyContent: 'center',
    flex: 1,
  }
});

const commonStyling = StyleSheet.create({
  centered: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export const bannerStyles = StyleSheet.create({
  banner: {
    flex: 0.4,
    flexDirection: 'column',
    // maxHeight: 50,
    backgroundColor: '#7E252D',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    // margin: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  button: {
    color: "black",
    boxShadow: "4px 8px ",
    shadowOffset: {
      width: 4,
      height: 8,
    },
    shadowColor: "#5F1C48",
    shadowOpacity: 0.5,
    elevation: 20,
    shadowRadius: 4,
    borderWidth: 1,
    height: 60,
    padding: 10,
    margin: 10,
    backgroundColor: 'burntsienna',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    flex: 1,
    borderColor: 'black',
  },
  buttonText: {
    alignItems: 'center',
    color: 'black',
  }
});

export const boardStyles = StyleSheet.create({
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    flexDirection: 'row',
    backgroundColor: '#FBF4F4'
  },
  playable: {
    alignItems: 'center',
    borderColor: 'black',
    backgroundColor: '#FBF4F4',
    flex: 1,
  },
});

export const cellStyles = StyleSheet.create({
  availableCell: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 80,
  },
  selectedCell: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 80,
  },
  winningCell: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 80,
  },
  availableTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flex: 1,
    height: 80,
    backgroundColor: '#7E252D'
  },
  selectedTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flex: 1,
    height: 80,
    backgroundColor: '#5F1C48'
  },
  winningTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'limegreen',
    borderWidth: 1,
    flex: 1,
    height: 80,
    backgroundColor: '#5F1C48'
  },
  text: {
    color: 'white',
  }
});

export const navigatorStyles = StyleSheet.create({
  tableCell: {
    flex: 1,
  },
  winningRow: {
    backgroundColor: 'lightgreen',
    borderWidth: 1,
    padding: 5,
  },
  activeRow: {
    backgroundColor: 'limegreen',
    borderWidth: 1,
    padding: 5,
  },
  tableRow: {
    backgroundColor: 'lightblue',
    borderWidth: 1,
    padding: 5,
  },
  tableText: {
    // fontSize: 20,
    // flexDirection: 'row',
    overflow: 'scroll',
  }
});
