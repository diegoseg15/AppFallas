import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useFallasContext } from '../context/FallasContext';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../Constants/Colors';

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
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
      }}>
        <Ionicons name="camera-outline" size={64} color={COLORS.light.primary} style={{ marginBottom: 20 }} />

        <Text style={{
          fontSize: 18,
          fontWeight: '500',
          textAlign: 'center',
          color: '#333',
          marginBottom: 10
        }}>
          Necesitamos tu permiso para usar la cámara
        </Text>

        <Button onPress={requestPermission} title="Dar permiso" color={COLORS.light.secondary} />
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

      <View style={styles.scanFrame}>
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerTopRight} />
        <View style={styles.cornerBottomLeft} />
        <View style={styles.cornerBottomRight} />
      </View>


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
  scanFrame: {
    position: 'absolute',
    top: '30%',
    left: '15%',
    width: '70%',
    height: '40%',
    borderColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 1,
    borderRadius: 10,
  },

  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: COLORS.light.secondary,
  },

  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: COLORS.light.secondary,
  },

  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: COLORS.light.secondary,
  },

  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: COLORS.light.secondary,
  },

});
