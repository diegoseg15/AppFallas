import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native'

export default function TooltipModal ({ showTooltip, closeTooltip, dataItem }) {
  return (
    <Modal
      visible={showTooltip}
      transparent={true}
      animationType='slide'
      onRequestClose={closeTooltip}
    >
      {/* Overlay para cerrar al tocar fuera del modal */}
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1} // Evita que el overlay cambie de color al tocarlo
        onPress={closeTooltip} // Cierra el modal al tocar fuera
      >
        {/* Contenedor del modal */}
        <View style={styles.tooltipContainer}>
          {/* Botón de cerrar (X) */}
          <TouchableOpacity onPress={closeTooltip} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>
              <Ionicons name='close' style={{ fontSize: 16 }} />
            </Text>
          </TouchableOpacity>

          {/* Contenido del modal */}
          <Image
            source={{ uri: dataItem?.boceto }}
            style={{ width: 200, height: 200, borderRadius: 5, marginTop: 20 }}
          />
          <Text style={styles.tooltipText}>{dataItem?.nombre}</Text>
          <Text style={styles.tooltipDescription}>{dataItem?.lema}</Text>
          <TouchableOpacity onPress={closeTooltip} style={styles.Button}>
            <Text style={styles.buttonText}>Mas Información</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  tooltipContainer: {
    width: 250,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative' // Para posicionar el botón de cerrar
  },
  tooltipText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10
  },
  tooltipDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5
  },
  closeButton: {
    position: 'absolute', // Posiciona el botón en la esquina superior derecha
    top: 5,
    right: 5,
    padding: 10
  }
})
