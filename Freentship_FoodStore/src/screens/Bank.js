import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  Switch,
  RefreshControl,
  Button,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";

import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../services/config";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBlob,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

const DATA = {
  id: 1,
  name: "Nước ngọt c2",
  discription: "Thơm ngon mời bạn ăn nha, getgo, getgo,...",
  location: "",
  relationship: "Đối tác lo ship",
  price: "20.000",
  status: "",
  shopaddress: "52 Bế văn đàn, an bình, dĩ an, bình dương",
  shopSl: "14 sản phẩm",
  shopname: "Tea 1998",
  shopimage: require("../../assets/nuoc_c2.png"),
  monAn1: require("../../assets/monAn1.png"),
  txtChonMua: "CHỌN MUA",
  txtsplq: "Sản phẩm cùng cửa hàng",

  txtDis: "Thông tin sản phẩm",
};
//

// Navigation
export default function Bank({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),

      title: "Tạo danh mục",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 15,
      },
    });
  }, [navigation]);

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
  const [idFoodStore, setIdFoodStore] = useState("");
  const [foodStore, setFoodStore] = useState([]);
  const [listCt, setListCt] = useState([]);
  const [listCate, setListCate] = useState([]);
  const [listFood, setListFood] = useState([]);
  useEffect(() => {
    getData();
  }, [idFoodStore]);

  useEffect(() => {
    if (idFoodStore !== "") {
      const fs = onSnapshot(doc(db, "food_stores", idFoodStore), (doc) => {
        setFoodStore(doc.data());
      });
    }
  }, [idFoodStore]);

  useEffect(() => {
    if (foodStore.opentime !== undefined) {
    }
  }, [foodStore]);

  const foodStoreName = foodStore.name;
  const foodStoreImage = foodStore.image;
  const foodStoreAddress = foodStore.address;
  const foodStorePhone = foodStore.phone;

  // load categories
  useEffect(() => {
    if (foodStore) {
      if (foodStore.food_categories) {
        GetCategoriesByIds(foodStore.food_categories).then((result) => {
          // console.log('list:', result);
          setListCt(result);
        });
      }
    }
  }, [foodStore.food_categories]);
  // list cate
  useEffect(() => {
    let unsubscribe;
    setListCate(null);
    const getCat = async () => {
      const catRef = collection(db, "categories");
      const c = query(catRef);

      const querySnapshot = await getDocs(c);
      const listCate = [];
      unsubscribe = onSnapshot(c, (querySnapshot) => {
        setListCate(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };
    getCat();
    return unsubscribe;
  }, []);

  const [categoryId] = React.useState("");
  const [nameBank, setNameBank] = React.useState("");
  
  function create() {
    addDoc(collection(db, ""), {
      food_store_id: idFoodStore,
      nameBank: nameBank,
    });
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 0.85 }}>
        {/* Tạo danh mục */}
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <View style={{ paddingBottom: 20 }}>
              <Text style={{ fontWeight: "bold" }}>Tên danh mục</Text>
            </View>

            <View>
              {/* // */}
              <View style={{ marginRight: 10 }}>
                <TextInput
                  style={{
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                    borderColor: "#E94730",
                    borderRadius: 5,
                  }}
                  placeholder={"Nhập tên danh mục"}
                  onChangeText={(nameBank) => {
                    setNameBank(nameBank);
                  }}
                  value={nameBank}
                ></TextInput>
              </View>
            </View>
          </View>
        </View>

        <View style={{ paddingBottom: 10 }}></View>
      </ScrollView>
      <View style={{ flex: 0.15 }}>
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
              onPress={create}
              style={{
                backgroundColor: "#E94730",
                borderRadius: 15,
                width: "98%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff" }}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
