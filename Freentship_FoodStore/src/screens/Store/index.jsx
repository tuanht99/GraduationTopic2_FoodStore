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
import call from "react-native-phone-call";
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
import { GetCategoriesByIds } from "../../services";

export default function Store({ navigation, route }) {
  // const [inforStore, setInforStore] = useState([]);

  const idFoodStore = "4dpAvRWJVrvdbml9vKDL";
  const [foodStore, setFoodStore] = useState([]);

  const [listCt, setListCt] = useState([]);
  useEffect(() => {
    const fs = onSnapshot(doc(db, "food_stores", idFoodStore), (doc) => {
      setFoodStore(doc.data());
    });
  }, [idFoodStore]);
  // console.log("d", foodStore.openTime);
  // .map((e) => console.log("foodStore.opentime", e));
  // Lay h
  // useEffect(() => {
  //   if (foodStore.opentime !== undefined) {
  //     console.log(" foodStore.opentime[0]", foodStore.opentime[0]);
  //   }
  // }, [foodStore]);

  useEffect(() => {
    if (foodStore.opentime !== undefined) {
      console.log(" foodStore.opentime[0]", foodStore.opentime[0]);
    }
  }, [foodStore]);

  const foodStoreName = foodStore.name;
  const foodStoreImage = foodStore.image;
  const foodStoreAddress = foodStore.address;
  const foodStorePhone = foodStore.phone;
  // const foodStoreOpenTime = foodStore.openTime;
  // const foodStoreCate = foodStore.food_categories;

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
          <ScrollView horizontal className="flex h-10">
            {listCt &&
              listCt.map((ct) => (
                <Text className="text-base border rounded-lg px-2 mr-2 my-2  border-[#AAAAAA]">
                  {ct.name}
                </Text>
              ))}
          </ScrollView>
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
        {/*  */}
        <View className="">
          <View className="divide-y divide-[#808080]">
            {/* Đánh giá */}
            <TouchableOpacity
              className="flex flex-row justify-between items-center"
              onPress={() => navigation.navigate("ReviewsOfStore")}
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
                  inforStoreName: foodStoreName,
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
              onPress={() => navigation.navigate("PolicySellerView")}
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
              onPress={() => navigation.navigate("QuestionCustomer")}
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
        {/* Thong tin cua hang */}
        <View className="p-4 border-b border-[#AAAAAA]">
          <View className="flex-row justify-between pb-2 items-center">
            <Text className="font-bold text-lg">Thông tin cửa hàng</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditInforStore", {
                  inforStoreName: foodStoreName,
                  inforStoreImage: foodStoreImage,
                })
              }
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
              className="ml-2 w-72 text-gray-600 text-base"
            >
              {foodStoreAddress}
            </Text>
          </View>
          <View className="flex-row py-1">
            <Ionicons name="phone-portrait-outline" size={24} color="black" />
            <Text className="ml-2 text-gray-600 text-base">
              {"0"}
              {foodStorePhone}
            </Text>
          </View>
          {/* gio mo cua */}
          <View className="flex-row py-1">
            <EvilIcons name="clock" size={24} color="black" />
            <Text
              numberOfLines={1}
              className="ml-2 flex flex-row text-gray-600 text-base"
            >
              Giờ mở cửa:
              {foodStore.opentime !== undefined &&
                foodStore.opentime[0] / 60 +
                  ":00 - " +
                  foodStore.opentime[1] / 60 +
                  ":00"}
              {/* {foodStoreOpenTime} */}
            </Text>
          </View>
          <View className="flex-row py-1">
            <AntDesign name="shoppingcart" size={24} color="black" />
            <Text
              numberOfLines={1}
              className="ml-2 flex flex-row text-gray-600 text-base"
            >
              Ngành kinh doanh:
              {listCt &&
                listCt.map((ct) => (
                  <Text className="text-base border rounded-lg px-2 m-2 border-[#AAAAAA]">
                    {ct.name}
                    {", "}
                  </Text>
                ))}
            </Text>
          </View>
        </View>
        {/* Tao ma giam gia */}
        <View className="flex justify-center items-center h-20 mx-8">
          <TouchableOpacity className="flex-row justify-center items-center py-3 rounded-xl w-full bg-[#FF5733]">
            <AntDesign name="gift" size={24} color="white" />
            <Text className="text-white font-bold text-base ml-2">
              Tạo mã giảm giá
            </Text>
          </TouchableOpacity>
        </View>
        {/* Lien he voi loship */}
        <View className="flex justify-center items-center h-20 mx-8 ">
          <TouchableOpacity
            onPress={() =>
              call({
                number: "1900636075",
                prompt: false,
              }).catch(console.error)
            }
            className="flex-row justify-center items-center py-3 rounded-xl w-full bg-[#00FF33]"
          >
            <Feather name="phone" size={24} color="white" />
            <Text className="text-white font-bold text-base ml-2">
              Liên hệ nhân viên Freen'tship
            </Text>
          </TouchableOpacity>
        </View>
        <View className="h-20"></View>
      </ScrollView>
    </View>
  );
}
