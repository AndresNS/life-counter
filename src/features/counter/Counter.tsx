import palette from "@constants/colors";
import { RootState } from "@store/configureStore";
import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { increment, decrement, set } from "./counterSlice";

interface ICounterProps {
  backgroundColor?: string;
  startingLife: number;
  flip?: boolean;
  playerId: number;
}

enum CounterModes {
  Increment = "increment",
  Decrement = "decrement",
}

const longPressStep = 5;

export default function Counter({
  backgroundColor,
  startingLife,
  flip,
  playerId,
}: ICounterProps): JSX.Element {
  const dispatch = useDispatch();
  const [startingLifeTotal, setStartingLifeTotal] = useState<number | null>(startingLife);
  const lifeTotal = useSelector((state: RootState) => state.counter[playerId].lifeTotal);
  const [isPressed, setIsPressed] = useState({
    increment: false,
    decrement: false,
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    dispatch(set({ playerId, value: startingLife }));
    if (startingLifeTotal !== null) setStartingLifeTotal(null);
  }, [dispatch, playerId, startingLife]);

  const displayedLifeTotal = useMemo(
    () => (isNaN(lifeTotal) ? startingLifeTotal : lifeTotal),
    [lifeTotal],
  );

  const updateCounter = (mode: string, step = 1) => {
    switch (mode) {
      case CounterModes.Increment:
        dispatch(increment({ playerId, step }));
        break;
      case CounterModes.Decrement:
        dispatch(decrement({ playerId, step }));
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
        {displayedLifeTotal}
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
