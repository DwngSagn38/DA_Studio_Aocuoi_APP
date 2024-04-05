import { Image, ImageBackground, Modal, Pressable, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from './HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DichVuChiTiet = ({ navigation, route }) => {
  const { item } = route.params;
  const [User, setUser] = useState([]);
  const [idItem, setidItem] = useState(item?._id);
  const [optionVisible, setoptionVisible] = useState(false);
  const [DeleteVisible, setDeleteVisible] = useState(false);
  const [checkAdd, setcheckAdd] = useState(true);

  // modal option
  const OptionModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={optionVisible}>
        <View
          style={styles.cardCotainer}>
          <View style={styles.cardModal}>
            <Text style={styles.textModal}>
              Chức năng quản lý
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button]}
                onPress={() => {
                  setoptionVisible(!optionVisible), navigation.navigate('AddUpdateDichVu', { item: item })
                }}>
                <Text style={styles.textStyle}>Update</Text>
              </Pressable>
              <Pressable
                style={[styles.button]}
                onPress={() => { setoptionVisible(false), setDeleteVisible(true) }}>
                <Text style={styles.textStyle}>Delete</Text>
              </Pressable>
            </View>

            <TouchableOpacity style={{ position: 'absolute', right: 20, top: 20 }}
              onPress={() => setoptionVisible(false)}>
              <Image style={styles.icon}
                source={require('../assets/image/cancel.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  //modal delete
  const ModalDelete = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={DeleteVisible}>
        <View
          style={styles.cardCotainer}>
          <View style={styles.cardModal}>
            <Text style={styles.textModal}>
              Bạn có chắc chắn muốn xóa không?
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button]}
                onPress={() => {
                  setDeleteVisible(!DeleteVisible)
                }}>
                <Text style={styles.textStyle}>Không</Text>
              </Pressable>
              <Pressable
                style={[styles.button]}
                onPress={() => { setDeleteVisible(!DeleteVisible), deleteDichVu(), navigation.goBack() }}>
                <Text style={styles.textStyle}>Đồng ý</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    )
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

  const deleteDichVu = async () => {
    const url = `${URL}/dichvus/delete/${idItem}`;
    const res = await fetch(url, {
      method: 'DELETE'
    });
    const data = await res.json();
    console.log(data)
    if (data.status == 200) {
      ToastAndroid.show(data.msg, 0);
    } else {
      ToastAndroid.show(data.msg, 0);
    }
  }

  const themVaoHoaDon = async () => {
    const id_Bill = await AsyncStorage.getItem('id_Bill');
    if (id_Bill != null) {
      const url = `${URL}/hoadonchitiets/post`
      const HDCT = {
        id_HoaDon: id_Bill,
        id_DichVu: item._id,
        soLuong: 1,
        giaTien: item.giaTien,
        ghiChu: "",
      }

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(HDCT),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json();
      if (data.status === 200) {
        ToastAndroid.show(data.msg, 0);
        navigation.navigate("TaoHoaDon");
        setcheckAdd(true);
      } else {
        ToastAndroid.show(data.msg, 0);
      }
    }else{
      addBill();
    }
  }

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
      themVaoHoaDon();
      console.log(data.data._id);
    }
  }

  useEffect(() => {
    item
  }, [item])
  

  return (
    <View style={styles.container}>
      <View style={{ height: '70%' }}>
        <ImageBackground style={{ width: '100%', height: '100%', justifyContent: 'space-between' }} resizeMode='cover'
          source={{
            uri: item.hinhAnh
          }}>
          <View style={styles.header}>
            <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 6, padding: 4 }}
              onPress={() => { navigation.goBack() }}>
              <Image source={require('../assets/image/back.png')} style={styles.icon} tintColor={'gray'} />
            </TouchableOpacity>
            <Text style={styles.title}>{item.tenDichVu}</Text>
            <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 6, padding: 4 }}
              onPress={() => { setoptionVisible(true) }}>
              <Image source={require('../assets/image/open-menu.png')} style={styles.icon} tintColor={'gray'} />
            </TouchableOpacity>
          </View>

          <View style={styles.info}>
            <Text style={styles.textName}>{item.tenDichVu} - {item.type ? 'Dịch vụ lẻ' : 'Dịch vụ trọn gói'}</Text>
            <Text style={[styles.textName, { fontSize: 15 }]}>Thông Tin</Text>
            <Text style={styles.price}>      Giá : <Text style={{ color: 'red', fontSize: 16 }}>{item.giaTien} đ</Text></Text>
            {item.trangThai ? <Text style={[styles.price, { color: 'blue' }]}>      Có thể thuê</Text>
              : <Text style={[styles.price, { color: 'red' }]}>      Tạm ngừng cung cấp</Text>}
          </View>

          <OptionModal />
          <ModalDelete />

        </ImageBackground>
      </View>
      <View style={{
        height: '23%', marginBottom: '1%',
        padding: 20
      }}>
        <ScrollView style={{ height: 150, gap: 12 }}>
          <Text style={{ fontSize: 15, fontWeight: '700' }}>Mô tả</Text>
          <Text>{item.moTa}</Text>
        </ScrollView>
      </View>

      <TouchableOpacity style={[styles.btn,{backgroundColor : !checkAdd ? 'green' : 'pink'}]} onPress={() => themVaoHoaDon()}>
        <Text>{!checkAdd ? 'Thêm vào hóa đơn' : 'Tạo hóa đơn ngay'}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DichVuChiTiet

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 30, marginBottom: 10, paddingHorizontal: 20 },
  icon: {
    width: 20,
    height: 20
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  btn: {
    height: 50,
    width: '90%',
    marginHorizontal: '5%',
    borderRadius: 20,
    backgroundColor: 'pink',
    padding: 15,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowRadius: 5,
    shadowOpacity: 0.35,
    elevation: 10,
  },
  info: {
    backgroundColor: 'rgba(0,0,0,0.3)', height: '26%', borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 18,
    gap: 12
  },
  textName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
  },
  cardCotainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  cardModal: {
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textModal: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  icon: {
    width: 20, height: 20
  },
  button: {
    borderRadius: 10,
    padding: 10,
    width: 100,
    margin: 10,
    alignItems: "center",
    backgroundColor: "#2196F3",
  },
})