import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RenderItem = ({icon, title}) =>{
    return (
        <View style={styles.item}>
            <Image source={icon} style={styles.icon}/>
            <Text style={styles.title}>{title}</Text>
            <Image source={require('../assets/image/next.png')} style={styles.icon}/>
        </View>
    )
}

const OptionMenu = () => {

  return (
    <View style={styles.container}>
      <RenderItem icon={require('../assets/image/user.png')} title={"Danh sách nhân viên"}/>
    </View>
  )
}

export default OptionMenu

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item:{
        
    }
})