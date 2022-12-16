import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { GetAllRatting } from "../services/store";

const AllRating = () => {
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    GetAllRatting()
      .then((data) => {
        setFilteredDataSource(data);
        setMasterDataSource(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log("filteredDataSource", filteredDataSource);
  const ItemView = ({ item }) => {
    return (
      <View className="bg-white border-b first-letter:border-[#a8a8a8]">
        <View className=" flex-row justify-between p-5">
          <Text className="font-bold">{item.name_User}</Text>
          <Text>{item.StartCount} ⭐</Text>
        </View>
        <View className='flex-row'>
          <View className="pl-5">
            <Text>Đánh giá{" :"}</Text>
          </View>
          <View className='pl-2 pb-5'>
            <Text numberOfLines={10}>{item.Comments}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      {filteredDataSource.length > 0 ? (
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item) => item.id}
          renderItem={ItemView}
        />
      ) : (
        <View className="flex justify-center items-center">
          <Text>Ko có đánh giá nào</Text>
        </View>
      )}
    </View>
  );
};

export default AllRating;

