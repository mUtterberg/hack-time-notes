import { Text, View } from "react-native";
import { GameContext } from "./gameContext";
import ImageButton from "./imageButton";

export default function GameNavigator() {
  const realm = GameContext.useRealm();
  return (
    <View>
      <ImageButton />
      <Text>ANOTHER VIEW!</Text>
    </View>
  )
};
