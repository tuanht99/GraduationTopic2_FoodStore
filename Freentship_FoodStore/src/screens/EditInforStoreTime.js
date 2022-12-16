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

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBlob,
} from "firebase/storage";

import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { GetAllCate, GetCategoriesByIds } from "../services/store";
import { FlatList } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";
import RadioButtonRN from "radio-buttons-react-native";
const DATA = {
  a600: "06: 00",
  a700: "07: 00",
  a800: "08: 00",
  a900: "09: 00",
  a1000: "10: 00",
  a1100: "11: 00",
  a1200: "12: 00",
  a1300: "13: 00",
  a1400: "14: 00",
  a1500: "15: 00",
  a1600: "16: 00",
  a1700: "17: 00",
  a1800: "18: 00",
  a1900: "19: 00",
  a2000: "20: 00",
  a2100: "21: 00",
  a2200: "22: 00",
  a2300: "23: 00",
};
const data1 = [
  {
    label: "00: 00",
  },
  {
    label: "01: 00",
  },
  {
    label: "02: 00",
  },
  {
    label: "03: 00",
  },
  {
    label: "04: 00",
  },
  {
    label: "05: 00",
  },
  {
    label: "06: 00",
  },
  {
    label: "07: 00",
  },
  {
    label: "08: 00",
  },
  {
    label: "09: 00",
  },
  {
    label: "10: 00",
  },
  {
    label: "11: 00",
  },
  {
    label: "12: 00",
  },  {
    label: "13: 00",
  },  {
    label: "14: 00",
  },  {
    label: "15: 00",
  },  {
    label: "16: 00",
  },  {
    label: "17: 00",
  },  {
    label: "18: 00",
  },  {
    label: "19: 00",
  },  {
    label: "20: 00",
  },  {
    label: "21: 00",
  },  {
    label: "22: 00",
  },  {
    label: "23: 00",
  },  {
    label: "24: 00",
  },
];
export default function EditInforStoreTime({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),

      title: "Chỉnh sửa giờ mở cửa",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 15,
      },
    });
  }, [navigation]);
  const [modalVisible, setModalVisible] = useState(false);

  // food
  const idFoodStore = "4dpAvRWJVrvdbml9vKDL";
  const [foodStore, setFoodStore] = useState([]);

  const [a2200, setA2200] = useState([360, 1380]);
  const [a2300, setA2300] = useState([360, 1440]);
  const [listTime, setListTime] = useState([0, 1500]);

  useEffect(() => {
    const fs = onSnapshot(doc(db, "food_stores", idFoodStore), (doc) => {
      setFoodStore(doc.data());
    });
  }, [idFoodStore]);
  const foodStoreName = foodStore.name;
  const foodStoreImage = foodStore.image;
  const foodStoreAddress = foodStore.address;
  const foodStorePhone = foodStore.phone;
  // const foodStoreOpenTime = foodStore.openTime;
  // const foodStoreCate = foodStore.food_categories;
  const [ok, setOk] = React.useState([textPrice1, textPrice]);
  const [textPrice, setTextPrice] = React.useState();
  const [textPrice1, setTextPrice1] = React.useState();
  const handleSaveTime = () => {
    updateDoc(doc(db, "food_stores", idFoodStore), {
      opentime: a2200,
    });
    navigation.goBack("EditInforStore");
  };

  useEffect(() => {
    if (foodStore.opentime !== undefined) {
      console.log(" foodStore.opentime[0]", foodStore.opentime[0]);
    }
  }, [foodStore]);

  // load categories
  useEffect(() => {
    if (foodStore) {
      GetCategoriesByIds(foodStore.food_categories).then((result) => {
        // console.log('list:', result);
        setListCt(result);
      });
    }
  }, [foodStore.food_categories]);
  // Styles
  const styles = StyleSheet.create({
    centeredView: {
      // justifyContent: "center",
      alignItems: "center",
      marginTop: 140,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: 300,
      height: 370,
      paddingBottom: 10
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
      paddingTop: 10,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      marginLeft: 5,
      marginRight: 5
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
  });
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 0.8 }}>
        {/* Gio mo cua 7*/}
        <View className="p-4 border-b border-[#DDDDDD] flex-row justify-center items-center">
          {/* Giờ mở cửa */}
          <TouchableOpacity onPress={() => setModalVisible(true)} className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-sm pl-2 text-[#aaaaaa]">Từ </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[0] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
          <View className="mx-10">
            <Text>{"-"}</Text>
          </View>
          {/* Giờ đóng cửa */}
          <TouchableOpacity onPress={() => setModalVisible(true)} className="">
            <View className="flex-row border border-[#DDDDDD] rounded-md items-center justify-center">
              <Text className="text-[#aaaaaa] text-sm ">Đến </Text>
              <Text className="text-base rounded-full border w-auto p-2 border-[#AAAAAA]">
                {foodStore.opentime !== undefined &&
                  foodStore.opentime[1] / 60 + ":00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* modal */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView className="">
                <View className="w-56">
                  <RadioButtonRN
                    className=""
                    data={data1}
                    //selectedBtn={(e) => console.log(e)}
                    selectedBtn={(e) => console.log(e)}
                  ></RadioButtonRN>
                </View>
              </ScrollView>

              <Pressable
                className=""
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Trở lại</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      {/* Luu */}
      <View
        style={{
          paddingBottom: 0,
          flex: 0.2,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            width: "100%",
            borderTopColor: "#808080",
            borderTopWidth: 0.3,
            bottom: 0,
          }}
        >
          <View style={{ marginLeft: 10, marginRight: 10, paddingTop: 10 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#E94730",
                borderRadius: 15,
                width: "97%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleSaveTime}
            >
              <Text style={{ color: "#fff" }}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
