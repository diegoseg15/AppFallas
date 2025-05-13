import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useFallasContext } from '../context/FallasContext';

export default function Scan({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [dataItem, setDataItem] = useState(null);

  // Acceder al contexto para obtener VLCitems
  const { VLCitems } = useFallasContext();

  if (!permission) {
    return null; // Aún cargando permisos
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>
          Necesitamos tu permiso para usar la cámara
        </Text>
        <Button onPress={requestPermission} title="Dar permiso" />
      </View>
    );
  }


  // Manejo del escaneo del código de barras
  const handleBarcodeScanned = ({ type, data }) => {
    if (scanned) return;
    setScanned(true);

 

    // Buscar el dataItem correspondiente al object_id escaneado
    const foundItem = VLCitems.find(item => item.nombre === data);

    if (foundItem) {
      setDataItem(foundItem);
      // Navegar a la pantalla de DetalleFalla y pasar el item
      navigation.navigate('DetalleFalla', { item: foundItem });
    } else {
      alert('No se encontró la falla');
    }
  };

  return (
    <View style={styles.container}>
    <CameraView
      style={StyleSheet.absoluteFill}
      barcodeScannerSettings={{
        barcodeTypes: ['qr'], // solo QR
      }}
      onBarcodeScanned={handleBarcodeScanned}
    />

    {scanned && (
      <View style={styles.buttonContainer}>
        <Button title="Escanear otro código" onPress={() => setScanned(false)} />
      </View>
    )}
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
});
