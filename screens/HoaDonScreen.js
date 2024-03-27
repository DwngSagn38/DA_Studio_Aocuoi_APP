import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HoaDonScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HoaDonScreen</Text>
    </View>
  )
}

export default HoaDonScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
})