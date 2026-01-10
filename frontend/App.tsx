import Routes from './routes';
import { useFonts } from 'expo-font';
import { Fonts } from './assets/fonts/font';
import { AuthProviderContext } from './context/AuthProvider';

export default function App() {
  const [fontsLoaded] = useFonts({
    'JosefinSans': Fonts.josephinRegular,
    'JosefinBold': Fonts.josephinBold,
    'JosefinSemiBold': Fonts.josephinSemiBold
  });

  if (!fontsLoaded) return null;

  return (
    <AuthProviderContext>
      <Routes />
    </AuthProviderContext>
  );
}
