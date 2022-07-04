import { useState } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import CircularSlider from "react-native-rounded-slider";

export default function App() {
    const [value, setValue] = useState(0);
    return(
        <View style={styles.container}>
            <CircularSlider
                onChange={setValue}
                element={<Text style={{position:"absolute", alignSelf:"center"}}>{value}</Text>}
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
    }
});