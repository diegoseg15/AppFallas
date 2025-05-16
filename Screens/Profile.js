import { Ionicons } from '@expo/vector-icons'
import React, { act, useEffect } from 'react'
import { Image, TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native'
import { useUsuario } from '../context/UsuarioContext'
import COLORS from '../Constants/Colors'

export default function Profile({ route, navigation }) {
  const { usuario, setUsuario } = useUsuario()

  useEffect(() => {
    if (route.params?.updatedUsuario) {
      setUsuario(route.params.updatedUsuario)
    }
  }, [route.params?.updatedUsuario])

  const menu = [
    { title: 'Editar Perfíl', icon: 'person', screen: 'EditProfile' },
    { title: 'Acerca de (v1.0.0)', icon: 'information-circle', action: 'about' },
    { title: 'Cerrar Sesión', icon: 'log-out', action: 'logout' }
  ]
  return (
    <View>
      <View style={styles.bannerProfile}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          }}
        />
        <Text style={styles.user}>{usuario}</Text>
      </View>
      <View style={styles.menuProfile}>
        {menu.map(
          (item, index) =>
            index <= 1 && (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() =>
                  item.screen
                    ? navigation.navigate(item.screen, { title: item.title, usuario, setUsuario })
                    : item.action === 'about' ? Alert.alert(
                      'Acerca de',
                      'Esta aplicación te indica los lugares con un mapa de las Fallas de Valencia.\n\nDesarrollada por Diego Segovia y Marco Rodas, estudiantes de la Universidad de Valencia.\n\nVersión: 1.0.0\nCódigo abierto.'
                    ) : console.log(item.action)

                }>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name={item.icon} style={styles.icon} />
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <Ionicons name='chevron-forward' style={styles.icon} />
              </TouchableOpacity>
            )
        )}
      </View>
      <View style={styles.menuProfile}>
        {menu.map(
          (item, index) =>
            index > 1 && (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() =>
                  item.screen
                    ? navigation.navigate(item.screen, { title: item.title })
                    : item.action === 'logout' ? navigation.navigate('Login', { usuario: '' }) : console.log(item.action)
                }
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name={item.icon} style={styles.icon} />
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <Ionicons name='chevron-forward' style={styles.icon} />
              </TouchableOpacity>
            )
        )}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  bannerProfile: {
    backgroundColor: '#F25041',
    height: 230,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10
  },
  user: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white"
  },
  menuProfile: {
    backgroundColor: COLORS.light.secondary,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginHorizontal: 25,
    marginTop: 18,
    borderRadius: 15,
    paddingHorizontal: 20
  },
  menuItem: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between'
  },
  icon: {
    fontSize: 24,
    color: 'white'
  },
  menuItemText: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10
  }
})
