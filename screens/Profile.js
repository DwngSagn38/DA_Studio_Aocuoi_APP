import { Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = ({ navigation }) => {
  const [User, setUser] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [passOld, setPassOld] = useState('');
  const [passNew, setPassNew] = useState('');
  const [checkPass, setCheckPass] = useState('');

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
          <Text style={{ textDecorationLine: 'underline' }}>{User.email || 'Chưa xác thực email'}</Text>
        </Text>
      </View>

      <View style={styles.option}>
        <Text style={styles.textGray}>Chung
          {'\n'}_________________________________________________</Text>
        <Text onPress={() => navigation.navigate('ManageUser', { User: User })}>Chỉnh sửa thông tin</Text>
        <Text>Chi tiết công việc</Text>
      </View>

      <View style={styles.option}>
        <Text style={styles.textGray}>Bảo mật và điều khoản
          {'\n'}_________________________________________________</Text>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text>
            Đổi mật khẩu
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
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
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Thêm nhân viên mới
            </Text>

            <View style={styles.khachHang}>
              <View style={{ gap: 5, marginTop: 10 }}>
                <TextInput
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    width: "100%",
                  }}
                  value={passOld}
                  onChangeText={(txt) => setPassOld(txt)}
                  placeholder="Mật khẩu cũ"
                />
                <TextInput
                  value={passNew}
                  onChangeText={(txt) => setPassNew(txt)}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    width: "100%",
                  }}
                  placeholder="Mật khẩu mới"
                />
                <TextInput
                  value={checkPass}
                  onChangeText={(txt) => setCheckPass(txt)}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    width: "100%",
                  }}
                  placeholder="Nhập lại mật khẩu mới"
                />
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible),
                    resetData()
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => { saveNV() }}
              >
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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