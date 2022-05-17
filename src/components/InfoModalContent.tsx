/**
    InfoModalContent - Display help/info screen content ('i' button on app bar.)
 */
import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Portal, Modal, Dialog, Provider, Paragraph,
        DataTable, Card, FAB, Divider } from 'react-native-paper';

const InfoModalContent = (props) => {
  return (
    <SafeAreaView>
    <ScrollView>
      <View style={{ width: '100%', height: '100%', backgroundColor: 'white', padding: 10, flexDirection : 'column'}}>
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>BlockPing</Text>
      <Divider style={styles.dividermain}/>
      <Text style={{fontWeight: 'bold'}}>What is BlockPing: </Text>
        <Text>
          BlockPing is a collection of a few security tools that can identify security risks
          for individual Ethereum accounts and smart contracts. This is an early version experimenting
          with the integration of real-time blockchain data feeds. Currently the data is somewhat raw as
          I evaluate opportunities to consolidate the output. Any feedback is appreciated: j2abro@gmail.com.
        </Text>
      <Divider style={styles.divider}/>
      <Text style={{fontWeight: 'bold'}}>Approval Scan: </Text>
        <Text>
          This scans the blockchain for open approvals. This is similar to Etherscan's
          checker (https://etherscan.io/tokenapprovalchecker) but incorporates an option to
          automatically scan your address each day. Open appovals is the authority you approve
          in dApps that enable a third-party to transfer tokens from your account.
          Use the QR scan button ('Address') to scan an
          address. Currently only one address can be scanned concurrently. Approvals are cancelled
          by sendng another approval for and amount of zero. The scan output shows all approvals so you
          can see all the approval transactions. Tapping on the 'Filter' button to elimate those approvals
          that have been canceled - those that remain are the approvals that are currently at risk.
        </Text>
      <Divider style={styles.divider}/>
      <Text style={{fontWeight: 'bold'}}>Daily Approval Monitoring: </Text>
        <Text>
          This performs the Approval Scan daily. Each day, 24 hours from the time that this is switched on.
          This provides a notification for any
        </Text>
      <Divider style={styles.divider}/>
      <Text style={{fontWeight: 'bold'}}>Threat Scan: </Text>
        <Text>
          This searches the real-time Forta (forta.org) threat feed, which is similar to a traditional security
          intrusion detection system (IDS) in that it monitors the blockchain for adverse events. We filter those
          events for any alerts that are relevant to the address you provide. This address can be any individual
          address or a contract address. The top 20 DEX contract addresses are included in the 'Select Address' drop-down
          menu. If you select the first item (QR Scanned Address) it will scan based on the address you scanned on the
          'Scan' tab.
        </Text>
        <Divider style={styles.divider}/>
        <Text style={{fontWeight: 'bold'}}>Privacy: </Text>
          <Text>
            We don't connect to your wallet and have no access to your private key. This only utilizes your public address,
            which we don't log. No information is logged beyond basic usage statistics and app debugging information.
          </Text>
        <Divider style={styles.divider}/>
      <Button mode="contained" style={{margin: 20}} onPress={() => props.handleClose(false)}>Close</Button>
    </View>
    </ScrollView>
  </SafeAreaView>
  );
}

export default InfoModalContent;
