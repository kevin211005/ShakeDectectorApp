import React, { useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import { DatePickerIOS, StyleSheet, Text, View } from 'react-native';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
function App () {
  const [shackeDetected, setShakeDetected] = useState(false);
  const [data, setData] = useState({x: 0, y: 0, z: 0});
  const shakeThrold = 15;
  useEffect(() => {
    const subscription = accelerometer.subscribe(({ x, y, z }) => {
      setData({x, y, z});
    });
    setUpdateIntervalForType(SensorTypes.accelerometer, 100);
    return () => subscription.unsubscribe();
  }, []);

  function handleShake(x:number, y:number, z:number) {
    if (x>shakeThrold || y>shakeThrold || z>shakeThrold)
    {
      setShakeDetected(true);
    }
    else
    {
      setShakeDetected(false);
    }
  }
  useEffect(() => {handleShake(data.x, data.y, data.z)}  , [data]);
  function desplay() {
    if (shackeDetected)
    {
      return <Text style={styles.text}>Shake detected</Text>
    }
    else
    {
      return <Text>Shake the device to see the message!</Text>
    }
  }
  return (
    <View style={styles.container}>
      {desplay()}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    frontSize: 50,
  },
  text: {
    fontSize: 50,
    color: 'red',
  }
});
export default App;
