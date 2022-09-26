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
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="EditFoodView" component={EditFoodView} />
        
      </Stack.Navigator>
    </NavigationContainer>

  );
}
