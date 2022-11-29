import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  Switch,
  Platform,
  Button,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";

import {
  doc,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  where,
  query,
  QuerySnapshot,
  editDoc,
  onSnapshot,
} from "firebase/firestore";

import * as ImagePicker from "expo-image-picker";

import { db } from "../services/config";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBlob,
} from "firebase/storage";
import { GetAllOrder } from "../services";
import OrderDoesNotExits from "../components/OrderDoesNotExits";
const FindOrderCode = () => {
  console.log(" new Date(selectedDate)");

  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  console.log("filteredDataSource", filteredDataSource);
  useEffect(() => {
    GetAllOrder()
      .then((data) => {
        setFilteredDataSource(data);
        setMasterDataSource(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const FormatDate = (seconds) => {
    const value = new Date(seconds * 1000).toLocaleString("en-GB", {
      timeZone: "UTC",
    });
    return value;
  };

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.id ? item.id.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity className="flex-row border-b justify-between p-5">
        <Text>
          #<Text>{item.id.substr(0, 10).toUpperCase()}</Text>
        </Text>
        <Text className="text-[#888888]">
          {FormatDate(item.order_date.seconds)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View className="bg-white ">
        <View className="flex flex-row items-center rounded-lg border border-[#BBBBBB] p-3 my-4 mx-4">
          <AntDesign name="search1" size={24} color="black" />
          <TextInput
            className="w-full pl-2"
            placeholder="Tìm danh mục"
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
          />
        </View>
      </View>

      {filteredDataSource.length > 0 ? (
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item) => item.id}
          renderItem={ItemView}
        />
      ) : (
        <OrderDoesNotExits title={"Không tìm thấy đơn hàng :(( "} />
      )}
    </View>
  );
};

// Navigation
export default function EditInforStoreCate({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),

      title: "Chỉnh sửa thông tin cửa hảng",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 15,
      },
    });
  }, [navigation]);
  return (
    <View>
      <View>
        {/* Nganh Kinh doanh */}
        <View className="m-2 border-b border-[#DDDDDD]">
          <View className="flex-row justify-start pl-2 pb-2 items-center">
            <Text className="font-bold text-lg">
              Vui lòng chọn tối đa 3 danh mục
            </Text>
          </View>
          <View className="flex-row">
            <TouchableOpacity className="flex flex-row border rounded-lg px-2 m-2 border-[#AAAAAA] items-center">
              <Text className="text-base pr-1 ">Bánh xèo</Text>
              <Feather name="x-circle" size={12} color="gray" />
            </TouchableOpacity>

            <TouchableOpacity className="flex flex-row border rounded-lg px-2 m-2 border-[#AAAAAA] items-center">
              <Text className="text-base pr-1 ">Bánh xèo</Text>
              <Feather name="x-circle" size={12} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="border-b-8 border-[#DDDDDD] my-2"></View>

        <FindOrderCode />
      </View>
    </View>
  );
}
