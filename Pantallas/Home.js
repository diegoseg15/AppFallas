import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Home({ route }) {
  const { usuario } = route.params; // 🔹 Recibimos el usuario

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bienvenido a Valencia, {usuario} </Text>
      <Text style={styles.subtitle}>¡Valencia is on faller!</Text>

      {/* Fechas Clave */}
      <View style={styles.section}>
        <Text style={styles.heading}>🗓 Fechas Clave</Text>
        <Text style={styles.text}><Text style={styles.textbold}>1 de marzo:</Text> Inicio de las mascletàs en la Plaza del Ayuntamiento.</Text>
        <Text style={styles.text}><Text style={styles.textbold}>15 de marzo:</Text> Plantà de las fallas grandes e infantiles.</Text>
        <Text style={styles.text}><Text style={styles.textbold}>16 y 17 de marzo:</Text> Ofrenda de Flores a la Virgen de los Desamparados.</Text>
        <Text style={styles.text}><Text style={styles.textbold}>18 de marzo:</Text> Nit del Foc, el mayor espectáculo de fuegos artificiales.</Text>
        <Text style={styles.text}><Text style={styles.textbold}>19 de marzo:</Text> Cremà, quema de las fallas y fin de la fiesta.</Text>
      </View>

      {/* Historia y Origen */}
      <View style={styles.section}>
        <Text style={styles.heading}>🔥 Historia y Origen</Text>
        <Text style={styles.text}>
          Las Fallas de Valencia tienen su origen en una tradición de los carpinteros valencianos, quienes quemaban los
          restos de madera sobrante cada 19 de marzo, día de San José. Esta costumbre evolucionó a lo largo de los años
          hasta convertirse en los monumentos artísticos que conocemos hoy.
        </Text>
        <Text style={styles.text}>
          En 2016, las Fallas fueron declaradas Patrimonio Inmaterial de la Humanidad por la UNESCO.
        </Text>
      </View>

      {/* Eventos Destacados */}
      <View style={styles.section}>
        <Text style={styles.heading}>🎆 Eventos Destacados</Text>
        <Text style={styles.text}><Text style={styles.textbold}>Mascletàs (1-19 marzo, 14:00 h):</Text> Explosiones de pólvora en la Plaza del Ayuntamiento.</Text>
        <Text style={styles.text}><Text style={styles.textbold}>La Crida (último domingo de febrero):</Text> Inicio oficial de las Fallas.</Text>
        <Text style={styles.text}><Text style={styles.textbold}>Exposición del Ninot (febrero-marzo):</Text> Exposición donde se elige el ninot indultat.</Text>
        <Text style={styles.text}><Text style={styles.textbold}>Ofrenda de Flores (16-17 marzo):</Text> Miles de falleros llevan flores a la Virgen.</Text>
        <Text style={styles.text}><Text style={styles.textbold}>Nit del Foc (18 marzo):</Text> Gran castillo de fuegos artificiales.</Text>
        <Text style={styles.text}><Text style={styles.textbold}>Cremà (19 marzo):</Text> Quema de las fallas, cerrando la fiesta con la Falla del Ayuntamiento.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "White",
    paddingHorizontal: 20,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#F25041", marginTop: 20 },
  subtitle: { fontSize: 18, color: "#F25041", marginTop: 10 },
  section: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "white",  // Un color ligeramente diferente para el fondo de las secciones
    borderRadius: 10,  // Bordes redondeados
    borderWidth: 3,  // El grosor del borde
    borderColor: "#F25041",  // Color blanco para el borde
  },
  heading: { fontSize: 22, fontWeight: "bold", color: "#F25041" },
  text: { fontSize: 16, color: "black", marginTop: 8 },
  textbold: { fontSize: 16, color: "#F25041", marginTop: 8, fontWeight: "bold"},

});
