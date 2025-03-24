import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'

export default function Visited ({
  navigation,
  visitedFallas,
  setVisitedFallas
}) {
  const removeFromVisited = id => {
    setVisitedFallas(prev => prev.filter(falla => falla.id_falla !== id))
  }

  return (
    <ScrollView style={styles.container}>
      {visitedFallas.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 40 }}>
          Aún no has marcado ninguna falla como visitada.
        </Text>
      ) : (
        visitedFallas.map(falla => (
          <View key={falla.id_falla} style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>{falla.nombre}</Text>
            </View>
            <Image source={{ uri: falla?.boceto }} style={styles.image} />
            <Text style={styles.info}>
              <Feather name='user' style={styles.icon} /> Fallera:{' '}
              {falla.fallera}
            </Text>
            <Text style={styles.info}>
              <Feather name='edit' style={styles.icon} /> Artista:{' '}
              {falla.artista}
            </Text>
            <Text style={styles.info}>
              <Feather name='message-circle' style={styles.icon} /> Lema:{' '}
              {falla.lema}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetalleFalla', { item: falla })
              }
              style={styles.button}
            >
              <Text style={styles.buttonText}>Más información</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => removeFromVisited(falla.id_falla)}
              style={[styles.button, { backgroundColor: '#ccc', marginTop: 8 }]}
            >
              <Text style={[styles.buttonText, { color: '#333' }]}>
                Quitar de visitados
              </Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F2',
    padding: 30
  },
  card: {
    backgroundColor: 'white',
    padding: 25,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F25041'
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 8
  },
  info: {
    color: 'gray',
    marginTop: 8
  },
  icon: {
    color: '#F2B441',
    fontSize: 16
  },
  button: {
    marginTop: 12,
    backgroundColor: '#5852F2',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white'
  },
  details: {
    marginTop: 8
  },
  boldText: {
    fontWeight: 'bold',
    marginTop: 4
  },
  awardText: {
    color: 'gray',
    marginLeft: 8
  }
})
