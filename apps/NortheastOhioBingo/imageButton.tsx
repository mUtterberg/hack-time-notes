import { Image, Touchable, TouchableOpacity, View } from 'react-native';
import { appStyles } from './styles';

export default function ImageButton({ navigation }: { navigation: any }) {
  return (
    <>
    <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={appStyles.imageContainer}>
    <View style={appStyles.imageContainer}>
      <Image
        style={appStyles.banner}
        source={{
          uri: 'https://www.onlyinyourstate.com/wp-content/uploads/2019/10/29015623688_1fc59b7c8b_k.jpg',
        }}
        />
    </View>
    </TouchableOpacity>
    </>
  )
}