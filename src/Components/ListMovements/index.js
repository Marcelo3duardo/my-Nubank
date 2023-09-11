
// import React, { useEffect, useState, useContext } from 'react';
// import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { TextInputMask } from 'react-native-masked-text';
// import { Feather } from '@expo/vector-icons';
// import { ReloadContext } from '../../Context/reload'

// export default function ListMovements() {
//     const { Atualizar, toggleAtualizar } = useContext(ReloadContext);
//     const [listMovements, setListMovements] = useState([]);
//     const [loading, setLoading] = useState(false);

//     function formatarMoeda(num) {
//         return 'R$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
//     }

//     async function DeleteItem(id) {
//         const updatedList = listMovements.filter(item => item.id !== id);
//         await AsyncStorage.setItem('@my-Nubank:Movements', JSON.stringify(updatedList));
//         setListMovements(updatedList);
//         toggleAtualizar();
//     }

//     const fetchMovements = async () => {
//         try {
//             setLoading(true);
//             const movements = await AsyncStorage.getItem('@my-Nubank:Movements');
//             if (movements) {
//                 setListMovements(JSON.parse(movements));
//             } else {
//                 setListMovements([]);
//             }
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchMovements();
//     }, [Atualizar]);

//     const renderItem = ({ item }) => (
//         <View style={[
//             styles.item,
//             { backgroundColor: item.typeValue ? "#B3FFBE" : "#FF9E9E" }
//         ]}>
//             <View style={styles.containerDescriptionData}>
//                 <Text style={[
//                     styles.itemDescription,
//                     { backgroundColor: item.typeValue ? "#B3FFBE" : "#FF9E9E" }
//                 ]}>{item.description}</Text>
//                 <Text style={styles.date}> {item.date}</Text>
//             </View>
//             <View style={{ display: 'flex', flexDirection: 'row' }}>
//                 <Text style={styles.itemValue}>{formatarMoeda(item.valorMoeda)}</Text>
//                 <Pressable
//                     onPress={() => {
//                         DeleteItem(item.id)
//                     }}
//                 >
//                     <Feather name="trash" size={24} color="#444" />
//                 </Pressable>
//             </View>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={listMovements}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.id.toString()} // Certifique-se de que a chave seja uma string
//                 ListEmptyComponent={
//                     <Text style={styles.emptyText}>
//                         {loading ? 'Carregando...' : 'Nenhum movimento disponível'}
//                     </Text>
//                 }
//             />
//         </View>
//     );
// }

import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, SectionList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';
import { Feather } from '@expo/vector-icons';
import { ReloadContext } from '../../Context/reload';

export default function ListMovements() {
  const { Atualizar, toggleAtualizar } = useContext(ReloadContext);
  const [listMovements, setListMovements] = useState([]);
  const [loading, setLoading] = useState(false);

  function formatarMoeda(num) {
    return 'R$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  async function DeleteItem(id) {
    const updatedList = listMovements.filter((item) => item.id !== id);
    await AsyncStorage.setItem('@my-Nubank:Movements', JSON.stringify(updatedList));
    setListMovements(updatedList);
    toggleAtualizar();
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
  }, [Atualizar]);

  // Função para agrupar os movimentos por mês
  const groupMovementsByMonth = (movements) => {
    const groupedData = movements.reduce((result, item) => {
      const monthYear = item.date.substring(6, 11); // Extrai o mês e ano da data (MM/YYYY)
      if (!result[monthYear]) {
        result[monthYear] = [];
      }
      result[monthYear].push(item);
      return result;
    }, {});
    return Object.entries(groupedData).map(([monthYear, data]) => ({
      title: monthYear,
      data,
    }));
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.item,
        { backgroundColor: item.typeValue ? '#B3FFBE' : '#FF9E9E' },
      ]}
    >
      <View style={styles.containerDescriptionData}>
        <Text
          style={[
            styles.itemDescription,
            { backgroundColor: item.typeValue ? '#B3FFBE' : '#FF9E9E' },
          ]}
        >
          {item.description}
        </Text>
        <Text style={styles.date}> {item.date}</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text style={styles.itemValue}>{formatarMoeda(item.valorMoeda)}</Text>
        <Pressable
          onPress={() => {
            DeleteItem(item.id);
          }}
        >
          <Feather name="trash" size={24} color="#444" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={groupMovementsByMonth(listMovements)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
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
        top: -50,
        bottom: -20
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
    },
    containerDescriptionData: {
        display: 'flex',
        flexDirection: 'column',
    },
    date: {
        top: 10,
        color: "#444",
        fontSize: 12,

    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#f5f5f5',
        paddingVertical: 8,
        paddingHorizontal: 16,
      },
});
