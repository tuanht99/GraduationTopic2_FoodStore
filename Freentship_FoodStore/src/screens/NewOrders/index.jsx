import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import call from "react-native-phone-call";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import TimeOrder from "../../components/GetTime";
import OrderDoesNotExits from "../../components/OrderDoesNotExits";
import {
  GetOrderDetail,
  GetShipper,
  GetFoods,
  UpdateStatus,
} from "../../services";
import formatCash from "../../components/FormatCash";

import { db } from "../../services/config";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetailt, setOrderDetailt] = useState();
  const [isActiveOrders, setActiveOrders] = useState("");
  const [idFoodStore, setIdFoodStore] = useState("");

  console.log('orderDetailt' , orderDetailt);
  
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("foodStoreID");
      if (value !== null) {
        setIdFoodStore(value);
      }
    } catch (e) {
      console.log("ErrorError");
    }
  };
  useEffect(() => {
    getData();
  }, []);


  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      where("food_store_id", "==", idFoodStore)
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
  }, [idFoodStore]);

  const GetOrder = (id) => {
    if (orders.length > 0) {
      setActiveOrders(id);
      GetOrderDetail(id).then((doc) => {
        GetShipper(doc.user_id)
          .then((user) => {
            const foods = [];
            doc.ordered_food.map((e) => {
              GetFoods(e.food_id).then((food) => {
                const a = [...a, food];
                foods.push(a);
                setOrderDetailt({ order: doc, user: user, foods: foods });
              });
            });
          })
          .catch((err) => console("err =>", err));
      });
    }
  };
  useEffect(() => {
    GetOrder();
  }, [orders]);

  useEffect(() => {
    if (orders.length > 0) {
      const arr = [];
      orders.map((i) => {
        if (i.info.status === 3) {
          arr.push(i.info.order_date.seconds);
          if (i.info.order_date.seconds === Math.max(...arr)) {
            GetOrder(i.idOrder);
          }
        }
      });
    }
  }, [orders]);

  const Rose = (money) => {
    return (money * 20) / 100;
  };

  const Total = (a, b) => {
    return a - b;
  };

  const OrderInfo = () => (
    <ScrollView className="z-10  mb-[500px]">
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
          onPress={() =>
            call({
              number: orderDetailt.user.phone + "",
              prompt: false,
            }).catch(console.error)
          }
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
          <Text className=" text-red-500 font-bold">
            {TimeOrder((orderDetailt.order.order_date.seconds + 1800) * 1000)}
          </Text>
        </Text>
      </View>
      <View className="h-auto bg-[#CCFF99] p-3">
        <View className=" flex-row justify-between">
          <Text className="ml-8 text-[15px]">Chi tiết đơn hàng</Text>
          <Feather name="arrow-right" size={20} color="black" />
        </View>
        <ScrollView className="h-24">
          {orderDetailt !== undefined && (
            <View className="flex-row ml-2 mt-4">
              <View className="flex-col w-1/6">
                {orderDetailt.order.ordered_food.map((o) => (
                  <Text className="text-base font-bold ">
                    {o.quantity + " "}
                    <Text className="font-normal text-[#888888]">x</Text>
                  </Text>
                ))}
              </View>

              <View className="flex-col w-2/3">
                {orderDetailt.foods.map((f) => (
                  <Text className="text-base font-bold ">{f[1].name}</Text>
                  // <Text className="text-base font-bold text-red-600"></Text>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
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
      <TouchableOpacity
        onPress={() => UpdateStatus(isActiveOrders)}
        className="bg-[#0099FF] flex justify-center items-center px-5 py-3 m-3 rounded-md"
      >
        <Text className="font-bold text-white">
          Đơn hàng đã được chuẩn bị xong
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const OrderCard = ({ index, order, checkOrder, notCheckOrder, status }) => (
    <TouchableOpacity
      onPress={() => GetOrder(order.idOrder)}
      key={index}
      className={
        isActiveOrders == order.idOrder ? ` ${checkOrder}` : ` ${notCheckOrder}`
      }
    >
      {status}
      <Text className="font-semibold text-red-500">
        {order.idOrder.substr(0, 6).toUpperCase()}
      </Text>
      <Text className="text-red-500">
        {TimeOrder(order.info.order_date.seconds * 1000)}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View>
      <Header />
      <ScrollView horizontal className="h-32  flex-row ">
        {orders.map((order, index) => {
          const NotCheckOrder =
            "w-20 border h-20 m-2 rounded-md flex items-center p-1 justify-between";
          const checkOrder =
            "w-20 h-20 m-2 border-blue-600 border-4 rounded-md flex items-center p-1 justify-between";
          const successOrd = (
            <View className=" bg-green-500 px-3 py-[3px] rounded-md">
              <FontAwesome name="check" size={14} color="white" />
            </View>
          );
          const newOrd = (
            <Text className="bg-red-600 rounded-md text-white"> New </Text>
          );

          let status;

          if (order.info.status === 3) {
            status = newOrd;
            return (
              <OrderCard
                index={index}
                order={order}
                checkOrder={checkOrder}
                notCheckOrder={NotCheckOrder}
                successOrd={successOrd}
                status={status}
              />
            );
          }

          if (order.info.status === 4) {
            status = successOrd;
            return (
              <OrderCard
                index={index}
                order={order}
                checkOrder={checkOrder}
                notCheckOrder={NotCheckOrder}
                successOrd={successOrd}
                status={status}
              />
            );
          }
          if (order.info.status === 3 || order.info.status === 4) {
          }
        })}
      </ScrollView>
      {orderDetailt !== undefined ? (
        <ScrollView>
          <OrderInfo />
        </ScrollView>
      ) : (
        <OrderDoesNotExits title={" Hiện tại chưa có đơn hàng nào"} />
      )}
    </View>
  );
};

export default NewOrders;
