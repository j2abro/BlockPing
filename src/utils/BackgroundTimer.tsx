import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { trimString, AlertDialogBox, pretty_print, myTestTableData } from '../utils/Utils';
import CONSTANTS from '../utils/Constants';
import { createAccount, getTxsForAccount, getApprovalsForTxs, getContractName,
        anotherApproach, filterSettledApprovals } from '../crypto/blockchain';
import { Notifications } from 'react-native-notifications';


export const startBackgroundTask = async () => {
  let addr = await getAccountAddress()
  BackgroundTimer.runBackgroundTimer(() => {
    performScan();
    console.log('Scanning: ', addr);
  }, CONSTANTS.MONITOR_INTERVAL);
};

export const stopBackgroundTask = () => {
  BackgroundTimer.stopBackgroundTimer(); //after this call all code on background stop run.
}

const getAccountAddress = async () => {
  try {
    const addr = await AsyncStorage.getItem(CONSTANTS.USER_ADDRESS_KEY);
    return(addr)
  } catch(e) {
    console.log('Error getting data: ', e)
  }
}

async function saveValues(tx_count_new, ap_count_new) {
  await AsyncStorage.setItem(CONSTANTS.TX_COUNT_KEY, tx_count_new.toString());
  await AsyncStorage.setItem(CONSTANTS.AP_COUNT_KEY, ap_count_new.toString());
}

async function performScan() {
  let accountAaddress = await getAccountAddress();
  if(accountAaddress != null) {
    console.log('Scanning --->', accountAaddress)
    try {
      const tx_count_previous = await AsyncStorage.getItem(CONSTANTS.TX_COUNT_KEY);
      const ap_count_previous = await AsyncStorage.getItem(CONSTANTS.AP_COUNT_KEY);
      getTxsForAccount(accountAaddress)
      .then(result => {
        let tx_count_new = result.tx_count
        let ap_count_new = result.ap_count
        return([tx_count_previous, ap_count_previous, tx_count_new, ap_count_new]);
      })
      .then(result => {
        console.log('result', result);
        let tx_count_previous = result[0];
        let ap_count_previous = result[1];
        let tx_count_new = result[2];
        let ap_count_new = result[3];
        console.log('NEWTX ' + tx_count_new + ' NEWAP ' + ap_count_new + ' PREVTX ' + tx_count_previous + ' PREVAP ' + ap_count_previous);
        saveValues(tx_count_new, ap_count_new);
        let msg = 'Yesterday: ' + tx_count_previous + ' TX ' + ap_count_previous + ' apporvals. ';
        msg =  msg + 'Today: '  + tx_count_new      + ' TX ' + ap_count_new      + ' apporvals.';
        Notifications.postLocalNotification({
          title: 'BlockPing Scan',
          body: msg
        });
      })
    }
    catch(e) {
      console.log('Error getting data: ', e);
    }
  }
}
