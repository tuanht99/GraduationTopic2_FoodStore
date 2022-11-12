// import { View, Text, TouchableWithoutFeedback } from "react-native";
// import React from "react";
// import Header from "../../components/Header";

// const Store = ({navigation}) => {
//   var date = new Date();
// var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
// var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
//   return (
//     <View>
//       <Header />
//      <Text>{firstDay.toString()}</Text>
//     </View>
//   );
// };

import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState, useCallback } from "react";
import DatePicker from "react-native-modern-datepicker";

const Store = () => {
  const array2 = [
    { id: 1, val: 60 },
    { id: 2, val: 2 },
    { id: 3, val: 89 },
    { id: 4, val: 78 },
  ];
  const max2 = array2.reduce(
    (op, item) => (op = op > item.val ? op : item.val),
    0
  );

  console.log(max2);
  return (
    <SafeAreaView className="flex justify-center items-center mt-10"></SafeAreaView>
  );
};
export default Store;
