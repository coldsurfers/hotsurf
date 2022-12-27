import {variables} from '@fstvllife/design-token';
import {StyleSheet} from 'react-native';

export const buttonBackgroundColorStyles = StyleSheet.create({
  transparent: {
    backgroundColor: 'transparent',
  },
  transparentDarkGray: {
    backgroundColor: variables.palette.black,
    opacity: 0.5,
  },
  white: {
    backgroundColor: variables.palette.white,
  },
  pink: {
    backgroundColor: variables.palette.pink,
  },
});
