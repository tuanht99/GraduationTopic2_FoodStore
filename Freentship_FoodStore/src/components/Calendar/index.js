import { View, Text, TouchableWithoutFeedback, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";

const Calendar = ({ title, callback }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("default");
  const [show, setShow] = useState(false);
  const [type, setType] = useState(true);
  const [text, setText] = useState("(vui lòng chọn ngày hoặc tháng)");

  useEffect(() => {
    callback(text, type);
  }, [text , type]);

  var date1 = new Date(date);
  var firstDay = new Date(date1.getFullYear(), date1.getMonth(), 1);
  var lastDay = new Date(date1.getFullYear(), date1.getMonth() + 1, 0);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let getDate = "";
    let getMonth = "";
    let oct = tempDate.getMonth() + 1;

    if (tempDate.getDate() < 10) {
      getDate = "0" + tempDate.getDate();
    }
    if (oct < 10) {
      getMonth = "0" + oct;
    }
    if (tempDate.getDate() >= 10) {
      getDate = tempDate.getDate();
    }
    if (oct >= 10) {
      getMonth = oct;
    }

    let fDate = tempDate.getFullYear() + "-" + getMonth + "-" + getDate;

    setText(fDate);
  };

  const showMode = (currentMode) => {
    if (currentMode === "default") {
      setType(true);
    } else if (currentMode === "spinner") {
      setType(false);
    }
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View>
      <View className="flex flex-row justify-around items-center p-5 ">
        <Text className="text-[17px]">{title}</Text>
        <TouchableWithoutFeedback onPress={() => showMode("default")}>
          <Text className="bg-white p-2 text-[16px] rounded-lg">Theo ngày</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => showMode("spinner")}>
          <Text className="bg-white p-2 text-[16px] rounded-lg">
            Theo tháng
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <View className="bg-white">
        <Text className="font-bold text-[17px] p-3 border-b">
          Món bán chạy
          {type ? (
            <> : {text} </>
          ) : (
            <> tháng ({firstDay.getMonth() + 1}) :
              {firstDay.getDate()}/{firstDay.getMonth() + 1}/
              {firstDay.getFullYear()} - {lastDay.getDate()}/
              {lastDay.getMonth() + 1}/{lastDay.getFullYear()}
            </>
          )}
        </Text>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display={mode}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default Calendar;
