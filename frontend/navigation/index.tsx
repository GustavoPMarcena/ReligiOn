import { NavigationContainer } from '@react-navigation/native';
import AuthRoutes from './AuthRoutes';
import AppRoutes from './AppRoutes';

export default function Routes() {
  const isAuthenticated = false; 

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}