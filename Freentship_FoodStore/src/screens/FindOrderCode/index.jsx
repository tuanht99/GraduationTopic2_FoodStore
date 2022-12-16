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
import { GetAllOrder } from "../../services";
import OrderDoesNotExits from "../../components/OrderDoesNotExits";

const FindOrderCode = () => {
  console.log(" new Date(selectedDate)");

  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  // console.log("filteredDataSource", filteredDataSource);
  useEffect(() => {
    GetAllOrder()
      .then((data) => {
        setFilteredDataSource(data);
        setMasterDataSource(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const FormatDate = (seconds) => {
    const value = new Date(seconds * 1000).toLocaleString("en-GB", {
      timeZone: "UTC",
    });
    return value;
  };

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.id ? item.id.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity className="flex-row border-b justify-between p-5">
        <Text>
          #<Text>{item.id.substr(0, 10).toUpperCase()}</Text>
        </Text>
        <Text className="text-[#888888]">
          {FormatDate(item.order_date.seconds)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View className="bg-white flex flex-row items-center ">
        <TextInput
          className="w-[70%]  border-b border-[#BBBBBB]  p-3 my-4 ml-4"
          placeholder=" # Tìm theo mã đơn"
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
        />
        <TouchableWithoutFeedback>
          <Text className="text-center text-blue-500 font-bold text-[16px] w-[20%]">
            Xem đơn
          </Text>
        </TouchableWithoutFeedback>
      </View>

      {filteredDataSource.length > 0 ? (
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item) => item.id}
          renderItem={ItemView}
        />
      ) : (
        <OrderDoesNotExits title={"Không tìm thấy đơn hàng :(( "} />
      )}
    </View>
  );
};

export default FindOrderCode;
