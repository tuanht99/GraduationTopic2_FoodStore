import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { GetAllOrder } from "../../services";

const FindOrderCode = () => {
  console.log(" new Date(selectedDate)");
  const [orders, setOrders] = useState([]);
  console.log("orders", orders);
  useEffect(() => {
    GetAllOrder().then((data) => {
      setOrders(data);
    });
  }, []);

  const FormatDate = (seconds) => {
    const value = new Date(seconds * 1000).toLocaleString("en-GB", {
      timeZone: "UTC",
    });
    return value;
  };
  return (
    <View>
      <View className="bg-white flex flex-row items-center ">
        <TextInput
          className="w-[70%]  border-b border-[#BBBBBB]  p-3 my-4 ml-4"
          placeholder=" # Tìm theo mã đơn"
        />
        <TouchableWithoutFeedback>
          <Text className="text-center text-blue-500 font-bold text-[16px] w-[20%]">
            Xem đơn
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView>
        {orders.length > 0 &&
          orders.map((item) => (
            <View className="flex-row border-b justify-between p-5">
              <Text>
                #<Text>{item.id.substr(0, 6).toUpperCase()}</Text>
              </Text>
              <Text className = 'text-[#888888]'>{FormatDate(item.order_date.seconds)}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default FindOrderCode;
