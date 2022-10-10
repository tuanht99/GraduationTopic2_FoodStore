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
export default function EditMenuView({ navigation }) {
  // const {category} = route.params;
  // const { food } = route.params;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),

      // headerRight: () => (
      //   <TouchableOpacity onPress={navigation.goBack}>
      //     <Text>Lưu</Text>
      //   </TouchableOpacity>
      // ),

      title: "Chỉnh sửa menu",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 15,
      },
    });
  }, [navigation]);

  const [listCate, setListCate] = useState([]);
  const [listFood, setListFood] = useState([]);
  console.log(listCate);
  console.log(listFood);

  // list cate
  useEffect(() => {
    let unsubscribe;
    setListCate(null);
    const getCat = async () => {
      const catRef = collection(db, "categories");
      const c = query(catRef);
      console.log(collection(db, "categories"));

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
  console.log("listCate", listCate);

  // list food of cate
  useEffect(() => {
    let unsubscribe;
    setListFood(null);
    const getFood = async () => {
      const foodRef = collection(db, "foods");
      const c = query(foodRef);
      console.log(collection(db, "foods"));

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
  console.log("listFood", listFood);

  return (
    <View style={{ flex: 1 }}>
      {/* Ten danh muc */}
      <View
        style={{
          width: "100%",
          backgroundColor: "#fff",
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <View style={{ paddingBottom: 20 }}>
            <Text style={{ fontWeight: "bold" }}>Anh ba gà</Text>
          </View>

          <View>
            {/* // */}
            <View style={{ marginRight: 10 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddCategoryFoodView")}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  width: "100%",
                  height: 45,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: "#E94730",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <AntDesign name="plus" size={24} color="#E94730" />
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft: 5,
                    }}
                  >
                    <Text style={{ color: "#E94730" }}>Tạo danh mục</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={{ paddingBottom: 10 }}></View>
      {/* ds danh muc, mon an */}
      <FlatList
        data={listCate}
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
              {/* Danh muc */}
              <View style={{ marginLeft: 10, marginRight: 10 }}>
                <View>
                  <Text style={{ fontWeight: "bold", paddingBottom: 20 }}>
                    {item.category_Name}
                  </Text>
                </View>

                {/* 2 cai nut */}
                <View style={{ flexDirection: "row" }}>
                  {/* // */}
                  <View style={{ marginRight: 10, paddingRight: "20%" }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("EditCategoryFoodView", {
                          category: item,
                        })
                      }
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: 5,
                        width: "100%",
                        height: 45,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#E94730",
                      }}
                    >
                      <View style={{ flexDirection: "row", margin: 10 }}>
                        <View>
                          <AntDesign name="edit" size={24} color="#E94730" />
                        </View>
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            paddingLeft: 5,
                          }}
                        >
                          <Text style={{ color: "#E94730" }}>Chỉnh sửa</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>

                  {/* // */}
                  <View style={{ marginRight: 10 }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("AddFoodView", { category: item })
                      }
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: 5,
                        width: "100%",
                        height: 45,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#E94730",
                      }}
                    >
                      <View style={{ flexDirection: "row", margin: 10 }}>
                        <View>
                          <AntDesign name="plus" size={24} color="#E94730" />
                        </View>
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            paddingLeft: 5,
                          }}
                        >
                          <Text style={{ color: "#E94730" }}>Thêm món ăn</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

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
                    onPress={() => navigation.navigate("EditFoodView")}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={DATA.monAn1}
                        style={{ width: 40, height: 40, borderRadius: 25 }}
                      />

                      <View style={{ paddingLeft: 10 }}>
                        <Text
                          numberOfLines={1}
                          style={{ fontWeight: "bold", width: 180 }}
                        >
                          {DATA.name}
                        </Text>
                        <Text>{DATA.price}</Text>
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
