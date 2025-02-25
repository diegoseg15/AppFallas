import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from "react-native";
import Lista from "./Lista";

export default function Mapa({navigation}) {
  const [vista, setVista] = useState("mapa");
  const [mostrarCategorias, setMostrarCategorias] = useState(false); // Estado para mostrar/ocultar categorías
  
  const categorias = [
    "Tecnología",
    "Ciencia",
    "Salud",
    "Arte",
    "Deportes",
    "Viajes",
  ];

  const toggleCategorias = () => {
    setMostrarCategorias(!mostrarCategorias);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Botones "Mapa" y "Lista" centrados */}
      <View style={styles.segmentedControl}>
        <TouchableOpacity
          style={[styles.button, vista === "mapa" && styles.activeButton]}
          onPress={() => setVista("mapa")}
        >
          <Text style={[styles.buttonText, vista === "mapa" && styles.activeText]}>Mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, vista === "lista" && styles.activeButton]}
          onPress={() => setVista("lista")}
        >
          <Text style={[styles.buttonText, vista === "lista" && styles.activeText]}>Lista</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido según la selección */}
      <View style={styles.contentContainer}>
        {vista === "mapa" ? (
          <Text style={styles.content}>🗺️ Aquí irá el mapa 📍</Text>
        ) : (
            // navigation.navigate("Lista",  navigation)
            <Lista navigation={navigation}/>
        )}
      </View>

      {/* Botón para desplegar categorías */}
      <TouchableOpacity style={styles.categoriasButton} onPress={toggleCategorias}>
        <Text style={styles.categoriasButtonText}>Categorías</Text>
      </TouchableOpacity>

      {/* Mostrar lista de categorías si 'mostrarCategorias' es verdadero */}
      {mostrarCategorias && (
        <View style={styles.categoriasContainer}>
          <FlatList
            data={categorias}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.categoriaItem}>{item}</Text>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#F25041",
    borderRadius: 25,
    padding: 4,
    width: 200,
    alignSelf: "center", // Centramos el contenedor de botones
    marginTop: 5, // Espacio superior para que no se pegue a la parte superior
  },
  button: {
    flex: 1,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#F25041", // Fondo de los botones no seleccionados
    borderRadius: 20,
  },
  activeButton: {
    backgroundColor: "white", // Fondo blanco para el botón seleccionado
  },
  buttonText: {
    color: "white", // Texto blanco por defecto
    fontSize: 16,
    fontWeight: "bold",
  },
  activeText: {
    color: "#F25041", // Color de texto para el botón seleccionado
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 7, // Espacio para el botón segmentado
    backgroundColor: "white",
  },
  content: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  categoriasButton: {
    position: "absolute",
    bottom: 8,
    alignSelf: "center", // Asegura que el botón esté centrado
    paddingVertical: 10,
    paddingHorizontal: 20, // Reducción del tamaño horizontal
    backgroundColor: "#F25041",
    alignItems: "center",
    borderRadius: 25,
  },
  categoriasButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  categoriasContainer: {
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  categoriaItem: {
    fontSize: 16,
    color: "#F25041",
    fontWeight: "bold",
    paddingVertical: 5,
  },
});
