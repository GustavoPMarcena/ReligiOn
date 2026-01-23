import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/home/Home';
import Inspiracional from '../screens/Inspiracional/Inspiracional';
import CreateInspiration from '../screens/createInspiration/CreateInspiration';
import Events from '../screens/eventts/Events';
import EventDetails from '../screens/eventDetails/EventDetails';
import CreateEvent from '../screens/CreateEvent/CreateEvent';
import EditEvent from '../screens/EditEvent/EditEvent';
import MyEvents from '../screens/MyEvents/MyEvents';
import MeusInspiracionais from '../screens/meusInspiracionais/MeusInspiracionais';
import EditInspiracional from '../screens/editInspiracional/EditInspiracional';
import Profile from '../screens/profile/Profile';
import Sermoes from '../screens/sermoes/sermoes/Sermoes';
import CreateSermao from '../screens/sermoes/CreateSermao/CreateSermao';
import MySermoes from '../screens/sermoes/MySermoes/MySermoes';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
      <Stack.Screen options={{headerShown: false}} name="Profile" component={Profile} />
      <Stack.Screen options={{headerShown: false}} name="Sermoes" component={Sermoes} />
      <Stack.Screen options={{headerShown: false}} name="CreateSermao" component={CreateSermao} />
      <Stack.Screen options={{headerShown: false}} name="MeusSermoes" component={MySermoes} />
      <Stack.Screen options={{headerShown: false}} name="Inspiracional" component={Inspiracional} />
      <Stack.Screen options={{headerShown: false}} name="CriarInspiracional" component={CreateInspiration}/>
      <Stack.Screen options={{headerShown: false}} name="Eventos" component={Events}/>
      <Stack.Screen options={{headerShown: false}} name="EventDetails" component={EventDetails} />
      <Stack.Screen options={{headerShown: false}} name="CreateEvent" component={CreateEvent} />
      <Stack.Screen options={{headerShown: false}} name="EditEvent" component={EditEvent} />
      <Stack.Screen options={{headerShown: false}} name="MyEvents" component={MyEvents} />
      <Stack.Screen options={{headerShown: false}} name='MeusInspiracionais' component={MeusInspiracionais}/>
      <Stack.Screen options={{headerShown: false}} name='EditInspiracional' component={EditInspiracional}/>
    </Stack.Navigator>
  );
}