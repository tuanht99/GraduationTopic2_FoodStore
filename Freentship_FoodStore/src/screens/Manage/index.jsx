import React from "react";
import Header from "../../components/Header";
import { View, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import FindOrderCode from "../FindOrderCode";
import Turnover from "../Turnover";

const Manage = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Danh sách đơn" },
    { key: "second", title: "Doanh thu" },
  ]);

  const renderScene = SceneMap({
    first: FindOrderCode,
    second: Turnover,
  });

  return (
    <View className="flex-1">
      <Header />
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={(props) => (
          <TabBar
            activeColor="red"
            inactiveColor="black"
            pressColor="#999999"
            {...props}
            renderLabel={({ route, color }) => (
              <Text style={{ color: color, margin: 8, fontSize: 16 }}>
                {route.title}
              </Text>

            )}
            style={{ backgroundColor: "white" }}
          />
        )}
        renderScene={renderScene}
        onIndexChange={setIndex}
        scrollEnabled
      />
    </View>
  );
};

export default Manage;
