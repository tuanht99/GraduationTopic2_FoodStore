import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import Manage from "../screens/Manage";
import NewOrders from "../screens/NewOrders";
import Store from "../screens/Store";
import BestSeller from "../screens/BestSeller";
const Stack = createNativeStackNavigator();

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigators;
