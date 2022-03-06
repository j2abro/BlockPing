/**
    MainScreen - Primary screen for scan output
 */
import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, StatusBar,
        StyleSheet, TouchableOpacity, Image, ImageBackground, Modal as RNModal } from 'react-native';
import { TextInput, Button, Text, Portal, Modal } from 'react-native-paper';
import { createAccount, getTxsForAccount, getApprovalsForTxs, getContractName,
        anotherApproach, filterSettledApprovals } from '../crypto/blockchain';
import CONSTANTS from '../utils/Constants';
import { trimString } from '../utils/Utils';
import { Item, ItemHeader } from '../components/TableComponents';
import styles from '../styles/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome'; ///MaterialIcons

tableDataFull = [];
tableDataFiltered = [];

function MainScreen({navigation}) {
    // Icon.loadFont();
    const [selectedRow, setSelectedRow] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [refreshFlag, setrefreshFlag] = useState(1);
    const [filterModeAll, setFilterModeAll] = useState(true)
    const [accountAaddress, setAccountAddress] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => { loadblock(); }, []);
    useEffect(() => { getData(); }, []);


    const getData = async () => {
      try {
        const addr = await AsyncStorage.getItem(CONSTANTS.USER_PREF_KEY);
        console.log('2222 refresh');
        if(addr !== null) {
            console.log('3333 refresh');
            setAccountAddress(addr);
        }
      } catch(e) {
        console.log('Error getting data: ', e)
      }
    }

    const refreshTable = () => {
        console.log('1111 refresh');
        setrefreshFlag(refreshFlag + 1);
        getData();
    }

    const getFilteredTableList = () => {
        tableDataFiltered = filterSettledApprovals(tableDataFull);
        setTableData(tableDataFiltered);
    }

    //<Button onPress={() => navigation.navigate('ModalDetailScreen',{msg:"message passed", })}  title="Detail"/>
    const handelRowSelect = (index) => {
        navigation.navigate('ModalDetailScreen',{msg:"message passed", index:index, table:tableDataFull });
    }

    //const target1_addr = '0xe2993904204ab04e9579a5bf0a847fc6dca1a830'; // orig 7
    const target1_addr = '0xa6c7f4cabbf2a5b3e640743ebc6c5c708edc9441'; //j2
    const loadblock = () => {
        getTxsForAccount(target1_addr)
        .then(result => {
            tableDataFull = result;
            setTableData(tableDataFull)        // Load partial results

            getApprovalsForTxs(tableDataFull)  // Load more results
            .then(val => {
                console.log('888888888', val)
                getContractName(tableDataFull)
            })
            .catch(error => {
                console.error('Error 6042:', error)
            });
        })
    }

    const renderHeader = ({ item, index }) => {
        const backgroundColor = CONSTANTS.COLOR.BLUE_DARK;
        // const color = item.ap_count === selectedRow ? 'white' : 'black';
            return (
              <ItemHeader
                backgroundColor={{ backgroundColor }}
              />
            );
    }; // end rederItem

    const renderItem = ({ item, index }) => {
        const backgroundColor = item.ap_count === selectedRow ? CONSTANTS.COLOR.RED : CONSTANTS.COLOR.BLUE_MED;
        const color = item.ap_count === selectedRow ? 'white' : 'black';
            return (
              <Item
                item={ item }
                onPress={() => handelRowSelect(item.ap_count)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
              />
            );
    }; // end rederItem

    const storeData = async (addr) => {
      try {
        await AsyncStorage.setItem(CONSTANTS.USER_PREF_KEY, addr);
      } catch (e) {
        console.log('Error storing data: ', e)
      }
    }

    const onScan = e => {
        try{

            let [currency, address] = e.data.split(':'); // 'asdfasdf' = a & s   //'' = undefined;
            storeData(address)
            console.log('Currency: ' + currency + ' / Address: ' + address);
        }
        catch(e) {
            console.log('Error scanning QR code: ', e)
        }
      };

    return (
        <View>
            <View style={{flexDirection : 'row'}}>
                <Button mode="outlined" onPress={() => refreshTable()}>Load</Button>
                <Button mode="contained" onPress={() => getFilteredTableList()}>Filter</Button>
                <Button mode="outlined" icon="camera" onPress={() => setModalOpen(true) } >QR Scan</Button>

            </View>

            <View>
                <TextInput
                    label="Ethereum Address"
                    onChangeText={setAccountAddress}
                    value={accountAaddress}
                    placeholder="Ethereum Address"
                    editable={false}
                />
            </View>

            <RNModal visible={modalOpen} >
              <View style={styles.QRScrollViewStyle}>
                <QRCodeScanner onRead={onScan} flashMode={RNCamera.Constants.FlashMode.auto} showMarker={false} reactivate={false}
                  topContent={
                    <Text style={styles.QRCenterText}>{'\n'}Scan QR Code</Text>
                  }
                  bottomContent={
                    <Button mode="contained" onPress={() => setModalOpen(false) }>Close</Button>
                  }
                />
              </View>
            </RNModal>

        <FlatList
          data={tableData}
          renderItem={renderItem}
          keyExtractor={(item) => item.ap_count}
          extraData={[selectedRow, refreshFlag]}
          horizontal={false}
          ListHeaderComponent={renderHeader}
          stickyHeaderIndices={[0]}
        />
    </View>
    );
}

export default MainScreen
