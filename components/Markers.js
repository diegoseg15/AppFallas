import React from 'react'
import { Image, Platform } from 'react-native'
import { Marker } from 'react-native-maps'
import COLORS from '../Constants/Colors'

/**
 * Componente que renderiza un marcador personalizado en el mapa.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.item - Objeto que contiene la información de la falla a mostrar en el marcador.
 * @param {Function} props.setShowTooltip - Función para mostrar el tooltip al presionar el marcador.
 * @param {Function} props.setDataItem - Función para establecer el item seleccionado en el estado.
 * @returns {JSX.Element|null} El marcador a renderizar en el mapa o null si no hay item.
 */
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
      pinColor={COLORS.light.primary}
      onPress={handleMarkerPress} // Manejar el clic en el Marker
    ></Marker>
  )
}
