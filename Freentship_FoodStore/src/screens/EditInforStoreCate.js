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
import { GetAllCate, GetCategoriesByIds } from "../services/store";
import OrderDoesNotExits from "../components/OrderDoesNotExits";
import { async } from "@firebase/util";

const FindCateCode = () => {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    GetAllCate()
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

  const idFoodStore = "4dpAvRWJVrvdbml9vKDL";
  const [listCt, setListCt] = useState([]);
  const handleChangeListCt = (id) => {
    if (listCt.some((ct) => ct === id)) {
      setListCt([...listCt.filter((ct) => ct !== id)]);
      handleDeleteCategoryById(id)
    } else {
      if (listCt.length > 2) return;
      setListCt([...listCt, id]);
    }
  };

  // handle delete category by id
  const handleDeleteCategoryById = async(id) => {
    const ctRef = doc(db, 'food_stores', idFoodStore)
    await updateDoc(ctRef, {
      food_categories: arrayRemove(`${id}`)
    })
  }

  
  const [foodStore, setFoodStore] = useState([]);
  useEffect(() => {
    const fs = onSnapshot(doc(db, "food_stores", idFoodStore), (doc) => {
      setFoodStore(doc.data());
    });
  }, [idFoodStore]);

  // load categories
  useEffect(() => {
    if (foodStore) {
      GetCategoriesByIds(foodStore.food_categories).then((result) => {
        // console.log('list:', result);
        var ids = []
        result.map((ct) => {
          ids.push(ct.id)
        });
        setListCt(ids);
      });
    }
  }, [foodStore.food_categories]);

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
    console.log("listCt: ", listCt);
    console.log("id:", item.id);

    return (
      <TouchableOpacity
        onPress={() => handleChangeListCt(item.id)}
        className="flex-row justify-between items-center p-5 bg-white"
      >
        <View className="w-full flex flex-row justify-between items-center">
          <View className="items-center flex-row content-center">
            <View className="pr-2">
              <Image
                className="w-[40px] h-[40px] rounded-[25px]"
                source={{ uri: item.image }}
              />
            </View>
            <View>
              <Text className="font-bold">{item.name}</Text>
            </View>
          </View>
          {listCt && listCt.some((ct) => ct === item.id) && (
            <AntDesign name="check" size={24} color="green" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.3 }} className="bg-white ">
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
          className="bg-white"
          style={{ flex: 0.45 }}
          data={filteredDataSource}
          keyExtractor={(item) => item.id}
          renderItem={ItemView}
        />
      ) : (
        <OrderDoesNotExits
          style={{ flex: 0.45 }}
          title={"Không tìm thấy danh mục :(( "}
        />
      )}

      <View style={{ flex: 0.25 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingTop: 10,
            paddingBottom: 10,
            width: "100%",
            borderTopColor: "#808080",
            borderTopWidth: 0.3,
            bottom: 0,
          }}
        >
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#E94730",
                borderRadius: 15,
                width: "97%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff" }}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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

  const idFoodStore = "4dpAvRWJVrvdbml9vKDL";
  const [foodStore, setFoodStore] = useState([]);
  const [listCt, setListCt] = useState([]);
  useEffect(() => {
    const fs = onSnapshot(doc(db, "food_stores", idFoodStore), (doc) => {
      setFoodStore(doc.data());
    });
  }, [idFoodStore]);

  // load categories
  useEffect(() => {
    if (foodStore) {
      GetCategoriesByIds(foodStore.food_categories).then((result) => {
        // console.log('list:', result);
        setListCt(result);
      });
    }
  }, [foodStore.food_categories]);
  return (
    <View style={{ flex: 1 }}>
      {/* Nganh Kinh doanh */}
      <View style={{ flex: 0.2 }} className="m-2 border-b border-[#DDDDDD]">
        <View className="flex-row justify-start pl-2 pb-2 items-center">
          <Text className="font-bold text-lg">
            Vui lòng chọn tối đa 3 danh mục
          </Text>
        </View>
        <View className="flex-row">
          {listCt &&
            listCt.map((ct) => (
              <TouchableOpacity className="flex flex-row border rounded-lg px-2 m-2 border-[#AAAAAA] items-center">
                <Text numberOfLines={2} className="text-base pr-1 ">{ct.name}</Text>
                <Feather name="x-circle" size={12} color="gray" />
              </TouchableOpacity>
            ))}
        </View>
      </View>

      <FindCateCode style={{ flex: 0.8 }} />
    </View>
  );
}
