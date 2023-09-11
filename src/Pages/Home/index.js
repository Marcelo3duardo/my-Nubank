
import { StatusBar } from 'expo-status-bar';
import { Modal, StyleSheet, Text, View } from 'react-native';
import Header from '../../Components/Header';
import Balance from '../../Components/Balance';
import Movements from '../../Components/Movements';
import Toast from 'react-native-toast-message';
import ListMovements from '../../Components/ListMovements';
import { useEffect } from 'react';
import { ReloadProvider } from '../../Context/reload'


export default function Home() {


  return (
    <View style={styles.container}>
      <ReloadProvider>
        <Header name="Marcelo" />

        <Balance />
        <Movements />
        <ListMovements />

        <StatusBar style="auto" />
        <Toast />
      </ReloadProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
