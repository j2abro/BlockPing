
'use strict';
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Linking, View, ScrollView, Modal as RNModal } from 'react-native';
import { TextInput, Button, Text, Portal, Modal, Dialog, Provider, Paragraph,
  DataTable, Card, Switch, Divider } from 'react-native-paper';
import { trimString, AlertDialogBox, pretty_print, myTestTableData } from '../utils/Utils';
import { startBackgroundTask, stopBackgroundTask } from '../utils/BackgroundTimer';
import CONSTANTS from '../utils/Constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Styles';
import { createAccount, getTxsForAccount, getApprovalsForTxs, getContractName,
        anotherApproach, filterSettledApprovals } from '../crypto/blockchain';
import { Notifications } from 'react-native-notifications';

function MonitorScreen() {
  const [accountAaddress, setAccountAddress] = useState(null);
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

  const updateAccountAddress = async () => {
    try {
      const addr = await AsyncStorage.getItem(CONSTANTS.USER_ADDRESS_KEY);
      if(addr !== null) {
          setAccountAddress(addr);
      }
      else {
        displayLoadAddressAlert()
      }
    } catch(e) {
      console.log('Error getting data: ', e)
    }
  }

  // Consistent messsage for missing addr
  const displayLoadAddressAlert = () => {
    presentAlert('Set Account Address', 'Use the \'Scan\' tab to load an address to be used when monitoring is activated.');
  }

  // On load check AsyncStorage and set swich
  const getSwitchStateOnLoad = async () => {
    updateAccountAddress();
    try {
      const switchState = await AsyncStorage.getItem(CONSTANTS.MONITOR_SHOULD_RUN_KEY);
      if(switchState == CONSTANTS.TRUE) {
        setIsSwitchOn(true);
      }
      else {
        setIsSwitchOn(false)
      }
    } catch(e) {
      console.log('Error getting data: ', e)
    }
  }

  // Handle user tap on switch
  const onToggleSwitch = () => {
    updateAccountAddress();
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
        displayLoadAddressAlert();
        setIsSwitchOn(false); // reset to OFF
      }
    }
  }

  // Local Notifications
  const isRegistered = () => {
    Notifications.isRegisteredForRemoteNotifications().then((registered) => {
      console.log(registered);
    });
  }
  const requestPermissions = () => {
    Notifications.registerRemoteNotifications();
  }

  return (
    <View style={{ width: '100%', height: '100%'}}>
    <ScrollView>
      <View style={{ width: '100%', height: '100%', flexDirection : 'column'}}>

      <View style={{ padding: 8}}>
        <Text style={{fontWeight: 'bold' }}>Daily Approval Monitoring: </Text>
        <Text>
        Enable daily scanning of an account address. Once a day, the transaction count and
        approvals will be scanned on the blockchain and compared with the previous day.
        This will highlight your account activity.
        </Text>
      </View>

      <View >
        <TextInput
          label="Ethereum Address"
          onChangeText={setAccountAddress}
          value={accountAaddress}
          placeholder="Ethereum Address"
          editable={false}
          multiline={true}
          style={{ fontSize: 12 }}
        />
      </View>

      <Button style={{flex: 0, margin: 10}} mode="outlined" onPress={() => updateAccountAddress()}>Load Address</Button>
      <Divider style={styles.divider} />


      <View style={{flexDirection : 'row', justifyContent: 'center', alignItems: 'center' , padding: 4}}>
        <Text style={{fontWeight: 'bold'}}>Enable Daily Monitoring: </Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>

      <AlertDialogBox visible={alertIsVisible} onChangeVisible={setAlertIsVisible} title={alertTitle} message={alertMessage} />
      </View>
    </ScrollView>
    </View>
  );
}
export default MonitorScreen;
