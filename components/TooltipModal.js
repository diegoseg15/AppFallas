import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native';
import COLORS from '../Constants/Colors';

export default function TooltipModal({
  navigation,
  showTooltip,
  closeTooltip,
  dataItem,
  currentLocation,
  visitedFallas,
  setVisitedFallas
}) {
  function calcularDistancia(coord1, coord2) {
    const toRad = x => (x * Math.PI) / 180;
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

  const handleMarkAsVisited = () => {
    if (!visitedFallas.find(f => f.id_falla === dataItem.id_falla)) {
      setVisitedFallas(prevState => [...prevState, dataItem]); // Actualiza el estado
      closeTooltip(); // Cierra el modal
    }
  };

  return (
    <Modal
      key={dataItem?.id_falla}
      visible={showTooltip}
      transparent={true}
      animationType='slide'
      onRequestClose={closeTooltip}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={closeTooltip}
      >
        <View style={styles.tooltipContainer}>
          {/* Botón de cerrar */}
          <TouchableOpacity onPress={closeTooltip} style={styles.closeButton}>
            <Ionicons name='close' style={{ fontSize: 18, color: COLORS.light.accent }} />
          </TouchableOpacity>

          {/* Contenido del modal */}
          <Image
            source={{ uri: dataItem?.boceto }}
            style={styles.image}
          />
          <Text style={styles.tooltipText}>{dataItem?.nombre}</Text>
          <Text style={styles.tooltipDescription}>{dataItem?.lema}</Text>
        

          {dataItem && currentLocation && (
            <Text style={styles.distanceText}>
              {calcularDistancia(currentLocation, {
                latitude: dataItem.geo_shape.geometry.coordinates[1],
                longitude: dataItem.geo_shape.geometry.coordinates[0]
              }).toFixed(2)}{' '}
              km
            </Text>
          )}

          {/* Botón de Visitado */}
          {dataItem && (
            <TouchableOpacity
              onPress={handleMarkAsVisited} // Llamamos a la función para marcar como visitada
              style={[styles.buttonInfo, { backgroundColor: COLORS.light.accent }]}
            >
              <Ionicons name='checkmark-circle' size={20} color='white' style={styles.icon} />
              <Text style={styles.buttonInfoText}>Visitado</Text>
            </TouchableOpacity>
          )}

          {/* Botón para más información */}
          <TouchableOpacity
            onPress={() => {
              closeTooltip();
              navigation.navigate('DetalleFalla', { item: dataItem });
            }}
            style={[styles.buttonInfo, { backgroundColor: COLORS.light.accent }]}
          >
            <Ionicons name='information-circle' size={20} color='white' style={styles.icon} />
            <Text style={styles.buttonInfoText}>Más Información</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  tooltipContainer: {
    width: '80%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative'
  },
  tooltipText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    alignContent: 'center'
  },
  tooltipDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    marginBottom: 10
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    backgroundColor: '#e3f0ff',
    borderRadius: 20
  },
  buttonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.light.accent,
    width: '100%',
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center'
  },
  buttonInfoText: {
    textAlign: 'center',
    color: 'white',
    marginLeft: 10
  },
  icon: {
    marginRight: 10
  },
  itemInfo: {
    flexDirection: 'row',
    marginVertical: 5
  },
  label: {
    paddingRight: 5,
    color: COLORS.light.primary
  },
  distanceText: {
    marginTop: 5,
    fontSize: 14,
    color: '#333'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 5,
    marginTop: 20
  }
});

