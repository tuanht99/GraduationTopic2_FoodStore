import { View, Text , Image } from "react-native";
import React from "react";
import ordernt from "../../../assets/chuacodonhang.png";


const OrderDoesNotExits = ({title}) => {
  return (
    <View className="flex items-center mt-9 z-0">
      <Image className="w-36 h-36 rounded-full" source={ordernt} />
      <Text className="text-[#AAAAAA] mt-7">
        {title}
      </Text>
    </View>
  );
};

export default OrderDoesNotExits;
