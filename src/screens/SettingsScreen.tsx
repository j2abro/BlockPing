
'use strict';
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Linking, View, ScrollView, Modal as RNModal } from 'react-native';
import { TextInput, Button, Text, Portal, Modal, Dialog, Provider, Paragraph,
  DataTable, Card, Switch } from 'react-native-paper';
import { trimString, AlertDialogBox, pretty_print, myTestTableData } from '../utils/Utils';
import { startBackgroundTask, stopBackgroundTask } from '../utils/BackgroundTimer';
import CONSTANTS from '../utils/Constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Styles';
// import BackgroundTask from 'react-native-background-task';
import BackgroundTimer from 'react-native-background-timer';
import { createAccount, getTxsForAccount, getApprovalsForTxs, getContractName,
        anotherApproach, filterSettledApprovals } from '../crypto/blockchain';

// let localNotification = Notifications.postLocalNotification({
//     body: "Local notification!",
//     title: "Local Notification Title",
//     sound: "chime.aiff",
//     silent: false,
//     category: "SOME_CATEGORY",
//     userInfo: { },
//     fireDate: new Date(),
// });



function SettingsScreen() {
  const [accountAaddress, setAccountAddress] = useState('');
  // useEffect(() => { updateAccountAddress(); }, []);
  const [isSwitchOn, setIsSwitchOn] = useState();
  useEffect(() => { getSwitchStateOnLoad(); }, []);

  // Alert Dialog Box
  const [alertIsVisible, setAlertIsVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('title');
  const [alertMessage, setAlertMessage] = useState('message');
  const presentAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertIsVisible(true)
  }

  // On load check AsyncStorage and set swich
  const getSwitchStateOnLoad = async () => {
    try {
      const switchState = await AsyncStorage.getItem(CONSTANTS.MONITOR_SHOULD_RUN_KEY);
      if(switchState == CONSTANTS.TRUE) {
        setIsSwitchOn(true);
      }
      else {
        console.log('LOAD ============================getSwitchStateOnLoad 2222 OFF');
        setIsSwitchOn(false)
      }
    } catch(e) {
      console.log('Error getting data: ', e)
    }
  }

  // Handle user tap on switch
  const onToggleSwitch = () => {
    if(isSwitchOn) {
      stopBackgroundTask();
      AsyncStorage.setItem(CONSTANTS.MONITOR_SHOULD_RUN_KEY, CONSTANTS.FALSE);
      setIsSwitchOn(false);
    }
    else {
      // Turn on, but only if we have an address
      if(accountAaddress != null) {
        stopBackgroundTask(); // Stop to ensure we don't have multiple tasks running
        startBackgroundTask();
        AsyncStorage.setItem(CONSTANTS.MONITOR_SHOULD_RUN_KEY, CONSTANTS.TRUE);
        setIsSwitchOn(true);
      }
      else {
        stopBackgroundTask();
        presentAlert('No Account Address',
          'Use the QR Code scanner on main screen to load an account address, which can be monitored.');
        setIsSwitchOn(false); // reset to OFF
      }
    }
  }


  return (
    <View style={{justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings</Text>
    <Text>Settings</Text>
    <Text>Settings</Text>
    <View>
        <TextInput
            label="Ethereum Address"
            onChangeText={setAccountAddress}
            value={accountAaddress}
            placeholder="Ethereum Address"
            editable={false}
            multiline={true}
            style={{fontSize: 12}}
        />
    </View>
    <Text>Settings</Text>
    <Text>Settings</Text>
    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
    <Text>Settings</Text>
    <Text>Settings</Text>
    <AlertDialogBox visible={alertIsVisible} onChangeVisible={setAlertIsVisible} title={alertTitle} message={alertMessage} />
    </View>

  );
}
export default SettingsScreen;
