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
  Checkbox,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { GetAllCate, GetCategoriesByIds } from "../services/store";

export default function EditInforStoreTime({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),

      title: "Chỉnh sửa giờ mở cửa",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 15,
      },
    });
  }, [navigation]);

  // food
  const idFoodStore = "4dpAvRWJVrvdbml9vKDL";
  const [foodStore, setFoodStore] = useState([]);
  const [listCt, setListCt] = useState([]);
  const [listTime, setListTime] = useState([0, 1500]);
  const [a600, setA600] = useState([360, 420]);
  const [a700, setA700] = useState([360, 480]);
  const [a800, setA800] = useState([360, 540]);
  const [a900, setA900] = useState([360, 600]);
  const [a1000, setA1000] = useState([360, 660]);
  const [a1100, setA1100] = useState([360, 720]);
  const [a1200, setA1200] = useState([360, 780]);
  const [a1300, setA1300] = useState([360, 840]);
  const [a1400, setA1400] = useState([360, 900]);
  const [a1500, setA1500] = useState([360, 960]);
  const [a1600, setA1600] = useState([360, 1020]);
  const [a1700, setA1700] = useState([360, 1080]);
  const [a1800, setA1800] = useState([360, 1140]);
  const [a1900, setA1900] = useState([360, 1200]);
  const [a2000, setA2000] = useState([360, 1260]);
  const [a2100, setA2100] = useState([360, 1320]);
  const [a2200, setA2200] = useState([360, 1380]);
  const [a2300, setA2300] = useState([360, 1440]);

  useEffect(() => {
    const fs = onSnapshot(doc(db, "food_stores", idFoodStore), (doc) => {
      setFoodStore(doc.data());
    });
  }, [idFoodStore]);
  const foodStoreName = foodStore.name;
  const foodStoreImage = foodStore.image;
  const foodStoreAddress = foodStore.address;
  const foodStorePhone = foodStore.phone;
  // const foodStoreOpenTime = foodStore.openTime;
  // const foodStoreCate = foodStore.food_categories;

  const handleSaveTime = () => {
    updateDoc(doc(db, "food_stores", idFoodStore), {
      opentime: a600,
    });
  };

  useEffect(() => {
    if (foodStore.opentime !== undefined) {
      console.log(" foodStore.opentime[0]", foodStore.opentime[0]);
    }
  }, [foodStore]);

  // load categories
  useEffect(() => {
    if (foodStore) {
      GetCategoriesByIds(foodStore.food_categories).then((result) => {
        // console.log('list:', result);
        setListCt(result);
      });
    }
  }, [foodStore.food_categories]);


  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 0.85 }}>
        {/* Gio mo cua 7*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Gio mo cua 8*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Gio mo cua 9*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>


        {/* Gio mo cua 10*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>


        {/* Gio mo cua 11*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>


        {/* Gio mo cua 12*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>



        {/* Gio mo cua 13*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>


        {/* Gio mo cua 14*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>


        {/* Gio mo cua 15*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>


        {/* Gio mo cua 16*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>


        {/* Gio mo cua 17*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>


        {/* Gio mo cua 18*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>


        {/* Gio mo cua 19*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>


        {/* Gio mo cua 20*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Gio mo cua 21*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Gio mo cua 22*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Gio mo cua 23*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Gio mo cua 24*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Luu */}
      <View
        style={{
          paddingBottom: 0,
          flex: 0.15,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            paddingTop: 10,
            paddingBottom: 10,
            width: "100%",
            borderTopColor: "#808080",
            borderTopWidth: 0.3,
            bottom: 0,
          }}
        >
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#E94730",
                borderRadius: 15,
                width: "97%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleSaveTime}
            >
              <Text style={{ color: "#fff" }}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
