/**
    utils.js - General utility functions
 */
import React from 'react'
import CONSTANTS from '../utils/Constants'
import { TextInput, Button, Text, Portal, Modal, Dialog, Provider, Paragraph } from 'react-native-paper';
import { View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';


export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function pretty_print(json_data) {
  let pretty_text = JSON.stringify(json_data, null, 2);
  console.log(pretty_text);
}

export function trimString(str, len) {
  var trimmed = str.substring(0, len);
  return(trimmed)
}

export function getUtcDateTime() {
  var date = new Date(tx.timeStamp * 1000);
  let [utcdate, utctime] = date.toISOString().split('T')
  let [y, m, d] = utcdate.split('-');
  y = y.substring(2, 4)
  utcdate = y + '/' + m + '/' + d
  utctime = utctime.split('.')[0]
  let utcdatetime = utcdate + ' ' + utctime;
  return(utcdatetime)
}



export const AlertDialogBox = ({ visible, onChangeVisible, title, message }) => {
  return (

    <Provider>
      <Portal>
        <Dialog visible={visible} >
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content><Paragraph>{message}</Paragraph></Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => onChangeVisible(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>        
      </Portal>
    </Provider>
  );
};



export const myTestTableData =
// const [items] = useState(
    [
      {
        "owner_addr": "0xe2993904204ab04e9579a5bf0a847fc6dca1a830",
        "contract_name": "WETH9",
        "ap_count": 1,
        "tx_hash": "0x4c6e31004ae93a52f0b884da896e56f8a6261986a27094693688d18a18745c3f",
        "contract_addr": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "input": "0x095ea7b3000000000000000000000000e5c783ee536cf5e63e792988335c4255169be4e1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "timestamp": "1635253295",
        "utcdatetime": "21/10/26 13:01:35",
        "func": "approve",
        "delegate_to": "0xe5c783ee536cf5e63e792988335c4255169be4e1",
        "amount": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        "amount_display": "unltd"
      },
      {
        "owner_addr": "0xe2993904204ab04e9579a5bf0a847fc6dca1a830",
        "contract_name": "LooksRareToken",
        "ap_count": 2,
        "tx_hash": "0xd1e2c4cb93607c64fcacebe5fafebb9510d98f3a9fa971768acba77c4a9ef66d",
        "contract_addr": "0xf4d2888d29d722226fafa5d9b24f9164c092421e",
        "input": "0x095ea7b3000000000000000000000000bcd7254a1d759efa08ec7c3291b2e85c5dcc12ceffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "timestamp": "1641917938",
        "utcdatetime": "22/01/11 16:18:58",
        "func": "approve",
        "delegate_to": "0xbcd7254a1d759efa08ec7c3291b2e85c5dcc12ce",
        "amount": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        "amount_display": "unltd"
      },
      {
        "owner_addr": "0xe2993904204ab04e9579a5bf0a847fc6dca1a830",
        "contract_name": "OpenDAO",
        "ap_count": 3,
        "tx_hash": "0x4e6ee8dd787e51c5bf1b366ca19ceb961ccb5fad4349000e15e1ca2e310be9dc",
        "contract_addr": "0x3b484b82567a09e2588a13d54d032153f0c0aee0",
        "input": "0x095ea7b3000000000000000000000000edd27c961ce6f79afc16fd287d934ee31a90d7d1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "timestamp": "1642177937",
        "utcdatetime": "22/01/14 16:32:17",
        "func": "approve",
        "delegate_to": "0xedd27c961ce6f79afc16fd287d934ee31a90d7d1",
        "amount": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        "amount_display": "unltd"
      },
      {
        "owner_addr": "0xe2993904204ab04e9579a5bf0a847fc6dca1a830",
        "contract_name": "WETH9",
        "ap_count": 4,
        "tx_hash": "0x4a7a91cc7b829bd961266aef9ed940283bcfac9a9087b7996088213050509326",
        "contract_addr": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "input": "0x095ea7b300000000000000000000000059728544b08ab483533076417fbbb2fd0b17ce3affffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "timestamp": "1642674180",
        "utcdatetime": "22/01/20 10:23:00",
        "func": "approve",
        "delegate_to": "0x59728544b08ab483533076417fbbb2fd0b17ce3a",
        "amount": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        "amount_display": "unltd"
      },
      {
        "owner_addr": "0xe2993904204ab04e9579a5bf0a847fc6dca1a830",
        "contract_name": "WETH9",
        "ap_count": 5,
        "tx_hash": "0xd725af6fca76a167141253c8dfb1fb8015ba10eab21749f7d1359d30115d2fdb",
        "contract_addr": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "input": "0x095ea7b3000000000000000000000000d9e1ce17f2641f24ae83637ab66a2cca9c378b9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "timestamp": "1643615827",
        "utcdatetime": "22/01/31 07:57:07",
        "func": "approve",
        "delegate_to": "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f",
        "amount": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        "amount_display": "unltd"
      },
      {
        "owner_addr": "0xe2993904204ab04e9579a5bf0a847fc6dca1a830",
        "contract_name": "Tokenfy",
        "ap_count": 6,
        "tx_hash": "0x2d47c35b7c922767feb155649cd34e5208430db751257d3dbfcc31bd24bad225",
        "contract_addr": "0xa6dd98031551c23bb4a2fbe2c4d524e8f737c6f7",
        "input": "0x095ea7b3000000000000000000000000d9e1ce17f2641f24ae83637ab66a2cca9c378b9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "timestamp": "1643615897",
        "utcdatetime": "22/01/31 07:58:17",
        "func": "approve",
        "delegate_to": "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f",
        "amount": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        "amount_display": "unltd"
      },
      {
        "owner_addr": "0xe2993904204ab04e9579a5bf0a847fc6dca1a830",
        "contract_name": "UniswapV2Pair",
        "ap_count": 7,
        "tx_hash": "0x721f8e51b812f79aec544d23758e32a7117ba29d4be70e24a15b39571ff2b819",
        "contract_addr": "0x0bd2b9116f1e2f88e4fd4cc0fce3e15178de8df5",
        "input": "0x095ea7b3000000000000000000000000c92b80ffd48a944be210961d0dad45d8efcc992c0000000000000000000000000000000000000000000000000e8a02bfecff4663",
        "timestamp": "1643616272",
        "utcdatetime": "22/01/31 08:04:32",
        "func": "approve",
        "delegate_to": "0xc92b80ffd48a944be210961d0dad45d8efcc992c",
        "amount": "1047652886655223395",
        "amount_display": "large"
      },
      {
        "owner_addr": "0xe2993904204ab04e9579a5bf0a847fc6dca1a830",
        "contract_name": "WETH9",
        "ap_count": 8,
        "tx_hash": "0xf5afe9755b56975a7f263de26896dd8c88b408082c4ea28625a7e2332f6d2a10",
        "contract_addr": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "input": "0x095ea7b300000000000000000000000059728544b08ab483533076417fbbb2fd0b17ce3affffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "timestamp": "1643912434",
        "utcdatetime": "22/02/03 18:20:34",
        "func": "approve",
        "delegate_to": "0x59728544b08ab483533076417fbbb2fd0b17ce3a",
        "amount": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        "amount_display": "unltd"
      },
      {
        "owner_addr": "0xe2993904204ab04e9579a5bf0a847fc6dca1a830",
        "contract_name": "LooksRareToken",
        "ap_count": 9,
        "tx_hash": "0x514a9398bb28867ac731b913759687dd31501f1d8684113f181a46ed4f4e4fe6",
        "contract_addr": "0xf4d2888d29d722226fafa5d9b24f9164c092421e",
        "input": "0x095ea7b3000000000000000000000000881d40237659c251811cec9c364ef91dc08d300cffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "timestamp": "1644828891",
        "utcdatetime": "22/02/14 08:54:51",
        "func": "approve",
        "delegate_to": "0x881d40237659c251811cec9c364ef91dc08d300c",
        "amount": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        "amount_display": "unltd"
      },
      {
        "owner_addr": "0xe2993904204ab04e9579a5bf0a847fc6dca1a830",
        "contract_name": "X2Y2Token",
        "ap_count": 10,
        "tx_hash": "0x51987e7687522612cfecedd28da4a4f8533c1577d9d5ce1dc28b7db4eae51b43",
        "contract_addr": "0x1e4ede388cbc9f4b5c79681b7f94d36a11abebc9",
        "input": "0x095ea7b3000000000000000000000000c8c3cc5be962b6d281e4a53dbcce1359f76a1b8500000000000000000000000000000000000000000052b7d2dcc80cd2e4000000",
        "timestamp": "1645185994",
        "utcdatetime": "22/02/18 12:06:34",
        "func": "approve",
        "delegate_to": "0xc8c3cc5be962b6d281e4a53dbcce1359f76a1b85",
        "amount": "100000000000000000000000000",
        "amount_display": "large"
      },
      {
        "owner_addr": "0xe2993904204ab04e9579a5bf0a847fc6dca1a830",
        "contract_name": "WETH9",
        "ap_count": 11,
        "tx_hash": "0x774eed8940e43547da46b24d0edd1a78295597f231968e6cee99d164acec3679",
        "contract_addr": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "input": "0x095ea7b300000000000000000000000074312363e45dcaba76c59ec49a7aa8a65a67eed300000000000000000000000000000000000000000052b7d2dcc80cd2e4000000",
        "timestamp": "1645190434",
        "utcdatetime": "22/02/18 13:20:34",
        "func": "approve",
        "delegate_to": "0x74312363e45dcaba76c59ec49a7aa8a65a67eed3",
        "amount": "100000000000000000000000000",
        "amount_display": "large"
      },
      {
        "owner_addr": "0xe2993904204ab04e9579a5bf0a847fc6dca1a830",
        "contract_name": "WETH9",
        "ap_count": 12,
        "tx_hash": "0xab3d69c426fe15cdb7311677c3e7892c91f6eb3e0684977133f44be1c5ced924",
        "contract_addr": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "input": "0x095ea7b3000000000000000000000000e5c783ee536cf5e63e792988335c4255169be4e10000000000000000000000000000000000000000000000000000000000000000",
        "timestamp": "1645353112",
        "utcdatetime": "22/02/20 10:31:52",
        "func": "approve",
        "delegate_to": "0xe5c783ee536cf5e63e792988335c4255169be4e1",
        "amount": "0",
        "amount_display": "0"
      },
      {
        "owner_addr": "0xe2993904204ab04e9579a5bf0a847fc6dca1a830",
        "contract_name": "WETH9",
        "ap_count": 13,
        "tx_hash": "0x43bf3643b58a714f74be00921740e118d7665a68b2f7fe1694fa96b4b2b31711",
        "contract_addr": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "input": "0x095ea7b300000000000000000000000059728544b08ab483533076417fbbb2fd0b17ce3a0000000000000000000000000000000000000000000000000000000000000000",
        "timestamp": "1645353123",
        "utcdatetime": "22/02/20 10:32:03",
        "func": "approve",
        "delegate_to": "0x59728544b08ab483533076417fbbb2fd0b17ce3a",
        "amount": "0",
        "amount_display": "0"
      },
      {
        "owner_addr": "0xe2993904204ab04e9579a5bf0a847fc6dca1a830",
        "contract_name": "WETH9",
        "ap_count": 14,
        "tx_hash": "0x83b99891af3fa96108c91adb4788392785459a422c1b96baecc9522a0a93de1f",
        "contract_addr": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "input": "0x095ea7b300000000000000000000000074312363e45dcaba76c59ec49a7aa8a65a67eed30000000000000000000000000000000000000000000000000000000000000000",
        "timestamp": "1645353173",
        "utcdatetime": "22/02/20 10:32:53",
        "func": "approve",
        "delegate_to": "0x74312363e45dcaba76c59ec49a7aa8a65a67eed3",
        "amount": "0",
        "amount_display": "0"
      }
];
