import { View, Dimensions, StyleSheet, Image } from "react-native";
import logo from '../../assets/FreentShipStore.png'

import React from "react";

const windowWidth = Dimensions.get("window").width;

const Header = () => {
  return (
    <View className = 'flex items-center h-[70px] bg-[#E94730] relative w-full'>
      <Image
        className = "w-auto h-auto absolute bottom-3 "
        source={logo}
      />
    </View>
  );
};

export default Header;

