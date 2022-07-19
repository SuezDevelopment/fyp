import React, { useState, useEffect,useCallback } from 'react';
import { Text, StyleSheet, Button, View } from 'react-native';
// import getServer
import { TestServers } from './testServers';
import { RTCPeerConnection, RTCView, mediaDevices,MediaStream,
    MediaStreamTrack,registerGlobals, RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';
// import { db } from '../utilities/firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { servers } from './stunServer';

import {useFocusEffect} from '@react-navigation/native';



export default function ({navigation, ...props}) {
    let name;
    let connectedUser;
    let localPC;
    const { route, navigation, handler } = props;
    const { currentUser, channel } = route.params;
    const [userId, setUserId] = useState(null);
    const [socketActive, setSocketActive] = useState(false);
    const [calling, setCalling] = useState(false);
    // Video Scrs

    const [localStream, setLocalStream] = useState({toURL: () => null});
    const [remoteStream, setRemoteStream] = useState({toURL: () => null});
    const [cachedLocalPC, setCachedLocalPC] = useState();
    const [conn, setConn] = useState(new WebSocket("VideoChat"));
    const [readyServer, setReadyServers] = useState(null);
    const [configuration, setConfiguration] = useState(null);
    const [myPeerConnection, setMyPeerConnection] = useState(localPC);
    const [offer, setOffer] = useState(null);
    const [isMuted, setIsMuted] = useState(false);

    const [callToUsername, setCallToUsername] = useState(null);

    useFocusEffect(
        useCallback(() => {
          AsyncStorage.getItem('userId').then(id => {
            if (id === currentUser.id) {
              setUserId(currentUser.id);
            } else {
              setUserId('');
              navigation.push('Auth');
            }
          });
        }, [userId]),
    );
    
    if(!configuration == null){
        localPC = new RTCPeerConnection(configuration);
    } else{
        TestServers(servers).then((rs)=>{
            setReadyServers(rs);
            const config = {
                iceServers: [
                  {
                    urls: readyServer,
                  },
                ],
                iceCandidatePoolSize: 10,
            };
            setConfiguration(config)
        });
    }
    useEffect(() => {
        if (socketActive && userId.length > 0) {
          try {
            InCallManager.start({media: 'audio'});
            InCallManager.setForceSpeakerphoneOn(true);
            InCallManager.setSpeakerphoneOn(true);
          } catch (err) {
            console.log('InApp Caller ---------------------->', err);
          }
          console.log(InCallManager);
          send({
            type: 'connected',
            user: userId,
          });
        }
    }, [socketActive, userId]);

    const send = message => {
      if (connectedUser) {
        message.name = connectedUser;
        console.log('Connected iser in end----------', message);
      }
      conn.send(JSON.stringify(message));
    };

    useEffect(() => {
      conn.onopen = () => {
        console.log('Connected to the signaling server');
        setSocketActive(true);
      };
      
      conn.onmessage = msg =>{
          let data;
          if (msg.data === "") {
              data = {};
          } else {
              data = JSON.parse(msg.data);
              switch (data.type){
                case "connected":

                  break;
              case "connected":
                break;

              case "newMember":
                break;
            }
          }
        }
        conn.onerror = function(err) {
          console.log('Got error', err);
        };
    })

    function onBackPress() {
        if (cachedLocalPC) {
          cachedLocalPC.removeStream(localStream);
          cachedLocalPC.close();
        }
        setLocalStream();
        setRemoteStream();
        setCachedLocalPC();
        // cleanup
        setScreen(screens.ROOM);
    }

    

    const startLocalStream = async () => {
        // isFront will determine if the initial camera should face user or environment
        const isFront = true;
        const devices = await mediaDevices.enumerateDevices();
    
        const facing = isFront ? 'front' : 'environment';
        const videoSourceId = devices.find(device => device.kind === 'videoinput' && device.facing === facing);
        const facingMode = isFront ? 'user' : 'environment';
        const constraints = {
          audio: true,
          video: {
            mandatory: {
              minWidth: 500, // Provide your own width, height and frame rate here
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode,
            optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
          },
        };
        const newStream = await mediaDevices.getUserMedia(constraints);
        setLocalStream(newStream);
    };
    const switchCamera = () => {
        localStream.getVideoTracks().forEach(track => track._switchCamera());
    };

    const toggleMute = () => {
        if (!remoteStream) {
          return;
        }
        localStream.getAudioTracks().forEach(track => {
          // console.log(track.enabled ? 'muting' : 'unmuting', ' local track', track);
          track.enabled = !track.enabled;
          setIsMuted(!track.enabled);
        });
    };

    // joinCall(channel.id);

    const joinCall = async channel => {
        const id = channel.id
        const roomRef = fetch(`/channel/${id}`).then();
        const roomSnapshot = await roomRef.get();
        if (!roomSnapshot.isApproved) return;

        localPC.addStream(localStream);
    
        const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
        localPC.onicecandidate = e => {
          if (!e.candidate) {
            console.log('Got final candidate!');
            return;
          }
          calleeCandidatesCollection.add(e.candidate.toJSON());
        };
    
        localPC.onaddstream = e => {
          if (e.stream && remoteStream !== e.stream) {
            console.log('RemotePC received the stream join', e.stream);
            setRemoteStream(e.stream);
          }
        };
    
        const offer = roomSnapshot.data().offer;
        await localPC.setRemoteDescription(new RTCSessionDescription(offer));
    
        const answer = await localPC.createAnswer();
        await localPC.setLocalDescription(answer);
    
        const roomWithAnswer = { answer };
        await roomRef.update(roomWithAnswer);
    
        roomRef.collection('callerCandidates').onSnapshot(snapshot => {
          snapshot.docChanges().forEach(async change => {
            if (change.type === 'added') {
              let data = change.doc.data();
              await localPC.addIceCandidate(new RTCIceCandidate(data));
            }
          });
        });
    
        setCachedLocalPC(localPC);
    };

    const startCall = async id => {
        const localPC = new RTCPeerConnection(configuration);
        localPC.addStream(localStream);
    
        const roomRef = await db.collection('rooms').doc(id);
        const callerCandidatesCollection = roomRef.collection('callerCandidates');
        localPC.onicecandidate = e => {
          if (!e.candidate) {
            console.log('Got final candidate!');
            return;
          }
          callerCandidatesCollection.add(e.candidate.toJSON());
        };
    
        localPC.onaddstream = e => {
          if (e.stream && remoteStream !== e.stream) {
            console.log('RemotePC received the stream call', e.stream);
            setRemoteStream(e.stream);
          }
        };
    
        const offer = await localPC.createOffer();
        await localPC.setLocalDescription(offer);
    
        const roomWithOffer = { offer };
        await roomRef.set(roomWithOffer);
    
        roomRef.onSnapshot(async snapshot => {
          const data = snapshot.data();
          if (!localPC.currentRemoteDescription && data.answer) {
            const rtcSessionDescription = new RTCSessionDescription(data.answer);
            await localPC.setRemoteDescription(rtcSessionDescription);
          }
        });
    
        roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
          snapshot.docChanges().forEach(async change => {
            if (change.type === 'added') {
              let data = change.doc.data();
              await localPC.addIceCandidate(new RTCIceCandidate(data));
            }
          });
        });
    
        setCachedLocalPC(localPC);
    };
    

    
}