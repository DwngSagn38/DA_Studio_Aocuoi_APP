import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const ManageUser = ({ navigation, route }) => {

  const [text, setText] = useState('')
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={{ width: 20, height: 20 }}
            source={require('../assets/image/back.png')} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 80, fontSize: 18, fontWeight: 'bold' }}>Chỉnh sửa thông tin</Text>
      </View>
      <View style={{ width: '100%', height: 230, justifyContent: 'center', alignItems: 'center', gap: 14 }}>
        <Image style={{ width: 200, height: 200 }}
          source={require('../assets/image/pesonal.png')} />
        <Text style={{ textAlign: 'center', fontSize: 16 }}>Bấm vào thông tin chi tiết để chính sửa</Text>
      </View>
      <View style={styles.textInput}>
        <TextInput style={styles.input} placeholder='Fullname' onChangeText={setText} />
        <TextInput style={styles.input} placeholder='Email' onChangeText={setText} />
        <TextInput style={styles.input} placeholder='Address' onChangeText={setText} />
        <TextInput style={styles.input} placeholder='Number phone' onChangeText={setText} />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text>CHỌN ẢNH</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>LƯU THÔNG TIN</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ManageUser

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30
  },
  textInput: {
    padding: 10,
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingVertical: 15
  },
  button: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFC0CB',
    alignItems: 'center'
  }
})