import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <Link style={styles.button} href="/new-game">
        <Text style={{ color: "#fff" }}>New</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#333",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
    gap: 8,
    padding: 5,
  },
  button: {
    backgroundColor: "#369",
    padding: 20,
    textAlign: "center",
  },
});
