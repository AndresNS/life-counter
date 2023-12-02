import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Counter from "./src/components/Counter";

export default function App() {
  return (
    <View style={styles.container}>
      <Counter
        backgroundColor="#909"
        initialValue={40}
        rotate={true}
     />
      <Counter
        initialValue={40}
    />
      <StatusBar style="auto" hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "100%",
    gap: 8,
    padding: 5 
  },
});
