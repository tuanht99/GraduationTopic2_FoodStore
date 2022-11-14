import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// import LoginNavigator from './navigators/LoginNavigator';
// import InforSettingView from './views/InforSettingView';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EditMenuView from './src/screens/EditMenuView';
import AddCategoryFoodView from './src/screens/AddCategoryFoodView';
import EditCategoryFoodView from './src/screens/EditCategoryFoodView';
import AddFoodView from './src/screens/AddFoodView';
import EditFoodView from './src/screens/EditFoodView';
import ShowFullFoodView from './src/screens/ShowFullFoodView';
import { LocationView } from "./src/screens/LocationView";
import { LoginScreen } from './src/screens/LoginScreen';
import { ConfirmOTP } from './src/screens/ConfirmOTP';
import { SignupPending } from './src/screens/SignupPending';
import { SignupScreen } from './src/screens/SignupScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='LoginScreen'
      >
        <Stack.Screen name='SignupScreen' component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name='SignupPending' component={SignupPending} options={{ headerShown: false }} />
        <Stack.Screen name='ConfirmOTP' component={ConfirmOTP} options={{ headerShown: false }} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='LocationView' component={LocationView} />
        <Stack.Screen name="EditMenuView" component={EditMenuView} />
        <Stack.Screen name="AddCategoryFoodView" component={AddCategoryFoodView} />
        <Stack.Screen name="EditCategoryFoodView" component={EditCategoryFoodView} />
        <Stack.Screen name="AddFoodView" component={AddFoodView} />
        <Stack.Screen name="EditFoodView" component={EditFoodView} />
        <Stack.Screen name="ShowFullFoodView" component={ShowFullFoodView} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
