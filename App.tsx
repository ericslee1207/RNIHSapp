import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper'


import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import {firebaseConfig} from './config'
import firebase from "firebase"
// firebase.initializeApp(firebaseConfig
// Initialize Firebase
import { registerRootComponent } from 'expo';

registerRootComponent(App);


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (

      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>

    )
    
  }
}
