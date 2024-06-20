import palette, { CustomColorsKeys } from "@constants/colors";
import { Text, StyleSheet, Pressable } from "react-native";

type SelectColorButtonProps = {
  label: string;
  theme?: "default" | "dark" | "light";
  color: CustomColorsKeys;
};

export default function SelectColorButton({
  label,
  theme = "default",
  color,
}: SelectColorButtonProps) {
  const getLabelColor = (theme: string) => {
    if (theme === "default") return palette.neutrals.white;
    return palette.customs[color];
  };

  const getButtonColor = (theme: string) => {
    switch (theme) {
      case "dark":
        return palette.neutrals.black;
      case "light":
        return palette.neutrals.white;
      default:
        return palette.customs[color];
    }
  };

  return (
    <Pressable style={[styles.container, { backgroundColor: getButtonColor(theme) }]}>
      <Text style={[styles.label, { color: getLabelColor(theme) }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 4,
    borderColor: palette.grays[800],
  },
  label: { fontWeight: "bold", fontSize: 24 },
});
