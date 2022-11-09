import { View, Text , TextInput , TouchableWithoutFeedback } from 'react-native'
import React from 'react'

const FindOrderCode = () => {
  return (
    <View className = 'bg-white flex flex-row items-center '>
      <TextInput className ='w-[69%]  border-y border-l border-[#BBBBBB]  p-3 my-4 ml-4'
       placeholder=" # Tìm theo mã đơn"/>
      <TouchableWithoutFeedback >
        <Text  className ='text-center text-blue-500 font-bold text-[16px] w-[24%] border-y border-r border-[#BBBBBB]  p-[15px] pt- my-4 mr-4'>Xem đơn</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default FindOrderCode