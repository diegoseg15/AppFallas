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
import COLORS from '../Constants/Colors'

export default function TooltipModal ({
  showTooltip,
  closeTooltip,
  dataItem,
  currentLocation
}) {
  function calcularDistancia (coord1, coord2) {
    const toRad = x => (x * Math.PI) / 180
    const R = 6371 // km
    const dLat = toRad(coord2.latitude - coord1.latitude)
    const dLon = toRad(coord2.longitude - coord1.longitude)

    const lat1 = toRad(coord1.latitude)
    const lat2 = toRad(coord2.latitude)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c
    return d
  }

  return (
    <Modal
      key={dataItem?.id_falla}
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
            <Ionicons name='close' style={{ fontSize: 26 }} />
          </TouchableOpacity>

          {/* Contenido del modal */}
          <Image
            source={{ uri: dataItem?.boceto }}
            style={{ width: 200, height: 200, borderRadius: 5, marginTop: 20 }}
          />
          <Text style={styles.tooltipText}>{dataItem?.nombre}</Text>
          <Text style={styles.tooltipDescription}>{dataItem?.lema}</Text>
          <View style={styles.itemInfo}>
            <Text style={{ paddingRight: 5, color: COLORS.light.primary }}>
              Fallera:
            </Text>
            <Text>{dataItem?.fallera}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={{ paddingRight: 5, color: COLORS.light.primary }}>
              Artista:
            </Text>
            <Text>{dataItem?.fallera}</Text>
          </View>
          {dataItem && currentLocation && (
            <Text style={{ marginTop: 5, fontSize: 14, color: '#333' }}>
              {calcularDistancia(currentLocation, {
                latitude: dataItem.geo_shape.geometry.coordinates[1],
                longitude: dataItem.geo_shape.geometry.coordinates[0]
              }).toFixed(2)}{' '}
              km
            </Text>
          )}

          <TouchableOpacity onPress={closeTooltip} style={styles.buttonInfo}>
            <Text style={styles.buttonInfoText}>Mas Información</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  tooltipContainer: {
    width: '100%',
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
    marginTop: 5,
    marginBottom: 10
  },
  closeButton: {
    position: 'absolute', // Posiciona el botón en la esquina superior derecha
    top: 8,
    right: 10,
    padding: 10,
    backgroundColor: '#e3f0ff',
    borderRadius: 10
  },
  buttonInfo: {
    padding: 10,
    backgroundColor: COLORS.light.accent,
    width: '100%',
    borderRadius: 10,
    marginVertical: 20
  },
  buttonInfoText: {
    textAlign: 'center',
    color: 'white'
  },
  itemInfo: {
    flexDirection: 'row'
  }
})
