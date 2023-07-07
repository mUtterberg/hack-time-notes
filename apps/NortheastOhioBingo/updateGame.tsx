import { Button, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';


export default function UpdateGame() {
  const navigation = useNavigation();
  return (
    <>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
    <Text>UpdateGame</Text>
    <Button title="Go to Bingo" onPress={() => navigation.navigate('Bingo')} />
    <Button title="Back to Games" onPress={() => navigation.navigate('Games')} />
    </View>
    </>
  )
}