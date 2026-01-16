import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/home/Home';
import Inspiracional from '../screens/Inspiracional/Inspiracional';
import CreateInspiration from '../screens/createInspiration/CreateInspiration';
import Events from '../screens/eventts/Events';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
      <Stack.Screen options={{headerShown: false}} name="Inspiracional" component={Inspiracional} />
      <Stack.Screen options={{headerShown: false}} name="CriarInspiracional" component={CreateInspiration}/>
      <Stack.Screen options={{headerShown: false}} name="Eventos" component={Events}/>
    </Stack.Navigator>
  );
}