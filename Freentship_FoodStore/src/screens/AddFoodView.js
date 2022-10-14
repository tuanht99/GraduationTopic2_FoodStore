import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";

import * as ImagePicker from 'expo-image-picker';

import { doc, setDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from '../services/config'
import { async } from "@firebase/util";


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
export default function AddCategoryFoodView({ navigation, route }) {
  const { category } = route.params;
  const { food } = route.params;
  console.log('idadd:', category);
  console.log('idFood: ', food);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),

      title: "Thêm món mới",
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
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [text, setText] = React.useState(category.category_Name);
  // const [aFood, setAFood] = React.useState(food.id)

  function addFood () {
      addDoc(collection(db, "foods"), {
        category_Id: category.id,
        name:food_Name,
        price:food_Price,
        description: food_Description,
        image: 'a',
        food_store_id: '7T5uG3Si5NHioADgam1Z',
        discount: 0,
        status: 1
      }); 
    navigation.goBack('EditMenuView');
  }

  // const ImagePicker = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowEditing: true, 
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   const source = {url: result.url};
  //   console.log(source);
  //   setImage(source);
  // };

  // const uploadImage = async () => {
  //   setUploading(true);
  //   const response = await fetch(image.url)
  //   const blob = await response.blob();
  //   const filename = image.url.substring(image.url.lastIndexOf('/')+1);
  //   var ref = firebase.storage().ref().child(filename).put(blob);

  //   try{
  //     await ref;
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   setUploading(false);
  //   Alert.alert(
  //     'photo uploader..'
  //   );
  //   setImage(null);  
  // };

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
          }}
        >
          <View style={{marginLeft: 10, marginRight: 10}}>
            <View style={{ paddingRight: 10 }}>
              <View
                style={{
                  borderRadius: 15,
                  borderColor: "#E94730",
                  borderWidth: 1,
                }}
              >
                <TouchableOpacity>
                  <View>
                    <Image
                      source={DATA.shopimage}
                    style={{ width: "100%",
                    height: 360,
                    marginTop: 10,
                    marginBottom: 10,}}
                    />
                    {/* {image && <Image source={{uri: image.uri}} style={{ width: "100%",
                    height: 360,
                    marginTop: 10,
                    marginBottom: 10}}  />} */}
                </View>
                </TouchableOpacity>
                
              </View>
            </View>
          </View>
        </View>

        <View style={{paddingBottom: 10}}></View>

        {/* ten danh muc */}
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <View style={{marginLeft: 10, marginRight: 10}}>
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
          <View style={{marginLeft: 10, marginRight: 10}}>
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
                  placeholder={'bún chả cá'}
                  onChangeText={(food_Name) => {setFoodName(food_Name)}}
                  value={food_Name}
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
          <View style={{marginLeft: 10, marginRight: 10}}>
            <View style={{ paddingBottom: 20 }}>
              <Text style={{ fontWeight: "bold" }}>Giá bán (tối thiểu 20.000)</Text>
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
                  placeholder={'25.000'}
                  onChangeText={(food_Price) => {setFoodPrice(food_Price)}}
                  value={food_Price}
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
          <View style={{marginLeft: 10, marginRight: 10}}>
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
                  placeholder={'thơm ngon'}
                  onChangeText={(food_Description) => {setFoodDescription(food_Description)}}
                  value={food_Description}
                ></TextInput>
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
          <View style={{marginLeft: 10, marginRight: 10}}>
            <TouchableOpacity 
                onPress={addFood}
                style={{
                backgroundColor: "#E94730",
                borderRadius: 15,
                width: "97%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Text style={{color: "#fff",}}>Thêm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
