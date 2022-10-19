import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Switch, Button } from "react-native";
import { db } from '../services/config'
import {
    doc,
    onSnapshot,
    collection,
    query,
    where,
    updateDoc,
} from 'firebase/firestore'
const DATA = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "Cơm tấm",
        Quantity: "2",
        fee: 3000,
        status: "0",
        statusName: "Chờ cọc"
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "bánh bột lọc",
        Quantity: "2",
        fee: 3000,
        status: "1",
        statusName: "Đã cọc"
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "cơm gà",
        fee: 3000,
        Quantity: "2",
        status: "2",
        statusName: "Hoàn thành"
    },
];

// giao diện thông báo
const Item = ({ item, onPress, backgroundColor, textColor }) => (




    <View style={{ flex: 1 }}>
        <View>
            <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
                <Text style={[styles.title, { color: "white", padding: 2 }]}>Mã đơn: {item.id}</Text>
                <Text style={[styles.title, { color: "white" }]}>Tên món: {item.title}</Text>
                <Text style={[styles.title, { color: "white" }]}>Số lượng: {item.Quantity}</Text>
                <Text style={[styles.title, { color: "white" }]}>Tiền khách cọc: {item.fee}</Text>


                <Text style={[textColor, { color: "red", paddingLeft: 300 }]}>{item.statusName}</Text>

            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                    <Button
                        title="Huỷ"
                        color="#ff5c5c"
                        //change "function" with your function for the button pressing
                        onPress={() => { id }}
                    />

                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        title="Đã Nhận Cọc"
                        color="yellow"
                    //change "function" with your function for the button pressing
                    />

                </View>
                <View style={{ flex: 1, backgroundColor: "green" }}>
                    <Button
                        title="Đã Giao Hàng"
                    //change "function" with your function for the button pressing
                    />

                </View>
            </View>
        </View>

    </View>
);

const App = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.Main}>
                <View style={styles.toggleSwitch}>
                    <Text style={{ fontSize: 20 }}>Sẵn Sàng Nhận đơn</Text>
                    <View style={{ paddingLeft: 90 }}>
                        <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch} value={isEnabled} />
                    </View>
                </View>


                <View style={styles.ListOrders}>

                    <Order />
                </View>
            </View>

        </SafeAreaView>
    );
};
function EmptyOrder() {
    return (
        <View style={styles.ListOrders}>

            <Text>Không có đơn hàng nào!</Text>

        </View>
    );
}
//  chỗ nhận dữ liệu
function Order() {
    const [selectedId, setSelectedId] = useState(null);
    const [backgroundColor, setbackgroundColor] = useState();





    // Constants declaration
    const [lastestOrders, setLastestOrders] = useState([])
    const [orderState, setOrderState] = useState([])
    const idFoodStore = "2a0HmLolzLzkazuwjBu3"


    const cancelOrder = async () => {
        const orderState = doc(db, 'orders', lastestOrder.id + '')

        // Set the "capital" field of the city 'DC'
        await updateDoc(orderState, {
            status: 8,
        })

      

        // Set the "capital" field of the city 'DC'
        await updateDoc(cacelOrder, {
            lastest_order_id: '',
        })
    }

    // Get lastest order
    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, 'orders', 'mu5Mdy3uPMLC1Mo5xvph'),
            (item) => {
                setLastestOrder({ id: item.id, ...item.data() })
                console.log("lastestOrder.user_id :" + lastestOrder.user_id)
            },
        )
        const q = query(collection(db, 'order_status'))

        const order = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setOrderState((orderState) => [...orderState, doc.data().value])
            })
        })

    }, [lastestOrder.user_id])
// Accept the order
const acceptTheOrder = async () => {
    const orderState = doc(db, 'orders', lastestOrder.id + '')

    // Set the "capital" field of the city 'DC'
    await updateDoc(orderState, {
      status: 7,
    })
  }

    const cancelTheOrder = () => {
        Alert.alert('Thông báo', 'Bạn có muốn huỷ đơn hàng này không?', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              cancelOrder()
            },
          },
        ])
      }

 










    const renderItem = ({ item }) => {

        if (item.status == "2") {
            setbackgroundColor("green");
        } else if (item.status == "1") {
            setbackgroundColor("yellow");

        } else if (item.status == "3") {
            setbackgroundColor("red");
        }
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}

            />

        );
    };
    // không có đơn hàng

    if (setSelectedId == null) {
        return <EmptyOrder />
    } else {
        // có đơn
        return (
            <View style={styles.ListOrders}>

                <FlatList
                    data={orderState}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 0,
        flexDirection: 'column',
    },
    title: {
        fontSize: 15,
        paddingRight: 50,
        alignContent: 'center',
    },
    toggleSwitch: {
        flex: 1,

        padding: 20,
        flexDirection: 'row',
    },
    ListOrders: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
    },

    Main: {
        flex: 1,

    },
});

export default App;