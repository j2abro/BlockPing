/**
    InfoModalContent - Display help/info screen content ('i' button on app bar.)
 */
import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Portal, Modal, Dialog, Provider, Paragraph,
        DataTable, Card, FAB } from 'react-native-paper';

const InfoModalContent = (props) => {
  return (
    <SafeAreaView>
    <ScrollView>
      <View style={{ width: '100%', height: '100%', backgroundColor: 'white', padding: 10, flexDirection : 'column'}}>
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>BlockPing Info</Text>

      <Text style={{fontWeight: 'bold'}}>Item 1: </Text><Text>Discussion...</Text>
      <Text style={{fontWeight: 'bold'}}>Item 1: </Text><Text>Discussion...</Text>

      <Button mode="contained" style={{margin: 20}} onPress={() => props.handleClose(false)}>Close</Button>
    </View>
    </ScrollView>
  </SafeAreaView>
  );
}

export default InfoModalContent;
