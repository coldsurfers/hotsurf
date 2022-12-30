import { variables } from "@fstvllife/design-token";
import React, { memo, useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { Text } from "../Text";

interface Props {
  type: "info" | "warning" | "error";
  message: string;
  visible: boolean;
}

const Toast = ({ type, message, visible }: Props) => {
  const wrapperAnimationValue = useRef(new Animated.Value(56)).current;
  const [localVisible, setLocalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      Animated.timing(wrapperAnimationValue, {
        toValue: -112,
        duration: 600,
        useNativeDriver: false,
      }).start(() => {
        setLocalVisible(true);
      });
    } else {
      Animated.timing(wrapperAnimationValue, {
        toValue: 56,
        duration: 600,
        useNativeDriver: false,
      }).start(() => {
        setTimeout(() => {
          setLocalVisible(false);
        }, 600);
      });
    }
  }, [visible, wrapperAnimationValue]);

  if (!localVisible && !visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        baseStyles.wrapper,
        {
          transform: [
            {
              translateY: wrapperAnimationValue,
            },
          ],
        },
      ]}
    >
      <Pressable
        onPress={() => {}}
        style={[backgroundColorStyles[type], baseStyles.button]}
      >
        <Text style={[baseStyles.text, textColorStyles[type]]}>{message}</Text>
      </Pressable>
    </Animated.View>
  );
};

const baseStyles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: -56,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  text: {
    fontWeight: "700",
    color: variables.palette.white,
  },
  button: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 24,
  },
});

const backgroundColorStyles = StyleSheet.create({
  info: {
    backgroundColor: variables.palette.black,
  },
  warning: {
    backgroundColor: variables.palette.yellow,
  },
  error: {
    backgroundColor: variables.palette.pink,
  },
});

const textColorStyles = StyleSheet.create({
  info: {
    color: variables.palette.white,
  },
  warning: {
    color: variables.palette.white,
  },
  error: {
    color: variables.palette.white,
  },
});

export default memo(Toast);
