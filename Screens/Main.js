import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home'
import { Ionicons } from '@expo/vector-icons'
import Mapa from './Mapa'
import Profile from './Profile'
import Visited from './Visited'
import  Scan from './Scan'
import { useUsuario } from '../context/UsuarioContext'
import COLORS from '../Constants/Colors'

/**
 * Componente principal que define la navegación de pestañas inferiores (Bottom Tab Navigator) para la aplicación.
 * 
 * @function
 * @param {object} props - Propiedades del componente.
 * @param {object} props.route - Objeto de ruta proporcionado por React Navigation.
 * @param {object} props.navigation - Objeto de navegación proporcionado por React Navigation.
 * 
 * @returns {JSX.Element} Navegador de pestañas con las siguientes pantallas: Inicio, Scan, Mapa, Visitado y Perfil.
 * 
 * @description
 * - Utiliza `createBottomTabNavigator` para crear la navegación entre pantallas.
 * - Personaliza los estilos de la barra de pestañas y los iconos según la pantalla seleccionada.
 * - Comparte el estado `visitedFallas` entre las pantallas "Mapa" y "Visitado".
 * - Recibe y pasa el usuario autenticado a las pantallas que lo requieren.
 */
export default function Main ({ route, navigation }) {
  const Tab = createBottomTabNavigator()
  const [visitedFallas, setVisitedFallas] = useState([])
  const { usuario, setUsuario } = useUsuario()


  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerStyle: { backgroundColor: COLORS.light.primary },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: COLORS.light.primary },
        tabBarActiveTintColor: COLORS.light.secondary, // Color cuando está seleccionado
        tabBarInactiveTintColor: 'white', // Color cuando NO está seleccionado
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          switch (route.name) {
            case 'Inicio':
              iconName = focused ? 'home' : 'home-outline'
              break
            case 'Scan':
              iconName = focused ? 'scan' : 'scan-outline'
              break
            case 'Mapa':
              iconName = focused ? 'map' : 'map-outline'
              break
            case 'Visitado':
              iconName = focused
                ? 'checkmark-circle'
                : 'checkmark-circle-outline'
              break
            case 'Perfil':
              iconName = focused ? 'person' : 'person-outline'
              break
            default:
              iconName = 'help-circle'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
    >
      <Tab.Screen name='Inicio' component={Home} initialParams={{ usuario }} />
      <Tab.Screen name='Scan' component={Scan} initialParams={{ usuario }} />
      <Tab.Screen
        name='Mapa'
        children={props => (
          <Mapa
            {...props}
            visitedFallas={visitedFallas}
            setVisitedFallas={setVisitedFallas}
          />
        )}
      />

      <Tab.Screen
        name='Visitado'
        children={props => (
          <Visited
            {...props}
            visitedFallas={visitedFallas}
            setVisitedFallas={setVisitedFallas} // 👈
          />
        )}
      />

      <Tab.Screen
        name='Perfil'
        component={Profile}
      />
      
    </Tab.Navigator>
  )
}
