import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const RenderItem = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Image source={require('../assets/image/next2.png')} style={styles.icon} />
    </TouchableOpacity>
  )
}

// const retrieveData = async () => {
//   try {
//       const storedUsername = await AsyncStorage.getItem('username');
//       const storedPassword = await AsyncStorage.getItem('password');
//       if (storedUsername !== null && storedPassword !== null) {
//         await AsyncStorage.setItem('username','');
//         await AsyncStorage.setItem('password','');
//       }
//   } catch (error) {
//       console.error(error);
//   }
// };

const OptionMenu = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Image source={require('../assets/image/back.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>OPTION</Text>
        <View />
      </View>
      <RenderItem icon={require('../assets/image/group.png')} title={"Danh sách nhân viên"} onPress={()=>navigation.navigate('ListNhanVien')}/>
      <RenderItem icon={require('../assets/image/add_user2.png')} title={"Thêm nhân viên mới"} onPress={()=>navigation.navigate('ThemNhanVien')}/>
      <RenderItem icon={require('../assets/image/gust.png')} title={"Danh sách khách hàng"} onPress={()=>navigation.navigate('KhachHangScreen')}/>
      <RenderItem icon={require('../assets/image/job.png')} title={"Công việc"} onPress={()=>navigation.navigate('KhachHangScreen')}/>
      <RenderItem icon={require('../assets/image/logout.png')} title={"Đăng xuất"} onPress={()=>navigation.navigate('LoginScreen')}/>
    </View>
  )
}

export default OptionMenu

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 30, marginBottom: 10 },
  item: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFE6E6',
    borderRadius: 14,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowRadius: 5,
    shadowOpacity: 0.35,
    elevation: 10
  },
  icon: {
    width: 24,
    height: 24
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})