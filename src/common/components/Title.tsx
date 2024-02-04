import palette from "@constants/colors";
import { Text, StyleSheet, View } from "react-native";

interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 5,
    marginBottom: 10,
  },
  text: {
    color: palette.neutrals.white,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
});
