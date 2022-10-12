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
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
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
