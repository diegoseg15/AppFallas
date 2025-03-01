import React from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

const categorias = [
  'Tecnología',
  'Ciencia',
  'Salud',
  'Arte',
  'Deportes',
  'Viajes'
]

export default function CategoryList ({ mostrarCategorias, toggleCategorias }) {
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
            renderItem={({ item }) => (
              <Text style={styles.categoriaItem}>{item}</Text>
            )}
          />
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  categoriasButton: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F25041',
    alignItems: 'center',
    borderRadius: 25
  },
  categoriasButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  categoriasContainer: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ccc'
  },
  categoriaItem: {
    fontSize: 16,
    color: '#F25041',
    fontWeight: 'bold',
    paddingVertical: 5
  }
})
