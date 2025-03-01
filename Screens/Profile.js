import { Ionicons } from '@expo/vector-icons'
import React, { act } from 'react'
import { Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native'

export default function Profile ({ route }) {
  const { usuario } = route.params

  const menu = [
    { title: 'Editar Perfíl', icon: 'person', screen: 'EditProfile' },
    { title: 'Ubicación', icon: 'location', screen: 'Location' },
    { title: 'Notificaciones', icon: 'notifications', action: 'notifications' },
    { title: 'Favoritos', icon: 'heart', screen: 'Favorites' },
    { title: 'Contraseña', icon: 'key', screen: 'password' },
    { title: 'Idioma', icon: 'language', action: 'language' }
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
              <TouchableOpacity key={index} style={styles.menuItem}>
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
                    : console.log(item.action)
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
    textAlign: 'center'
  },
  menuProfile: {
    backgroundColor: '#F2B441',
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
