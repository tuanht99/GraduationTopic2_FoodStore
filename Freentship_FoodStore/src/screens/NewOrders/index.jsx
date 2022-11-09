import { View, Text , Image } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import ordernt from '../../../assets/chuacodonhang.png'

const NewOrders = () => {
  return (
    <View>
      <Header/>
      <View className = 'flex items-center mt-9'>
        <Image className = 'w-36 h-36 rounded-full' source={ordernt}/>
        <Text className = 'text-[#AAAAAA] mt-7'> Hiện tại chưa có đơn hàng nào </Text>
      </View>

    </View>
  )
}

export default NewOrders