import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function DetalleFalla({ route }) {
    const { item } = route.params;  // Accedes al item que pasaste

    return (
        <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.nombre}</Text>
          <Image source={{ uri: item.boceto }} style={styles.image} />
        </View>
  
        <View style={styles.details}>
          <Text style={styles.text}><Text style={styles.textbold}>Sección:</Text> {item.seccion}</Text>
          <Text style={styles.text}><Text style={styles.textbold}>Fallera:</Text> {item.fallera}</Text>
          <Text style={styles.text}><Text style={styles.textbold}>Presidente:</Text> {item.presidente}</Text>
          <Text style={styles.text}><Text style={styles.textbold}>Artista:</Text> {item.artista}</Text>
          <Text style={styles.text}><Text style={styles.textbold}>Lema:</Text> {item.lema}</Text>
          <Text style={styles.text}><Text style={styles.textbold}>Año de Fundación:</Text> {item.anyo_fundacion}</Text>
          <Text style={styles.text}><Text style={styles.textbold}>Distintivo:</Text> {item.distintivo}</Text>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: '#fff',
    },
    textbold: { fontSize: 16, color: "#F25041", marginTop: 8, fontWeight: "bold"},
    header: {
      alignItems: 'center',
      marginBottom: 20,
      marginTop:30
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color:"#F25041"
    },
    image: {
      width: 300,
      height: 300,
      borderRadius: 10,
      marginBottom: 5,
      borderColor:"#F25041",
      borderWidth:2
    },
    details: {
    
      paddingHorizontal: 8,
      alignItems:"Left"

    },
    text: {
      fontSize: 16,
      marginVertical: 5,
    },
  });
