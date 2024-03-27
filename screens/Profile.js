import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = ({ navigation }) => {
  const [User, setUser] = useState([]);

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


  console.log(User)

  useEffect(() => {
    retrieveData();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Image source={require('../assets/image/back.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>PROFILE</Text>
        <View />
      </View>

      <View style={styles.infor}>
        <Image style={{ width: 90, height: 90, borderRadius: 45 }}
          source={User.avatar != null ? { uri: User.avatar } : require('../assets/image/pesonal.png')} />

        <Text>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{User.fullname}</Text>{'\n'}
          <Text style={{ textDecorationLine: 'underline' }}>{User.email != null ? User.email : 'Chưa xác thực email'}</Text>
        </Text>
      </View>

      <View style={styles.option}>
        <Text style={styles.textGray}>Chung
          {'\n'}_________________________________________________</Text>
        <Text onPress={() => navigation.navigate('ManageUser',{User : User})}>Chỉnh sửa thông tin</Text>
        <Text>Chi tiết công việc</Text>
      </View>

      <View style={styles.option}>
        <Text style={styles.textGray}>Bảo mật và điều khoản
          {'\n'}_________________________________________________</Text>
        <Text>Quên mật khẩu</Text>
        <Text>Đổi mật khẩu</Text>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16
  },
  header: {
    width: "100%",
    paddingVertical: 20
  },
  infor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  option: {
    gap: 18,
    marginTop: 26
  },
  textGray: {
    color: 'gray'
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 30, marginBottom: 10 },
  icon: {
    width: 24,
    height: 24
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})