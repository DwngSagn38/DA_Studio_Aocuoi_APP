import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SlideShow from '../component/SlideShow';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const URL = 'http://192.168.100.3:3000';

const HomeScreen = ({ navigation }) => {

  const [ListDichVu, setListDichVu] = useState([]);
  const [User, setUser] = useState([]);
  const [Bill, setBill] = useState([]);
  const [idBill, setidBill] = useState('');

  const checkIdBill = async () => {
    const id = await AsyncStorage.getItem('id_Bill');
    if (id != null) {
      setidBill(id);
    }
  }

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

  // lấy user từ AsyncStorage
  const retrieveData = async () => {
    try {
      const UserData = await AsyncStorage.getItem('User');
      if (UserData != null) {
        setUser(JSON.parse(UserData));
      }
    } catch (error) {
      console.log(error);
    }
  }

  // hàm format price
  const formatPrice = (price) => {
    // Chuyển đổi số tiền sang chuỗi và thêm dấu phẩy phân tách hàng nghìn
    const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedPrice + " đ"; // Thêm ký hiệu VNĐ
  };



  const addBill = async () => {
    const url = `${URL}/hoadons/post`;
    const NewBill = {
      id_NhanVien: User._id
    }

    const res = await fetch(url,
      {
        method: "POST",
        body: JSON.stringify(NewBill),
        headers: {
          'Content-Type': 'application/json'
        }
      })

    const data = await res.json();
    if (data.status == 200) {
      const id_Bill = data.data._id;
      await AsyncStorage.setItem('id_Bill', id_Bill);
      console.log(data.data._id);
    }
  }

  useEffect(() => {
    getListDichVu();
    retrieveData();
    checkIdBill();
  }, [navigation])

  const renderItem = ({ item, index }) => {
    return (
      <Pressable style={styles.card} onPress={() => { navigation.navigate('DichVuChiTiet', { item: item }) }}>
        <Image style={styles.cardImg}
          source={{ uri: item.hinhAnh }} />
        <Text style={styles.cardName}>{item.tenDichVu}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.cardPrice}>{formatPrice(item.giaTien)}</Text>
          <Text style={{ color: 'red', fontSize: 11 }}>Chi tiết</Text>
        </View>
      </Pressable>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        scrollEnabled={true}
      >
        <View style={styles.viewSt}>
          <Text style={styles.title}>Chào ngày mới</Text>
          {/* <Image source={{ uri: "https://i.pinimg.com/236x/ec/0a/dc/ec0adceb46869873ae79525b369c619f.jpg" }}
            style={{ width: '100%', height: 300 }} resizeMode='repeat' /> */}
          <SlideShow />
        </View>

        <View style={[styles.viewSt, { alignItems: 'center' }]}>
          <Text style={{ color: 'blue', fontStyle: 'italic' }}>Công việc hôm nay</Text>
          {idBill == ''
            ? <Text style={{ color: 'blue', fontStyle: 'italic' }}
              onPress={() => { addBill(), navigation.navigate('TaoHoaDon') }}>
              Tạo hóa đơn ngay</Text>
            : <Text style={{ color: 'blue', fontStyle: 'italic' }}
            onPress={() => { navigation.navigate('TaoHoaDon') }}>Bill</Text>}
        </View>

        <View style={styles.viewSt}>
          <Text style={styles.title}>Dịch vụ trọn gói</Text>
          <FlatList
            scrollEnabled={false}
            numColumns={2}
            data={ListDichVu.filter((item) => item.type == false).slice(0, 2)}
            keyExtractor={item => item._id}
            renderItem={renderItem}></FlatList>
        </View>

        <View style={styles.viewSt}>
          <Text style={styles.title}>Dịch vụ lẻ</Text>
          <FlatList
            scrollEnabled={false}
            numColumns={2}
            data={ListDichVu.filter((item) => item.type == true).slice(0, 4)}
            keyExtractor={item => item._id}
            renderItem={renderItem}></FlatList>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    marginTop: 10
  },
  viewSt: {
    flex: 1,
    gap: 12, marginVertical: 12
  },
  icon: {
    width: 24,
    height: 24
  },
  title: { fontSize: 20, fontWeight: 'bold', marginStart: 15 },
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
      height: 4
    },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 6
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