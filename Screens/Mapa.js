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
  const [newRegion, setNewRegion] = useState(null)
  const [VLCitems, setVLCitems] = useState([])
  const [showTooltip, setShowTooltip] = useState(false)
  const [dataItem, setDataItem] = useState(null)
  const [permission, setPermission] = useState(null)

  const initialRegion = {
    latitude: 39.4699,
    longitude: -0.3763,
    latitudeDelta: 2,
    longitudeDelta: 2
  }

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

  const loadData = () => {
    fetch(
      'https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/falles-fallas/records?limit=-1'
    )
      .then(response => response.json())
      .then(responseJson => {
        setVLCitems(responseJson.results)
      })
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
            setShowTooltip={setShowTooltip}
            setDataItem={setDataItem}
          />
        ) : (
          <Lista navigation={navigation} VLCitems={VLCitems} />
        )}
      </View>

      <CategoryList
        mostrarCategorias={mostrarCategorias}
        toggleCategorias={toggleCategorias}
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
    backgroundColor: 'white'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7,
    backgroundColor: 'white'
  }
})
