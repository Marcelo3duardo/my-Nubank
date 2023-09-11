import { View, Text, StyleSheet, TextInput, SafeAreaView, Button, Alert, Pressable, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useContext } from 'react'
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import Toast, { BaseToast } from 'react-native-toast-message';
import { ReloadContext } from '../../Context/reload'

export default function Movements() {


  const { Atualizar, toggleAtualizar } = useContext(ReloadContext)
  
  const [inputMoeda, setInputMoeda] = useState('0');
  const [valorMoeda, setValorMoeda] = useState(0)

  const [adicionarAtivo, setAdicionarAtivo] = useState(true);
  const [retirarAtivo, setRetirarAtivo] = useState(false);



  const handleAdicionarClick = () => {
    setAdicionarAtivo(true);
    setRetirarAtivo(false);
  };

  const handleRetirarClick = () => {
    setAdicionarAtivo(false);
    setRetirarAtivo(true);
  };

  const [text, onChangeText] = useState('')
  const [modalVisible, setModalVisible] = useState(false);


  async function CreateObject() {
    try {
      const id = uuid.v4()
      const currentDate = new Date();
      //
      const formattedDate = `${currentDate.getHours()}:${currentDate.getMinutes()} ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;


      const newMovement = {
        id,
        typeValue: adicionarAtivo,
        description: text,
        valorMoeda,
        date: formattedDate
      }
      console.log(newMovement)

      const response = await AsyncStorage.getItem('@my-Nubank:Movements')


      const previuData = response ? JSON.parse(response) : [];

      const data = [...previuData, newMovement]


      await AsyncStorage.setItem('@my-Nubank:Movements', JSON.stringify(data))


      toggleAtualizar()
      

      Toast.show({
        type: 'success',
        text1: newMovement.description,
        text2: String(newMovement.valorMoeda)
      });

    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: 'ERRO'
      });
    }

  }
  return (
    <View>

      <View style={styles.AddMovements}>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Adicionar</Text>
                <View style={styles.selectorMode} >
                  <TouchableOpacity
                    title='Adicionar'
                    style={[
                      styles.buttonModal,
                      { backgroundColor: adicionarAtivo ? '#49C930' : 'gray' }
                    ]}
                    onPress={handleAdicionarClick}
                  >
                    <Text style={styles.textButtonModal}>
                      +
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity

                    title='Retirar'
                    style={[
                      styles.buttonModal,
                      { backgroundColor: retirarAtivo ? 'red' : 'gray' }
                    ]}
                    onPress={handleRetirarClick}
                  >
                    <Text style={styles.textButtonModal}> - </Text>
                  </TouchableOpacity>
                </View>

                <SafeAreaView>
                  <TextInput
                    style={styles.inputText}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Descrição"
                    maxLength={15}
                  />
                </SafeAreaView>
                <TextInputMask
                  type={'money'}
                  style={styles.inputText}
                  value={inputMoeda}
                  maxLength={18}
                  onChangeText={value => {
                    setInputMoeda(value)
                    value = value.replace('R$', '')
                    value = value.replace('.', '')
                    value = value.replace(',', '.')
                    setValorMoeda(Number(value))
                  }}
                >

                </TextInputMask>

                <Text style={styles.modalText}>______</Text>
                <View style={styles.containerButtonDown}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Cancelar</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.button, styles.buttonSave]}
                    onPress={() => {
                      CreateObject()
                      setModalVisible(!modalVisible)
                    }}>
                    <Text style={styles.textStyle}>Salvar</Text>
                  </Pressable>
                </View>

              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}> + </Text>
          </Pressable>
        </View>
        {/* <Button
        title='Add +'
        onPress={AddToast}
        >

        </Button> */}
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  inputTextMovement: {
    backgroundColor: "#222",
    margin: 10,
    height: 40,
    color: "#fff",
    padding: 5,
  },
  centeredView: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    minHeight: 40,
    minWidth: 40,
    top:-40,

    backgroundColor: '#166891',
  },
  buttonClose: {
    backgroundColor: '#446',
  },
  buttonSave: {
    backgroundColor: '#49C930',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',

  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22
  },
  selectorMode: {
    display: 'flex',
    flexDirection: 'row',

  },
  buttonModal: {
    minHeight: 40,
    width: 100,
    borderRadius: 25,
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',

  },
  textButtonModal: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputText: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    paddingLeft: 20,
    width: 200,
    borderRadius: 25
  },
  containerButtonDown: {
    display: 'flex',
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-between'
  }
})