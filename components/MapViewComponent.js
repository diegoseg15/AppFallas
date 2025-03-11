import React from 'react'
import MapView from 'react-native-maps'
import Markers from './Markers'

export default function MapViewComponent ({
  mapViewRef,
  initialRegion,
  newRegion,
  VLCitems,
  VLCitemsInfantil,
  setShowTooltip,
  setDataItem,
  categoriaSeleccionada
}) {
  //Filtramos por categoria
  const itemsFiltrados =
    categoriaSeleccionada === 'Todas'
      ? VLCitems.concat(VLCitemsInfantil)
      : VLCitems.concat(VLCitemsInfantil).filter(
          item => item.seccion && item.seccion.includes(categoriaSeleccionada)
        )

  return (
    <>
      <MapView
        style={{ width: '100%', height: '100%' }}
        ref={mapViewRef}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
        // region={newRegion}
      >
        {itemsFiltrados.map(
          item =>
            item.objectid && (
              <Markers
                key={item.objectid}
                item={item}
                setShowTooltip={setShowTooltip}
                setDataItem={setDataItem}
              />
            )
        )}
      </MapView>
    </>
  )
}
