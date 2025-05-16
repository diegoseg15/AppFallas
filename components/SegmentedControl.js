import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import COLORS from '../Constants/Colors'

/**
 * Componente de control segmentado que permite alternar entre las vistas "mapa" y "lista".
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {'mapa'|'lista'} props.vista - Vista actualmente seleccionada.
 * @param {function} props.setVista - Función para actualizar la vista seleccionada.
 * @returns {JSX.Element} Elemento JSX que representa el control segmentado.
 */
export default function SegmentedControl ({ vista, setVista }) {
  return (
    <View style={styles.segmentedControl}>
      <TouchableOpacity
        style={[styles.button, vista === 'mapa' && styles.activeButton]}
        onPress={() => setVista('mapa')}
      >
        <Text
          style={[styles.buttonText, vista === 'mapa' && styles.activeText]}
        >
          Mapa
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, vista === 'lista' && styles.activeButton]}
        onPress={() => setVista('lista')}
      >
        <Text
          style={[styles.buttonText, vista === 'lista' && styles.activeText]}
        >
          Lista
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: COLORS.light.primary,
    borderRadius: 25,
    padding: 4,
    width: 200,
    alignSelf: 'center',
    marginTop: 10
  },
  button: {
    flex: 1,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor:  COLORS.light.primary,
    borderRadius: 20
  },
  activeButton: {
    backgroundColor: 'white'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  activeText: {
    color:  COLORS.light.primary
  }
})
