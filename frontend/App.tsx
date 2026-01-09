import Routes from './navigation';
import { useFonts } from 'expo-font';
import { Fonts } from './assets/fonts/font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'JosefinSans': Fonts.josephin,
  });

  if (!fontsLoaded) return null;
  return (
    <Routes />
  );
}
