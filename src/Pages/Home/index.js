
import { StatusBar } from 'expo-status-bar';
import { Modal, StyleSheet, Text, View } from 'react-native';
import Header from '../../Components/Header';
import Balance from '../../Components/Balance';
import Movements from '../../Components/Movements';
import Toast from 'react-native-toast-message';
import ListMovements from '../../Components/ListMovements';


export default function Home() {
  return (
    <View style={styles.container}>
      
      <Header name="Marcelo"/>
      <Balance saldo="2.000,00" gastos="1.123,00" />
      <Movements/>
      <ListMovements/>
      <StatusBar style="auto" />
      <Toast/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
});
