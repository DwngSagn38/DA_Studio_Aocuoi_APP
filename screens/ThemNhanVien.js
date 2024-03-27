import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ThemNhanVien = ({ navigation }) => {
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
      <View style={styles.crud}>
        <View style={styles.khachHang}>
          <Image style={{ width: 80, height: 80 }}
            source={require('../assets/image/pesonal.png')} />
          <View style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Lê Đăng Sang</Text>
            <Text>Hương Khê - Hà Tĩnh</Text>
            <Text>0367974725</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginLeft: 150, justifyContent: 'space-around' }}>
          <TouchableOpacity>
            <Text style={{ textDecorationLine: 'underline' }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ textDecorationLine: 'underline' }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ThemNhanVien

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
    justifyContent: 'space-around'
  },
  text: {
    gap: 10
  },
  crud: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7F7F7F',
    padding: 20
  }
})