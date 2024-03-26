import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Profile = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <Image source={require('../assets/image/back.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>PROFILE</Text>
        <View />
      </View>

      <View style={styles.infor}>
      <Image style={{ width: 90, height: 90 }}
                    source={require('../assets/image/pesonal.png')} />
        
      <Text>
      <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Vũ Thị Vân Anh</Text>{'\n'}
      <Text style={{textDecorationLine: 'underline'}}>anhvtvph42837@fpt.edu.vn</Text>
      </Text>
      </View>

      <View style={styles.option}>
        <Text style={styles.textGray}>Chung 
        {'\n'}_________________________________________________</Text>
        <Text onPress={() => navigation.navigate('ManageUser')}>Chỉnh sửa thông tin</Text>
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
  infor:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  option:{
    gap: 18,
    marginTop: 26
  },
  textGray:{
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