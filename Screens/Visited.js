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

const fallas = [
  {
    objectid: 5701,
    id_falla: 373,
    nombre: 'Antiga Senda de Senent-Albereda',
    seccion: '21',
    fallera: 'Blanca Gramage Martínez',
    presidente: 'NO HAY',
    artista: 'José Francisco Gómez Fonseca',
    lema: 'Aprendemos de fallas',
    anyo_fundacion: null,
    distintivo: null,
    boceto:
      'http://mapas.valencia.es/WebsMunicipales/layar/img/fallasvalencia/2023_373_bi.jpg',
    experim: null,
    created_user: 'ADM_GIS',
    created_date: '2023-02-25T18:32:36+00:00',
    last_edited_user: 'ADM_GIS',
    last_edited_date: '2023-02-25T18:32:36+00:00',
    geo_shape: {
      type: 'Feature',
      geometry: {
        coordinates: [-0.358554450311564, 39.4661328033691],
        type: 'Point'
      },
      properties: {}
    },
    geo_point_2d: {
      lon: -0.358554450311564,
      lat: 39.4661328033691
    }
  },
  {
    objectid: 5702,
    id_falla: 150,
    nombre: 'Doctor Manuel Candela-Av.del Port',
    seccion: '17',
    fallera: 'Candela Gimeno Vera',
    presidente: 'Héctor Martínez Brenes',
    artista: 'La Comissió',
    lema: 'Cuentos desencantados',
    anyo_fundacion: null,
    distintivo: null,
    boceto:
      'http://mapas.valencia.es/WebsMunicipales/layar/img/fallasvalencia/2023_150_bi.jpg',
    experim: null,
    created_user: 'ADM_GIS',
    created_date: '2023-02-25T18:32:36+00:00',
    last_edited_user: 'ADM_GIS',
    last_edited_date: '2023-02-25T18:32:36+00:00',
    geo_shape: {
      type: 'Feature',
      geometry: {
        coordinates: [-0.349166168132614, 39.4660097022941],
        type: 'Point'
      },
      properties: {}
    },
    geo_point_2d: {
      lon: -0.349166168132614,
      lat: 39.4660097022941
    }
  }
]

export default function Visited () {
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = id => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    )
  }

  return (
    <ScrollView style={styles.container}>
      {fallas.map(falla => (
        <View key={falla.id} style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>{falla.nombre}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(falla.id)}>
              <Ionicons
                name='heart'
                size={24}
                color={favorites.includes(falla.id) ? '#F25041' : '#F2B441'}
              />
            </TouchableOpacity>
          </View>
          <Image source={{ uri: falla.sketch }} style={styles.image} />
          <Text style={styles.info}>
            <Feather name='user' style={styles.icon} /> Fallera: {falla.fallera}
          </Text>
          <Text style={styles.info}>
            <Feather name='edit' style={styles.icon} /> Artista: {falla.artista}
          </Text>
          <Text style={styles.info}>
            <Feather name='message-circle' style={styles.icon} /> Lema:{' '}
            {falla.lema}
          </Text>
          <TouchableOpacity
            onPress={() => toggleExpand(falla.id)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Más información</Text>
          </TouchableOpacity>
        </View>
      ))}
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
