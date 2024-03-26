import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from './HomeScreen';

const DichVuScreen = () => {
  const [ListDichVu, setListDichVu] = useState([]);

  const getListDichVu = async () => {
    const url = `${URL}/dichvus`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setListDichVu(data);
    } catch (err) {
      console.log(err);
    }
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.card}>
        <Image style={styles.cardImg}
          source={{ uri: item.hinhAnh }} />
        <Text style={styles.cardName}>{item.tenDichVu}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.cardPrice}>{item.giaTien} đ</Text>
          <Text style={{ color: 'red', fontSize: 11 }}>Chi tiết</Text>
        </View>
      </View>
    )
  }

  useEffect(() => {
    getListDichVu()
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/image/menu.png')} style={styles.icon} />
        <Image source={require('../assets/image/pesonal.png')} style={styles.icon} />
      </View>

      <FlatList
        numColumns={2}
        data={ListDichVu}
        keyExtractor={item => item._id}
        renderItem={renderItem}></FlatList>
    </View>
  )
}

export default DichVuScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 35
  },
  icon: {
    width: 24,
    height: 24
  },
  card: {
    width: '45%',
    padding: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    margin: 10,
    gap: 6,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 9
  },
  cardImg: {
    width: '100%',
    height: 180,
    borderRadius: 6
  },
  cardName: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  cardPrice: {
    color: 'red',
    fontSize: 13
  }
})