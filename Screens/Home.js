import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars"; // Importamos el componente Calendar

export default function Home({ route }) {
  const { usuario } = route.params; // Recibimos el usuario

  // Fechas de los eventos clave
  const eventDates = {
    "2025-03-01": { marked: true, dotColor: "#F25041" },
    "2025-03-15": { marked: true, dotColor: "#F25041" },
    "2025-03-16": { marked: true, dotColor: "#F25041" },
    "2025-03-17": { marked: true, dotColor: "#F25041" },
    "2025-03-18": { marked: true, dotColor: "#F25041" },
    "2025-03-19": { marked: true, dotColor: "#F25041" },
  };

  // Eventos asociados a las fechas
  const events = {
    "2025-03-01": "Inicio de las Mascletàs (1-19 marzo, 14:00 h): Explosiones de pólvora en la Plaza del Ayuntamiento.",
    "2025-03-15": "La Crida (último domingo de febrero): Inicio oficial de las Fallas.",
    "2025-03-16": "Exposición del Ninot (febrero-marzo): Exposición donde se elige el ninot indultat.",
    "2025-03-17": "Ofrenda de Flores (16-17 marzo): Miles de falleros llevan flores a la Virgen.",
    "2025-03-18": "Nit del Foc (18 marzo): Gran castillo de fuegos artificiales.",
    "2025-03-19": "Cremà (19 marzo): Quema de las fallas, cerrando la fiesta con la Falla del Ayuntamiento.",
  };

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Función para manejar la selección de fecha
  const handleDayPress = (day) => {
    const event = events[day.dateString];
    if (event) {
      setSelectedEvent(event);
      setModalVisible(true); // Abrir el modal cuando hay un evento
    } else {
      setSelectedEvent(null); // Si no hay evento, no mostramos nada
      setModalVisible(false); // Cerrar el modal si no hay evento
    }
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Card de Bienvenida */}
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Bienvenido a Valencia, {usuario}</Text>
        <Text style={styles.subtitle}>¡Valencia is on faller!</Text>
      </View>

      {/* Calendario de Eventos */}
      <View style={styles.calendarContainer}>
        <Text style={styles.heading}>Eventos</Text>
        <Calendar
          markedDates={eventDates} // Aquí pasamos las fechas marcadas
          markingType="simple" // Tipo de marca para las fechas (puede ser 'dot' o 'simple')
          monthFormat="yyyy MM"
          style={styles.calendar}
          onDayPress={handleDayPress} // Llamamos a la función cuando se selecciona un día
        />
      </View>

      {/* Modal de Información del Evento Seleccionado */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{selectedEvent}</Text>
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "White",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    elevation: 5, // Sombra en Android
    shadowColor: '#F25041', // Sombra roja
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginBottom: 20,
    alignItems: 'center', // Centrado del contenido dentro del card
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F25041",
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: "#F25041",
    marginTop: 10,
    textAlign: 'center',
  },
  calendarContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#F25041",
    elevation: 5, // Sombra en Android
    shadowColor: '#F25041', // Sombra roja
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  calendar: {
    height: 350,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F25041",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#F25041",
    borderWidth: 2,
  },
  modalText: {
    fontSize: 16,
    color: "black",
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: "#F25041",
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
