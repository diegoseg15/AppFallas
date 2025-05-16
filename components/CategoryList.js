import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import COLORS from '../Constants/Colors';

const categorias = [
  { nombre: 'Todas', icono: 'view-list' },
  { nombre: 'E', icono: 'star' },
  { nombre: 'A', icono: 'campfire' },
  { nombre: 'B', icono: 'fire' },
  { nombre: 'C', icono: 'candle' }
];

export default function CategoryList({ mostrarCategorias, toggleCategorias, setCategoriaSeleccionada }) {
  const seleccionarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
    toggleCategorias(); // Oculta la lista después de seleccionar
  };

  const renderCategoriaItem = ({ item }) => {
    // Determinamos el ícono a partir de la categoría
    let icono;
    switch (item.icono) {
      case 'star':
        icono = <AntDesign name="star" size={20} color="#F25041" />;
        break;
      case 'fire':
        icono = <FontAwesome5 name="fire" size={20} color="#FF9800" />;
        break;
      case 'campfire':
        icono = <MaterialCommunityIcons name="campfire" size={20} color="#F44336" />;
        break;
      case 'candle':
        icono = <MaterialCommunityIcons name="candle" size={20} color="#FFB74D" />;
        break;
      default:
        icono = <MaterialCommunityIcons name="view-list" size={20} color="#4CAF50" />;
    }

    return (
      <TouchableOpacity
        style={styles.categoriaButton}
        onPress={() => seleccionarCategoria(item.nombre)}
      >
        <View style={styles.categoriaItem}>
          {icono}
          <Text style={styles.categoriaText}>{item.nombre}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <TouchableOpacity
        style={styles.categoriasButton}
        onPress={toggleCategorias}
      >
        <Text style={styles.categoriasButtonText}>Categorías</Text>
      </TouchableOpacity>

      {mostrarCategorias && (
        <View style={styles.categoriasContainer}>
          <FlatList
            data={categorias}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderCategoriaItem}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  categoriasButton: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor:  COLORS.light.primary,
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5
  },
  categoriasButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  categoriasContainer: {
    position: 'absolute',
    bottom: 80,
    left: '18%',
    right: '18%',
    backgroundColor:  COLORS.light.primary,
    borderRadius: 20,
    paddingVertical: 15,
    // paddingHorizontal: 25,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  categoriaButton: {
    width: '100%',
    paddingVertical: 12,
    marginVertical: 5,
   
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3
  },
  categoriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoriaText: {
    fontSize: 16,
    color: '#F25041',
    fontWeight: 'bold',
    marginLeft: 10,
  }
});


