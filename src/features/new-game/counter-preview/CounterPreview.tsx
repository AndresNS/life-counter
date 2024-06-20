import { getBackgroundColor, getTextColor } from "@common/lib/helpers";
import { Player } from "@constants/types";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, View, Pressable, Text, ViewStyle, TextStyle } from "react-native";

import ColorPicker from "./ColorPicker";
// import CustomLifeForm from "../CustomLifeForm";
import { useGameContext } from "../gameContext";

type CounterPreviewProps = {
  player: Player;
};

export default function CounterPreview({ player }: CounterPreviewProps): JSX.Element {
  const { updateTheme, updateBackgroundColor } = useGameContext();
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const containerStyle: ViewStyle = {
    backgroundColor: getBackgroundColor(player),
  };

  const counterTextStyle: TextStyle = {
    color: getTextColor(player),
  };

  return (
    <View style={[styles.counterContainer, containerStyle]}>
      <Pressable style={styles.textContainer}>
        <Text selectable={false} style={[styles.counterText, counterTextStyle]}>
          {player.startingLife}
        </Text>
      </Pressable>
      <View style={styles.buttonsContainer}>
        {/* <Pressable style={styles.button}> */}
        {/*   <FontAwesome */}
        {/*     style={styles.buttonIcon} */}
        {/*     name="heart" */}
        {/*     color={getTextColor(player)} */}
        {/*     size={20} */}
        {/*   /> */}
        {/* </Pressable> */}
        <Pressable style={styles.button} onPress={() => setColorPickerVisible(true)}>
          <FontAwesome
            style={styles.buttonIcon}
            name="paint-brush"
            color={getTextColor(player)}
            size={20}
          />
        </Pressable>
      </View>
      {/* <CustomLifeForm /> */}
      <ColorPicker
        player={player}
        visible={colorPickerVisible}
        setVisible={setColorPickerVisible}
        updateTheme={updateTheme}
        updateBackgroundColor={updateBackgroundColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  counterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    paddingVertical: 10,
    borderRadius: 10,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    width: "100%",
  },
  counterText: {
    fontSize: 60,
  },
  buttonsContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    width: "100%",
  },
  button: { padding: 10 },
  buttonIcon: {},
});