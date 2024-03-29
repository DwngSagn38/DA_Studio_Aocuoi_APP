import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from './HomeScreen';

const KhachHangScreen = ({ navigation }) => {

  const [listKhachHang, setlistKhachHang] = useState([]);

  const getData = async () => {
    const url = `${URL}/khachhangs`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setlistKhachHang(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  console.log(listKhachHang);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.crud}>
        <View style={styles.khachHang}>
          <Image style={{ width: 80, height: 80 }}
            source={require('../assets/image/guest.png')} />
          <View style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>{item.tenKhachHang}</Text>
            <Text>{item.dienThoai}</Text>
            <Text>{item.diaChi}</Text>
            <View style={{flexDirection: 'row', gap: 30}}>
              <TouchableOpacity style={{width: '70%'}}>
                <Text style={{ textAlign: 'right', textDecorationLine: 'underline' }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{ textAlign: 'right', textDecorationLine: 'underline' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={{ width: 24, height: 24 }}
            source={require('../assets/image/back.png')} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: 'bold' }}>Danh sách khách hàng</Text>
        <TouchableOpacity>
          <Image style={{ width: 20, height: 20 }}
            source={require('../assets/image/add_user.png')} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={listKhachHang}
        keyExtractor={item => item._id}
        renderItem={renderItem}></FlatList>

    </View>
  )
}

export default KhachHangScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 30
  },
  khachHang: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  text: {
    width: '60%',
    gap: 10
  },
  crud: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7F7F7F',
    padding: 10,
    marginBottom: 10
  }
})