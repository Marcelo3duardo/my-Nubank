import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        marginTop:-15,
        marginLeft:40,
        marginRight: 40,
        backgroundColor: '#f5f5fe',
        borderRadius:10,
        padding:20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:"space-between",
    },
    textName:{
        color: '#999',
        fontWeight: 'bold',
        fontSize: 20,
    },
    textQuantity:{
        flexDirection: 'row',
        alignItems:'center'
        
    },
    saldo:{
        fontSize:24,
        fontWeight: 'bold',
        color:'#2ecc71'
    },
    debito:{
        fontSize:24,
        fontWeight: 'bold',
        color:'#e74e3c'
    },
})

export default function Balance({saldo , gastos}) {
  return (
    <View style={styles.container}>
      <View style={styles.textVal}>
        <Text style={styles.textName }>Saldo</Text>
        <View style={styles.textQuantity}>
            <Text>R$ </Text>
            <Text style={styles.saldo}>{saldo} </Text>
        </View>

      </View>
      <View style={styles.textVal}>
        <Text style={styles.textName }>Gastos</Text>
        <View style={styles.textQuantity}>
            <Text>R$ </Text>
            <Text style={styles.debito}>{gastos} </Text>
        </View>

      </View>
    </View>
  )
}