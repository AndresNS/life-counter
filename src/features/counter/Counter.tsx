import palette from "@constants/colors";
import { useRef, useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";

type LifeTotal = {
  [key: string]: number;
};

interface ICounterProps {
  backgroundColor?: string;
  lifeTotal: number;
  flip?: boolean;
  playerId: string;
  setLifeTotal: React.Dispatch<React.SetStateAction<LifeTotal>>;
}

enum CounterModes {
  Increment = "increment",
  Decrement = "decrement",
}

const longPressStep = 5;

export default function Counter({
  backgroundColor,
  lifeTotal,
  flip,
  playerId,
  setLifeTotal,
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

  const containerStyle = {
    ...styles.counterContainer,
    backgroundColor: backgroundColor || palette.customs[1],
    ...(flip && { transform: [{ rotate: flip ? "180deg" : "0deg" }] }),
  };

  return (
    <View style={containerStyle}>
      <Text selectable={false} style={styles.counterText}>
        {lifeTotal}
      </Text>
      <View style={styles.buttonsWrapper}>
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
          <Text selectable={false} style={styles.counterButtonText}>
            -
          </Text>
        </Pressable>
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
          <Text selectable={false} style={styles.counterButtonText}>
            +
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  counterContainer: {
    display: "flex",
    backgroundColor: "#aaa",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    borderRadius: 20,
  },
  buttonsWrapper: {
    position: "absolute",
    display: "flex",
    flexDirection: "column-reverse",
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
    fontSize: 50,
    color: "#fff",
  },
  counterText: {
    color: "#fff",
    fontSize: 150,
  },
});
