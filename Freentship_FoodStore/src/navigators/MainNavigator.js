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

