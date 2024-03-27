import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const ListNhanVien = ({ navigation }) => {

    const [trangThai, setTrangThai] = useState(false);
    const trangThaiCheck = () => {
        setTrangThai(trangThai => !trangThai)
    }

    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 24, height: 24 }}
                        source={require('../assets/image/back.png')} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', flex: 1 }}>Danh sách nhân viên</Text>
            </View>
            <TouchableOpacity onPress={() => { setModalVisible(true) }} style={styles.crud}>
                <View style={styles.khachHang}>
                    <Image style={{ width: 80, height: 80 }}
                        source={require('../assets/image/pesonal.png')} />
                    <View style={styles.text}>
                        <Text style={{ fontWeight: 'bold' }}>Vũ Thị Vanh Ngu</Text>
                        <Text>Người Thái Bình</Text>
                        <Text>0367974725</Text>
                        <TouchableOpacity onPress={trangThaiCheck}>
                            {trangThai ? <Text style={{ color: '#4CAF50' }}>Đang làm</Text> : <Text style={{ color: '#FF0505' }}>Nghỉ làm</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>

            <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Modal
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
                                source={require('../assets/image/pesonal.png')} />
                            <View style={styles.khachHang}>

                                <View style={[styles.text, { marginTop: 10 }]}>
                                    <Text style={{ fontWeight: 'bold' }}>Vũ Thị Vanh Ngu</Text>
                                    <Text >anhvtvph42837@fpt.edu.vn</Text>
                                    <Text>Người Thái Bình</Text>
                                    <Text>0367974725</Text>
                                    <Text>Nhân viên xấu</Text>
                                    {trangThai ? <Text style={{ color: '#4CAF50' }}>Đang làm việc</Text> : <Text style={{ color: '#FF0505' }}>Nghỉ làm</Text>}
                                </View>
                            </View>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>




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
    crud: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#7F7F7F',
        padding: 20
    }, button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop:10
    }, textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },buttonClose: {
        backgroundColor: '#2196F3',
      },
})