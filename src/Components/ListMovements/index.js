

import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';
import { Feather } from '@expo/vector-icons';

export default function ListMovements() {
    const [listMovements, setListMovements] = useState([]);
    const [loading, setLoading] = useState(false);
    function formatarMoeda(num) {
        return 'R$' + num.toFixed(2).replace(/ (\\d) (?= (\\d {3})+ (?!\\d))/g, '$1,')
    }

    const fetchMovements = async () => {
        try {
            setLoading(true);
            const movements = await AsyncStorage.getItem('@my-Nubank:Movements');
            if (movements) {
                setListMovements(JSON.parse(movements));
            } else {
                setListMovements([]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovements();
    }, []);

    const renderItem = ({ item }) => (
        <View style={[
            styles.item,
            { backgroundColor: item.typeValue ? "#B3FFBE" : "#FF9E9E" }
        ]}>
            {/* <Text>ID: {item.id}</Text> */}
            {/* <Text>Type: {item.typeValue ? 'True' : 'False'}</Text> */}

            <Text style={[
                styles.itemDescription,
                { backgroundColor: item.typeValue ? "#B3FFBE" : "#FF9E9E" }
            ]}>{item.description}</Text>
            <View style={{display: 'flex',flexDirection: 'row'}}>
                <Text style={styles.itemValue}>{formatarMoeda(item.valorMoeda)}</Text>
                <Pressable
                    onPress={() => { }}
                >
                    <Feather name="trash" size={24} color="#444" />
                </Pressable>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Pressable style={styles.reload} onPress={fetchMovements} disabled={loading}>
                <Text style={styles.reloadText}>Reload</Text>
            </Pressable>
            <FlatList
                data={listMovements}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        {loading ? 'Carregando...' : 'Nenhum movimento disponível'}
                    </Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    reload: {
        width: 100,
        height: 44,
        backgroundColor: '#f26',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    reloadText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    item: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        // backgroundColor: '#f9c2ff',
        padding: 20,
        width: 300,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
    },
    itemDescription: {
        color: '#666',
        fontSize: 18,

    },
    itemValue: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
