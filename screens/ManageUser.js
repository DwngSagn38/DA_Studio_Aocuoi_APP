import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const ManageUser = ({ navigation, route }) => {

  const { User } = route.params;

  const [selectedImage, setselectedImage] = useState(null);

  const [Fullname, setFullname] = useState('');
  const [Email, setEmail] = useState('');
  const [Address, setAddress] = useState('');
  const [Phone, setPhone] = useState('');

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setselectedImage(result.assets[0].uri)
    }
  }
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
        <Image style={{ width: 200, height: 200, borderRadius: 30 }}
          source={User.avatar || selectedImage ? {uri : selectedImage || User.avatar } : require('../assets/image/pesonal.png')} />
        <Text style={{ textAlign: 'center', fontSize: 16 }}>Bấm vào thông tin chi tiết để chính sửa</Text>
      </View>
      <View style={styles.textInput}>
        <TextInput style={styles.input} placeholder={User.fullname} onChangeText={(txt) => setFullname(txt)} />
        <TextInput style={styles.input} placeholder={ User.email || 'Email'} onChangeText={(txt) => setEmail(txt)} />
        <TextInput style={styles.input} placeholder={ User.address || 'Address'} onChangeText={(txt) => setAddress(txt)} />
        <TextInput style={styles.input} placeholder={ User.phone || 'Number phone'} onChangeText={(txt) => setPhone(txt)} />
      </View>
      <TouchableOpacity onPress={PickImage}
        style={styles.button}>
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