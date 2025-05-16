import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars"; // Importamos el componente Calendar
import { useUsuario } from '../context/UsuarioContext'
import COLORS from "../Constants/Colors"; // Asegúrate de tener este archivo con los colores definidos

/**
 * Componente principal de la pantalla de inicio de la aplicación Fallas App.
 * 
 * Muestra una bienvenida personalizada al usuario, un calendario interactivo con fechas marcadas de eventos importantes
 * y un modal con información detallada del evento seleccionado.
 * 
 * @component
 * @param {object} props - Propiedades recibidas por el componente.
 * @param {object} props.route - Objeto de navegación de React Navigation.
 * 
 * @returns {JSX.Element} Vista de la pantalla principal con calendario de eventos y modal informativo.
 * 
 * @example
 * <Home route={route} />
 * 
 * @description
 * - Utiliza el contexto de usuario para mostrar el nombre del usuario.
 * - Permite seleccionar fechas en el calendario para ver información de eventos relevantes.
 * - Muestra un modal con la descripción del evento al seleccionar una fecha marcada.
 */
export default function Home({ route }) {
  const { usuario, setUsuario } = useUsuario()

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
          markedDates={eventDates}
          markingType="dot"
          monthFormat="MMMM yyyy"
          style={styles.calendar}
          onDayPress={handleDayPress}
          theme={{
            textSectionTitleColor: COLORS.light.secondary,
            selectedDayBackgroundColor: COLORS.light.primary,
            todayTextColor: COLORS.light.secondary,
            textDisabledColor: '#d9e1e8',
            dotColor: COLORS.light.primary,
            arrowColor: COLORS.light.primary,
            monthTextColor: COLORS.light.primary,
            textDayFontWeight: '500',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
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
    backgroundColor: COLORS.light.backgroundColor2,
    borderRadius: 10,
    elevation: 5, // Sombra en Android
    shadowColor: COLORS.light.primary, // Sombra roja
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginBottom: 20,
    alignItems: 'center', // Centrado del contenido dentro del card
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.light.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.light.secondary,
    fontWeight: 'bold',
    marginTop: 17,
    textAlign: 'center',
  },
  calendarContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: COLORS.light.primary,
    elevation: 5, // Sombra en Android
    shadowColor: COLORS.light.primary, // Sombra roja
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
    borderColor: COLORS.light.primary,
    borderWidth: 2,
  },
  modalText: {
    fontSize: 16,
    color: "black",
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.light.primary,
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
