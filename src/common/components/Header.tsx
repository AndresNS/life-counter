import palette from "@constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { Text, View, StyleSheet, Pressable } from "react-native";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps): JSX.Element {
  const pathname = usePathname();

  const isHomePage = () => pathname === "/";

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        {!isHomePage() && (
          <Pressable onPress={() => router.back()}>
            <FontAwesome name="chevron-left" color={palette.neutrals.white} size={20} />
          </Pressable>
        )}
      </View>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>{title}</Text>
        <Text style={styles.version}>{process.env.EXPO_PUBLIC_APP_VERSION}</Text>
      </View>
      <View style={styles.menu}>
        {/*        <FontAwesome name="bars" color={palette.neutrals.white} size={20} />*/}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.grays[900],
  },
  navigation: {
    width: 50,
    alignItems: "center",
  },
  logoContainer: {
    paddingVertical: 20,
  },
  logo: {
    color: palette.neutrals.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  version: { marginTop: 5, textAlign: "center", color: palette.grays[500] },
  menu: {
    width: 50,
    alignItems: "center",
  },
});
