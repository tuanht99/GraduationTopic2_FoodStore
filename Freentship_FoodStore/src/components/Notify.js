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
    getDocs
} from 'firebase/firestore'
const cancelOrder = async () => {
    const orderState = doc(db, 'orders', lastestOrders.id + '')

    // Set the "capital" field of the city 'DC'
    await updateDoc(orderState, {
        status: 8,
    })

}
const acceptTheOrder = async () => {
    const orderState = doc(db, 'orders', lastestOrder.id + '')

    // Set the "capital" field of the city 'DC'
    await updateDoc(orderState, {
        status: 1,
    })
}
const feeTheOrder = async () => {
    const orderState = doc(db, 'orders', lastestOrder.id + '')

    // Set the "capital" field of the city 'DC'
    await updateDoc(orderState, {
        status: 7,
    })
}

// giao diện thông báo
const Item = ({ item, onPress,}) => (




    <View style={{ flex: 1 }}>
        <View>
            <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor:"gray"} ]}>
                <Text style={[styles.title, { color: "white", padding: 2 }]}>Mã đơn: {item.id}</Text>
                <Text style={[styles.title, { color: "white" }]}>Tổng tiền: {item.totalPrice}</Text>
                <Text style={[styles.title, { color: "white" }]}>Số lượng: {item.ordered_food[0].qty}</Text>
                <Text style={[styles.title, { color: "white" }]}>Tiền khách cọc: {item.ship_fee}</Text>
                
                <Text style={[styles.title, { color: "white" }]}>Trạng thái: {item.status}</Text>



               
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                    <Button
                        title="Huỷ"
                        color="#ff5c5c"
                        //change "function" with your function for the button pressing
                        onPress={() => { cancelOrder }}
                    />

                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        title="Đã Nhận Cọc"
                        color="yellow"
                        onPress={() => { feeTheOrder }}
                    //change "function" with your function for the button pressing
                    />

                </View>
                <View style={{ flex: 1, backgroundColor: "green" }}>
                    <Button
                        title="Đã Giao Hàng"
                        onPress={() => { acceptTheOrder }}
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
    const idFoodStore = "4dpAvRWJVrvdbml9vKDL";


    
    // Get lastest order
    useEffect(() => {
        const orders = async () => {
            const q = query(collection(db, "orders"), where("food_store_id", "==", idFoodStore + ''), where("status", "==", 3));
            let lastestOrders = []
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                lastestOrders.push({ id: doc.id, ...doc.data()})
            });
            setLastestOrders(lastestOrders)
        }
        orders()
    }, [])

    console.log(lastestOrders);
    // Accept the order
   


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

    if (lastestOrders.status == 3) {
        return <EmptyOrder />
    } else {
        // có đơn
        return (
            <View style={styles.ListOrders}>

                <FlatList
                    data={lastestOrders}
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