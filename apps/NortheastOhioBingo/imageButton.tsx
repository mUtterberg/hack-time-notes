import { Image, TouchableOpacity, View } from 'react-native';
import { appStyles } from './styles';
import { useNavigation, useNavigationState } from '@react-navigation/native';

export default function ImageButton() {
  const navigation = useNavigation();
  const routes = useNavigationState(state => state.routeNames);
  const currentRoute = useNavigationState(state => state.routeNames[state.index]);
  const toggleRoute = routes.filter(route => route !== currentRoute)[0];
  return (
    <>
    <TouchableOpacity onPress={() => navigation.navigate(toggleRoute)} style={appStyles.imageContainer}>
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