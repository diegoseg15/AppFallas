import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons para la flecha
import { useNavigation } from '@react-navigation/native';


export default function Lista({navigation}) {

    const [VLCitems, setVLCitems] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    // https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/valenbisi-disponibilitat-valenbisi-dsiponibilidad/exports/geojson?lang=es&timezone=Europe%2FBerlin'

    const loadData = () => {
        fetch('https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/falles-fallas/records?limit=20')
            .then((response) => response.json())
            .then((responseJson) => {
                setVLCitems(responseJson.results);
            }
        )
    }

    const VLCitem = ({item}) => {

        
        return(
            
            <TouchableOpacity
            onPress={() => navigation.navigate('DetalleFalla', { item: item })}>
                <View style ={styles.itemContainer}>
                    <Image 
                    source={require('../assets/Logo_ETSE.png')} 
                    style={styles.image}
                    />
                    
                    <View style={styles.text} >
                    <Text numberOfLines={1} ellipsizeMode='tail'>
                        {item.nombre}
                    </Text>
                    <Text numberOfLines={1} ellipsizeMode='tail'>
                        Seccion: {item.seccion}
                    </Text>
                    </View>
                    
                    
                    <Ionicons name="arrow-forward" size={24} color="#5852F2" style={styles.arrow} />
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList 
                data={VLCitems}
                renderItem={VLCitem}
                keyExtractor={item => item.objectid}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 1,
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'left',
      justifyContent: 'left',
      width: "100%",
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        justifyContent: 'left',
        flex:1
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10,
        
        
    },
    
    text: {
        color: 'black', 
        fontSize: 16,
        width:"70%"

        
        
    },
    arrow: {
        marginLeft: 25,
        paddingRight:5,
    },
});