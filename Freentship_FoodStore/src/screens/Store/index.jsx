import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Header from "../../components/Header";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
const Store = () => {
  return (
    <View>
      <Header />
      <ScrollView>
        <View className="h-32  flex-row justify-evenly items-center border-b border-[#DDDDDD]">
          <View className="relative w-24 h-24 rounded-xl ">
            <Image
              className="absolute inset-0 rounded-lg"
              source={{
                uri: "https://phukienmaytinh.vn/wp-content/uploads/2021/01/4-min-1.jpg",
                width: 90,
                height: 90,
              }}
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-[#CCCCCC] rounded-full p-1">
              <Feather name="camera" size={21} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <Text className="font-bold text-xl">Tuan shop TD</Text>
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
          <View className="flex-row">
            <Text className="text-base rounded-full border w-auto m-3 p-1 border-[#AAAAAA]">
              {" "}
              Bánh xèo
            </Text>
            <Text className="text-base rounded-full border w-auto m-3 p-1 border-[#AAAAAA]">
              {" "}
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
            <Text className="p-4 text-[#808080] text-base">
              Đánh giá trên Freen'tship{" "}
            </Text>
            <Text className="p-4 text-[#808080] text-base">
              Chỉnh sửa menu{" "}
            </Text>
          </View>
        </View>
        <View className="border-b-8 border-[#DDDDDD] my-2"></View>
        <View className="p-4 border-b border-[#AAAAAA]">
          <View className="flex-row justify-between pb-2 items-center">
            <Text className="font-bold text-lg">Thông tin cửa hàng</Text>
            <View className="flex-row">
              <AntDesign name="edit" size={20} color="black" />
              <Text className="ml-2 text-gray-500">Chỉnh sửa</Text>
            </View>
          </View>

          <View className="flex-row py-1">
            <Ionicons name="location-outline" size={24} color="black" />
            <Text className="ml-2 text-gray-600 text-base">Chỉnh sửa</Text>
          </View>
          <View className="flex-row py-1">
            <Ionicons name="phone-portrait-outline" size={24} color="black" />
            <Text className="ml-2 text-gray-600 text-base">Chỉnh sửa</Text>
          </View>
          <View className="flex-row py-1">
            <EvilIcons name="clock" size={24} color="black" />
            <Text className="ml-2 text-gray-600 text-base">Chỉnh sửa</Text>
          </View>
          <View className="flex-row py-1">
            <AntDesign name="shoppingcart" size={24} color="black" />
            <Text className="ml-2 text-gray-600 text-base">Chỉnh sửa</Text>
          </View>
        </View>

        <View className = 'flex justify-center items-center h-28 mx-8 '>
          <TouchableOpacity className = 'flex-row justify-center items-center py-3 rounded-xl w-full bg-[#00FF33]'>
            <Feather name="phone" size={24} color="white" />
            <Text className = 'text-white font-bold text-base ml-2'>Liên hệ nhân viên Freen'tship</Text>
          </TouchableOpacity>
          
        </View>

        <View className = 'h-40'></View>
      </ScrollView>
    </View>
  );
};

export default Store;
