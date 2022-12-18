import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import AllRating from "./AllRating";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  where,
  query,
  QuerySnapshot,
  editDoc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../services/config";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

// Navigation
export default function ReviewsOfStore({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),

      title: "Đánh giá của khách hàng",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 15,
      },
    });
  }, [navigation]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Tất cả" },
  ]);

  const renderScene = SceneMap({
    first: AllRating,
  });

  return (
    <View className="flex-1">
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={(props) => (
          <TabBar
            activeColor="red"
            inactiveColor="black"
            pressColor="#999999"
            {...props}
            renderLabel={({ route, color }) => (
              <Text style={{ color: color, margin: 8, fontSize: 16 }}>
                {route.title}
              </Text>
            )}
            style={{ backgroundColor: "white" }}
          />
        )}
        renderScene={renderScene}
        onIndexChange={setIndex}
        scrollEnabled
      />
    </View>
  );
}