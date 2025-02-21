
import Login from './Pantallas/Login';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from './Pantallas/Home';
import NavigationAppDemo from './Pantallas/NavigationAppDemo';
import Main from './Pantallas/Main';
import Lista from './Pantallas/Lista';
import DetalleFalla from './Pantallas/DetalleFalla';

export default function App() {
  const Stack = createStackNavigator();
  return (

  
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="Lista" component={Lista} options={{ headerShown: false }}/>
        <Stack.Screen name="DetalleFalla" component={DetalleFalla} options={{ headerShown: false }}/>
        
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}


