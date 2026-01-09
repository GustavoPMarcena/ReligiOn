import { NavigationContainer } from '@react-navigation/native';
import AuthRoutes from './AuthRoutes';
import AppRoutes from './AppRoutes';
import { useAuth } from '../hooks/useAuth';

export default function Routes() {
  const { tokenState } =  useAuth();

  return (
    <NavigationContainer>
      {tokenState ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}