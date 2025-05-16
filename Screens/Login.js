import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useUsuario } from "../context/UsuarioContext";

/**
 * Componente de pantalla de inicio de sesión.
 * 
 * @component
 * @param {object} props - Propiedades del componente.
 * @param {object} props.navigation - Objeto de navegación de React Navigation.
 * 
 * @returns {JSX.Element} Vista de la pantalla de login.
 * 
 * @description
 * Permite al usuario ingresar su nombre de usuario y contraseña para acceder a la aplicación.
 * Si el campo de usuario está vacío, muestra una alerta solicitando el ingreso del usuario.
 * Al iniciar sesión correctamente, navega a la pantalla principal ("Main").
 */
export default function Login({ navigation }) {
const { usuario, setUsuario } = useUsuario()

  const handleLogin = () => {
    if (usuario.trim() !== "") {
      navigation.navigate("Main", navigation); // 🔹 Pasamos "usuario" a Home
    } else {
      alert("Por favor, ingrese un usuario.");
    }
  };



  return (
    <View style={styles.container}>

      <LinearGradient
        // Background Linear Gradient
        colors={['#F2B441', 'transparent']}
        style={styles.background}
      />

      <Text style={styles.title}>Bienvenido!</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        keyboardType="default"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry

      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    backgroundColor: "#F25041"

  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 200,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "white",
    fontWeight: "bold",
    color: "#F25041",
  },
  button: {
    width: "70%",
    backgroundColor: "#F2B441",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
