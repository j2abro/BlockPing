import {  StyleSheet } from 'react-native';
import CONSTANTS from '../utils/Constants'

// stylesqr < start >
import React, { Component } from 'react'
import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
// stylesqr < end >

//TABLE Styles
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start'
  },
  item: {
    padding: 4,
    marginVertical: 0,
    marginHorizontal: 12,
  },
  itembasic: {
    fontSize: 12,
    color: CONSTANTS.COLOR.SAND
  },
  itemheader: {
    fontSize: 12,
    color: CONSTANTS.COLOR.SAND
  },
  divider: {
    backgroundColor: CONSTANTS.COLOR.RED
  },
  dividermain: {
    height: 2,
    backgroundColor: CONSTANTS.COLOR.RED
  },
  modalFullScreen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  QRScrollViewStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: CONSTANTS.COLOR.SAND
    },
  QRCenterText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    padding: 32,
    color: CONSTANTS.COLOR.BLUE_DARK
  },
  firstTitle: {
    flex: 2,
  }
});

//https://callstack.github.io/react-native-paper/1.0/theming.html
export const BP_THEME = {
    'dark': false,
    'roundness': 4,
    'colors': {
        'primary': CONSTANTS.COLOR.MED_DARK,  // 'rgb(0, 122, 255)',
        'accent': CONSTANTS.COLOR.DARK, //'#03dac4',
        'background': CONSTANTS.COLOR.WHITE, //'rgb(242, 242, 242)',
        'surface': CONSTANTS.COLOR.MED_LIGHT, // Not seeing this anywhere
        'error': CONSTANTS.COLOR.RED, //'#B00020',
        'text': CONSTANTS.COLOR.DARK, //'rgb(28, 28, 30)',
        'onSurface': CONSTANTS.COLOR.RED, //'#000000',
        'disabled': CONSTANTS.COLOR.DARK + '40',
        'placeholder': CONSTANTS.COLOR.RED + '80', //'rgba(0, 0, 0, 0.54)',
        'backdrop': CONSTANTS.COLOR.RED + '80', //50%  //'rgba(0, 0, 0, 0.5)',
        'notification': CONSTANTS.COLOR.RED, //'rgb(255, 59, 48)',
        'card': CONSTANTS.COLOR.WHITE, //'rgb(255, 255, 255)',
        'border': CONSTANTS.COLOR.RED, //'rgb(216, 216, 216)'
    },
    'fonts': {
        'regular': {
            'fontFamily': 'System',
            'fontWeight': '400',
            'color': 'red',
        },
        'medium': {
            'fontFamily': 'System',
            'fontWeight': '500'
        },
        'light': {
            'fontFamily': 'System',
            'fontWeight': '300'
        },
        'thin': {
            'fontFamily': 'System',
            'fontWeight': '100'
        }
    },
    'animation': {
        'scale': 1
    }
};
