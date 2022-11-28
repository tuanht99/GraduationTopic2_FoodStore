import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import Manage from "../screens/Manage";
import NewOrders from "../screens/NewOrders";
import Store from "../screens/Store";
import BestSeller from "../screens/BestSeller";
const Stack = createNativeStackNavigator();

import EditMenuView from "../screens/EditMenuView"
import AddCategoryFoodView from "../screens/AddCategoryFoodView"
import EditCategoryFoodView from "../screens/EditCategoryFoodView"
import AddFoodView from "../screens/AddFoodView"
import EditFoodView from "../screens/EditFoodView"
import ShowFullFoodView from "../screens/ShowFullFoodView"

function Navigators() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="BottomTab"
          component={BottomTab}
        />
        <Stack.Screen name="NewOrders" component={NewOrders} />
        <Stack.Screen name="Manage" component={Manage} />
        <Stack.Screen name="Store" component={Store} />
        <Stack.Screen name="BestSeller" component={BestSeller} />

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

export default Navigators;
