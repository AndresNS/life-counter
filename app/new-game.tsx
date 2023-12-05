import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

const startingLifeValues = [20, 30, 40, 100];

export default function NewGame() {
  const [startingLifeIndex, setStartingLifeIndex] = useState(0);

  const handleStartGamePress = () => {
    router.replace({
      pathname: "/game",
      params: { startingLife: startingLifeValues[startingLifeIndex] },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}> Starting Life </Text>
      <View style={styles.optionsContainer}>
        {startingLifeValues.map((startingLifeValue, index) => (
          <Pressable
            style={[
              styles.optionButton,
              index == startingLifeIndex ? styles.optionButtonSelected : null,
            ]}
            onPress={() => setStartingLifeIndex(index)}>
            <Text style={styles.optionText} selectable={false}>
              {startingLifeValue}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.submitButton} onPress={handleStartGamePress}>
        <Text style={styles.submitButtonText}>Start Game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#333",
    height: "100%",
    gap: 8,
    padding: 20,
  },
  label: {
    color: "#fff",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  optionButton: {
    backgroundColor: "#666",
    padding: 20,
    borderRadius: 5,
    flexGrow: 1,
  },
  optionButtonSelected: {
    backgroundColor: "#999",
  },
  optionText: {
    color: "#fff",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#369",
    padding: 20,
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});
