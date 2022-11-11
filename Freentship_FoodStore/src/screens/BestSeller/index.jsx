import { View, Text, TouchableWithoutFeedback, Platform } from "react-native";
import Calendar from "../../components/Calendar";
import React, { useState } from "react";

const BestSeller = () => {
  return (
    <Calendar title="Xem thống kê : ">
      <View className="p-3 flex-row ">
        <Text className="text-sm text-[#808080] w-1/6">Số lượng </Text>
        <Text className="text-sm text-[#808080] w-2/3">Tên món </Text>
        <Text className="text-sm text-[#808080] ">Giá tiền </Text>
      </View>

      <View className="px-3 flex-row  ">
        <Text className="text-base font-bold w-1/6">0 Xem </Text>
        <Text className="text-base font-bold w-2/3"> Mi xao mau </Text>
        <Text className="text-base font-bold text-red-600"> 0d </Text>
      </View>
    </Calendar>
  );
};

export default BestSeller;
