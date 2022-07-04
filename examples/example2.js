import { useState } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import CircularSlider from "react-native-rounded-slider";

function Inner(props){
  return(
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={{color: "#02737d", fontSize: 25}}>{props.children}</Text>
      </View>
    </View>
  )
}

export default function App() {
  const [value, setValue] = useState(0);
  return(
    <View style={styles.container}>
      <CircularSlider
        onChange={setValue}
        size={350} 
        min={0}
        max={200}
        trackWidth={10}
        trackColor={"#6df0fc"}
        thumbColor={"#6df0fc"}
        thumbWidth={15}
        steps={5}
        element={<Inner>{value}</Inner>}
      />
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outer:{
    position:"absolute",
    alignSelf:"center",
    width:309,
    height:309,
    backgroundColor:"#87f5ff",
    borderRadius: 150,
    alignItems:"center",
    justifyContent:"center",
    borderWidth: 50,
    borderColor:"#c2faff",
  },
  inner:{
    width:100,
    height:100,
    borderRadius:50,
    alignItems:"center",
    justifyContent:"center",
    elevation: 5,
    backgroundColor:"#00eaff",
  }
});
