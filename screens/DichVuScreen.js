import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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

      <View style={styles.search}>
        <TextInput
          placeholder='Search' style={{ marginStart: 10, marginEnd: 10, flex: 1 }} />
        <TouchableOpacity onPress={() => {}}>
          <Image source={require('../assets/image/search.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', gap: 20, padding: 20}}>
        <Text style={{color: 'red', fontWeight: 'bold'}}>All</Text>
        <Text style={{color: 'black', fontWeight: 'bold'}}>Dịch vụ lẻ</Text>
        <Text style={{color: 'black', fontWeight: 'bold'}}>Dịch vụ trọn gói</Text>
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
    padding: 25,
    marginTop: 10
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
  },
  search: {
    width: '90%',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 10,
    margin: '5%'
  },
})