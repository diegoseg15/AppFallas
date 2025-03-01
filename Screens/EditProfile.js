import React from 'react'
import { Text, TextInput, View } from 'react-native'

export default function EditProfile () {
  return (
    <View>
      <Text>Nombre(s)</Text>
      <TextInput placeholder='Nombres' />
      <Text>Apellidos</Text>
      <TextInput placeholder='Apellidos' />
      <Text>Usuario</Text>
      <TextInput placeholder='Usuarios' />
    </View>
  )
}
