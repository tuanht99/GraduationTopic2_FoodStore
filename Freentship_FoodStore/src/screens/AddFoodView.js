import React, {useState} from "react";
import {Button, Image, Text, TouchableOpacity, View} from "react-native";

import {AntDesign} from "@expo/vector-icons";
import {ScrollView, TextInput} from "react-native-gesture-handler";

import * as ImagePicker from 'expo-image-picker';

import {addDoc, collection} from "firebase/firestore";
import {db} from '../services/config'
import {getStorage, ref, uploadBytes, getDownloadURL, getBlob} from "firebase/storage";


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

  const [namePathImage, setNamePathImage] = React.useState(null);
  const [category_Name, setCategoryName] = React.useState("");
  const [food_Name, setFoodName] = React.useState("");
  const [food_Price, setFoodPrice] = React.useState("");
  const [food_Description, setFoodDescription] = React.useState("");
  //const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [text, setText] = React.useState(category.name);
  // const [aFood, setAFood] = React.useState(food.id)

  function addFood () {
    const storage = getStorage();
    getDownloadURL(ref(storage, namePathImage)).then((url) => {
      setImage(url);
      addDoc(collection(db, "foods"), {
        category_Id: category.id,
        name:food_Name,
        price:food_Price,
        description: food_Description,
        image: url,
        food_store_id: '7T5uG3Si5NHioADgam1Z',
        discount: 0,
        status: 1
      });
    }).catch((error) => {
      console.log(error)
    })

      
    navigation.goBack('EditMenuView');
  }

  const [image, setImage] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const storage = getStorage();
      // const id = Math.random().toString(36).substring(7);
      // const id = React.useId()
      const bytes = new Uint8Array(result.uri)
      const metadata = {
        contentType: "image/jpeg",
      };
      const imgName = "img-" + new Date().getTime();
      setNamePathImage(`images/${imgName}.jpg`);
      const storageRef = ref(storage, `images/${imgName}.jpg`);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function() {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', result.uri, true);
        xhr.send(null);
      });

      uploadBytes(storageRef, blob).then((snapshot) => { // causes crash
        console.log('Uploaded a blob or file!');
      });
      setImage(result.uri);
    }
  };

  // food_Name
  // const [isFoodName, setIsFoodName] = useState(true)
  // const verityFoodName = (food_Name) => {
  //   // it nhat 1 ki tu
  //   let regex = new RegExp(/[a-A0-9]{1,}/);
  //   if(!food_Name) return true;
  //   if (regex.test(food_Name)){
  //     return true;
  //   } 
  //   return false;
  // }

  // Gia
  // const [isFoodPrice, setIsFoodPrice] = useState(true)
  // const verityFoodPrice = (food_Price) => {
  //   // it nhat 1 ki tu so
  //   let regex = new RegExp(/[a-A0-9]{1,}/);
  //   if(!food_Price) return true;
  //   if (regex.test(food_Price)){
  //     return true;
  //   } 
  //   return false;
  // }

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
            width: '100%',
            height: 420
          }}
        >
          <View style={{marginLeft: 10, marginRight: 10}}>
            <View style={{ paddingRight: 2 }}>
              <View
                style={{
                  borderRadius: 15,
                  borderColor: "#E94730",
                  borderWidth: 1,
                  width: '100%',
                  height: 342, paddingBottom: 10
                }}
              >
                <TouchableOpacity onPress={pickImage}>
                  <View>
                    {image && <Image source={{ uri: image }} style={{borderRadius: 15 , width: '100%', height: 340,  }} />}
                </View>
                </TouchableOpacity>

                
              </View>
              <View style={{paddingTop: 20, }}>
                <Button title="Chọn hình" onPress={pickImage} />
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
                  onChangeText={(food_Name) => {setFoodName(food_Name);
                    //  
                  // const isValid = verityFoodName(food_Name);
                  // isValid? setIsFoodName(true): setIsFoodName(false);
                }}
                  value={food_Name}
                   
                ></TextInput>
                {/* <Text style={{color: '#3366cc', fontSize: 10, paddingLeft: 10}}>
                  {isFoodName? "" : "Tên món ăn k đc để trống 👍"}
                </Text> */}
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
              <Text style={{ fontWeight: "bold" }}>Giá bán</Text>
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
                  placeholder={'25.000'}
                  onChangeText={(food_Price) => {setFoodPrice(food_Price);
                    // const isValid = verityFoodPrice(food_Price);
                    // isValid? setIsFoodPrice(true): setIsFoodPrice(false);
                  }}
                  value={food_Price}
                  
                ></TextInput>
                {/* <Text style={{color: 'red', fontSize: 10, paddingLeft: 10}}>
                  {isFoodPrice? "" : "Gia k đc để trống 👍"}
                </Text> */}
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
