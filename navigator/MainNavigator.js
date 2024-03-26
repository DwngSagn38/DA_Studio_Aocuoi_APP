import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DichVuScreen from '../screens/DichVuScreen';
import HoaDonScreen from '../screens/HoaDonScreen';
import ThongKeScreen from '../screens/ThongKeScreen';
import DetailDichVu from '../screens/DetailDichVu';
import OptionMenu from '../screens/OptionMenu';



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
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <Image style = {{width: 20, height: 20}}
                    source={require('../assets/image/home.png')} tintColor={color} />
                }} />

            <Tab.Screen name='Dịch vụ' component={DichVuScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <Image style = {{width: 20, height: 20}}
                    source={require('../assets/image/dichvu.png')} tintColor={color} />
                }} />

            <Tab.Screen name='Hóa đơn' component={HoaDonScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <Image style = {{width: 20, height: 20}}
                    source={require('../assets/image/hoadon.png')} tintColor={color} />
                }} />

            <Tab.Screen name='Thống kê' component={ThongKeScreen}
                options={{
                    headerShown: false,
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
            <Stack.Screen name='DetailDichVu' component={DetailDichVu} />
            <Stack.Screen name='OptionMenu' component={OptionMenu} />
        </Stack.Navigator>
    )
}

export default MainNavigator

const styles = StyleSheet.create({})