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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Switch } from "react-native";
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
  },
  {
    label: "13: 00",
  },
  {
    label: "14: 00",
  },
  {
    label: "15: 00",
  },
  {
    label: "16: 00",
  },
  {
    label: "17: 00",
  },
  {
    label: "18: 00",
  },
  {
    label: "19: 00",
  },
  {
    label: "20: 00",
  },
  {
    label: "21: 00",
  },
  {
    label: "22: 00",
  },
  {
    label: "23: 00",
  },
  {
    label: "24: 00",
  },
];
export default function StatusStore({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),

      title: "Đóng cửa hàng",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 15,
      },
    });
  }, [navigation]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const modalConfirm = () => setModalVisible(true);

  // Styles
  const styles = StyleSheet.create({
    centeredView: {
      justifyContent: "center",
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
      width: 250,
      height: 200,
      
      justifyContent: 'center'
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      margin: 2,
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
      marginRight: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
  });
  return (
    <View style={{ flex: 1 }}>
      {/* đóng cửa hàng */}
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
              <Text style={{ fontWeight: "bold" }}>Đóng cửa hàng</Text>
            </View>
            <View style={{ paddingRight: 10 }}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch && modalConfirm}
                value={isEnabled}
              />
            </View>
          </View>
        </View>
      </View>

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
              <View className="flex justify-center items-center">
                <View>
                  <Text>Bạn có thật sự muốn tạm đóng cửa hàng không?</Text>
                </View>
                <View className="flex flex-row justify-center items-center">
                  <View>
                    <Pressable
                      className=""
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Trở lại</Text>
                    </Pressable>
                  </View>

                  <View>
                    <Pressable
                      className=""
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Xác nhận</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
