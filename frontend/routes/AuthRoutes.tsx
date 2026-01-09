import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/login/Login';
import Signin from '../screens/signin/Signin';

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signin" component={Signin} />
    </Stack.Navigator>
  );
}