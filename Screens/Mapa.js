import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import MapViewComponent from '../components/MapViewComponent'
import SegmentedControl from '../components/SegmentedControl'
import CategoryList from '../components/CategoryList'
import TooltipModal from '../components/TooltipModal'
import * as Location from 'expo-location'
import Lista from './Lista'

export default function Mapa ({ navigation }) {
  const [vista, setVista] = useState('mapa')
  const [mostrarCategorias, setMostrarCategorias] = useState(false)
  const mapView = useRef(null)
  const [VLCitems, setVLCitems] = useState([])
  const [VLCitemsInfantil, setVLCitemsInfantil] = useState([])
  const [showTooltip, setShowTooltip] = useState(false)
  const [dataItem, setDataItem] = useState(null)
  const [permission, setPermission] = useState(null)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas') // Estado para la categoría

  const initialRegion = {
    latitude: 39.4699,
    longitude: -0.3763,
    latitudeDelta: 2,
    longitudeDelta: 2
  }

  const [newRegion, setNewRegion] = useState(initialRegion)

  useEffect(() => {
    const getCurrentLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status === 'granted') {
        setPermission(true)
        let location = await Location.getCurrentPositionAsync({})
        let region = {
          latitude: parseFloat(location.coords.latitude),
          longitude: parseFloat(location.coords.longitude),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }
        setNewRegion(region)
        mapView.current.animateToRegion(region, 2000)
      } else {
        setPermission(false)
        alert('Permission to access location was denied')
      }
    }

    getCurrentLocation()
    loadData()
  }, [])

  const loadData = async () => {
    let allRecordsMayor = []
    let allRecordsInfantil = []
    let limit = 100
    let totalRecords = 349 // Sabemos que hay 349 registros

    for (let offset = 0; offset < totalRecords; offset += limit) {
      try {
        const responseFallasMayor = await fetch(
          `https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/falles-fallas/records?limit=${limit}&offset=${offset}`
        )
        const dataMayor = await responseFallasMayor.json()

        const responseFallasInfantil = await fetch(
          `https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/falles-infantils-fallas-infantiles/records?limit=${limit}&offset=${offset}`
        )

        const dataInfantil = await responseFallasInfantil.json()

        allRecordsMayor = allRecordsMayor.concat(dataMayor.results)
        allRecordsInfantil = allRecordsInfantil.concat(dataInfantil.results)
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    setVLCitems(allRecordsMayor) // Guarda los 349 registros en el estado
    setVLCitemsInfantil(allRecordsInfantil)
  }

  const toggleCategorias = () => {
    setMostrarCategorias(!mostrarCategorias)
  }

  const closeTooltip = () => {
    setShowTooltip(false)
    setDataItem(null)
  }

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedControl vista={vista} setVista={setVista} />

      <View style={styles.contentContainer}>
        {vista === 'mapa' ? (
          <MapViewComponent
            mapViewRef={mapView}
            initialRegion={initialRegion}
            newRegion={newRegion}
            VLCitems={VLCitems}
            VLCitemsInfantil={VLCitemsInfantil}
            setShowTooltip={setShowTooltip}
            setDataItem={setDataItem}
            categoriaSeleccionada={categoriaSeleccionada}
          />
        ) : (
          <Lista
            navigation={navigation}
            VLCitems={VLCitems}
            categoriaSeleccionada={categoriaSeleccionada}
          />
        )}
      </View>

      <CategoryList
        mostrarCategorias={mostrarCategorias}
        toggleCategorias={toggleCategorias}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
      />

      <TooltipModal
        showTooltip={showTooltip}
        closeTooltip={closeTooltip}
        dataItem={dataItem}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7,
    backgroundColor: 'white'
  }
})
