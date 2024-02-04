import Button from "@common/components/Button";
import DefaultLayout from "@common/layouts/default";
import palette from "@constants/colors";
import PresetList from "@features/presets/PresetsList";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Homepage(): JSX.Element {
  const handleButtonPress = () => {
    router.push("/new-game");
  };

  return (
    <DefaultLayout>
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <PresetList />
        </View>
        <Button text="New" onPress={handleButtonPress} style={styles.button} />
      </View>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.grays[900],
    padding: 10,
    flex: 1,
    gap: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
  button: {
    width: "80%",
  },
});
