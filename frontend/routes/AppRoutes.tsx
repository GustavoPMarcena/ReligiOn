import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/home/Home';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
    </Stack.Navigator>
  );
}