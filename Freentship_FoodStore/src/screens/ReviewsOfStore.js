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

const allReviews = () => (
    <ScrollView>
        <Text>Tất cả</Text>   
    </ScrollView>
)
const goodReviews = () => (
    <View>
        <Text>Hài lòng</Text>   
    </View>
)
const badlReviews = () => (
    <View>
        <Text>Không hài lòng</Text>   
    </View>
)

// Navigation
export default function ReviewsOfStore({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),

      // headerRight: () => (
      //   <TouchableOpacity onPress={navigation.goBack}>
      //     <Text>Lưu</Text>
      //   </TouchableOpacity>
      // ),

      title: "Đánh giá của khách hàng",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 15,
      },
    });
  }, [navigation]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Tất cả"},
    { key: "second", title: "Hài lòng"},
    { key: "three", title: "Không hài lòng"}
  ]);

  const renderScene = SceneMap({
    first: allReviews,
    second: goodReviews,
    three: badlReviews,
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
