import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator(


);


export default function Route() {
    return (
       
        <NavigationContainer>
            
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: true,
                    headerShown: false,
                    tabBarActiveTintColor: 'red',
                }}
            >
                <Tab.Screen name="Home" 
                    options={{
                        
                        tabBarIcon: ({ color, size }) => (
                            
                            <MaterialCommunityIcons name="book-multiple-outline" color={color} size={size} />
                        ),tabBarOptions: { showLabel: false }
                    }} component={HomeScreen} />
                <Tab.Screen name="Settings" options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="storefront" color={color} size={size} />
                    ),tabBarOptions: { showLabel: false }
                }}
                    component={SettingScreen} />
            </Tab.Navigator>
            {/* <Tab.NavigationOptions
            ></Tab.NavigationOptions> */}
        </NavigationContainer>
    );
}



