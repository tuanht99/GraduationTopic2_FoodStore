import { View, Text, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect } from "react";
import Calendar from "../../components/Calendar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GetStore, GetAllOrder } from "../../services";
import formatCash from "../../components/FormatCash";
const Turnover = () => {
  const [store, setStore] = useState([]);
  const [order, setOrder] = useState([]);
  const [orderByDate, setOrderByDate] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [selectedDate, setSelectedDate] = useState({});
  const [allOrderByDate, setAllOrderByDate] = useState([]);
  const [type, setType] = useState({});
  const [amountPaidToAdmin, setAmountPaidToAdmin] = useState(0);

  const callback = (payload, type) => {
    setSelectedDate(payload);
    setType(type);
  };


  useEffect(() => {
    GetStore()
      .then((data) => {
        GetAllOrder().then((data) => {
          setOrder(data);
        });
        setStore(data);
      })
      .catch((err) => console.log("error =>", err));
  }, []);

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
      setAllOrderByDate([]);
      order.map((i) => {
        if (
          i.orderDate >= secondsStart &&
          i.orderDate <= secondsEnd &&
          i.status === 5
        ) {
          setOrderByDate((prev) => [...prev, i.total_food]);
        }

        if (i.orderDate >= secondsStart && i.orderDate <= secondsEnd) {
          setAllOrderByDate((prev) => [...prev, i.total_food]);
        }
      });
    }
  };

  useEffect(() => {
    getOrderByDate();
  }, [selectedDate, type]);
  useEffect(() => {
    if (orderByDate.length > 0) {
      setTotalRevenue(orderByDate.reduce(myFunc));
      setAmountPaidToAdmin((orderByDate.reduce(myFunc) * 20) / 100);
    } else {
      setTotalRevenue(0);
      setAmountPaidToAdmin(0);
    }
  }, [orderByDate]);

  function myFunc(total, num) {
    return total + num;
  }

  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View>
      <Calendar title="Xem doanh thu : " callback={callback} />

      <View className="p-3">
        <View className="flex flex-row justify-between">
          <Text className="text-base">Tổng doanh thu</Text>
          <Text className="text-base text-red-600 font-bold">
            {formatCash(totalRevenue + "")} đ
          </Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-base">Số đơn hàng trên Freen'tship</Text>
          <Text className="text-base ">{allOrderByDate.length}</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-base">Số đơn hoàn thành</Text>
          <Text className="text-base ">{orderByDate.length}</Text>
        </View>

        <View className="flex flex-row justify-between">
          <Text className="text-base">Số tiền cần đưa cho Freen'tship</Text>
          <Text className="text-base text-red-600 font-bold">
            {formatCash(amountPaidToAdmin + "")} đ
          </Text>
        </View>
      </View>

      <View className="p-4 flex-row items-center justify-between mt-8 bg-white">
        <Text className="text-base font-bold">Thống kê món bán chạy</Text>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("BestSeller", { order: order })}
        >
          <Text className="text-base font-bold text-blue-600">
            Xem chi tiết
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default Turnover;
