import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  Switch,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";

import {
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
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
export default function EditCategoryFoodView({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),

      title: "Chỉnh sửa danh mục",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 15,
      },
    });
  }, [navigation]);

  const [categoryId] = React.useState("");
  const [category_Name, setCategoryName] = React.useState(doc.id);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  function editCategories() {
    updateDoc(doc(db, "categories", "Q26nrHy7qKuwI6CXQDmt"), {
      category_Name: category_Name,
    });
    navigation.goBack("EditMenuView");
  }

  function deleteCategories(item) {
    deleteDoc(doc(db, "categories", "categoryId"));
    navigation.goBack("EditMenuView");
  }

  const [listCate, setListCate] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  console.log(listCate);

  useEffect(() => {
    const getCat = async () => {
      const catRef = collection(db, "categories");
      const c = query(catRef);
      console.log(c);

      const querySnapshot = await getDocs(c);
      const listCate = [];
      querySnapshot.forEach((doc) => {
        listCate.push({
          ...doc.data(),
          id: doc.id,
        });
        setRefreshing(false);
        // doc.data() is never undefined for query doc snapshots
        console.log(" getCAT ", doc.id, " => ", doc.data());
      });
      setListCate(listCate);
    };
    getCat();
  }, []);

  const onRefresh = () => {
    //xoa data cu
    setListCate([]);
    //goi data moi
    getCat();
  };

  const deleteTodo = (listCate) => {
    catRef
      .doc(listCate.id)
      .delete()
      .then(() => {
        //thanh cong
        alert("xoa thanh cong");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const updateTodo = () => {
    if (category_Name && category_Name.length > 0) {
      catRef
        .doc()
        .update({
          category_Name: category_Name,
        })
        .then(() => {
          navigation.navigate("EditMenuView");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

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
                  onChangeText={setCategoryName}
                  value={category_Name}
                ></TextInput>
              </View>
            </View>
          </View>
        </View>

        <View style={{ paddingBottom: 10 }}></View>

        {/* Hien thi tren menu */}
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}>Hiển thị trên menu</Text>
              </View>
              <View style={{ paddingRight: 10 }}>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={{ paddingBottom: 20 }}></View>

        {/* Xoa danh muc */}
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <TouchableOpacity onPress={() => deleteTodo(item)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ paddingRight: 10 }}>
                <AntDesign name="delete" size={24} color="black" />
              </View>
              <View>
                <Text>Xóa danh mục</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
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
              
              style={{
                backgroundColor: "#E94730",
                borderRadius: 15,
                width: "97%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}

              onPress={() => {updateTodo()}}
            >
              <Text style={{ color: "#fff" }}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
