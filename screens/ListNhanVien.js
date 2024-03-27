import { FlatList, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { URL } from './HomeScreen';

const ListNhanVien = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [data, setdata] = useState([]);
    const [idNhanVien, setidNhanVien] = useState('');
    const [Fullname, setFullname] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Address, setAddress] = useState('');
    const [TrangThai, setTrangThai] = useState(false);
    const [Avatar, setAvatar] = useState('');
    const [Ghichu, setGhichu] = useState('');



    const getListNV = async () => {
        const url = `${URL}/nhanviens`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            setdata(data);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getListNV()
    }, [])



    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.card}
                onPress={() => {
                    setModalVisible(true),
                        setidNhanVien(item._id),
                        setAddress(item.address),
                        setFullname(item.fullname),
                        setAvatar(item.avatar),
                        setEmail(item.email),
                        setPhone(item.phone),
                        setTrangThai(item.trangThai),
                        setGhichu(item.ghiChu)
                }}>

                <View style={styles.khachHang}>
                    <Image style={{ width: 120, height: 120, borderRadius: 10 }}
                        source={{ uri: item.avatar }} />
                    <View style={styles.text}>
                        <Text style={{ fontWeight: 'bold' }}>{item.fullname}</Text>
                        <Text>{item.address}</Text>
                        <Text>{item.phone}</Text>
                        {item.trangThai
                            ? <Text style={{ color: '#4CAF50' }}>Đang làm</Text>
                            : <Text style={{ color: '#FF0505' }}>Nghỉ làm</Text>}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    console.log(data);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 24, height: 24 }}
                        source={require('../assets/image/back.png')} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', flex: 1 }}>Danh sách nhân viên</Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={item => item._id}
                renderItem={renderItem}></FlatList>


            <Modal style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '90%', margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Chi tiết nhân viên</Text>
                        <Image style={{ width: 100, height: 100 }}
                            source={{uri : Avatar}} />
                        <View style={styles.khachHang}>

                            <View style={[styles.text, { marginTop: 10 }]}>
                                <Text style={{ fontWeight: 'bold' }}>Họ và tên: {Fullname}</Text>
                                <Text>Email: {Email}</Text>
                                <Text>Địa chỉ: {Address}</Text>
                                <Text>Số điện thoại: {Phone}</Text>
                                <Text>Ghi chú: {Ghichu}</Text>
                                {TrangThai
                                    ? <Text style={{ color: '#4CAF50' }}>Đang làm</Text>
                                    : <Text style={{ color: '#FF0505' }}>Nghỉ làm</Text>}

                                {/* {trangThai ? <Text style={{ color: '#4CAF50' }}>Đang làm việc</Text> : <Text style={{ color: '#FF0505' }}>Nghỉ làm</Text>} */}
                            </View>
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

export default ListNhanVien

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
    khachHang: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        gap: 10
    },
    card: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#7F7F7F',
        padding: 20
    }, button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10
    }, textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }, buttonClose: {
        backgroundColor: '#2196F3',
    },
})