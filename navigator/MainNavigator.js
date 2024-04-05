import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DichVuScreen from '../screens/DichVuScreen';
import HoaDonScreen from '../screens/HoaDonScreen';
import ThongKeScreen from '../screens/ThongKeScreen';
import DichVuChiTiet from '../screens/DichVuChiTiet';
import Profile from '../screens/Profile';
import ManageUser from '../screens/ManageUser';
import KhachHangScreen from '../screens/KhachHangScreen';
import OptionMenu from '../screens/OptionMenu';
import ListNhanVien from '../screens/ListNhanVien';
import ThemNhanVien from '../screens/ThemNhanVien';
import Header from './Header';
import CongViecScreen from '../screens/CongViecScreen';
import AddUpdateDichVu from '../screens/AddUpdateDichVu';
import TaoHoaDon from '../screens/TaoHoaDon';
import CheckBill from '../screens/CheckBill';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: 'red',
            tabBarInactiveBackgroundColor: '#FFE6E6',
            tabBarActiveBackgroundColor: '#FFE6E6',
            
        }}>
            <Tab.Screen name='HomeScreen' component={HomeScreen}
                options={{
                    header: Header,
                    tabBarIcon: ({ color, size }) => <Image style = {{width: 20, height: 20}}
                    source={require('../assets/image/home.png')} tintColor={color} />
                }} />

            <Tab.Screen name='Dịch vụ' component={DichVuScreen}
                options={{
                    header: Header,
                    tabBarIcon: ({ color, size }) => <Image style = {{width: 20, height: 20}}
                    source={require('../assets/image/dichvu.png')} tintColor={color} />
                }} />

            <Tab.Screen name='Hóa đơn' component={HoaDonScreen}
                options={{
                    header: Header,
                    tabBarIcon: ({ color, size }) => <Image style = {{width: 20, height: 20}}
                    source={require('../assets/image/hoadon.png')} tintColor={color} />
                }} />

            <Tab.Screen name='Thống kê' component={ThongKeScreen}
                options={{
                    header: Header,
                    tabBarIcon: ({ color, size }) => <Image style = {{width: 20, height: 20}}
                    source={require('../assets/image/thongke.png')} tintColor={color} />
                }} />
        </Tab.Navigator>
    )
}


const MainNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='DichVuChiTiet' component={DichVuChiTiet} />
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='ManageUser' component={ManageUser} />
            <Stack.Screen name='KhachHangScreen' component={KhachHangScreen} />
            <Stack.Screen name='ThemNhanVien' component={ThemNhanVien} />
            <Stack.Screen name='ListNhanVien' component={ListNhanVien} />
            <Stack.Screen name='OptionMenu' component={OptionMenu} />
            <Stack.Screen name='CongViecScreen' component={CongViecScreen} />
            <Stack.Screen name='AddUpdateDichVu' component={AddUpdateDichVu} />
            <Stack.Screen name='TaoHoaDon' component={TaoHoaDon} />
            <Stack.Screen name='CheckBill' component={CheckBill} />
            <Stack.Screen name='DichVuScreen' component={DichVuScreen} />
        </Stack.Navigator>
    )
}

export default MainNavigator

const styles = StyleSheet.create({})