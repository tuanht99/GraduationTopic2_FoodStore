import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

const Turnover = ({navigation}) => {
  return (
    <View>
      <View className="flex flex-row justify-around items-center p-5 ">
        <Text className="text-[17px]">Xem doanh thu : </Text>
        <TouchableWithoutFeedback>
          <Text className="bg-white p-2 text-[16px] rounded-lg">Theo ngày</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Text className="bg-white p-2 text-[16px] rounded-lg">
            Theo tháng{" "}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <View className="bg-white">
        <ScrollView>
          <Text className="font-bold text-[17px] p-3 border-b">
            Ngày 16/9/2022
          </Text>
          <View className="p-3">
            <View className="flex flex-row justify-between">
              <Text className="text-base">Tổng doanh thu</Text>
              <Text className="text-base text-red-600 font-bold">0đ</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-base">Số đơn hàng trên Freen'tship</Text>
              <Text className="text-base ">0</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-base">Số đơn hoàn thành</Text>
              <Text className="text-base ">0</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-base">Số đơn chưa chiết khấu</Text>
              <Text className="text-base ">0</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-base">Tổng chiết khấu còn thiếu</Text>
              <Text className="text-base text-red-600 font-bold">0đ</Text>
            </View>
          </View>

          <View className = 'p-4 flex-row items-center justify-between'>
            <Text className = 'text-base font-bold'>Thống kê món bán chạy</Text>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Store')}>
                <Text className = 'text-base font-bold text-blue-600'>Xem chi tiết</Text>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Turnover;
