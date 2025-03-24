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
  categoriaSeleccionada,
  searchText
}) {
  //Filtramos por categoria
  const itemsFiltrados = VLCitems.concat(VLCitemsInfantil).filter(item => {
    const seccion = item.seccion?.toLowerCase() || ''
    const nombre = item.nombre?.toLowerCase() || ''
    const query = searchText.toLowerCase()
  
    const coincideCategoria =
      categoriaSeleccionada === 'Todas' || seccion.includes(categoriaSeleccionada.toLowerCase())
  
    const coincideBusqueda =
      nombre.includes(query) || seccion.includes(query)
  
    return coincideCategoria && coincideBusqueda
  })
  

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
