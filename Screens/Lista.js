import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../Constants/Colors";

export default function Lista({
  navigation,
  VLCitems,
  categoriaSeleccionada,
  searchText,
  currentLocation,
}) {
  function calcularDistancia(coord1, coord2) {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(coord2.latitude - coord1.latitude);
    const dLon = toRad(coord2.longitude - coord1.longitude);

    const lat1 = toRad(coord1.latitude);
    const lat2 = toRad(coord2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  // Filtramos por categoria
  const itemsFiltrados = VLCitems.filter((item) => {
    const seccion = item.seccion?.toLowerCase() || "";
    const nombre = item.nombre?.toLowerCase() || "";
    const query = searchText.toLowerCase();

    const coincideCategoria =
      categoriaSeleccionada === "Todas" ||
      seccion.includes(categoriaSeleccionada.toLowerCase());

    const coincideBusqueda = nombre.includes(query) || seccion.includes(query);

    return coincideCategoria && coincideBusqueda;
  })
    .map((item) => {
      // Calculamos la distancia si currentLocation existe
      const distancia = currentLocation
        ? calcularDistancia(currentLocation, {
            latitude: item.geo_shape.geometry.coordinates[1],
            longitude: item.geo_shape.geometry.coordinates[0],
          })
        : Infinity;
      return { ...item, distancia };
    })
    .sort((a, b) => a.distancia - b.distancia);

  const VLCitem = ({ item }) => {
    // Inicializamos el ícono por defecto
    let Icono = <FontAwesome5 name="fire" color="#FF9800" size={30} />;

    // Verificamos la sección y asignamos el ícono correspondiente
    if (item.seccion && typeof item.seccion === "string") {
      if (item.seccion.includes("A")) {
        Icono = (
          <MaterialCommunityIcons name="campfire" color="#F44336" size={30} />
        );
      } else if (item.seccion.includes("B")) {
        Icono = <FontAwesome5 name="fire" color="#FF9800" size={30} />;
      } else if (item.seccion.includes("C")) {
        Icono = (
          <MaterialCommunityIcons name="candle" color="#FFB74D" size={30} />
        );
      } else if (item.seccion.includes("E")) {
        Icono = <AntDesign name="star" color="#D32F2F" size={30} />;
      }
    }

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("DetalleFalla", { item: item })}
      >
        <View style={styles.card}>
          {/* Imagen - Izquierda */}
          <View style={styles.imageContainer}>{Icono}</View>

          {/* Texto - Centro */}
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {item.nombre || "Sin nombre"}
            </Text>
            {currentLocation && item.geo_shape.geometry.coordinates[1] && item.geo_shape.geometry.coordinates[0] && (
              <Text style={styles.subtitle}>
                {calcularDistancia(currentLocation, {
                  latitude: item.geo_shape.geometry.coordinates[1],
                  longitude: item.geo_shape.geometry.coordinates[0],
                }).toFixed(2)}{" "}
                km
              </Text>
            )}
            <Text
              style={styles.subtitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.seccion ? `Sección: ${item.seccion}` : "Sin sección"}
            </Text>
          </View>

          {/* Flecha - Derecha */}
          <View style={styles.arrowContainer}>
            <Ionicons name="arrow-forward" size={24} color="#F25041" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={itemsFiltrados}
        renderItem={VLCitem}
        keyExtractor={(item) =>
          item.objectid ? item.objectid.toString() : "default-key"
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.light.backgroundColor2,
    padding: 10,
  },
  card: {
    flexDirection: "row", // Distribuye los elementos en fila
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
    padding: 15,
    marginVertical: 6,
    shadowColor:  COLORS.light.primary,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Para Android
  },
  imageContainer: {
    width: "15%", // Ajusta el espacio de la imagen
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  textContainer: {
    width: "70%", // Ajusta el espacio del texto
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F25041",
  },
  subtitle: {
    fontSize: 14,
    color: "black",
    marginTop: 5,
  },
  arrowContainer: {
    width: "10%", // Ajusta el espacio de la flecha
    justifyContent: "center",
    alignItems: "center",
  },
});
