import palette from "@constants/colors";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Dialog, Portal, Button } from "react-native-paper";

type CustomLifeFormProps = {
  customLife: string;
  setCustomLife: Dispatch<SetStateAction<string>>;
  visible: boolean;
  setVisible: (value: boolean) => void;
};

export default function CustomLifeForm({
  customLife,
  setCustomLife,
  visible,
  setVisible,
}: CustomLifeFormProps) {
  const [inputValue, setInputValue] = useState(customLife);

  useEffect(() => {
    setInputValue(customLife);
  }, [customLife]);

  const closeDialog = () => {
    setVisible(false);
  };

  const handleSubmit = () => {
    if (inputValue !== "") setCustomLife(inputValue);
    closeDialog();
  };

  const handleCancel = () => {
    setInputValue(customLife);
    closeDialog();
  };

  return (
    <Portal>
      <Dialog style={styles.dialog} visible={visible} onDismiss={handleCancel}>
        <Dialog.Title style={styles.dialogTitle}>Custom Starting Life</Dialog.Title>
        <Dialog.Content>
          <TextInput
            placeholder="Insert Starting Life"
            style={styles.textInput}
            value={inputValue}
            onChangeText={setInputValue}
            keyboardType="numeric"
            autoFocus
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            contentStyle={styles.dialogButton}
            mode="outlined"
            textColor={palette.neutrals.white}
            onPress={handleCancel}>
            Cancel
          </Button>
          <Button
            contentStyle={styles.dialogButton}
            mode="contained"
            buttonColor={palette.primary[500]}
            textColor={palette.neutrals.white}
            onPress={handleSubmit}>
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
});
