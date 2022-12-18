import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import Manage from "../screens/Manage";
import NewOrders from "../screens/NewOrders";
import Store from "../screens/Store";
import BestSeller from "../screens/BestSeller";
const Stack = createNativeStackNavigator();

import EditMenuView from "../screens/EditMenuView";
import AddCategoryFoodView from "../screens/AddCategoryFoodView";
import EditCategoryFoodView from "../screens/EditCategoryFoodView";
import AddFoodView from "../screens/AddFoodView";
import EditFoodView from "../screens/EditFoodView";
import ShowFullFoodView from "../screens/ShowFullFoodView";
import EditInforStore from "../screens/EditInforStore";
import EditInforStoreName from "../screens/EditInforStoreName";
import EditInforStoreCate from "../screens/EditInforStoreCate";
import EditInforStoreTime from "../screens/EditInforStoreTime";
import ReviewsOfStore from "../screens/ReviewsOfStore";
import QuestionCustomer from "../screens/QuestionCustomer";
import PolicySellerView from "../screens/PolicySellerView";
import AllRating from "../screens/AllRating";
import { LoginScreen } from "../screens/LoginScreen";
import { ConfirmOTP } from "../screens/ConfirmOTP";
import { SignupScreen } from "../screens/SignupScreen";
import { SignupPending } from "../screens/SignupPending";
import Bank from "../screens/Bank"
import StatusStore from "../screens/StatusStore";
function Navigators() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          options={{ headerShown: false }}
          name="BottomTab"
          component={BottomTab}
        />
        <Stack.Screen name="NewOrders" component={NewOrders} />
        <Stack.Screen name="Manage" component={Manage} />
        <Stack.Screen name="Store" component={Store} />
        <Stack.Screen name="BestSeller" component={BestSeller} />
        <Stack.Screen name="ConfirmOTP" component={ConfirmOTP} />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="EditMenuView" component={EditMenuView} />
        <Stack.Screen
          name="AddCategoryFoodView"
          component={AddCategoryFoodView}
        />
        <Stack.Screen
          name="EditCategoryFoodView"
          component={EditCategoryFoodView}
        />
        <Stack.Screen name="AddFoodView" component={AddFoodView} />
        <Stack.Screen name="EditFoodView" component={EditFoodView} />
        <Stack.Screen name="ShowFullFoodView" component={ShowFullFoodView} />
        <Stack.Screen name="EditInforStore" component={EditInforStore} />
        <Stack.Screen
          name="EditInforStoreName"
          component={EditInforStoreName}
        />
        <Stack.Screen
          name="EditInforStoreCate"
          component={EditInforStoreCate}
        />
        <Stack.Screen
          name="EditInforStoreTime"
          component={EditInforStoreTime}
        />
        <Stack.Screen name="ReviewsOfStore" component={ReviewsOfStore} />
        <Stack.Screen name="QuestionCustomer" component={QuestionCustomer} />
        <Stack.Screen name="PolicySellerView" component={PolicySellerView} />
        <Stack.Screen name="AllRating" component={AllRating} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="SignupPending" component={SignupPending} />
        <Stack.Screen name="Bank" component={Bank} />
        <Stack.Screen name="StatusStore" component={StatusStore} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigators;
