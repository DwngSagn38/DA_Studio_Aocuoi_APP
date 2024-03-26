import { useEffect, useState } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthNavigator from './navigator/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import ManageUser from './screens/ManageUser';
import KhachHangScreen from './screens/KhachHangScreen';

export default function App() {
  // const [checkWelcome, setcheckWelcome] = useState(true);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setcheckWelcome(false);
  //   }, 2000);
  //   return () => clearTimeout(timeout)
  // }, [])

  // return (
  //   // checkWelcome
  //   //   ? <WelcomeScreen />
  //   //   : <NavigationContainer>
  //   //     <AuthNavigator />
  //   //   </NavigationContainer>
  //   <NavigationContainer>
  //     <MainNavigator/>
  //   </NavigationContainer>
  // );
  return(
    <KhachHangScreen/>
  )
}
