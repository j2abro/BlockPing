/**
    MainScreen - Primary screen for scan output
 */
import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, StatusBar, ScrollView,
        StyleSheet, TouchableOpacity, Image, ImageBackground, Modal as RNModal,
        Dialog as RNDialog } from 'react-native';
import { TextInput, Button, Text, Portal, Modal, Dialog, Provider, Paragraph,
        DataTable, Card, FAB } from 'react-native-paper';
import { createAccount, getTxsForAccount, getApprovalsForTxs, getContractName,
        anotherApproach, filterSettledApprovals } from '../crypto/blockchain';


import DisplayTXDetail from '../components/DisplayTXDetail';
import CONSTANTS from '../utils/Constants';
import { trimString, AlertDialogBox, pretty_print, myTestTableData, sleep }
        from '../utils/Utils';
import { Item, ItemHeader } from '../components/TableComponents';
import styles from '../styles/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome'; ///MaterialIcons

tableDataFull = [];
tableDataFiltered = [];

function MainScreen({navigation}) {
  const [refreshFlag, setRefreshFlag] = useState(1); // works with Load btn
  const [accountAaddress, setAccountAddress] = useState(null);
  const [openQRScanner, setOpenQRScanner] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => { updateAccountAddress(); }, []);
  const [alertIsVisible, setAlertIsVisible] = useState(false);
    // useEffect(() => { startScan(); }, []);
  const [filterButtonTitle, setFilterButtonTitle] = useState('Filter');

  // Table properties <start>
  const [items, setItems] = useState(tableDataFull)
  const [toggleFull, setToggleFull] = useState(true) // start with full list
  const [isScanning, setIsScanning] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([5, 20, 100]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const sortedItems = items.slice().sort((item1, item2) =>
      (sortAscending ? item1.ap_count < item2.ap_count : item2.ap_count < item1.ap_count) ? 1 : -1);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);
  useEffect(() => { setPage(0);}, [itemsPerPage]);
  // Table properties <end>

  // Alert Dialog Box
  const [alertTitle, setAlertTitle] = useState('title');
  const [alertMessage, setAlertMessage] = useState('message');
  const presentAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertIsVisible(true)
  }

  // Display TX Detail Modal
  const [displayTXDetailVisible, setDisplayTXDetailVisible] = useState(false);
  const showTXDetailModal = () => setDisplayTXDetailVisible(true);
  const hideTXDetailModal = () => setDisplayTXDetailVisible(false);
  const [TXContent, setTXContent] = React.useState('stuff');


const getStuff = () => {
  return (
    <Text>BOOOOM</Text>
  )
}

  // Handle click on table row
  const onRowSelect = (ap_count) => {
    tableDataFull.forEach((element, index, array) => {
      if(element.ap_count == ap_count) {
        console.log('BOOM -----------------aaa');
        console.log(index, element);
        console.log('BOOM -----------------bbb');
        // yo = JSON.stringify(element, null, 2);
        //
        setTXContent(element);
        setDisplayTXDetailVisible(true);
      }
    });
  };

  const getTX = () => {
    return('hello')
  };

  // <Button mode="outlined" onPress={() => refreshTable()}>Load</Button>
  //
  // const refreshTable = () => {
  //   console.log('1111 refresh aaa ', refreshFlag);
  //   setRefreshFlag(refreshFlag + 1);
  //   console.log('1111 refresh bbb ', refreshFlag);
  //   // updateAccountAddress();
  // }

  const getFilteredTableList = () => {
    console.log('getFilteredTableList', toggleFull);
    // If we're full, show the short list
    if(toggleFull) {
      console.log('getFilteredTableList IF');
      setToggleFull(false)
      tableDataFiltered = filterSettledApprovals(tableDataFull);
      setItems(tableDataFiltered);
      setFilterButtonTitle('Filter')
    }
    else {
      console.log('getFilteredTableList ELSE');
      setToggleFull(true)
      setItems(tableDataFull);
      setFilterButtonTitle('All')
    }
  }

  // const target1_addr = '0x0C9f12c725504253BfDAd26B764817B7c85f3c27' // zero
  const target1_addr = '0xe2993904204ab04e9579a5bf0a847fc6dca1a830'; // orig 7
  // const target1_addr = '0xa6c7f4cabbf2a5b3e640743ebc6c5c708edc9441'; //j2
  const startScan = () => {
    console.log('ACCOUNT ADDR:', accountAaddress);
    // if(accountAaddress == null) {
    //   let msg = 'Enter Ethereum address by scanning the QR code, then tap \'SCAN\'. ';
    //   presentAlert('Missing Address', msg)
    //   setIsScanning(false);
    //   return;
    // }
    setIsScanning(true);

      getTxsForAccount(target1_addr) ////// <------------------------ TESTING TESTING TESTING...
      // getTxsForAccount(accountAaddress)
      .then(result => {
        tableDataFull = result;
        // setTableData(tableDataFull);       // Load partial results
        setItems(tableDataFull);

        getApprovalsForTxs(tableDataFull)  // Load more results
        .then(val => {
          console.log('888888888', val)
          setRefreshFlag(refreshFlag + 10);
          getContractName(tableDataFull).then( () => {
            // refresh table
            setRefreshFlag(refreshFlag + 20);
            setIsScanning(false);
            sleep(2000).then( () => {
              // refresh table, one more time
              setRefreshFlag(refreshFlag + 30);
            })
          })
        })

        .catch(error => {
          console.error('Error 6042:', error)
        });
      })
    }

    const storeData = async (addr) => {
      try {
        console.log('Storing data: ', addr)
        await AsyncStorage.setItem(CONSTANTS.USER_PREF_KEY, addr);
      } catch (e) {
        console.log('Error storing data: ', e)
      }
    }
    const updateAccountAddress = async () => {
      try {
        const addr = await AsyncStorage.getItem(CONSTANTS.USER_PREF_KEY);
        if(addr !== null) {
            setAccountAddress(addr);
        }
      } catch(e) {
        console.log('Error getting data: ', e)
      }
    }

    const onQRScan = e => {
        let address, currency = undefined;
        try{
            output = e.data;
            console.log('Scan - Raw: ', output)
            if(output.includes(':')) {
              [currency, address] = e.data.split(':'); // 'asdfasdf' = a & s   //'' = undefined;
            }
            else {
              address = output
            }
            setOpenQRScanner(false);
            storeData(address); // Store to AsyncStorage
            setAccountAddress(address); // Update UI
            console.log('Scan - Currency: ' + currency + ' / Address: ' + address);
        }
        catch(e) {
            console.log('Scan - Error scanning QR code: ', e);
        }
      };

