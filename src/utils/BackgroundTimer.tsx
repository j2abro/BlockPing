import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { trimString, AlertDialogBox, pretty_print, myTestTableData } from '../utils/Utils';
import CONSTANTS from '../utils/Constants';
import { createAccount, getTxsForAccount, getApprovalsForTxs, getContractName,
        anotherApproach, filterSettledApprovals } from '../crypto/blockchain';

export const startBackgroundTask = async () => {
  let millisecondsInHour = 60 * 60 * 24 * 1000;
  let tenSeconds = 10 * 1000;                             // <-------------------------TESTING
  let addr = await getAccountAddress()
  BackgroundTimer.runBackgroundTimer(() => {
    performScan();
    console.log('RUNNING ========================== performScan...');
  }, tenSeconds);                                         // <-------------------------TESTING
};

export const stopBackgroundTask = () => {
  BackgroundTimer.stopBackgroundTimer(); //after this call all code on background stop run.
}

const getAccountAddress = async () => {
  try {
    const addr = await AsyncStorage.getItem(CONSTANTS.USER_ADDRESS_KEY);
    console.log('LOAD ============================> addr', addr);
    if(addr !== null) {
        console.log('LOAD GOT IT ============================> accountAaddress 1', addr);
    }
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
  // updateAccountAddress(); // Need to set this if coming from background task
  let accountAaddress = await getAccountAddress();
  console.log('AAADDDRRRRRRR ', accountAaddress) // <----------------------------------------------------- THIS IS NULL ON APP RELAUNCH
  if(accountAaddress != null) {
    console.log('boom scanning --->', accountAaddress)


    // const target1_addr = '0xe2993904204ab04e9579a5bf0a847fc6dca1a830'

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
        console.log('-------------------------------------------------------------------------------');
        console.log('NEWTX ' + tx_count_new + ' NEWAP ' + ap_count_new + ' PREVTX ' + tx_count_previous + ' PREVAP ' + ap_count_previous);

        saveValues(tx_count_new, ap_count_new)

        // let msg = 'Previous scan: ' + tx_count_previous + ' transactions and ' + ap_count_previous + ' apporval.\n';
        // msg =  msg + 'Today\'s scan: ' + tx_count_new + ' transactions and ' + ap_count_new + ' apporvals.';

        // presentAlert('Scan Result', msg);
      })
    }
    catch(e) {
      console.log('Error getting data: ', e);
    }
  }
  else {
    console.log('LOAD ============================getSwitchStateOnLoad 3333 bg task c**');
  }
}



// const storeData = async (ap_count, tx_count, should_monitor) => {
//   try {
//     console.log('Storing data: ')
//     await AsyncStorage.setItem(CONSTANTS.AP_COUNT_KEY, ap_count);
//     await AsyncStorage.setItem(CONSTANTS.TX_COUNT_KEY, tx_count);
//   } catch (e) {
//     console.log('Error storing data: ', e)
//   }
// }
// const getData = async () => {
//   try {
//     const ap_count = await AsyncStorage.getItem(CONSTANTS.AP_COUNT_KEY);
//     const tx_count = await AsyncStorage.getItem(CONSTANTS.TX_COUNT_KEY);
//   } catch(e) {
//     console.log('Error getting data: ', e)
//   }
// }
