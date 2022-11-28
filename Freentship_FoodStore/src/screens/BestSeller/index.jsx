import { View, Text, TouchableWithoutFeedback, Platform } from "react-native";
import Calendar from "../../components/Calendar";
import React, { useState , useEffect } from "react";
import { useRoute } from "@react-navigation/native";

const BestSeller = () => {
  const route = useRoute();
  const [selectedDate, setSelectedDate] = useState({});
  const [type, setType] = useState({});
  const [orderByDate, setOrderByDate] = useState([]);

  const { order } = route.params;
  console.log("orderByDate", orderByDate);
  const callback = (payload, type) => {
    setSelectedDate(payload);
    setType(type);
  };

  // get total amount from date to date...
  const getOrderByDate = () => {
    let start = "";
    let end = "";
    if (type) {
      start = new Date(selectedDate + "T00:00:00.000Z");
      end = new Date(selectedDate + "T23:59:59.000Z");
    } else {
      const date1 = new Date(selectedDate);
      // first day of the month
      start = new Date(date1.getFullYear(), date1.getMonth(), 1);
      // last day of the month
      end = new Date(date1.getFullYear(), date1.getMonth() + 1, 0);
    }

    const secondsStart = Math.round(start.getTime() / 1000);
    const secondsEnd = Math.round(end.getTime() / 1000);

    if (order.length > 0) {
      setOrderByDate([]);

      order.map((i) => {
        if (
          i.orderDate >= secondsStart &&
          i.orderDate <= secondsEnd &&
          i.status === 3
        ) {
          setOrderByDate((prev) => [...prev, i.food_price , i.ordered_food]);
        }
      });
    }
  };

  useEffect(() => {
    getOrderByDate();
  }, [selectedDate]);
  return (
    <View>
      <Calendar title="Xem doanh thu : " callback={callback} />
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
    </View>
  );
};

export default BestSeller;
