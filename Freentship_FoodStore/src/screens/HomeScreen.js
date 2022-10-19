import {
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
    View,

    Alert,

} from 'react-native'
import { Switch } from 'react-native-switch';
import React, { useEffect, useState } from 'react'
// import ReadyForOrderToggle from '../components/ReadyForOrderToggle'
import SvgTest from '../../assets/logo-store.svg'
// import { db } from '../services/config'
import Notify from '../components/Notify'
export default function HomeScreen({ navigation }) {
   

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.Headers}>


            </View>
            <View style={styles.Main}>
               <Notify></Notify>
            </View>

        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    Headers: {
        flex: 1.5,
        backgroundColor: 'red',
    },
    Main: {
        flex: 9,

    },
    logo: {
        justifyContent: 'space-around',
        alignSelf: 'center',
    },
   

})