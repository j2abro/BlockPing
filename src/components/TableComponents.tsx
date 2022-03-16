import React from 'react';
import CONSTANTS from '../utils/Constants';
import { trimString } from '../utils/Utils';
import styles from '../styles/Styles';
import { View, FlatList, SafeAreaView, StatusBar,
        StyleSheet, TouchableOpacity, Image, ImageBackground, Modal as RNModal } from 'react-native';
import { TextInput, Button, Text, Portal, Modal } from 'react-native-paper';

export const ItemHeader = ({ item, onPress, backgroundColor, textColor }) => (
    <View onPress={onPress} style={[styles.item, backgroundColor]}>
        <View style={{flexDirection : 'row'}}>
            <View style={{width: '5%', backgroundColor: CONSTANTS.COLOR.BLUE_DARK }}>
                <Text style={[styles.itembasic, textColor]}> </Text>
            </View>
            <View style={{width: '15%', backgroundColor: CONSTANTS.COLOR.BLUE_DARK }}>
                <Text style={[styles.itembasic, textColor]}>TX</Text>
            </View>
            <View style={{width: '15%', backgroundColor: CONSTANTS.COLOR.BLUE_DARK }}>
                <Text style={[styles.itembasic, textColor]}>Contract</Text>
            </View>
            <View style={{width: '35%', backgroundColor: CONSTANTS.COLOR.BLUE_DARK }}>
                <Text style={[styles.itembasic, textColor]}>Token</Text>
            </View>
            <View style={{width: '15%', backgroundColor: CONSTANTS.COLOR.BLUE_DARK }}>
                <Text style={[styles.itembasic, textColor]}>Spender</Text>
            </View>
            <View style={{width: '15%', backgroundColor: CONSTANTS.COLOR.BLUE_DARK }}>
                <Text style={[styles.itembasic, textColor]}>Amount</Text>
            </View>
        </View>
    </View>
);

export const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <View style={{flexDirection : 'row'}}>
        <View style={{width: '5%', backgroundColor: CONSTANTS.COLOR.BLUE_DARK }}>
            <Text style={[styles.itembasic, textColor]}>{item.ap_count}</Text>
        </View>
        <View style={{width: '15%', backgroundColor: CONSTANTS.COLOR.BLUE_DARK }}>
            <Text style={[styles.itembasic, textColor]}>{ trimString(item.tx_hash, 6) }</Text>
        </View>
        <View style={{width: '15%', backgroundColor: CONSTANTS.COLOR.BLUE_DARK }}>
            <Text style={[styles.itembasic, textColor]}>{ trimString(item.contract_addr, 6) }</Text>
        </View>
        <View style={{width: '35%', backgroundColor: CONSTANTS.COLOR.BLUE_DARK }}>
            <Text style={[styles.itembasic, textColor]}>{item.contract_name}</Text>
        </View>
        <View style={{width: '15%', backgroundColor: CONSTANTS.COLOR.BLUE_DARK }}>
            <Text style={[styles.itembasic, textColor]}>{ trimString(item.delegate_to, 6) }</Text>
        </View>
        <View style={{width: '15%', backgroundColor: CONSTANTS.COLOR.BLUE_DARK }}>
            <Text style={[styles.itembasic, textColor]}>{item.amount_display}</Text>
        </View>
    </View>
  </TouchableOpacity>
);
