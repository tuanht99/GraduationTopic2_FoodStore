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
  const [date, setDate] = useState("");
  const [showMonth, setShowMonth] = useState(false);

  var date1 = new Date('11/11/2022');
  var firstDay = new Date(date1.getFullYear(), date1.getMonth(), 1);
  var lastDay = new Date(date1.getFullYear(), date1.getMonth() + 1, 0);
  const showPicker = useCallback((value) => setShowMonth(value), []);
  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker]
  );
  return (
    <SafeAreaView className="flex justify-center items-center mt-10">
      <Text>{firstDay.toString()}</Text>
      {/* <Text>{moment(date, "MM-YYYY")}</Text> */}
      <TouchableOpacity onPress={() => showPicker(true)}>
        <Text>OPEN</Text>
      </TouchableOpacity>

      {showMonth && (
        <DatePicker
          mode="monthYear"
          selectorStartingYear={2000}
          onMonthYearChange={(selectedDate) => setDate(selectedDate)}
          onPress={() => showPicker(false)}
          options={{ backgroundColor: "red" }}
        />
      )}

      {showMonth && (
        <TouchableOpacity onPress={() => showPicker(false)}>
          <Text>OPEN</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};
export default Store;
