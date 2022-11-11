import { View, Text, TouchableWithoutFeedback } from "react-native";
import React ,  {useState , useEffect} from "react";
import Calendar from "../../components/Calendar";
import { useNavigation } from "@react-navigation/native";
import { GetStore, GetAllOrder } from "../../services";
const Turnover = (props) => {
  const [store, setStore] = useState([]);
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // console.log('totalRevenue' , totalRevenue)
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

  useEffect(() => {
    const a = order.map((i) => i.total_food);
    setTotalPrice(a);
  }, [order]);

  useEffect(() => {
    if (totalPrice.length > 0) {
      setTotalRevenue(totalPrice.reduce(myFunc));
      // setAmountPaidToAdmin(totalPrice.reduce(myFunc) *10 / 100);
    }
  }, [totalPrice]);

  function myFunc(total, num) {
    return total + num;
  }

  const navigation = useNavigation();
  return (
    <View>
      <Calendar title="Xem doanh thu : ">
        { console.log(props)}
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
      </Calendar>

      <View className="p-4 flex-row items-center justify-between mt-8 bg-white">
        <Text className="text-base font-bold">Thống kê món bán chạy</Text>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("BestSeller")}
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
