/**
    DisplayAlertDetail - Display the TX record as stored in object, (not raw)
 */
import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Portal, Modal, Dialog, Provider, Paragraph,
        DataTable, Card, FAB } from 'react-native-paper';

const exampleRecord = {
  "__typename": "Alert",
  "addresses": [
    "0x7530fc04d2fd5df343160a8f56c736b84bb9683c",
    "0xe7804c37c13166ff0b37f5ae0bb07a3aebb6e245",
    "0x0000000000000000000000000000000000001010"
  ],
  "name": "High Value Use Detection",
  "protocol": "ethereum",
  "findingType": "SUSPICIOUS",
  "source": {
    "__typename": "AlertSource",
    "transactionHash": "0x477279478f87877b6142ff07a65bdac3655f1c0879b72cf484740017cc603735",
    "block": {
      "__typename": "Block",
      "number": 25978880,
      "timestamp": "2022-03-15T19:23:31Z",
      "chainId": 137
    }
  },
  "severity": "HIGH",
  "metadata": {
    "value": "107469663550000000000"
  }
}

/*
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
*/

const DisplayAlertDetail = (props) => {
  alert = props.row;
  return (
    <View style={{padding: 10 }}>
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Alert Detail</Text>
      <Text style={{fontWeight: 'bold'}}>timestamp: </Text><Text>{alert.timestamp}</Text>
      <Text style={{fontWeight: 'bold'}}>protocol: </Text><Text>{alert.protocol}</Text>
      <Text style={{fontWeight: 'bold'}}>severity: </Text><Text>{alert.severity}</Text>
      <Text style={{fontWeight: 'bold'}}>name: </Text><Text>{alert.name}</Text>
      <Text style={{fontWeight: 'bold'}}>addresses: </Text><Text>{alert.addresses}</Text>
      <Text style={{fontWeight: 'bold'}}>findingType: </Text><Text>{alert.findingType}</Text>
      <Text style={{fontWeight: 'bold'}}>transactionHash: </Text><Text>{alert.transactionHash}</Text>
      <Text style={{fontWeight: 'bold'}}>__typename: </Text><Text>{alert.__typename}</Text>
      <Text style={{fontWeight: 'bold'}}>number: </Text><Text>{alert.number}</Text>
      <Text style={{fontWeight: 'bold'}}>chainId: </Text><Text>{alert.chainId}</Text>
      <Text style={{fontWeight: 'bold'}}>value: </Text><Text>{alert.value}</Text>
    </View>
  );
}
export default DisplayAlertDetail;
