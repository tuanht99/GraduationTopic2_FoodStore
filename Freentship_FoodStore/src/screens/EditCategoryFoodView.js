import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  Switch,
  Button,
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

// Navigation
export default function EditCategoryFoodView({ navigation, route }) {
  const { category } = route.params;
  const [namePathImage, setNamePathImage] = React.useState(null);
  console.log("id:", category);

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

  const [category_Name, setCategoryName] = React.useState(text);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [text, setText] = React.useState(category.name);
  console.log(text);

  function editCategories(text) {
    const storage = getStorage();
    getDownloadURL(ref(storage, namePathImage))
      .then((url) => {
        setImage(url);
        updateDoc(doc(db, "categories", category.id), {
          name: text,
          image: url,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    navigation.goBack("EditMenuView");
  }

  function deleteCategories(e) {
    deleteDoc(doc(db, "categories", e));
    navigation.goBack("EditMenuView");
  }

  const [image, setImage] = useState(category.image);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    // if (!result.cancelled) {
    //   setImage(result.uri);
    // }
    if (!result.cancelled) {
      const storage = getStorage();
      // const id = Math.random().toString(36).substring(7);
      // const id = React.useId()
      const bytes = new Uint8Array(result.uri);
      const metadata = {
        contentType: "image/jpeg",
      };
      const imgName = "img-" + new Date().getTime();
      setNamePathImage(`images/${imgName}.jpg`);
      const storageRef = ref(storage, `images/${imgName}.jpg`);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", result.uri, true);
        xhr.send(null);
      });

      uploadBytes(storageRef, blob).then((snapshot) => {
        // causes crash
        console.log("Uploaded a blob or file!");
      });
      setImage(result.uri);
    }
  };

  const [listCate, setListCate] = useState([]);

  console.log(listCate);

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
              <Text style={{ fontWeight: "bold" }}>
                Tên danh mục
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
                  onChangeText={(text) => setText(text)}
                  value={text}
                />
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
          <TouchableOpacity onPress={() => deleteCategories(category.id)}>
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
              onPress={() => {
                editCategories(text);
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
