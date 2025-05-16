
import Login from './Screens/Login';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from './Screens/Home';

import Main from './Screens/Main';
import Lista from './Screens/Lista';
import DetalleFalla from './Screens/DetalleFalla';
import { FallasProvider } from './context/FallasContext';
import EditProfile from './Screens/EditProfile';
import { UsuarioProvider } from './context/UsuarioContext';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <UsuarioProvider>

      <FallasProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
            <Stack.Screen name="Lista" component={Lista} options={{ headerShown: false }} />
            <Stack.Screen name="DetalleFalla" component={DetalleFalla} options={{ headerShown: false }} />
            <Stack.Screen name='EditProfile' component={EditProfile} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </FallasProvider>

    </UsuarioProvider>

  );
}


