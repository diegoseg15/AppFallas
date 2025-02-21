import React from 'react';
import {Text, View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Login = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login Screen</Text>
            <Button
                title="Login"
                onPress={() => navigation.navigate('Main')}
            />
        </View>
    );
};

const Tab = createBottomTabNavigator();

const Tab1 = ({navigation}) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            < Text > Tab1 screen </Text> 
        </View >
    );
}

const Tab2 = ({navigation}) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            < Text > Tab2 screen </Text> 
            <Button
                title="Detail"
                onPress={() => navigation.navigate('Detail', {
                    selectedStop: 1
                })}
            />
        </View >
    );
}

const Main = ({ navigation }) => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Tab1" component={Tab1} />
            <Tab.Screen name="Tab2" component={Tab2} />
        </Tab.Navigator>
    );
};

const Detail = ({ route }) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text> Details Screen </Text> 
            <Text> Parada seleccionada {route.params.selectedStop} </Text>
        </View >
    );
}

const Stack = createStackNavigator();

const NavigationAppDemo = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Detail" component={Detail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default NavigationAppDemo;