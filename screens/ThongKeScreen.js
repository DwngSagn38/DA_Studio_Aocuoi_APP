import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LineChart } from 'react-native-chart-kit'
import { URL } from './HomeScreen'

export const Month = ['Jan', 'Fer', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const DataFake = [0, 10, 20, 30, 70, 40, 60, 24, 77, 44, 88, 56];


const ThongKeScreen = () => {

  const [DoanhThu, setDoanhThu] = useState('');
  const [DoanhThuInMonth, setDoanhThuInMonth] = useState([]);
  const [getMonth, setgetMonth] = useState([])

  const getDoanhThuInMonth = async () => {
    const url = `${URL}/thongke/doanhthu-in-month`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status == 200) {
      const DoanhThuInYear = data.data;
      const DoanhThuMonth = DoanhThuInYear.map((monthData) => {
        return Number(String(monthData.map((index) => index.totalRevenue / 1000)));
      });
      setDoanhThuInMonth(DoanhThuMonth.filter(i => i > 0));

      const month = [];

      for (let i = 0; i < DoanhThuMonth.length; i++) {
        if (DoanhThuMonth[i] > 0) {
          month.push(Month[i])
        }
      }
      setgetMonth(month)
    }
  }

  useEffect(() => {
    getDoanhThuInMonth()
  }, [])

  console.log(DoanhThuInMonth);
  console.log(getMonth);


  const DoanhThuLineChart = () => {
    return (
      <>
        <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: 'bold' }}>Biểu đồ doanh thu {'\n'}
          <Text style={{ fontSize: 10, fontStyle: 'italic' }}> (tỉ giá: 1/1000 VNĐ)</Text>
        </Text>
        <LineChart
          data={{
            labels: getMonth.length != 0 ? getMonth : Month,
            datasets: [{
              data: DoanhThuInMonth.length != 0 ? DoanhThuInMonth : DataFake,
            },],
          }}
          width={Dimensions.get('window').width - 16}
          height={220}
          chartConfig={{
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'pink',
            decimalPlaces: 1,
            color: (opacity = 255) => `rgba(0,0,0,${opacity})`
          }}
          bezier // uốn công
          style={{ borderRadius: 16, marginVertical: 20 }}
        />
      </>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        {DoanhThuInMonth.length > 0 ? <DoanhThuLineChart /> : null}
      </View>
    </SafeAreaView>
  )
}

export default ThongKeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
})