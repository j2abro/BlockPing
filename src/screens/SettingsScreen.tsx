
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
import { createAccount, getTxsForAccount, getApprovalsForTxs, getContractName,
        anotherApproach, filterSettledApprovals } from '../crypto/blockchain';

import { Notifications } from 'react-native-notifications';

function SettingsScreen() {
  const [accountAaddress, setAccountAddress] = useState('');
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
      // First request notification permission, if not enabled
      if(!isRegistered()) {
        requestPermissions()
      }
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


  // Local Notifications <start>
  const requestPermissions = () => {
    Notifications.registerRemoteNotifications();
  }

  const sendLocalNotificationDelay = () => {
    setTimeout(() => {
      console.log("Sending soon");
      sendLocalNotification();
    }, 5000);
  }
  const sendLocalNotification = () => {
    Notifications.postLocalNotification({
      title: 'My Title',
      body: 'Local 444'
    });
  }

  const checkPermissions = () => {
    Notifications.ios.checkPermissions().then((currentPermissions) => {
      console.log(currentPermissions);
    });
  }

  const isRegistered = () => {
    Notifications.isRegisteredForRemoteNotifications().then((registered) => {
      console.log(registered);
    });
  }
  // Local Notifications <end>


  return (

      <ScrollView>
        <View>
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

        <View style={{flexDirection : 'column'}}>

          <Button style={{flex: 0}} mode="contained" onPress={() => sendLocalNotificationDelay()} testID={'sendLocalNotification'}>send</Button>

        </View>
        <Text>Settings</Text>
        <AlertDialogBox visible={alertIsVisible} onChangeVisible={setAlertIsVisible} title={alertTitle} message={alertMessage} />

        </View>


        </View>
        </ScrollView>

  );
}
export default SettingsScreen;
