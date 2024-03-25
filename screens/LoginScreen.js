import { Image, StyleSheet, Text, TextInput, View, CheckBox, TouchableOpacity, ToastAndroid, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'

const LoginScreen = ({navigation}) => {
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const [showPass, setshowPass] = useState(true)

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.container}>
                <Image style={{ width: 200, height: 200 }}
                    source={require('../assets/image/logo.png')} />
                <View style={{ gap: 30 }}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center', justifyContent: 'center', fontSize: 24 }}>Đăng nhập để tiếp tục</Text>
                    <View style={{ gap: 10}}>
                        <Text style={{ fontSize: 13, color: 'gray' }}>YOUR USERNAME</Text>
                        <TextInput style={[styles.input, { width: '90' }]}
                            placeholder='Nhập email hoặc số điện thoại' onChangeText={(txt) => {
                                setemail(txt)
                            }} />
                    </View>
                    <View style={{ gap: 10 , width: '90%' }}>
                        <Text style={{ fontSize: 13, color: 'gray' }}>PASSWORD</Text>
                        <View style={styles.input}>
                            <TextInput style={{ width: '90%' }} secureTextEntry={showPass ? true : false}
                                placeholder='Nhập mật khẩu' onChangeText={(txt) => {
                                    setpass(txt)
                                }} />
                            <TouchableOpacity onPress={() => setshowPass(!showPass)}>
                                <Image style={{ width: 20, height: 20 }}
                                    source={showPass ? require('../assets/image/visible.png') : require('../assets/image/invisible.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity>
                                <Image style={{ width: 20, height: 20 }}
                                    source={require('../assets/image/check.png')} />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 10 }}>Nhớ tài khoản</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => {navigation.navigate("Main")}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', color: 'pink' }}>________________<Text style={{color: 'black'}}>Hoặc</Text>________________</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity>
                            <Image style={styles.image}
                                source={require('../assets/image/google.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image style={[styles.image, { marginLeft: 40 }]}
                                source={require('../assets/image/facebook.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    input: {
        borderRadius: 10,
        borderWidth: 1,
        padding: 15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        borderRadius: 20,
        backgroundColor: 'pink',
        padding: 15,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowRadius: 5,
        shadowOpacity: 0.35,
        elevation: 10
    },
    image: {
        width: 50,
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
})