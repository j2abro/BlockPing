
'use strict';
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Linking, View, ScrollView, SafeAreaView, Modal as RNModal } from 'react-native';
import { TextInput, Button, Text, Portal, Modal, Dialog, Provider, Paragraph,
  DataTable, Card, Switch, Menu, Divider } from 'react-native-paper';
import { trimString, AlertDialogBox, pretty_print, myTestTableData } from '../utils/Utils';
import { startBackgroundTask, stopBackgroundTask } from '../utils/BackgroundTimer';
import CONSTANTS from '../utils/Constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Styles';
import { createAccount, getTxsForAccount, getApprovalsForTxs, getContractName,
        anotherApproach, filterSettledApprovals } from '../crypto/blockchain';
import { Notifications } from 'react-native-notifications';
import axios from 'axios';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";
import DisplayAlertDetail from '../components/DisplayAlertDetail';


tableDataFull = [];
const addressSelectItems = [
  {index: '0', title: 'QR Scanned Address', address: 'NA'},
  {index: '1', title: 'Tether USD', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7'},
  {index: '2', title: 'BNB Token', address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'},
  {index: '3', title: 'USD Coin', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'},
  {index: '4', title: 'Wrapped LUNA', address: '0xd2877702675e6cEb975b4A1dFf9fb7BAF4C91ea9'},
  {index: '5', title: 'HEX Token', address: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39'},
  {index: '6', title: 'Binance USD', address: '0x4Fabb145d64652a948d72533023f6E7A623C7C53'},
  {index: '7', title: 'Wrapped UST', address: '0xa47c8bf37f92aBed4A126BDA807A7b7498661acD'},
  {index: '8', title: 'SHIBA INU', address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE'},
  {index: '9', title: 'Wrapped BTC', address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'},
  {index: '10', title: 'Matic Token', address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0'},
  {index: '11', title: 'Cronos Coin', address: '0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b'},
  {index: '12', title: 'Dai Stablecoin', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F'},
  {index: '13', title: 'stETH', address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84'},
  {index: '14', title: 'Wrapped liquid staked Eth2', address: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0'},
  {index: '15', title: 'ChainLink Token', address: '0x514910771AF9Ca656af840dff83E8264EcF986CA'},
  {index: '16', title: 'TRON', address: '0xE1Be5D3f34e89dE342Ee97E6e90D405884dA6c67'},
  {index: '17', title: 'Bitfinex LEO', address: '0x2AF5D2aD76741191D15Dfe7bF6aC92d4Bd912Ca3'},
  {index: '18', title: 'Theta Token', address: '0x3883f5e181fccaF8410FA61e12b59BAd963fb645'},
  {index: '19', title: 'OKB Token', address: '0x75231F58b43240C9718Dd58B4967c5114342a86c'},
  {index: '20', title: 'Uniswap', address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'}
];

function FortaScreen() {
  const [accountAaddress, setAccountAddress] = useState(null);
  const [accountLabel, setAccountLabel] = useState("Ethereum Address")
  const [isSwitchOn, setIsSwitchOn] = useState();
  useEffect(() => { getSwitchStateOnLoad(); }, []);

  // Table properties <start>
  const [items, setItems] = useState(tableDataFull)
  const [toggleFull, setToggleFull] = useState(true) // start with full list
  const [isScanning, setIsScanning] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([5, 20, 100]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const sortedItems = items.slice().sort((item1, item2) =>
      (sortAscending ? item1.index < item2.index : item2.index < item1.index) ? 1 : -1);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);
  useEffect(() => { setPage(0);}, [itemsPerPage]);
  // Table properties <end>

  // Alert Dialog Box
  const [alertIsVisible, setAlertIsVisible] = useState(false);
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

  // Drop down menu
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const selectMenu = async (index) => {
    console.log('select boom', index)
    setVisible(false);
    let address = undefined;
    if(index == 0) {
      await updateAccountAddress()
      setAccountLabel("Ethereum Address")
    }
    else {
      setAccountAddress(addressSelectItems[index].address);
      setAccountLabel(addressSelectItems[index].title);
    }
    // fortaStuff(); // maybe wait until scan button pressed
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





  // Local Notifications
  const isRegistered = () => {
    Notifications.isRegisteredForRemoteNotifications().then((registered) => {
      console.log(registered);
    });
  }
  const requestPermissions = () => {
    Notifications.registerRemoteNotifications();
  }

const GET_PETS = gql`
  query todaysAlerts($input: AlertsInput) {
    alerts(input: $input) {
      pageInfo {
        hasNextPage
        endCursor {
          alertId
          blockNumber
        }
      }
      alerts {
        addresses
        name
        protocol
        findingType
        source {
          transactionHash
          block {
            number
            timestamp
            chainId
          }
        }
        severity
        metadata
      }
    }
  }
  ` // End of query



  const tartget_addr2 = '0xCC8Fa225D80b9c7D42F96e9570156c65D6cAAa25';
  const target1_addr = '0xa6c7f4cabbf2a5b3e640743ebc6c5c708edc9441'
  // const request_headers = { "content-type": "application/json", "Authorization": "<token>" };

  const fortaUrl = 'https://api.forta.network/graphql';

  const client = new ApolloClient({
    uri: fortaUrl,
    cache: new InMemoryCache()
  });




  const fortaStuff = () => {
    setIsScanning(true);
    updateAccountAddress();
    // Turn on, but only if we have an address
    if(accountAaddress == null) {
        displayLoadAddressAlert();
    }
    else {
      console.log('Do forta stuff...');

      //const yoyo =  "0xCC8Fa225D80b9c7D42F96e9570156c65D6cAAa25";
      //addresses: ["0xCC8Fa225D80b9c7D42F96e9570156c65D6cAAa25"]
      const first = 3
      const yoyo =  "0xCC8Fa225D80b9c7D42F96e9570156c65D6cAAa25";
      const startDate = "2022-03-01";
      const endDate = "2022-03-01";

      client.query({ query: gql`
        query todaysAlerts {
          alerts(
            input: {
              first: ${first}
              addresses: ["${yoyo}"]
              chainId: 1
              blockSortDirection: asc
              blockDateRange: { startDate: "${startDate}", endDate: "${endDate}" }
            }
          ) {
            pageInfo {
              hasNextPage
              endCursor {
                alertId
                blockNumber
              }
            }
            alerts {
              addresses
              name
              protocol
              findingType
              source {
                transactionHash
                block {
                  number
                  timestamp
                  chainId
                }
              }
              severity
              metadata
            }
          }
        }
      `
      })
      .then(result => {
        let alerts = result.data.alerts.alerts;
        tableDataFull = []
        for(const i in alerts) {
          var a = alerts[i];
          console.log('--------------', i);
          console.log(a);

          let val = 'NA'
          if(a.metadata != null && a.metadata.hasOwnProperty('value')) {
            val = a.metadata.value;
          }
          const alert_object = {
              index: i,
              addresses: a.addresses,
              name: a.name,
              protocol: a.protocol,
              findingType: a.findingType,
              transactionHash: a.source.transactionHash,
              __typename: a.source.block.__typename,
              number: a.source.block.number,
              timestamp: a.source.block.timestamp,
              chainId: a.source.block.chainId,
              severity: a.severity,
              value: val
          };

          tableDataFull.push(alert_object);
        }
        setItems(tableDataFull);
      });



    } // end of else
  } // end of fortaStuff

////// TABLE ///////

  // Handle click on table row
  const onRowSelect = (index) => {
    tableDataFull.forEach((element, index, array) => {
      if(element.index == index) {
        setTXContent(element);
        setDisplayTXDetailVisible(true);
      }
    });
  };

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

  return (
    <View style={{ width: '100%',  backgroundColor: 'white'}}>

    <RNModal visible={displayTXDetailVisible} onDismiss={hideTXDetailModal}
      contentContainerStyle={{backgroundColor: 'blue', padding: 60}}>
      <SafeAreaView>
        <ScrollView>
          <View>
            <DisplayAlertDetail row={TXContent}/>
            <Button mode="contained" loading={ isScanning } disabled={ isScanning } onPress={() => hideTXDetailModal()}>close</Button>
          </View>
          </ScrollView>
      </SafeAreaView>
    </RNModal>


    <ScrollView>
      <View style={{ width: '100%', backgroundColor: 'white', padding: 5, flexDirection : 'column'}}>

      <Text
        style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginTop: 0, width: '100%', }}>
        Forta Analysis
      </Text>

      <View style={{ alignSelf: 'stretch', padding: 3}}>
        <TextInput
          label={accountLabel}
          onChangeText={setAccountAddress}
          value={accountAaddress}
          placeholder="Ethereum Address"
          editable={false}
          multiline={true}
          style={{ fontSize: 12 }}
        />
      </View>

      <View style={{flexDirection : 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Menu
          style={{flex: 1}}
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button mode="outlined" onPress={openMenu}>Select Address</Button>}>
          {addressSelectItems.map((menuItem) => (
          <Menu.Item key={menuItem.index} onPress={() => selectMenu(menuItem.index)} title={menuItem.title} />
          ))}
        </Menu>
        <Button style={{flex: 1}} mode="outlined" onPress={() => fortaStuff()}>Load Alerts</Button>
      </View>

      <AlertDialogBox visible={alertIsVisible} onChangeVisible={setAlertIsVisible} title={alertTitle} message={alertMessage} />
      </View>

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
          <DataTable.Title>Protocol</DataTable.Title>
          <DataTable.Title>Severity</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
        </DataTable.Header>

        {sortedItems.slice(from, to).map((item) => (
          <DataTable.Row
            key={item.index}
            onPress={() => { onRowSelect(item.index) }}
          >
            <DataTable.Cell style={styles.first}>
            <View style={{flexDirection : 'column'}}>
              <Text>{item.timestamp.split('T')[0]}</Text>
              <Text>{item.timestamp.split('T')[1]}</Text>
            </View>
            </DataTable.Cell>
            <DataTable.Cell>{ item.protocol }</DataTable.Cell>
            <DataTable.Cell>{ item.severity }</DataTable.Cell>
            <DataTable.Cell>{ item.name }</DataTable.Cell>

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
    </View>
  );
}
export default FortaScreen;


/*

client.query({ query: gql`
      query todaysAlerts {
  alerts(
    input: {
      first: 25
      addresses: ["0xCC8Fa225D80b9c7D42F96e9570156c65D6cAAa25"]
      chainId: 1
      blockSortDirection: asc
      blockDateRange: { startDate: "2022-02-01", endDate: "2022-02-01" }
    }
  ) {
    pageInfo {
      hasNextPage
      endCursor {
        alertId
        blockNumber
      }
    }
    alerts {
      addresses
      name
      protocol
      findingType
      source {
        transactionHash
        block {
          number
          timestamp
          chainId
        }
      }
      severity
      metadata
    }
  }
}
`
})
.then(result => {
  let alerts = result.data.alerts.alerts;
  tableDataFull = []
  for(const i in alerts) {
    var a = alerts[i];
    console.log('--------------', i);
    console.log(a);
  }
});
*/
