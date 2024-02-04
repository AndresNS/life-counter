import { store } from "@store/configureStore";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";

export default function Layout(): JSX.Element {
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <Stack screenOptions={{ headerShown: false, animation: "none" }} />
        </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
