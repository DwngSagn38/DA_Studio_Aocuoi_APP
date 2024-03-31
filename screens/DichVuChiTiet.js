import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const DichVuChiTiet = ({ navigation, route }) => {
  const { item } = route.params;

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
            <View />
          </View>

          <View style={styles.info}>
            <Text style={styles.textName}>{item.tenDichVu} - {item.type ? 'Dịch vụ lẻ' : 'Dịch vụ trọn gói'}</Text>
            <Text style={[styles.textName, { fontSize: 15 }]}>Thông Tin</Text>
            <Text style={styles.price}>      Giá : <Text style={{ color: 'red', fontSize: 16 }}>{item.giaTien} đ</Text></Text>
            {item.trangThai ? <Text style={[styles.price, { color: 'blue' }]}>      Có thể thuê</Text>
              : <Text style={[styles.price, { color: 'red' }]}>      Tạm ngừng cung cấp</Text>}
          </View>


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

      <TouchableOpacity style={styles.btn}>
        <Text>Thêm vào hóa đơn</Text>
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
  }
})