import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import ordernt from "../../../assets/chuacodonhang.png";
import call from "react-native-phone-call";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { GetNewOrder, GetOrderDetail, GetShipper } from "../../services";
import formatCash from "../../components/FormatCash";

import { db } from "../../services/config";
import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  onSnapshot,
  where,
} from "firebase/firestore";

const NewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetailt, setOrderDetailt] = useState();
  const [orderNotExists, setOrderNotExists] = useState(true);

  console.log("orderDetailt", orderDetailt);
  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      where("food_store_id", "==", "4dpAvRWJVrvdbml9vKDL")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ idOrder: doc.id, info: doc.data() });
      });
      setOrders(orders);
    });
    return () => {
      unsubscribe;
    };
  }, []);

  // const GetOrder = (id) => {
  //   GetOrderDetail(id).then((doc) => {
  //     setOrderDetailt(doc);
  //   });
  // };
  useEffect(() => {
    if (orders.length > 0) {
      GetOrderDetail("").then((doc) => {
        // console.log("user_id", doc.user_id);
        GetShipper(doc.user_id).then((user) => {
          // console.log("usser", user);
          setOrderDetailt({ order: doc, user: user });
        });
      });
    }
  }, [orders]);

  if (orderDetailt !== undefined) {
    const args = {
      number: orderDetailt.user.phone + "", // Use commas to add time between digits.
      prompt: false,
    };
  }

  const TimeOrder = (time) => {
    const date = new Date(time);
    const hoursAndMinutes = date.getHours() + ":" + date.getMinutes();
    return hoursAndMinutes;
  };

  const Rose = (money) => {
    return (money * 20) / 100;
  };

  const Total = (a, b) => {
    return a - b;
  };

  const OrderDoesNotExits = () => (
    <View className="flex items-center mt-9 z-0">
      <Image className="w-36 h-36 rounded-full" source={ordernt} />
      <Text className="text-[#AAAAAA] mt-7">
        {" "}
        Hiện tại chưa có đơn hàng nào{" "}
      </Text>
    </View>
  );
  const OrderInfo = () => (
    <View className="z-10">
      <View className="h-14 bg-red-600 flex-row relative">
        <Image
          source={{ uri: orderDetailt.user.avatar }}
          className="w-10 h-10 ml-4 rounded-full mt-1"
        />
        <View className="mt-1 ml-4">
          <Text className="text-white font-bold">{orderDetailt.user.name}</Text>
          <Text className="text-white">{orderDetailt.user.phone}</Text>
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
          <Text className="text-base font-bold text-red-600"></Text>
        </View>
      </View>
      <View className="h-auto p-3 bg-[#FFFFCC]">
        <View className="flex-row justify-between">
          <Text className="text-[15px] text-[#777777]">Giá tiền:</Text>
          <Text className="text-base font-bold text-red-600">
            {formatCash(orderDetailt.order.total_food + "")}đ
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-[15px] text-[#777777]">Hoa hồng(20%):</Text>
          <Text className="text-base font-bold text-red-600">
            - {formatCash(Rose(orderDetailt.order.total_food) + "")}đ
          </Text>
        </View>
        <View className="flex-row justify-between border-y border-[#777777] py-2 my-1">
          <Text className="text-[15px] text-[#777777]">Tổng:</Text>
          <Text className="text-base font-bold text-red-600">
            {formatCash(
              Total(
                orderDetailt.order.total_food,
                Rose(orderDetailt.order.total_food)
              ) + ""
            )}
            đ
          </Text>
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

  return (
    <View>
      <Header />
      <ScrollView horizontal className="h-24  flex-row ">
        {orders.map((order, index) => {
          if (order.info.status === 3) {
            return (
              <TouchableOpacity
                // onPress={() => GetOrder(order.idOrder)}
                key={index}
                className="w-20 border h-20 m-2 rounded-md flex items-center p-1 justify-between"
              >
                <Text className="bg-red-600 rounded-md text-white"> New </Text>
                <Text className="font-semibold text-red-500">
                  {order.idOrder.substr(0, 5)}
                </Text>
                <Text className="text-red-500">
                  {TimeOrder(order.info.order_date.seconds * 1000)}
                </Text>
              </TouchableOpacity>
            );
          }
          if (order.info.status === 4) {
            return (
              <TouchableOpacity
                onPress={() => GetOrder(order.idOrder)}
                key={index}
                className="w-20 border h-20 m-2 rounded-md flex items-center p-1 justify-between"
              >
                <View className=" bg-green-500 px-3 py-[3px] rounded-md">
                  <FontAwesome name="check" size={14} color="white" />
                </View>
                <Text className="font-semibold text-red-500">
                  {order.idOrder.substr(0, 5)}
                </Text>
                <Text className="text-red-500">
                  {TimeOrder(order.info.order_date.seconds * 1000)}
                </Text>
              </TouchableOpacity>
            );
          }
        })}
      </ScrollView>
      {orderDetailt !== undefined ? <OrderInfo /> : ""}

      {/* {orders.map((order) => {
        if (order.status === 3 || order.status === 4) {
          return <OrderInfo />;
        }
        // else {
        //  return <OrderDoesNotExits/>
        // }
      })} */}
    </View>
  );
};

export default NewOrders;
