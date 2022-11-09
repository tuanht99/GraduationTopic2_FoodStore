import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

import Manage from "../screens/Manage";
import NewOrders from "../screens/NewOrders";
import Store from "../screens/Store";

export default function BottomTab() {
  return (
    <Tab.Navigator
      barStyle={{
        backgroundColor: "#EEEEEE",
        borderTopWidth: 1,
        borderTopColor: "#CCCCCC",
        paddingBottom: 10,
      }}
      activeColor="red"
      inactiveColor="#000000"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="NewOrders"
        component={NewOrders}
        options={{
          tabBarLabel: "Đơn hàng mới",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="my-library-books" size={28} color= {color} />
          ),
        }}
      />
      <Tab.Screen
        name="Manage"
        component={Manage}
        options={{
          tabBarLabel: "Quản lý",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="order-bool-descending-variant"
              size={28}
              color= {color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Store"
        component={Store}
        options={{
          tabBarLabel: "Cửa hàng",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="store-settings-outline"
              size={28}
              color= {color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