//              <Text>{TXContent}</Text>
    const containerStyle = {backgroundColor: 'blue', padding: 60};
    return (
        <View style={{paddingBottom: 120}} /* Pad so tab doesn't hide table */ >

        <RNModal visible={displayTXDetailVisible} onDismiss={hideTXDetailModal}
          contentContainerStyle={{backgroundColor: 'blue', padding: 60}}>
          <SafeAreaView>
          <ScrollView>
            <View>
              <DisplayTXDetail row={TXContent}/>
              <Button mode="contained" onPress={() => hideTXDetailModal()}>close</Button>
            </View>
            </ScrollView>
          </SafeAreaView>
        </RNModal>

        <View style={{flexDirection : 'row'}}>
            <Button style={{flex: 1}} mode="outlined" onPress={() => getFilteredTableList()}>{filterButtonTitle}</Button>
            <Button style={{flex: 1}} mode="outlined" loading={ isScanning } onPress={() => startScan()}>Scan</Button>
            <Button style={{flex: 1}} mode="outlined" icon="qrcode-scan" onPress={() => setOpenQRScanner(true) } >Address</Button>
        </View>

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

        <RNModal visible={openQRScanner} >
          <View style={styles.QRScrollViewStyle}>
            <QRCodeScanner onRead={onQRScan} flashMode={RNCamera.Constants.FlashMode.auto} showMarker={false} reactivate={false}
              topContent={
                <Text style={styles.QRCenterText}>{'\n'}Scan QR Code</Text>
              }
              bottomContent={
                <Button mode="contained" onPress={() => setOpenQRScanner(false) }>Close</Button>
              }
            />
          </View>
        </RNModal>


        <ScrollView>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title
                  sortDirection={sortAscending ? 'ascending' : 'descending'}
                  onPress={() => setSortAscending(!sortAscending)}
                  style={{flex: 1}}
              >
              <View style={{flexDirection : 'column'}}>
                <Text>Date</Text>
                <Text>Time</Text>
              </View>
              </DataTable.Title>
              <DataTable.Title>Contract</DataTable.Title>
              <DataTable.Title>Token</DataTable.Title>
              <DataTable.Title>Spender</DataTable.Title>
              <DataTable.Title>Amount</DataTable.Title>
            </DataTable.Header>

            {sortedItems.slice(from, to).map((item) => (
              <DataTable.Row
                key={item.ap_count}
                onPress={() => { onRowSelect(item.ap_count) }}
              >
                <DataTable.Cell style={styles.first}>
                <View style={{flexDirection : 'column'}}>
                  <Text>{item.utcdatetime.split(' ')[0]}</Text>
                  <Text>{item.utcdatetime.split(' ')[1]}</Text>
                </View>
                </DataTable.Cell>
                <DataTable.Cell>{ trimString(item.contract_addr, 6) }</DataTable.Cell>
                <DataTable.Cell>{item.contract_name}</DataTable.Cell>
                <DataTable.Cell>{ trimString(item.delegate_to, 6) }</DataTable.Cell>
                <DataTable.Cell>{item.amount_display}</DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(sortedItems.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} of ${sortedItems.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={'Rows per page'}
            />
          </DataTable>


          <View style={{ height: 200, backgroundColor: 'transparent' }}  /* Pad */ />

          </ScrollView>
          <AlertDialogBox visible={alertIsVisible} onChangeVisible={setAlertIsVisible} title={alertTitle} message={alertMessage} />



    </View /* END OF VIEW */>
    );
}

  // const styles333 = StyleSheet.create({
  //   fab: {
  //     position: 'absolute',
  //     margin: 30,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     bottom: 0,
  //   },
  // })
  //
  // <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
  //   <FAB
  //     style={styles333.fab}
  //     small
  //     icon="plus"
  //     onPress={() => console.log('Pressed')}
  //     loading={true}
  //   />
  // </View>


export default MainScreen
