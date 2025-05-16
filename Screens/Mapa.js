// src/screens/Mapa.js
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useFallasContext } from '../context/FallasContext';
import MapViewComponent from '../components/MapViewComponent';
import SegmentedControl from '../components/SegmentedControl';
import CategoryList from '../components/CategoryList';
import TooltipModal from '../components/TooltipModal';
import Lista from './Lista';
import * as Location from 'expo-location';
import COLORS from '../Constants/Colors';

/**
 * Componente principal de la pantalla de Mapa.
 * 
 * Muestra un mapa interactivo con la ubicación actual del usuario, permite buscar fallas por nombre o sección,
 * filtrar por categorías y alternar entre vista de mapa y lista. También gestiona la visualización de tooltips
 * con información detallada y el registro de fallas visitadas.
 * 
 * @component
 * @param {object} props - Propiedades del componente.
 * @param {object} props.navigation - Objeto de navegación de React Navigation.
 * @param {function} props.setVisitedFallas - Función para actualizar la lista de fallas visitadas.
 * @param {Array} props.visitedFallas - Lista de fallas que el usuario ha visitado.
 * 
 * @returns {JSX.Element} Vista de la pantalla de mapa con controles de búsqueda, filtrado y navegación.
 */
export default function Mapa({ navigation, setVisitedFallas, visitedFallas }) {
  const [vista, setVista] = useState('mapa');
  const [mostrarCategorias, setMostrarCategorias] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [dataItem, setDataItem] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [searchText, setSearchText] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null)
  
  const [newRegion, setNewRegion] = useState({
    latitude: 39.4699,
    longitude: -0.3763,
    latitudeDelta: 0.05, // Ajuste del zoom
    longitudeDelta: 0.05, // Ajuste del zoom
  });

  const mapView = useRef(null);

  const { VLCitems, VLCitemsInfantil } = useFallasContext();


  // UseEffect para obtener la ubicación solo la primera vez que se renderiza el mapa
  useEffect(() => {
    if (vista === 'mapa') {
      const getCurrentLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({});
          let region = {
            latitude: parseFloat(location.coords.latitude),
            longitude: parseFloat(location.coords.longitude),
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          };
          setNewRegion(region);
          setCurrentLocation(location.coords)
          mapView.current.animateToRegion(region, 2000); // Animar al centro de la ubicación
        } else {
          alert('Permission to access location was denied');
        }
      };
      getCurrentLocation();
    }
  }, [vista]); // Este efecto solo se ejecutará cuando la vista sea "mapa"

  const toggleCategorias = () => {
    setMostrarCategorias(!mostrarCategorias);
  };

  const closeTooltip = () => {
    setShowTooltip(false);
    setDataItem(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedControl vista={vista} setVista={setVista} />
      <TextInput
        placeholder="Buscar por nombre o sección"
        value={searchText}
        onChangeText={setSearchText}
        style={{
          backgroundColor: '#fff',
          padding: 10,
          margin: 10,
          borderRadius: 8,
          borderColor: '#ccc',
          borderWidth: 1,
        }}
      />

      <View style={styles.contentContainer}>
        {vista === 'mapa' ? (
          <MapViewComponent
            mapViewRef={mapView}
            newRegion={newRegion}
            VLCitems={VLCitems}
            VLCitemsInfantil={VLCitemsInfantil}
            setShowTooltip={setShowTooltip}
            setDataItem={setDataItem}
            categoriaSeleccionada={categoriaSeleccionada}
            searchText={searchText}
          />
        ) : (
          <Lista
            navigation={navigation}
            VLCitems={VLCitems}
            categoriaSeleccionada={categoriaSeleccionada}
            searchText={searchText}
            currentLocation={currentLocation}
          />
        )}
      </View>

      <CategoryList
        mostrarCategorias={mostrarCategorias}
        toggleCategorias={toggleCategorias}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
      />

      <TooltipModal
        navigation={navigation}
        showTooltip={showTooltip}
        closeTooltip={closeTooltip}
        dataItem={dataItem}
        currentLocation={currentLocation}
        visitedFallas={visitedFallas}
        setVisitedFallas={setVisitedFallas}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.backgroundColor2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7,
    backgroundColor: 'white',
  },
});
