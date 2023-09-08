
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const heightStatusBar = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64

export default function Header({name}) {


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.userName}> {name} </Text>
                <TouchableOpacity activeOpacity={0.9} style={styles.buttonUser}>

                    <AntDesign name="user" size={27} style={styles.iconUser} color="#157" />
                    {/* <Text style={styles.textUser}> Por Enquanto</Text> */}
                </TouchableOpacity>
            </View>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        paddingTop: heightStatusBar,
        backgroundColor: "#166891",
        display: "flex",
        flexDirection: "row",
        
        alignItems: "center",
        paddingEnd: 20,
        paddingBottom:20,
        paddingStart:20
        

    },
    content: {
        flex: 1,
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: "center",
    
        

    },
    userName: {
        
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        
    },
    buttonUser: {

        backgroundColor: "#0013",
        height: 44,
        width: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",

    },
   
    iconUser: {
        color: "#fff"
    }
})