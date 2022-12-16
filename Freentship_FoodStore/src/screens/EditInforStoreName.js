import React, { useEffect, useState } from "react";
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

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBlob,
} from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Navigation
export default function EditInforStoreName({ navigation, route }) {
  const {foodStore} = route.params;
  // food
  const [text, setText] = useState(foodStore.name)
  const [image, setImage] = useState(foodStore.image);
  
  const [namePathImage, setNamePathImage] = React.useState(null);
  function edit(text) {
    const storage = getStorage();
    getDownloadURL(ref(storage, namePathImage))
      .then((url) => {
        setImage(url);
        updateDoc(doc(db, "food_stores", foodStore.id), {
          name: text,
          image: url,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    navigation.goBack("EditInforStore");
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

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
                    {/* image2 */}
                    {/* <View>
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
                    </View> */}
                    {/* image1 */}
                    <View>
                      {image && (
                        <Image
                          source={{ uri: image}}
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
              </View>
              <View style={{ paddingTop: 20 }}>
                <Button title="Chọn hình" onPress={pickImage} />
              </View>
            </View>
          </View>
        </View>

        <View style={{ paddingBottom: 10 }}></View>

        {/* Tên quán */}
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
              <Text style={{ fontWeight: "bold" }}>Tên quán</Text>
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
                edit(text);
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
