/**
    BlockPing App - Main Navigation
 */

// TODO: HACK/eventually remove this if this message goes away.
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  "EventEmitter.removeListener('change', ...): Method has been deprecated.",
  "Module RNBackgroundFetch requires main queue setup since it overrides `init` but doesn't implement"
]);
import { TextInput, Button, Text, Portal, Modal, Dialog, Provider, Paragraph,
        DataTable, Card, FAB } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { AppRegistry, View, SafeAreaView, StyleSheet, Modal as RNModal } from 'react-native';
import { NavigationContainer,
        DarkTheme as NavigationDarkTheme,
        DefaultTheme as NavigationDefaultTheme, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
// import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import InfoModalContent from './src/components/InfoModalContent';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  BottomNavigation, Appbar,
} from 'react-native-paper';

import './shim'
import CONSTANTS from './src/utils/Constants'
import MainScreen from './src/screens/MainScreen'
import ModalDetailScreen from './src/screens/ModalDetailScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import { name as appName } from './app.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import merge from 'deepmerge';
import color from 'color';
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { startBackgroundTask, stopBackgroundTask } from './src/utils/BackgroundTimer';

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// const theme = {
//     ...DefaultTheme,
//     dark: false,
//     roundness: 4,
//     colors: {
//         primary:        '#6200ee', // purple CONSTANTS.COLOR.BLUE_DARK, //
//         accent:         '#03dac4', // mint green CONSTANTS.COLOR.BLUE_LIGHT,
//         background:     '#f6f6f6',// light gray CONSTANTS.COLOR.SAND, //
//         surface:        '#ffffff', // white
//         error:          '#B00020', // red CONSTANTS.COLOR.RED, //
//         text:           '#a9a9a9', //'#000000', //black
//         onSurface:      '#000000',
//         disabled:       color('#000000').alpha(0.26).rgb().string(),
//         placeholder:    '#ffffff', //color('#000000').alpha(0.54).rgb().string(),
//         backdrop:       color('#000000').alpha(0.5).rgb().string(),
//         notification:   '#F50057', //pinkA400,
//     },
//   // fonts: configureFonts(),
//   // animation: {
//   //   scale: 1.0,
//   // },
//   };

export default function App() {
const [modalVisible, setModalVisible] = useState(false);
useEffect(() => { onAppLoad(); }, []);

  // On load check AsyncStorage and set swich
  // This runs once: only after app full close (i.e. upswipe, not open from bg)
  const onAppLoad = async () => {
    try {
      const switchState = await AsyncStorage.getItem(CONSTANTS.MONITOR_SHOULD_RUN_KEY);
      if(switchState == CONSTANTS.TRUE) {
        stopBackgroundTask(); // Stop first to ensure we don't have multiple tasks running
        startBackgroundTask(); // Runs on page load. If settings show switch is on, restart.
      }
      else {
        stopBackgroundTask(); // Maybe redundant
      }
    } catch(e) {
      console.log('Error getting data: ', e)
    }
  }

  const TopBar = () => (
     <Appbar style={{justifyContent: 'flex-end' }}>
       <Appbar.Action icon="information-outline"
       onPress={() => { setModalVisible(true) }} />
      </Appbar>
  );

  const MainScreenRoute = () => {
    return (
      <SafeAreaView>
        <TopBar/>
        <RNModal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {setModalVisible(!modalVisible);}}>
            <InfoModalContent handleClose={setModalVisible}/>
        </RNModal>
        <MainScreen />
      </SafeAreaView>
    )
  } // end MainScreenRoute()

  const SettingsScreenRoute = () => {
    return (
      <SafeAreaView>
        <TopBar/>
        <SettingsScreen />
      </SafeAreaView>
      )
  }

  const BottomTabBar = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'mainScreen', title: 'Scan', icon: 'radar' },
      { key: 'SettingsScreen', title: 'Monitor', icon: 'repeat' },
    ]);
    const renderScene = BottomNavigation.SceneMap({mainScreen: MainScreenRoute, SettingsScreen: SettingsScreenRoute});

    return (
     <BottomNavigation
       navigationState={{ index, routes }}
       onIndexChange={setIndex}
       renderScene={renderScene}
     />
    );
  }; // end BottomTabBar()

  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <NavigationContainer theme={CombinedDefaultTheme}>
        <BottomTabBar/>
      </NavigationContainer>
    </PaperProvider>

  );
} // end App()
