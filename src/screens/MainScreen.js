/**
    MainScreen - Primary screen for scan output
 */
import React, { useState, useEffect } from 'react';
import { Text, View, Button, FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { createAccount, getTxsForAccount, getApprovalsForTxs, getApprovalsForTxs222, doSomethingAsync } from '../crypto/blockchain';
import CONSTANTS from '../utils/Constants'

// TABLE
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <View style={{flexDirection : 'row'}}>
        <View style={{ flex: 1, backgroundColor: CONSTANTS.COLOR.SAND }}>
            <Text style={[styles.timestamp, textColor]}>{item.ap_count}</Text>
        </View>

        <View style={{ flex: 2, backgroundColor: CONSTANTS.COLOR.BLUE_LIGHT }}>
            <Text style={[styles.timestamp, textColor]}>{item.timestamp}</Text>
        </View>

        <View style={{ flex: 4, backgroundColor: CONSTANTS.COLOR.BLUE_MED }}>
            <Text style={[styles.timestamp, textColor]}>{item.amount}</Text>
        </View>
    </View>
  </TouchableOpacity>
);

function MainScreen() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [refreshFlag, setrefreshFlag] = useState(1);
    useEffect(() => { loadblock(); }, []);

    const refreshTable = () => {
        console.log('DATA POINT 2:', tableData[0].ap_count, tableData[0].amount )
        setrefreshFlag(refreshFlag + 1);
    }

    const target1_addr = '0xe2993904204ab04e9579a5bf0a847fc6dca1a830';
    const loadblock = () => {
        getTxsForAccount(target1_addr)
        .then(result => {
            setTableData(result)        // Load partial results
            console.log('DATA POINT 1:', result[12].ap_count, result[12].amount )
            getApprovalsForTxs(result)  // Load more results
            .then(val => {
                console.log('888888888', val)
            })
            .catch(error => {
                console.error('Error 6042:', error)
            });
        })
    }

    const renderItem = ({ item }) => {
        const backgroundColor = item.ap_count === selectedRow ? CONSTANTS.COLOR.RED : CONSTANTS.COLOR.BLUE_DARK;
        const color = item.ap_count === selectedRow ? 'white' : 'black';

        return (
          <Item
            item={ item }
            onPress={() => setSelectedRow(item.ap_count)}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
          />
        );
    }; // end rederItem


    return (
    <View>
        <View>
              <Button title='Load' onPress={() => refreshTable()}/>
        </View>

        <FlatList
          data={tableData}
          renderItem={renderItem}
          keyExtractor={(item) => item.ap_count}
          extraData={[selectedRow, refreshFlag]}
          horizontal={false}
        />
    </View>
    );
}

//TABLE Styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'flex-start'
    },
    item: {
        padding: 4,
        marginVertical: 0,
        marginHorizontal: 16,
    },
    timestamp: {
        fontSize: 16,
    }
});

export default MainScreen
