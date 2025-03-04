import React from 'react'
import { Image, Platform } from 'react-native'
import { Marker } from 'react-native-maps'

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

  return (
    <>
      <Marker
        key={item.id_falla}
        coordinate={{
          latitude: item.geo_shape.geometry.coordinates[1],
          longitude: item.geo_shape.geometry.coordinates[0]
        }}
        title={item.nombre}
        icon={require('../assets/marker-icon.png')}
        onPress={handleMarkerPress} // Manejar el clic en el Marker
      >
        {/* {Platform.OS !== 'android' && (
          <Image
            source={require('../assets/marker-icon.png')}
            style={{ width: 50, height: 50 }}
          />
        )} */}
      </Marker>
    </>
  )
}
