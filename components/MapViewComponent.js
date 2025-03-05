import React from 'react'
import { StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Markers from './Markers'

export default function MapViewComponent ({
  mapViewRef,
  initialRegion,
  newRegion,
  VLCitems,
  setShowTooltip,
  setDataItem,
  categoriaSeleccionada
}) {

  
  //Filtramos por categoria
  const itemsFiltrados = categoriaSeleccionada === "Todas"
  ? VLCitems
  : VLCitems.filter(item => item.seccion && item.seccion.includes(categoriaSeleccionada))
  
  
  return (
    <MapView
      style={{ width: '100%', height: '100%' }}
      ref={mapViewRef}
      initialRegion={initialRegion}
      showsUserLocation
      showsMyLocationButton
      region={newRegion}
    >
      {itemsFiltrados.map(item => (
        <Markers
          key={item.id_falla}
          item={item}
          setShowTooltip={setShowTooltip}
          setDataItem={setDataItem}
        />
      ))}
    </MapView>
  )
}
