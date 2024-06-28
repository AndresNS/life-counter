import palette from "@constants/colors";
import { Text, StyleSheet, Pressable, StyleProp, ViewStyle } from "react-native";

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info" | "neutral" | string;
}

export default function Button({
  text,
  color = "primary",
  style,
  onPress,
}: ButtonProps): JSX.Element {
  const getColorStyle = () => {
    switch (color) {
      case "primary":
        return styles.primary;
      case "secondary":
        return styles.secondary;
      case "success":
        return styles.success;
      case "warning":
        return styles.warning;
      case "error":
        return styles.error;
      case "info":
        return styles.info;
      case "neutral":
        return styles.neutral;
      default:
        return styles.primary;
    }
  };
  return (
    <Pressable style={[styles.buttonBase, getColorStyle(), style]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  text: {
    color: palette.neutrals.white,
    fontSize: 16,
    textAlign: "center",
  },
  primary: {
    backgroundColor: palette.primary[500],
  },
  secondary: {
    backgroundColor: palette.secondary[500],
  },
  success: {
    backgroundColor: palette.success[500],
  },
  error: {
    backgroundColor: palette.error[500],
  },
  warning: {
    backgroundColor: palette.warning[500],
  },
  info: {
    backgroundColor: palette.primary[500],
  },
  neutral: {
    backgroundColor: palette.grays[700],
  },
});
