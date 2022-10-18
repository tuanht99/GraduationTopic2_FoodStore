import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  Switch,
  Platform,
  Button,
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
import { ScrollView, TextInput } from "react-native-gesture-handler";

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
export default function EditFoodView({ navigation, route }) {
  const { category } = route.params;
  const { food } = route.params;
  // const { food } = route.params;
  // console.log('idfood:', food);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),

      title: "Chỉnh sửa món",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 15,
      },
    });
  }, [navigation]);

  const [category_Name, setCategoryName] = React.useState("");
  const [food_Name, setFoodName] = React.useState("");
  const [food_Price, setFoodPrice] = React.useState("");
  const [food_Description, setFoodDescription] = React.useState("");

  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [text, setText] = React.useState(category);
  const [textName, setTextName] = React.useState(food.name);
  const [textPrice, setTextPrice] = React.useState("" + food.price);
  const [textDescription, setTextDescription] = React.useState(
    food.description
  );
  const [textImage, setTextImage] = React.useState(food.image);
  console.log("name: ", category);

  function editFood() {
    console.log("food name: ", textName);
    updateDoc(doc(db, "foods", food.id), {
      //category_Id: category.id,
      name: textName,
      price: textPrice,
      description: textDescription,
      image: image,
      food_store_id: "4dpAvRWJVrvdbml9vKDL",
      discount: 0,
      status: 1,
    });
    navigation.goBack("ShowFullFoodView");
    // 7T5uG3Si5NHioADgam1Z
  }

  function deleteFood(e) {
    deleteDoc(doc(db, "foods", e));
    navigation.goBack("EditMenuView");
  }

  const [image, setImage] = useState(food.image);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 0.85 }}>
        {/* image */}
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingTop: 10,
            paddingBottom: 10,
            width: "100%",
            height: 420,
          }}
        >
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <View style={{ paddingRight: 10 }}>
              <View
                style={{
                  borderRadius: 15,
                  borderColor: "#E94730",
                  borderWidth: 1,
                  width: "100%",
                  height: 342,
                  paddingBottom: 10,
                }}
              >
                <TouchableOpacity onPress={pickImage}>
                  <View>
                    <View>
                      {image && (
                        <Image
                          source={{ uri: image }}
                          style={{
                            borderRadius: 15,
                            width: "100%",
                            height: 340,
                          }}
                        />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={{ paddingTop: 20 }}>
                  <Button title="Chọn hình" onPress={pickImage} />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ paddingBottom: 10 }}></View>

        {/* ten danh muc */}
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
              <Text style={{ fontWeight: "bold" }}>Danh mục</Text>
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
                  onChangeText={(text) => setText(text)}
                  value={text}
                ></TextInput>
              </View>
            </View>
          </View>
        </View>

        {/* Nhập tên món ăn */}
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
              <Text style={{ fontWeight: "bold" }}>Nhập tên món ăn</Text>
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
                  onChangeText={(textName) => setTextName(textName)}
                  value={textName}
                ></TextInput>
              </View>
            </View>
          </View>
        </View>

        {/* Giá */}
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
              <Text style={{ fontWeight: "bold" }}>
                Giá bán
              </Text>
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
                  keyboardType='numeric'
                  onChangeText={(textPrice) => setTextPrice(textPrice)}
                  value={textPrice}
                ></TextInput>
              </View>
            </View>
          </View>
        </View>

        {/* Mô tả */}
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
              <Text style={{ fontWeight: "bold" }}>Mô tả (nếu có)</Text>
            </View>

            <View>
              {/* // */}
              <View style={{ marginRight: 10 }}>
                <TextInput
                  style={{
                    height: 50,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                    borderColor: "#E94730",
                    borderRadius: 5,
                  }}
                  onChangeText={(textDescription) =>
                    setTextDescription(textDescription)
                  }
                  value={textDescription}
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

        {/* Xoa mon */}
        <View style={{ marginLeft: 10, marginRight: 10, paddingBottom: 20 }}>
          <TouchableOpacity onPress={() => deleteFood(food.id)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ paddingRight: 10 }}>
                <AntDesign name="delete" size={24} color="black" />
              </View>
              <View>
                <Text>Xóa món</Text>
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
              onPress={editFood}
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
}
