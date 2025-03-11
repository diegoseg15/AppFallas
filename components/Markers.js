import React from 'react'
import { Image, Platform } from 'react-native'
import { Marker } from 'react-native-maps'
import COLORS from '../Constants/Colors'

export default function Markers ({ item, setShowTooltip, setDataItem }) {
  // Estado para controlar la visibilidad del tooltip

  if (!item) {
    return null
  }

  // Función para manejar el clic en el Marker
  const handleMarkerPress = () => {
    setShowTooltip(true) // Mostrar el tooltip
    setDataItem(item) // Guardar el item en el estado
  }

  return Platform.OS === 'android' ? (
    <Marker
      key={item.id_falla}
      coordinate={{
        latitude: item.geo_shape.geometry.coordinates[1],
        longitude: item.geo_shape.geometry.coordinates[0]
      }}
      title={item.nombre}
      image={require('../assets/marker-icon.png')}
      onPress={handleMarkerPress} // Manejar el clic en el Marker
    ></Marker>
  ) : (
    <Marker
      key={item.id_falla}
      coordinate={{
        latitude: item.geo_shape.geometry.coordinates[1],
        longitude: item.geo_shape.geometry.coordinates[0]
      }}
      title={item.nombre}
      pinColor={item.seccionCOLORS.light.primary}
      onPress={handleMarkerPress} // Manejar el clic en el Marker
    ></Marker>
  )
}
