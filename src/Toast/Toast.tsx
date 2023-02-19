import React, { memo, useEffect, useRef, useState } from 'react'
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
} from 'react-native'
import { variables } from '../lib/tokens/ts/variables'
import { Text } from '../Text'

interface Props {
  type: 'info' | 'warning' | 'error'
  message: string
  visible: boolean
  animationTimingUp: number
  animationTimingDown: number
  animationUpToValue: number
  animationDownToValue: number
  useNativeDriver?: boolean
  onPress?: (event: GestureResponderEvent) => void
}

const Toast = ({
  type,
  message,
  visible,
  animationTimingUp,
  animationTimingDown,
  animationUpToValue,
  animationDownToValue,
  useNativeDriver = false,
  onPress,
}: Props) => {
  const animationTranslateY = useRef(
    new Animated.Value(animationDownToValue)
  ).current
  const [localVisible, setLocalVisible] = useState<boolean>(false)

  useEffect(() => {
    if (visible) {
      Animated.timing(animationTranslateY, {
        toValue: animationUpToValue,
        duration: animationTimingUp,
        useNativeDriver,
      }).start(() => {
        setLocalVisible(true)
      })
    } else {
      Animated.timing(animationTranslateY, {
        toValue: animationDownToValue,
        duration: animationTimingDown,
        useNativeDriver,
      }).start(() => {
        setTimeout(() => {
          setLocalVisible(false)
        }, animationTimingDown)
      })
    }
  }, [
    animationDownToValue,
    animationTimingDown,
    animationTimingUp,
    animationUpToValue,
    useNativeDriver,
    visible,
    animationTranslateY,
  ])

  if (!localVisible && !visible) {
    return null
  }

  return (
    <Animated.View
      style={[
        baseStyles.wrapper,
        {
          bottom: animationDownToValue,
        },
        {
          transform: [
            {
              translateY: animationTranslateY,
            },
          ],
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        style={[backgroundColorStyles[type], baseStyles.button]}
      >
        <Text style={[baseStyles.text, textColorStyles[type]]}>{message}</Text>
      </Pressable>
    </Animated.View>
  )
}

const baseStyles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    fontWeight: '700',
    color: variables.palette.white,
  },
  button: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 24,
  },
})

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
})

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
})

export default memo(Toast)
