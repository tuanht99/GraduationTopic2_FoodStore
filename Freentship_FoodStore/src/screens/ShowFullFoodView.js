import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

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

import { db } from "../services/config";

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

// Navigation
export default function ShowFullFoodView({ navigation, route }) {
  const {category} = route.params;
  const { food } = route.params;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),

      title: category.name,
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 15,
      },
    });
  }, [navigation]);

  const [category_Name, setCategoryName] = React.useState(text);
  const [text, setText] = React.useState(category.name);

  const [listCate, setListCate] = useState([]);
  const [listFood, setListFood] = useState([]);

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
      // unsubscribe = await getDocs(c).then((querySnapshot) => {
      //   setListCate(querySnapshot.docs.map((doc) => ({
      //     id: doc.id,
      //     ...doc.data()
      //   })));
      // })
      // querySnapshot.forEach((doc) => {
      //   listCate.push({
      //     ...doc.data(),
      //     id: doc.id,
      //   });

      // doc.data() is never undefined for query doc snapshots
      //   console.log(" getCAT ", doc.id, " => ", doc.data());
      // });
      // setListCate(listCate);
    };
    getCat();
    return unsubscribe;
  }, []);
  //console.log("listCate", listCate);

  // list food of cate
  useEffect(() => {
    let unsubscribe;
    setListFood(null);
    const getFood = async () => {
      const foodRef = collection(db, "foods");
      const c = query(
        foodRef,
        where("category_Id", "==", category.id)
      );
      const querySnapshot = await getDocs(c);
      const listFood = [];
      unsubscribe = onSnapshot(c, (querySnapshot) => {
        setListFood(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };
    getFood();
    return unsubscribe;
  }, []);
  console.log('asda', listFood)

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingBottom: 10 }}></View>
      {/* ds danh muc, mon an */}
      <FlatList
        data={listFood}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            {/* flastlist */}
            <View
              style={{
                backgroundColor: "#fff",
                paddingTop: 10,
                paddingBottom: 10,
                borderBottomWidth: 0.3,
                borderBottomColor: "#808080",
              }}
            >
              {/* mon của danh muc */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  paddingTop: 20,
                  paddingBottom: 20,
                  borderBottomWidth: 0.3,
                  borderBottomColor: "#808080",
                }}
              >
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                  {/* shop */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate("EditFoodView", 
                      {categoryName: text, food: item}
                    )}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{uri: item.image}}
                        style={{ width: 40, height: 40, borderRadius: 25 }}
                      />

                      <View style={{ paddingLeft: 10 }}>
                        <Text
                          numberOfLines={1}
                          style={{ fontWeight: "bold", width: 180 }}
                        >
                          {item.name}
                        </Text>
                        <Text>{item.price}</Text>
                        <Text style={{color: '#000'}}>{item.description}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
