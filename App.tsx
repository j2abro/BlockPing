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
import React, { useState, useEffect } from 'react';
import { AppRegistry, View, SafeAreaView, StyleSheet, Modal as RNModal } from 'react-native';
import { NavigationContainer,
        DarkTheme as NavigationDarkTheme,
        DefaultTheme as NavigationDefaultTheme, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import InfoModalContent from './src/components/InfoModalContent';
// import { TextInput, Button, Text, Portal, Modal, Dialog,
//         DataTable, Card, FAB } from 'react-native-paper';
import {
  TextInput, Button, Text, Portal, Modal, Dialog,
  DataTable, Card, FAB, Divider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  BottomNavigation, Appbar,
} from 'react-native-paper';
import './shim';
import CONSTANTS from './src/utils/Constants';
import pretty_print from './src/utils/Utils';
import MainScreen from './src/screens/MainScreen';
import ModalDetailScreen from './src/screens/ModalDetailScreen';
import MonitorScreen from './src/screens/MonitorScreen';
import FortaScreen from './src/screens/FortaScreen';
import { name as appName } from './app.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import merge from 'deepmerge';
import color from 'color';
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { startBackgroundTask, stopBackgroundTask } from './src/utils/BackgroundTimer';
import { BP_THEME } from './src/styles/Styles';

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


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
    <View>
     <Appbar style={{justifyContent: 'flex-end' }}>
       <Appbar.Action icon="information-outline"
       onPress={() => { setModalVisible(true) }} />
      </Appbar>
      <Divider style={styles.dividermain} />
    </View>
  );

  const MainScreenRoute = () => {
    return (
      <SafeAreaView style={{flex: 1}}>
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

  const MonitorScreenRoute = () => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TopBar/>
        <Divider style={styles.divider} />
        <MonitorScreen />
      </SafeAreaView>
      )
  }

  const FortaScreenRoute = () => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TopBar/>
        <FortaScreen />
      </SafeAreaView>
      )
  }


  const BottomTabBar = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'mainScreen',     title: 'Scan',     icon: 'radar' },
      { key: 'monitorScreen', title: 'Monitor',  icon: 'repeat' },
      { key: 'FortaScreen',    title: 'Threats',    icon: 'flash-alert-outline' },
    ]);
    const renderScene = BottomNavigation.SceneMap({
        mainScreen: MainScreenRoute,
        monitorScreen: MonitorScreenRoute,
        FortaScreen: FortaScreenRoute});


    return (
     <BottomNavigation
       navigationState={{ index, routes }}
       onIndexChange={setIndex}
       renderScene={renderScene}
     />
    );
  }; // end BottomTabBar()


  return (
    <PaperProvider theme={BP_THEME}>
      <NavigationContainer theme={BP_THEME}>
        <SafeAreaView style={{flex: 1}}>
        <BottomTabBar/>
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>

  );
} // end App()
