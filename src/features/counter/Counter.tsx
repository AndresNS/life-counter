import palette from "@constants/colors";
import { LifeTotal } from "@constants/types";
import { useRef, useState } from "react";
import { StyleSheet, View, Pressable, Text, ViewStyle, TextStyle } from "react-native";

interface ICounterProps {
  backgroundColor?: string;
  lifeTotal: number;
  rotation?: RotationKey;
  playerId: string;
  setLifeTotal: React.Dispatch<React.SetStateAction<LifeTotal>>;
  style?: ViewStyle;
  totalPlayers: number;
}

enum CounterModes {
  Increment = "increment",
  Decrement = "decrement",
}

type RotationKey = keyof typeof rotationValues;

const longPressStep = 5;
const rotationValues = {
  "0": "column",
  "90": "row-reverse",
  "180": "column-reverse",
  "270": "row",
} as const;

export default function Counter({
  backgroundColor,
  lifeTotal,
  rotation = "0",
  playerId,
  setLifeTotal,
  style,
  totalPlayers = 2,
}: ICounterProps): JSX.Element {
  const [isPressed, setIsPressed] = useState({
    increment: false,
    decrement: false,
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const updateCounter = (mode: string, step = 1) => {
    switch (mode) {
      case CounterModes.Increment:
        setLifeTotal((prevLifeTotal) => ({
          ...prevLifeTotal,
          [playerId]: prevLifeTotal[playerId] + step,
        }));
        break;
      case CounterModes.Decrement:
        setLifeTotal((prevLifeTotal) => ({
          ...prevLifeTotal,
          [playerId]: prevLifeTotal[playerId] - step,
        }));
        break;
      default:
        console.log("Mode not supported");
    }
  };

  const handlePressIn = (mode: string): void => {
    setIsPressed({ ...isPressed, [mode]: true });
  };

  const handlePressOut = (mode: string): void => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPressed({ ...isPressed, [mode]: false });
  };

  const handleLongPress = (mode: string): void => {
    updateCounter(mode, longPressStep);

    intervalRef.current = setInterval(() => {
      updateCounter(mode, longPressStep);
    }, 700);
  };

  const containerStyle: ViewStyle = {
    ...styles.counterContainer,
    backgroundColor: backgroundColor || palette.customs[1],
  };

  const buttonsRotationStyle: ViewStyle = {
    flexDirection: rotationValues[rotation],
  };

  const textRotationStyle: TextStyle = {
    transform: [{ rotate: `${rotation}deg` }],
  };

  const counterTextStyle: TextStyle = {
    fontSize: totalPlayers === 2 ? 150 : 100,
  };

  const buttonTextStyle: TextStyle = {
    fontSize: totalPlayers === 2 ? 50 : 30,
  };

  return (
    <View style={[containerStyle, style]}>
      <Text selectable={false} style={[styles.counterText, textRotationStyle, counterTextStyle]}>
        {lifeTotal}
      </Text>
      <View style={[styles.buttonsWrapper, buttonsRotationStyle]}>
        <Pressable
          style={[
            styles.counterButton,
            {
              backgroundColor: isPressed[CounterModes.Increment]
                ? "rgba(255,255,255,0.2)"
                : "transparent",
            },
          ]}
          onPress={() => updateCounter(CounterModes.Increment)}
          onLongPress={() => handleLongPress(CounterModes.Increment)}
          onPressIn={() => handlePressIn(CounterModes.Increment)}
          onPressOut={() => handlePressOut(CounterModes.Increment)}>
          <Text
            selectable={false}
            style={[
              styles.counterButtonText,
              textRotationStyle,
              buttonTextStyle,
              { paddingBottom: 20 },
            ]}>
            +
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.counterButton,
            {
              backgroundColor: isPressed[CounterModes.Decrement]
                ? "rgba(255,255,255,0.2)"
                : "transparent",
            },
          ]}
          onPress={() => updateCounter(CounterModes.Decrement)}
          onLongPress={() => handleLongPress(CounterModes.Decrement)}
          onPressIn={() => handlePressIn(CounterModes.Decrement)}
          onPressOut={() => handlePressOut(CounterModes.Decrement)}>
          <Text
            selectable={false}
            style={[
              styles.counterButtonText,
              textRotationStyle,
              buttonTextStyle,
              { paddingTop: 20 },
            ]}>
            -
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  counterContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    borderRadius: 20,
  },
  buttonsWrapper: {
    position: "absolute",
    display: "flex",
    width: "100%",
    height: "100%",
  },
  counterButton: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  counterButtonText: {
    color: "#fff",
  },
  counterText: {
    color: "#fff",
  },
});
