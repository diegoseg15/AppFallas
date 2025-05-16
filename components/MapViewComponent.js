import React from 'react'
import MapView from 'react-native-maps'
import Markers from './Markers'

/**
 * Componente que renderiza un mapa interactivo con marcadores filtrados por categoría y texto de búsqueda.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.RefObject} props.mapViewRef - Referencia al componente MapView.
 * @param {Object} props.initialRegion - Región inicial del mapa (latitud, longitud, etc).
 * @param {Object} props.newRegion - Nueva región del mapa (opcional, actualmente comentada).
 * @param {Array<Object>} props.VLCitems - Lista de elementos para mostrar en el mapa.
 * @param {Array<Object>} props.VLCitemsInfantil - Lista de elementos infantiles para mostrar en el mapa.
 * @param {Function} props.setShowTooltip - Función para mostrar u ocultar el tooltip de un marcador.
 * @param {Function} props.setDataItem - Función para establecer los datos del elemento seleccionado.
 * @param {string} props.categoriaSeleccionada - Categoría seleccionada para filtrar los elementos.
 * @param {string} props.searchText - Texto de búsqueda para filtrar los elementos.
 *
 * @returns {JSX.Element} El componente MapView con los marcadores filtrados.
 */
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
