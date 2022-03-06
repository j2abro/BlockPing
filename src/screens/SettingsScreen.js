/*
import * as React from 'react';

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
    </View>
  );
}
export default SettingsScreen
*/

'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Linking, View } from 'react-native';

import CONSTANTS from '../utils/Constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

// class SettingsScreen extends Component {
function SettingsScreen() {
    const storeData = async (addr) => {
      try {
        await AsyncStorage.setItem(CONSTANTS.USER_PREF_KEY, addr);
      } catch (e) {
        console.log('Error storing data: ', e)
      }
    }
    //<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    return (

      <View>
        <Text>Settings</Text>
        <Text>Settings</Text>
        <Text>Settings</Text>
        <Text>Settings</Text>
        <Text>Settings</Text>
      </View>
    );
}

export default SettingsScreen
