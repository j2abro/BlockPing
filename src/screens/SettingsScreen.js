
'use strict';
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Linking, View, ScrollView } from 'react-native';
import { TextInput, Button, Text, Portal, Modal, Dialog, Provider, Paragraph, DataTable, Card } from 'react-native-paper';
import { trimString, AlertDialogBox, pretty_print, myTestTableData } from '../utils/Utils';
import CONSTANTS from '../utils/Constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Styles';

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings</Text>
    </View>
  );
}
export default SettingsScreen;
