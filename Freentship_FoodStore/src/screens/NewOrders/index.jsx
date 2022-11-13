import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../../components/Header";
import ordernt from "../../../assets/chuacodonhang.png";
import call from "react-native-phone-call";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const NewOrders = () => {
  const args = {
    number: "0121266682", // Use commas to add time between digits.
    prompt: false,
  };
  return (
    <View>
      <Header />
      {/* <View className = 'flex items-center mt-9'>
        <Image className = 'w-36 h-36 rounded-full' source={ordernt}/>
        <Text className = 'text-[#AAAAAA] mt-7'> Hiện tại chưa có đơn hàng nào </Text>
      </View> */}

      {/* button order code */}
      <View className="h-24  flex-row ">
        <View className="w-20 border h-20 m-2 rounded-md flex items-center p-1 justify-between">
          <Text className="bg-red-600 rounded-md text-white"> New </Text>
          <Text className="font-semibold text-red-500">2DTQFNS</Text>
          <Text className="text-red-500">14:05</Text>
        </View>
        <View className="w-20 border h-20 m-2 rounded-md flex items-center p-1 justify-between">
          <Text className="bg-red-600 rounded-md text-white"> New </Text>
          <Text className="font-semibold text-red-500">2DTQFNS</Text>
          <Text className="text-red-500">14:05</Text>
        </View>
        <View className="w-20 border h-20 m-2 rounded-md flex items-center p-1 justify-between">
          <Text className="bg-red-600 rounded-md text-white"> New </Text>
          <Text className="font-semibold text-red-500">2DTQFNS</Text>
          <Text className="text-red-500">14:05</Text>
        </View>
      </View>
      <View className="h-14 bg-red-600 flex-row relative">
        <Image source={ordernt} className="w-10 h-10 ml-4 rounded-full mt-1" />
        <View className="mt-1 ml-4">
          <Text className="text-white font-bold">Nguyen Quang Huy</Text>
          <Text className="text-white">0121266682</Text>
        </View>
        <TouchableOpacity
          className="absolute right-2"
          onPress={() => call(args).catch(console.error)}
        >
          <Text className="mt-1 text-red-600 bg-white p-2 rounded-md ">
            Gọi tài xế
          </Text>
        </TouchableOpacity>
      </View>
      <View className="h-24 flex justify-around">
        <View className="flex-row mx-4">
          <AntDesign name="warning" size={24} color="red" />
          <Text className="ml-2  text-red-500">
            Anh/chị được khuyến nghị gọi cho tài xế trước khi làm món
          </Text>
        </View>
        <Text className=" ml-4 ">
          Hoàn thành đơn trước{" "}
          <Text className=" text-red-500 font-bold">14:20</Text>
        </Text>
      </View>
      <View className="h-auto bg-[#CCFF99] p-3">
        <View className=" flex-row justify-between">
          <Text className="ml-8 text-[15px]">Chi tiết đơn hàng</Text>
          <Feather name="arrow-right" size={20} color="black" />
        </View>

        <View className=" flex-row ml-2 mt-4">
          <Text className="text-base font-bold w-1/6">
            2 <Text className="font-normal text-[#888888]">x</Text>{" "}
          </Text>
          <Text className="text-base font-bold w-2/3"> Mi xao mau </Text>
          <Text className="text-base font-bold text-red-600"> 0d </Text>
        </View>
      </View>
      <View className="h-auto p-3 bg-[#FFFFCC]">
        <View className="flex-row justify-between">
          <Text className="text-[15px] text-[#777777]">Giá tiền:</Text>
          <Text className="text-base font-bold text-red-600">24.000 đ</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-[15px] text-[#777777]">Hoa hồng(20%):</Text>
          <Text className="text-base font-bold text-red-600">- 4.800 đ</Text>
        </View>
        <View className="flex-row justify-between border-y border-[#777777] py-2 my-1">
          <Text className="text-[15px] text-[#777777]">Tổng:</Text>
          <Text className="text-base font-bold text-red-600">19.200 đ</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-[15px] text-[#777777]">Tiền thu tài xế</Text>
          <Text className="text-base font-bold text-red-600">0đ</Text>
        </View>
        <Text className="text-[#777777] leading-5">
          <Text className="text-black font-bold">Chú ý :</Text> Đây là đơn thu
          tiền sau , quý đối tác vui lòng{" "}
          <Text className="text-black font-bold">không thu tiền tài xế</Text>
          .Tiền hàng được cộng vào tài khoản cửa hàng sau khi giao hàng thành
          công
        </Text>
      </View>
      <TouchableOpacity className="bg-[#0099FF] flex justify-center items-center px-5 py-3 m-3 rounded-md">
        <Text className="font-bold text-white">
          Đơn hàng đã được chuẩn bị xong
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewOrders;
