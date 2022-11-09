import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from "react-native";


import { NavigationContainer } from '@react-navigation/native';


import EditMenuView from '../screens/EditMenuView';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,

                }}>
                {/* <Tab.Screen
                    name="Home" component={HomeScreen}
                    options={{
                        // tabBarIcon: () => (<ReadyForOrderIcon width={120} height={40} />),
                    }}
                /> */}
                <Tab.Screen
                    name="OrderManagementScreen" component={EditMenuView}
                    options={{
                        // tabBarIcon: () => (<OrderManagement />),
                    }}
                />
                {/* <Tab.Screen
                    name="PersonalInformationScreen" component={PersonalInformationScreen}
                    options={{
                        tabBarIcon: () => (<UserManagement />)
                    }}
                /> */}
            </Tab.Navigator>
        </NavigationContainer>

    );
}

