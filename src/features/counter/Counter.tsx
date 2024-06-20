import { getBackgroundColor, getTextColor } from "@common/lib/helpers";
import palette from "@constants/colors";
import { Player } from "@constants/types";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Pressable, Text, ViewStyle, TextStyle } from "react-native";

interface ICounterProps {
  rotation?: RotationKey;
  player: Player;
  setLifeTotal: (playerId: string, lifeTotal: number) => void;
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
  rotation = "0",
  player,
  setLifeTotal,
  style,
  totalPlayers = 2,
}: ICounterProps): JSX.Element {
  const [isPressed, setIsPressed] = useState({
    increment: false,
    decrement: false,
  });
  const [currentLifeTotal, setCurrentLifeTotal] = useState<number>(player.lifeTotal);
  const [lifeChange, setLifeChange] = useState<number>(0);
  const longPressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lifeChangeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setLifeChange(player.lifeTotal - currentLifeTotal);

    if (!lifeChangeIntervalRef.current) {
      lifeChangeIntervalRef.current = setInterval(() => {
        setCurrentLifeTotal(player.lifeTotal);
        setLifeChange(0);
      }, 2000);
    } else {
      clearInterval(lifeChangeIntervalRef.current);
      lifeChangeIntervalRef.current = setInterval(() => {
        setCurrentLifeTotal(player.lifeTotal);
        setLifeChange(0);
      }, 2000);
    }
  }, [player.lifeTotal]);

  const updateCounter = (mode: string, step = 1) => {
    switch (mode) {
      case CounterModes.Increment:
        setLifeTotal(player.playerId, player.lifeTotal + step);
        break;
      case CounterModes.Decrement:
        setLifeTotal(player.playerId, player.lifeTotal - step);
        break;
      default:
        console.log("Mode not supported");
    }
  };

  const handlePressIn = (mode: string): void => {
    setIsPressed({ ...isPressed, [mode]: true });
  };

  const handlePressOut = (mode: string): void => {
    if (longPressIntervalRef.current) clearInterval(longPressIntervalRef.current);
    setIsPressed({ ...isPressed, [mode]: false });
  };

  const handleLongPress = (mode: string): void => {
    updateCounter(mode, longPressStep);

    longPressIntervalRef.current = setInterval(() => {
      updateCounter(mode, longPressStep);
    }, 700);
  };

  const containerStyle: ViewStyle = {
    ...styles.counterContainer,
    backgroundColor: getBackgroundColor(player),
  };

  const buttonsRotationStyle: ViewStyle = {
    flexDirection: rotationValues[rotation],
  };

  const textRotationStyle: TextStyle = {
    transform: [{ rotate: `${Number(rotation) - 90}deg` }],
  };

  const counterTextStyle: TextStyle = {
    fontSize: totalPlayers === 2 ? 140 : 100,
    color: getTextColor(player),
  };

  const buttonTextStyle: TextStyle = {
    fontSize: totalPlayers === 2 ? 50 : 30,
    color: getTextColor(player),
  };

  const lifeChangeLabelStyle: TextStyle = {
    fontSize: totalPlayers === 2 ? 30 : 20,
    color: getTextColor(player),
  };

  const getLabelRotationStyles = (rotation: RotationKey): ViewStyle => {
    switch (rotation) {
      case "0":
        return {
          left: 0,
          height: "100%",
          width: "50%",
        };
      case "90":
        return {
          top: 0,
          height: "50%",
          width: "100%",
        };
      case "180":
        return {
          right: 0,
          width: "50%",
          height: "100%",
        };
      case "270":
        return {
          bottom: 0,
          height: "50%",
          width: "100%",
        };
    }
  };

  const labelRotationStyle: ViewStyle = {
    ...getLabelRotationStyles(rotation),
  };

  return (
    <View style={[containerStyle, style]}>
      <Text selectable={false} style={[styles.counterText, textRotationStyle, counterTextStyle]}>
        {player.lifeTotal}
      </Text>
      {lifeChange !== 0 && (
        <View style={[styles.lifeChangeLabelContainer, labelRotationStyle]}>
          <Text
            selectable={false}
            style={[styles.lifeChangeLabel, textRotationStyle, lifeChangeLabelStyle]}>
            {lifeChange > 0 && "+"}
            {lifeChange}
          </Text>
        </View>
      )}
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
              { paddingLeft: 20 },
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

              { paddingRight: 20 },
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
    position: "relative",
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
  counterText: {},
  lifeChangeLabel: {
    color: palette.neutrals.white,
  },
  lifeChangeLabelContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});
