import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Player } from "../types/types";

interface IPresetListItemProps {
  name: string;
  startingLife: number;
  players: Player[];
}

export default function PresetListItem({
  name,
  startingLife,
  players,
}: IPresetListItemProps): JSX.Element {
  const handleItemPress = () => {
    router.push({ pathname: "/game", params: { name, startingLife, players } });
  };

  return (
    <Pressable onPress={handleItemPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.text}>Starting Life: {startingLife}</Text>
        <Text style={styles.text}>Players: {players.length}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#666",
    width: "100%",
    padding: 10,
    marginVertical: 5,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    color: "#fff",
  },
});
