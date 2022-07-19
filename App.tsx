import { StatusBar } from 'expo-status-bar';
import React, {useEffect,useState,useRef} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {NativeBaseProvider} from 'native-base'
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {AuthProvider} from './realm/AuthProvider'
import messaging from '@react-native-firebase/messaging';
import { onRemoteMessage } from './navigation/utils';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from './hooks/context';
import { Handler } from './handler';
// import * as Notifications from 'expo-notifications';
export default function App(): JSX.Element | null {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const handler = new Handler()
  const savedUserKey = 'savedUser';
  const initialState = {
    // app,
    // sendbird,
  };

  useEffect(() => {
    AsyncStorage.getItem(savedUserKey)
      .then(async user => {
        try {
          if (user) {
            const authorizationStatus = await messaging().requestPermission();
            if (
              authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
              authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
            ) {
              if (Platform.OS === 'ios') {
                const token = await messaging().getAPNSToken();
                handler.registerAPNSPushTokenForCurrentUser(token)
                // registerAPNSPushTokenForCurrentUser(token);
              } else {
                const token = await messaging().getToken();
                // registerGCMPushTokenForCurrentUser(token);
              }
            }
          }
        } catch (err) {
          console.error(err);
        }
      })
      .catch(err => console.error(err));
    if (Platform.OS !== 'ios') {
      const unsubscribeHandler = messaging().onMessage(onRemoteMessage);
      return unsubscribeHandler;
    }
  }, []);


  if (Platform.OS !== 'ios') {
    messaging().setBackgroundMessageHandler(onRemoteMessage);
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AuthProvider>
        <SafeAreaProvider>
          <NativeBaseProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </NativeBaseProvider>
        </SafeAreaProvider>
      </AuthProvider>
      
    );
  }
}
