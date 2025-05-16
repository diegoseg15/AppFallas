import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Linking} from 'react-native';

export default function DetalleFalla({ route, navigation }) {
  const { item } = route.params;

 
  const handleShare = async () => {
  const message = `Visita esta falla: ${item.nombre}. ¡No te la pierdas!`;
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'No se puede abrir WhatsApp');
    }
  } catch (error) {
    console.log('Error al compartir:', error);
  }
};
  

  const handleVisited = () => {
    // Aquí puedes hacer alguna acción, como cambiar el estado de "visitado"
    Alert.alert('Marcado como visitado', `${item.nombre} ha sido marcado como visitado`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowContainer}>
          <Ionicons name="arrow-back-circle" size={40} color="#F25041" />
        </TouchableOpacity>
        <Text style={styles.title}>{item.nombre}</Text>
      </View>

      <View style={styles.card}>
        <Image source={{ uri: item.boceto }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.text}>
            <Ionicons name="business" size={20} color="#F25041" />
            <Text style={styles.textbold}> Sección:</Text> {item.seccion}
          </Text>
          <Text style={styles.text}>
            <Ionicons name="person" size={20} color="#F25041" />
            <Text style={styles.textbold}> Fallera:</Text> {item.fallera}
          </Text>
          <Text style={styles.text}>
            <Ionicons name="person" size={20} color="#F25041" />
            <Text style={styles.textbold}> Presidente:</Text> {item.presidente}
          </Text>
          <Text style={styles.text}>
            <Ionicons name="brush" size={20} color="#F25041" />
            <Text style={styles.textbold}> Artista:</Text> {item.artista}
          </Text>
          <Text style={styles.text}>
            <Ionicons name="volume-high" size={20} color="#F25041" />
            <Text style={styles.textbold}> Lema:</Text> {item.lema}
          </Text>
          <Text style={styles.text}>
            <Ionicons name="calendar" size={20} color="#F25041" />
            <Text style={styles.textbold}> Año de Fundación:</Text> {item.anyo_fundacion}
          </Text>
          <Text style={styles.text}>
            <Ionicons name="star" size={20} color="#F25041" />
            <Text style={styles.textbold}> Distintivo:</Text> {item.distintivo}
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleShare}>
            <Ionicons name="share-social" size={24} color="white" />
            <Text style={styles.buttonText}>Compartir</Text>
          </TouchableOpacity>
          
        </View>
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
  textbold: { 
    fontSize: 16, 
    color: "#F25041", 
    marginTop: 8, 
    fontWeight: "bold"
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#F25041",
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,  // Para darle sombra en Android
    shadowColor: '#000',  // Para darle sombra en iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: "#F25041",
    borderWidth: 2,
  },
  details: {
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F25041',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '48%',  // Se asegura de que los botones estén en una línea
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
});
