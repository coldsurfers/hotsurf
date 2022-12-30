import {variables} from '@fstvllife/design-token';
import React, {memo} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Text} from '../Text';
import {ButtonColorProp} from '../types/button';
import {buttonBackgroundColorStyles} from '../lib/styles';

interface Props {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  color?: ButtonColorProp;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const Button = ({text, onPress, color = 'pink', disabled, style}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        baseStyles.wrapper,
        buttonBackgroundColorStyles[color],
        disabled && baseStyles.disabled,
        style,
      ]}>
      <Text
        style={[
          baseStyles.text,
          disabled ? textColorStyles.disabled : textColorStyles[color],
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const baseStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: variables.palette.pink,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 24,
  },
  text: {
    fontWeight: '700',
  },
  disabled: {
    backgroundColor: '#d6d4d4',
  },
});

const textColorStyles = StyleSheet.create({
  transparent: {
    color: variables.palette.black,
  },
  transparentDarkGray: {
    color: variables.palette.white,
  },
  white: {
    color: variables.palette.black,
  },
  pink: {
    color: variables.palette.white,
  },
  disabled: {
    color: '#918b8b',
  },
});

export default memo(Button);