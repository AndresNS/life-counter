import palette from "@constants/colors";
import { BackgroundTheme, Player } from "@constants/types";
import { FontAwesome } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Dialog, Portal, Button, RadioButton } from "react-native-paper";

type ColorPickerProps = {
  player: Player;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  updateTheme: (playerId: string, theme: BackgroundTheme) => void;
  updateBackgroundColor: (playerId: string, backgroundColor: string) => void;
};

export default function ColorPicker({
  player,
  visible,
  setVisible,
  updateTheme,
  updateBackgroundColor,
}: ColorPickerProps) {
  const closeDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog style={styles.dialog} visible={visible} onDismiss={closeDialog}>
        <Dialog.Title style={styles.dialogTitle}>Counter Color</Dialog.Title>
        <Dialog.Content style={{ gap: 30 }}>
          <View style={styles.colorsContainer}>
            {Object.keys(palette.customs).map((colorKey, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  updateBackgroundColor(
                    player.playerId,
                    palette.customs[colorKey as keyof typeof palette.customs],
                  )
                }
                style={[
                  styles.colorButton,
                  { backgroundColor: palette.customs[colorKey as keyof typeof palette.customs] },
                ]}>
                {player.backgroundColor ===
                palette.customs[colorKey as keyof typeof palette.customs] ? (
                  <FontAwesome name="check" size={16} color={palette.neutrals.white} />
                ) : (
                  <View style={{ height: 16 }} />
                )}
              </Pressable>
            ))}
          </View>
          <View style={styles.themePickerContainer}>
            <Text style={{ color: palette.neutrals.white, fontSize: 20 }}>Theme</Text>
            <RadioButton.Group
              onValueChange={(value) => updateTheme(player.playerId, value as BackgroundTheme)}
              value={player.backgroundTheme}>
              <RadioButton.Item
                label="Default"
                value="default"
                position="leading"
                color={palette.primary[500]}
                labelStyle={styles.radioLabel}
              />
              <RadioButton.Item
                label="Dark"
                value="dark"
                position="leading"
                color={palette.primary[500]}
                labelStyle={styles.radioLabel}
              />
              <RadioButton.Item
                label="Light"
                value="light"
                position="leading"
                color={palette.primary[500]}
                labelStyle={styles.radioLabel}
              />
            </RadioButton.Group>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          {/* <Button */}
          {/*   contentStyle={styles.dialogButton} */}
          {/*   mode="outlined" */}
          {/*   textColor={palette.neutrals.white} */}
          {/*   onPress={closeDialog}> */}
          {/*   Cancel */}
          {/* </Button> */}
          <Button
            contentStyle={styles.dialogButton}
            mode="contained"
            buttonColor={palette.primary[500]}
            textColor={palette.neutrals.white}
            onPress={closeDialog}>
            Accept
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: palette.grays[100],
    paddingHorizontal: 15,
    paddingVertical: 10,
    lineHeight: 25,
  },
  dialog: {
    backgroundColor: palette.grays[900],
    borderRadius: 5,
  },
  dialogTitle: {
    color: palette.neutrals.white,
  },
  dialogButton: { paddingHorizontal: 10 },
  colorsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
  },
  colorButton: {
    width: "30%",
    paddingVertical: 20,
    alignItems: "center",
    borderRadius: 5,
  },
  themePickerContainer: { gap: 5 },
  radioLabel: { color: palette.neutrals.white, textAlign: "left" },
});
