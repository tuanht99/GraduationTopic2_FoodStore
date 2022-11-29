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

import { db } from "../../services/config";

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
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

export default function Store({ navigation, route }) {
  const [inforStore, setInforStore] = useState([]);

  const idFoodStore = "4dpAvRWJVrvdbml9vKDL";
  const [foodStore, setFoodStore] = useState([]);
  useEffect(() => {
    const fs = onSnapshot(doc(db, "food_stores", idFoodStore), (doc) => {
      setFoodStore(doc.data());
    });
  }, [idFoodStore]);
  const foodStoreName = foodStore.name;
  const foodStoreImage = foodStore.image;
  const foodStoreAddress = foodStore.address;
  const foodStorePhone = foodStore.phone;
  const foodStoreOpenTime = foodStore.openTime;
  const foodStoreCate = foodStore.food_categories;

  return (
    <View>
      <Header />
      <ScrollView>
        <View className="h-32 flex-row justify-evenly items-center border-b border-[#DDDDDD]">
          <View className="relative w-24 h-24 rounded-xl ">
            <Image
              className="absolute inset-0 rounded-lg"
              source={{
                uri: foodStoreImage,
                width: 90,
                height: 90,
              }}
            />
            {/* <TouchableOpacity className="absolute bottom-0 right-0 bg-[#CCCCCC] rounded-full p-1">
              <Feather name="camera" size={21} color="black" />
            </TouchableOpacity> */}
          </View>
          <View>
            <Text numberOfLines={2} className="font-bold text-xl w-32">
              {foodStoreName}
            </Text>
            <Text className=" text-[#444444]">freen'tship.vn/tuanshoptd</Text>
            <Text className="text-[15px] text-[#444444]">1 luot yeu thich</Text>
            <Text className="italic text-[#808080]">
              Cua hang chu dao (chua co)
            </Text>
          </View>

          <View>
            <TouchableWithoutFeedback>
              <Text className="bg-blue-500 text-white rounded-full p-2 text-center">
                Cửa hàng
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View className="m-2 border-b border-[#DDDDDD]">
          <Text className="font-bold text-base">Ngành kinh doanh</Text>
          {/* // */}
          <View className="flex-row">
            <Text className="text-base border rounded-lg px-2 m-2 border-[#AAAAAA]">
              Bánh xèo
            </Text>

            <Text className="text-base border rounded-lg px-2 m-2 border-[#AAAAAA]">
              Bánh xèo
            </Text>
          </View>
        </View>

        <View className="m-2 flex-row ">
          <View className="p-2">
            <Entypo name="newsletter" size={24} color="black" />
          </View>
          <TouchableOpacity className="border border-[#808080] rounded-lg p-1 flex-1 ">
            <Text className="text-base text-[#808080]">
              Nhấn để ghi thông báo cho khách hàng...
            </Text>
          </TouchableOpacity>
        </View>
        <View className="border-b-8 border-[#DDDDDD] my-2"></View>
        <View className="">
          <View className="divide-y divide-[#808080]">
            {/* Đánh giá */}
            <TouchableOpacity
              className="flex flex-row justify-between items-center"
              onPress={() =>
                navigation.navigate("ReviewsOfStore")
              }
            >
              <Text className="p-4 text-[#808080] text-base">
                Đánh giá trên Loship{" "}
              </Text>
              <View className="pr-4">
                <AntDesign name="arrowright" size={24} color="black" />
              </View>
            </TouchableOpacity>
            {/* Chỉnh sửa menu */}
            <TouchableOpacity
              className="flex flex-row justify-between items-center"
              onPress={() =>
                navigation.navigate("EditMenuView", {
                  inforStore: foodStoreName,
                })
              }
            >
              <Text className="p-4 text-[#808080] text-base">
                Chỉnh sửa menu{" "}
              </Text>
              <View className="pr-4">
                <AntDesign name="arrowright" size={24} color="black" />
              </View>
            </TouchableOpacity>
            {/* Chính sách người bán */}
            <TouchableOpacity
              className="flex flex-row justify-between items-center"
              onPress={() =>
                navigation.navigate("EditMenuView", {
                  inforStore: foodStoreName,
                })
              }
            >
              <Text className="p-4 text-[#808080] text-base">
                  Chính sách người bán{" "}
              </Text>
              <View className="pr-4">
                <AntDesign name="arrowright" size={24} color="black" />
              </View>
            </TouchableOpacity>
            {/* Câu hỏi thường gặp */}
            <TouchableOpacity
              className="flex flex-row justify-between items-center"
              onPress={() =>
                navigation.navigate("EditMenuView", {
                  inforStore: foodStoreName,
                })
              }
            >
              <Text className="p-4 text-[#808080] text-base">
                  Câu hỏi thường gặp{" "}
              </Text>
              <View className="pr-4">
                <AntDesign name="arrowright" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="border-b-8 border-[#DDDDDD] my-2"></View>
        <View className="p-4 border-b border-[#AAAAAA]">
          <View className="flex-row justify-between pb-2 items-center">
            <Text className="font-bold text-lg">Thông tin cửa hàng</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditInforStore")}
              className="flex-row"
            >
              <AntDesign name="edit" size={20} color="black" />
              <Text className="ml-2 text-gray-500">Chỉnh sửa</Text>
            </TouchableOpacity>
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
              {foodStorePhone}
            </Text>
          </View>
          <View className="flex-row py-1">
            <EvilIcons name="clock" size={24} color="black" />
            <Text
              numberOfLines={1}
              className="ml-2 flex flex-row text-gray-600 text-base"
            >
              Giờ mở cửa:
              {/* {foodStoreOpenTime} */}
            </Text>
          </View>
          <View className="flex-row py-1">
            <AntDesign name="shoppingcart" size={24} color="black" />
            <Text className="ml-2 flex flex-row text-gray-600 text-base">
              Ngành kinh doanh:
              {/* {foodStoreCate} */}
            </Text>
          </View>
        </View>

        <View className="flex justify-center items-center h-28 mx-8 ">
          <TouchableOpacity className="flex-row justify-center items-center py-3 rounded-xl w-full bg-[#00FF33]">
            <Feather name="phone" size={24} color="white" />
            <Text className="text-white font-bold text-base ml-2">
              Liên hệ nhân viên Freen'tship
            </Text>
          </TouchableOpacity>
        </View>

        <View className="h-40"></View>
      </ScrollView>
    </View>
  );
}
