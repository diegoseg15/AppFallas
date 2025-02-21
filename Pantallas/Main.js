import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import { Ionicons } from "@expo/vector-icons";
import Mapa from "./Mapa";

export default function Main({ route, navigation }) {
    const Tab = createBottomTabNavigator();
    const { usuario } = route.params;

    return (
        <Tab.Navigator
            screenOptions={({ route , navigation }) => ({
                headerStyle: { backgroundColor: "#F25041" },
                headerTintColor: "white",
                tabBarStyle: { backgroundColor: "#F25041" },
                tabBarActiveTintColor: "#F2B441", // Color cuando está seleccionado
                tabBarInactiveTintColor: "white", // Color cuando NO está seleccionado
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case "Home":
                            iconName = focused ? "home" : "home-outline";
                            break;
                        case "Scan":
                            iconName = focused ? "scan" : "scan-outline";
                            break;
                        case "Mapa":
                            iconName = focused ? "map" : "map-outline";
                            break;
                        case "Visitado":
                            iconName = focused
                                ? "checkmark-circle"
                                : "checkmark-circle-outline";
                            break;
                        case "Perfil":
                            iconName = focused ? "person" : "person-outline";
                            break;
                        default:
                            iconName = "help-circle";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} initialParams={{ usuario }} />
            <Tab.Screen name="Scan" component={Home} initialParams={{ usuario }} />
            <Tab.Screen name="Mapa" component={Mapa}  />
            <Tab.Screen name="Visitado"component={Home}initialParams={{ usuario }}/>
            <Tab.Screen name="Perfil" component={Home} initialParams={{ usuario }} />
        </Tab.Navigator>
    );
}
