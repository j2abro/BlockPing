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
