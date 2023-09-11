
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, StatusBar, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const heightStatusBar = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function Header() {
    const [userName, setUserName] = useState('User Name');

    useEffect(() => {
        async function getUserName() {
            try {
                const aux = await AsyncStorage.getItem('@my-Nubank:UserName');
                if (aux !== null) {
                    setUserName(aux);
                    console.log(aux);
                }
            } catch (error) {
                console.error("Error getting user name:", error);
            }
        }
        
        getUserName();
    }, []);

    async function saveName(name) {
        try {
            await AsyncStorage.setItem('@my-Nubank:UserName', name);
        } catch (error) {
            console.error("Error saving user name:", error);
        }
    }

    const handleUserNameChange = (newName) => {
        setUserName(newName);
        saveName(newName);
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.containerName}>
                    <TextInput
                        style={styles.userName}
                        placeholder="Adicione Nome"
                        onChangeText={handleUserNameChange}
                        value={userName}
                        maxLength={25}
                    />
                    <AntDesign name="edit" size={24} color="white" />
                </View>
                <TouchableOpacity activeOpacity={0.9} style={styles.buttonUser}>
                    <AntDesign name="user" size={27} style={styles.iconUser} color="#157" />
                    {/* <Text style={styles.textUser}> Por Enquanto</Text> */}
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingTop: heightStatusBar,
        backgroundColor: "#166891",
        display: "flex",
        flexDirection: "row",

        alignItems: "center",
        paddingEnd: 20,
        paddingBottom: 20,
        paddingStart: 20


    },
    containerName: {
        display: "flex",
        flexDirection: "row"
    },
    content: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
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