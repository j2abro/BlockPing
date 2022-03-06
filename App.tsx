/**
    BlockPing App - Main Navigation
 */

// TODO: HACK/eventually remove this if this message goes away.
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

import * as React from 'react';
import { AppRegistry, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer,
        DarkTheme as NavigationDarkTheme,
        DefaultTheme as NavigationDefaultTheme, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
// import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
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
// Icon.loadFont(); // maybe don't need this

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


const BaBar = () => (
   <Appbar style={styles.bottom}>
     <Appbar.Action icon="archive" onPress={() => console.log('Pressed archive')} />
      <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
    </Appbar>
);

///////////////// BOTTOM NAV <start>
const MainScreenRoute = () => {
  return (
      <SafeAreaView>
        <BaBar/>
        <MainScreen />
      </SafeAreaView>
    )
  }
const SettingsScreenRoute = () => {
  return (
    <SafeAreaView>
      <BaBar/>
      <SettingsScreen />
    </SafeAreaView>
    )
}

const BottomTabBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'mainScreen', title: 'Main', icon: 'camera' },
    { key: 'SettingsScreen', title: 'Settings', icon: 'album' },
  ]);
  const renderScene = BottomNavigation.SceneMap({mainScreen: MainScreenRoute, SettingsScreen: SettingsScreenRoute,});
  return (
   <BottomNavigation
     navigationState={{ index, routes }}
     onIndexChange={setIndex}
     renderScene={renderScene}
   />
 );
};
///////////////// BOTTOM NAV <end>



export default function App() {
  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <NavigationContainer theme={CombinedDefaultTheme}>
        <BottomTabBar/>
      </NavigationContainer>
    </PaperProvider>
  );
}

// AppRegistry.registerComponent(appName, () => Main); // recommended by rnpaper





// const MainScreenNavigator = () => {
//     return(
//         <Stack.Navigator>
//             <Stack.Screen options={{headerShown: false}} name="Main234" component={MainScreen} />
//             <Stack.Screen name="ModalDetailScreen" component={ModalDetailScreen} />
//         </Stack.Navigator>
//     )
// }
// < BottomTabBar /> replaced all THIS
// <Tab.Navigator>
//     <Tab.Screen icon='rocket' name="MainTabz" component={MainScreenNavigator} />
//     <Tab.Screen name="Settings" component={SettingsScreen} />
// </Tab.Navigator>
