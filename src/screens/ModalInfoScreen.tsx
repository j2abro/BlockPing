/**
    DisplayTXDetail - Display the TX record as stored in object, (not raw)
 */
import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Portal, Modal, Dialog, Provider, Paragraph,
        DataTable, Card, FAB } from 'react-native-paper';

const exampleRecord = {
  "tx_hash": "0xab3d69c426fe15cdb7311677c3e7892c91f6eb3e0684977133f44be1c5ced924",
  "timestamp": "1645353112",
  "utcdatetime": "22/02/20 10:31:52",
  "owner_addr": "0xe2993904204ab04e9579a5bf0a847fc6dca1a830",
  "func": "approve",
  "contract_addr":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  "contract_name": "WETH9",
  "delegate_to": "0xe5c783ee536cf5e63e792988335c4255169be4e1",
  "amount": "0",
  "amount_display": "0",
  "input": "0x095ea7b3000000000000000000000000e5c783ee536cf5e63e792988335c4255169be4e10000000000000000000000000000000000000000000000000000000000000000",
  "ap_count": 12
}

const DisplayTXDetail = (props) => {
  tx = props.row;
  return (
    <View style={{padding: 10  }}>
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Transaction Detail</Text>
      <Text style={{fontWeight: 'bold'}}>tx_hash: </Text><Text>{tx.tx_hash}</Text>
      <Text style={{fontWeight: 'bold'}}>timestamp: </Text><Text>{tx.timestamp}</Text>
      <Text style={{fontWeight: 'bold'}}>utcdatetime: </Text><Text>{tx.utcdatetime}</Text>
      <Text style={{fontWeight: 'bold'}}>owner_addr: </Text><Text>{tx.owner_addr}</Text>
      <Text style={{fontWeight: 'bold'}}>func: </Text><Text>{tx.func}</Text>
      <Text style={{fontWeight: 'bold'}}>contract_addr: </Text><Text>{tx.contract_addr}</Text>
      <Text style={{fontWeight: 'bold'}}>contract_name: </Text><Text>{tx.contract_name}</Text>
      <Text style={{fontWeight: 'bold'}}>delegate_to: </Text><Text>{tx.delegate_to}</Text>
      <Text style={{fontWeight: 'bold'}}>amount: </Text><Text>{tx.amount}</Text>
      <Text style={{fontWeight: 'bold'}}>amount_display: </Text><Text>{tx.amount_display}</Text>
      <Text style={{fontWeight: 'bold'}}>input: </Text><Text>{tx.input}</Text>
      <Text style={{fontWeight: 'bold'}}>ap_count: </Text><Text>{tx.ap_count}</Text>
    </View>
  );
}
export default DisplayTXDetail;
