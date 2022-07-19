import * as React from 'react';
import { Pressable } from 'react-native';
import { Audio } from 'expo-av';
import Iconn from '../Icon';

const AudioRecord = () =>{
    const [recording, setRecording] = React.useState('');
    const [recordUrL, setRecordUrl] = React.useState('');

    async function startRecording() {
        try {
          console.log('Requesting permissions..');
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          }); 
          console.log('Starting recording..');
          const record = new Audio.Recording();
          await record.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
          await record.startAsync(); 
          setRecording(record);
          console.log('Recording started');
        } catch (err) {
          console.error('Failed to start recording', err);
        }
    };

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI(); 
        setRecordUrl(uri);
        console.log('Recording stopped and stored at', uri);
    }

    return(
       <Iconn recording onPress={() => recording ? startRecording() : stopRecording()} />
    )
}