import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

export default function ItemList ({ VLCitems }) {
  return (
    <FlatList
      data={VLCitems}
      keyExtractor={item => item.id_falla.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.nombre}</Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  itemText: {
    fontSize: 16,
    color: '#333'
  }
})
