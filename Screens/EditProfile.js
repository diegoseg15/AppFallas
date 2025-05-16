import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { useUsuario } from '../context/UsuarioContext'

/**
 * Pantalla para editar el perfil del usuario.
 *
 * @component
 * @param {object} props - Propiedades del componente.
 * @param {object} props.route - Objeto de navegación que contiene los parámetros de la ruta.
 * @param {object} props.route.params - Parámetros pasados a la pantalla.
 * @param {object} props.navigation - Objeto de navegación para controlar la navegación entre pantallas.
 *
 * @returns {JSX.Element} Componente de la pantalla de edición de perfil.
 *
 * @example
 * <EditProfile route={route} navigation={navigation} />
 */
export default function EditProfile({ route, navigation }) {
  const { item } = route.params
  const { usuario, setUsuario } = useUsuario()
  const [nombre, setNombre] = useState(usuario)

  const handleUsernameChange = () => {
    navigation.navigate('Main', {
      screen: 'Perfil',
      params: { updatedUsuario: nombre }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowContainer}>
          <Ionicons name="arrow-back-circle" size={40} color="#F25041" />
        </TouchableOpacity>
        <Text style={styles.title}>Editar Perfíl</Text>
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginHorizontal: 10 }}>Nombre(s)</Text>
      <TextInput style={{
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
      }} placeholder='Nombres'
        value={nombre}
        onChangeText={setNombre}
      />
      <TouchableOpacity style={{
        backgroundColor: '#F2B441',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
      }} onPress={() => {
        setUsuario(nombre)
        navigation.goBack()
      }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#F25041",
    flex: 1,
  },
  header: {
    flexDirection: 'row',  // Esto coloca la flecha y el título en una fila
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  arrowContainer: {
    marginRight: 10,
  },
});
