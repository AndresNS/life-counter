import { StyleSheet, View, Pressable, Text } from "react-native";
import { useState } from "react";

const defaultValue = 20;
const longPressStep = 5;
const counterModes = Object.freeze({
  INCREMENT: "increment",
  DECREMENT: "decrement",
});

export default function Counter({
  backgroundColor,
  initialValue,
  orientation,
  rotate,
}) {
  const [counter, setCounter] = useState(initialValue || defaultValue);
  const [isPressed, setIsPressed] = useState({
    increment: false,
    decrement: false,
  });

  const handleCounterChange = (mode, step = 1) => {
    switch (mode) {
      case counterModes.INCREMENT:
        setCounter(counter + step);
        break;
      case counterModes.DECREMENT:
        setCounter(counter - step);
        break;
      default:
        console.log("Mode not supported");
    }
  };

  const handlePressIn = (mode) => {
    setIsPressed({ ...isPressed, [mode]: true });
  };

  const handlePressOut = (mode) => {
    setIsPressed({ ...isPressed, [mode]: false });
  };

  const containerStyle = {
    ...styles.counterContainer,
    backgroundColor: backgroundColor || "#369",
    ...(rotate && { transform: [{ rotate: rotate ? "180deg" : "0deg" }] }),
  };

  return (
    <View style={containerStyle}>
      <Text style={styles.counterText}>{counter}</Text>
      <View
        style={[
          styles.buttonsWrapper,
          { flexDirection: orientation || "column-reverse" },
        ]}
      >
        <Pressable
          style={[
            styles.counterButton,
            {
              backgroundColor: isPressed[counterModes.DECREMENT]
                ? "rgba(255,255,255,0.2)"
                : "transparent",
            },
          ]}
          onPress={() => handleCounterChange(counterModes.DECREMENT)}
          onLongPress={() =>
            handleCounterChange(counterModes.DECREMENT, longPressStep)
          }
          onPressIn={() => handlePressIn(counterModes.DECREMENT)}
          onPressOut={() => handlePressOut(counterModes.DECREMENT)}
        >
          <Text style={styles.counterButtonText}>-</Text>
        </Pressable>
        <Pressable
          style={[
            styles.counterButton,
            {
              backgroundColor: isPressed[counterModes.INCREMENT]
                ? "rgba(255,255,255,0.2)"
                : "transparent",
            },
          ]}
          onPress={() => handleCounterChange(counterModes.INCREMENT)}
          onLongPress={() =>
            handleCounterChange(counterModes.INCREMENT, longPressStep)
          }
          onPressIn={() => handlePressIn(counterModes.INCREMENT)}
          onPressOut={() => handlePressOut(counterModes.INCREMENT)}
        >
          <Text style={styles.counterButtonText}>+</Text>
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
    flexDirection: "row",
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
