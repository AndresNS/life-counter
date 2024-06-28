import Header from "@common/components/Header";
import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

interface DefaultLayoutProps {
  children?: ReactNode;
  title?: string;
}

export default function DefaultLayout({
  children,
  title = "TCG Life Counter",
}: DefaultLayoutProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Header title={title} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>{children}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
