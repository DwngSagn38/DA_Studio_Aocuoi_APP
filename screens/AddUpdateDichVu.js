import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { URL } from './HomeScreen';


const AddUpdateDichVu = ({ navigation, route }) => {
  const { item } = route.params?.item;

  const [selectedImage, setselectedImage] = useState(null);

  const [TenDichVu, setTenDichVu] = useState('');
  const [GiaTien, setGiaTien] = useState('');
  const [MoTa, setMoTa] = useState('');
  const [TrangThai, setTrangThai] = useState(true);
  const [Type, setType] = useState(true);

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
  

  const addDichVu = async () => {
    const url = `${URL}/dichvus/post`
    if (TenDichVu == '' || GiaTien == '') {
      ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', 0);
      return;
    }
    const NewDichVu = {
      tenDichVu: TenDichVu,
      trangThai: true,
      moTa: MoTa,
      giaTien: GiaTien,
      hinhAnh: selectedImage || 'https://i.pinimg.com/236x/50/25/d5/5025d51da54255dae9152d584afcb68b.jpg',
      type: Type
    }

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(NewDichVu),
      headers: {
        'Content-Type': 'application/json'
    }
    })

    const data = await res.json();
    console.log(data.data);
    if (data.status === 200) {
      ToastAndroid.show(data.msg, 0);
      resetData();
    } else {
      ToastAndroid.show(data.msg, 0);
    }
  }

  const resetData = () => {
    setGiaTien('');
    setMoTa('');
    setTenDichVu('');
    setType(true);
    setselectedImage('')
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={{ width: 20, height: 20 }}
              source={require('../assets/image/back.png')} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Thêm dịch vụ</Text>
          <View />
        </View>
        <ScrollView>
          <View style={{ width: '100%', height: 230, justifyContent: 'space-between', alignItems: 'center' }}>

            <Image style={{ width: '100%', height: 200, borderRadius: 10 }} resizeMode='repeat'
              source={{ uri: selectedImage || 'https://i.pinimg.com/236x/50/25/d5/5025d51da54255dae9152d584afcb68b.jpg' }} />
            <Text style={{ fontSize: 16 }}>Hình ảnh </Text>

          </View>
          <View style={styles.textInput}>
            <Text>Tên dịch vụ</Text>
            <TextInput style={styles.input}
              placeholder={'Tên Dịch vụ'}
              onChangeText={(txt) => setTenDichVu(txt)}
              value={TenDichVu || ''} />
            <Text>Giá tiền</Text>
            <TextInput style={styles.input}
              placeholder={'Giá tiền'}
              keyboardType='numeric'
              onChangeText={(txt) => setGiaTien(txt)}
              value={GiaTien || ''}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <Text>Loại : </Text>
              <TouchableOpacity onPress={() => setType(true)}
                style={[styles.input, { flex: 1, alignItems: 'center', backgroundColor: Type ? 'green' : 'white' }]}>
                <Text style={{ color: Type ? 'white' : 'black' }}>Lẻ</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setType(false)}
                style={[styles.input, { flex: 1, alignItems: 'center', backgroundColor: !Type ? 'green' : 'white' }]}>
                <Text style={{ color: !Type ? 'white' : 'black' }}>Combo</Text>
              </TouchableOpacity>
            </View>

            <Text>Mô tả</Text>
            <TextInput style={[{ borderBottomWidth: 1 }]}
              placeholder={'Mô tả'}
              multiline={true}
              onChangeText={(txt) => setMoTa(txt)}
              value={MoTa || ''} />
          </View>

          <TouchableOpacity onPress={PickImage}
            style={styles.button}>
            <Text>CHỌN ẢNH</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={addDichVu}
            style={styles.button}>
            <Text>LƯU THÔNG TIN</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

export default AddUpdateDichVu

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
    gap: 16,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30
  },
  textInput: {
    padding: 5,
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingVertical: 10
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFC0CB',
    alignItems: 'center'
  }
})