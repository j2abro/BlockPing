import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CONSTANTS from '../utils/Constants'
import { TextInput, Button } from 'react-native-paper';

const ModalDetailScreen = ({route}) => {
    let row = route.params.table[route.params.index]
    let pretty_row = JSON.stringify(row, null, 2);
    return (
        <View style={{width: '90%', backgroundColor: CONSTANTS.COLOR.BLUE_DARK }}>
        <View style={{flexDirection : 'row'}}>
            <Text style={styles.itembasic}>{route.params.msg}</Text>
        </View>
        <View style={{flexDirection : 'row'}}>
            <Text style={styles.itembasic}>{ pretty_row }</Text>
        </View>
        </View>
    )
}

export default ModalDetailScreen;
