import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext, useMemo } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReloadContext } from '../../Context/reload';
const styles = StyleSheet.create({
  container: {
    marginTop: -15,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: '#f5f5fe',
    borderRadius: 10,
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  textName: {
    color: '#999',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textQuantity: {
    flexDirection: 'row',
    alignItems: 'center'

  },
  saldo: {
    fontSize: 24,
    fontWeight: 'bold',
    // color: '#2ecc71'
  },
  debito: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74e3c'
  },
})


export default function Balance() {
  const { Atualizar } = useContext(ReloadContext);

  const [listMovements, setListMovements] = useState([]);
  const [loading, setLoading] = useState(false);

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
      console.error("Error fetching movements:", error);
      // Display an error message to the user or handle the error in a user-friendly way
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovements();
  }, [Atualizar]);

  const calcMovements = useMemo(() => {
    let newSaldo = 0;
    let newGastos = 0;

    try {
      listMovements.forEach((item) => {
        console.log(item.valorMoeda);
        if (item.typeValue) {
          newSaldo += item.valorMoeda;
        } else {
          newGastos += item.valorMoeda;
        }
      });

      return { newSaldo, newGastos };
    } catch (error) {
      console.error("Error calculating movements:", error);
      return { newSaldo: 0, newGastos: 0 };
      // Handle the error here if needed
    }
  }, [listMovements]);

  const saldo = useMemo(() => formatarMoeda(calcMovements.newSaldo - calcMovements.newGastos), [calcMovements.newSaldo, calcMovements.newGastos]);
  const auxSaldo =  calcMovements.newSaldo - calcMovements.newGastos
  const gastosFormatted = useMemo(() => formatarMoeda(calcMovements.newGastos), [calcMovements.newGastos]);
  console.log('Saldo' + saldo)
  function formatarMoeda(num) {
    return 'R$ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  return (
    <View style={styles.container}>
      <View style={styles.textVal}>
        <Text style={styles.textName}>Saldo</Text>
        <View style={styles.textQuantity}>
          <Text style={[styles.saldo, { color: auxSaldo > 0 ? '#2ecc71' : '#e74e3c' }]}>{saldo}</Text>
        </View>
      </View>
      <View style={styles.textVal}>
        <Text style={styles.textName}>Gastos</Text>
        <View style={styles.textQuantity}>
          <Text style={styles.debito}>{gastosFormatted}</Text>
        </View>
      </View>
    </View>
  );
}
// export default function Balance() {
//   const { Atualizar } = useContext(ReloadContext)

//   const [listMovements, setListMovements] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [saldo, setSaldo] = useState(0);
//   const [gastos, setGastos] = useState(0);
//   let newSaldo = 0;
//   let newGastos = 0;
//   const fetchMovements = async () => {
//     try {
//       setLoading(true);
//       const movements = await AsyncStorage.getItem('@my-Nubank:Movements');
//       if (movements) {
//         setListMovements(JSON.parse(movements));
//       } else {
//         setListMovements([]);
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle the error here, e.g., show an error message to the user
//     } finally {
//       setLoading(false);
//     }
//   };

//   function formatarMoeda(num) {
//     return 'R$ ' + num.toFixed(2).replace(/ (\\d) (?= (\\d {3})+ (?!\\d))/g, '$1,')
//   }

//   const calcMovements = () => {
//     newSaldo = 0;
//     newGastos = 0;

//     try {
//       listMovements.forEach((item) => {
//         console.log(item.valorMoeda);
//         if (item.typeValue) {
//           newSaldo += item.valorMoeda;
//         } else {
//           newGastos += item.valorMoeda;
//         }
//       });
//       setSaldo(newSaldo);
//       setGastos(newGastos);
//     } catch (error) {
//       newSaldo = 0;
//       newGastos = 0;
//       console.log(error);
//       // Handle the error here if needed
//     }
//   };

//   useEffect(() => {
//     fetchMovements().then(() => {
//       calcMovements();
//     });
//   }, [Atualizar]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.textVal}>
//         <Text style={styles.textName}>Saldo</Text>
//         <View style={styles.textQuantity}>

//           <Text style={styles.saldo}>{formatarMoeda(saldo - gastos)} </Text>
//         </View>
//       </View>
//       <View style={styles.textVal}>
//         <Text style={styles.textName}>Gastos</Text>
//         <View style={styles.textQuantity}>

//           <Text style={styles.debito}>{formatarMoeda(gastos)} </Text>
//         </View>
//       </View>
//     </View>
//   );
// }
