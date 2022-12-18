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

import * as ImagePicker from "expo-image-picker";

import { db } from "../services/config";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBlob,
} from "firebase/storage";

import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { GetAllCate, GetCategoriesByIds } from "../services/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Switch } from "react-native";
import { Pressable } from "react-native";
// Styles
const styles = StyleSheet.create({
  centeredView: {
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 140,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
    height: 370,
    paddingBottom: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    paddingTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 5,
    marginRight: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default function EditInforStore({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),

      title: "Chỉnh sửa thông tin cửa hàng",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 15,
      },
    });
  }, [navigation]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const modalConfirm = () => setModalVisible(true);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("foodStoreID");
      if (value !== null) {
        setIdFoodStore(value);
      }
    } catch (e) {
      console.log("ErrorError");
    }
  };
  const [idFoodStore, setIdFoodStore] = useState("");
  const [foodStore, setFoodStore] = useState([]);
  const [listCt, setListCt] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (idFoodStore !== "") {
      const fs = onSnapshot(doc(db, "food_stores", idFoodStore), (doc) => {
        setFoodStore(doc.data());
      });

      const us = onSnapshot(doc(db, "users", idFoodStore), (doc) => {
        setUser(doc.data());
      });
    }
  }, [idFoodStore]);

  useEffect(() => {
    if (foodStore.opentime !== undefined) {
    }
  }, [foodStore]);

  const foodStoreName = foodStore.name;
  const foodStoreImage = foodStore.image;
  const foodStoreAddress = foodStore.address;
  const foodStorePhone = foodStore.phone;

  // load categories
  useEffect(() => {
    if (foodStore) {
      if (foodStore.food_categories) {
        GetCategoriesByIds(foodStore.food_categories).then((result) => {
          // console.log('list:', result);
          setListCt(result);
        });
      }
    }
  }, [foodStore.food_categories]);

  return (
    <View>
      <ScrollView>
        {/* Thong tin store */}
        <View className="p-4 border-b border-[#AAAAAA]">
          <View className="flex-row justify-between pb-2 items-center">
            <Text className="font-bold text-lg">Thông tin cửa hàng</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditInforStoreName", {
                  foodStore1: foodStore,
                  user1: user,
                })
              }
              className="flex-row"
            >
              <AntDesign name="edit" size={20} color="black" />
              <Text className="ml-2 text-gray-500">Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text className="font-bold text-lg">{foodStore.name}</Text>
          </View>

          <View className="flex-row py-1">
            <Ionicons name="location-outline" size={24} color="black" />
            <Text
              numberOfLines={1}
              className="ml-2 w-64 text-gray-600 text-base"
            >
              {foodStoreAddress}
            </Text>
          </View>
          <View className="flex-row py-1">
            <Ionicons name="phone-portrait-outline" size={24} color="black" />
            <Text className="ml-2 text-gray-600 text-base">
              {"0"}
              {user.phone}
            </Text>
          </View>
        </View>

        <View className="border-b-8 border-[#DDDDDD] my-2"></View>

        {/* Nganh Kinh doanh */}
        <View className="p-4 border-b border-[#DDDDDD]">
          <View className="flex-row justify-between pb-2 items-center">
            <Text className="font-bold text-lg">Ngành kinh doanh</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditInforStoreCate")}
              className="flex-row"
            >
              <AntDesign name="edit" size={20} color="black" />
              <Text className="ml-2 text-gray-500">Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal className="flex">
            {listCt &&
              listCt.map((ct) => (
                <Text className="text-base border rounded-lg px-2 mr-2  border-[#AAAAAA]">
                  {ct.name}
                </Text>
              ))}
          </ScrollView>
        </View>

        <View className="border-b-8 border-[#DDDDDD] my-2"></View>

        {/* Gio mo cua */}
        <View className="p-4 border-b border-[#DDDDDD]">
          <View className="flex-row justify-between pb-2 items-center">
            <Text className="font-bold text-lg">Chỉnh sửa giờ mở cửa</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditInforStoreTime")}
              className="flex-row"
            >
              <AntDesign name="edit" size={20} color="black" />
              <Text className="ml-2 text-gray-500">Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>

          {/* // */}
          <View className="flex-row">
            <Text className="text-base rounded-full border w-auto m-3 p-1 border-[#AAAAAA]">
              {foodStore.opentime !== undefined &&
                foodStore.opentime[0] / 60 +
                  ":00 - " +
                  foodStore.opentime[1] / 60 +
                  ":00"}
            </Text>
          </View>
        </View>
        <View style={{ paddingBottom: 10 }}></View>

        

        {/* đóng cửa hàng */}
        <TouchableOpacity
          className="flex flex-row justify-between items-center"
          onPress={() => navigation.navigate("StatusStore")}
        >
          <Text className="p-4 text-[#808080] text-base">Đóng cửa hàng</Text>
          <View className="pr-4">
            <AntDesign name="arrowright" size={24} color="black" />
          </View>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}
