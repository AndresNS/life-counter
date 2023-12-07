import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import PresetList from "../src/components/PresetList";

export default function Homepage(): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <PresetList />
      </View>
      <Link style={styles.button} href="/new-game">
        <Text style={{ color: "#fff" }}>New</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    padding: 5,
    flex: 1,
    justifyContent: "space-between",
  },
  listContainer: {
    height: "92%",
  },
  button: {
    backgroundColor: "#369",
    padding: 20,
    textAlign: "center",
    verticalAlign: "middle",
    height: "8%",
  },
});
