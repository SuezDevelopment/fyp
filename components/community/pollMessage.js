import React, { useEffect, useState } from 'react';

import { Image, Pressable } from 'react-native';
import { Video} from 'expo-av';
import * as Progress from 'react-native-progress';
import Iconn from '../Icon';
import moment from 'moment';
import { AudioFile } from './audio';

import { withAppContext } from '../../hooks/context';


const PollMessage = props => {
    const { sendbird, channel, message, onPress = () => {}, onLongPress = () => {}, onLongPress1 = () => {} } = props;
    const isMyMessage = message.sender.userId === sendbird.currentUser.userId;
    const isOperator = sendbird.currentUser.isOperator;
    const inProgress = message.sender.inProgress;
    // const [readReceipt, setReadReceipt] = useState(0);

    useEffect(() => {
        sendbird.addChannelHandler(`message-${message.reqId}`, channelHandler);
        setReadReceipt(channel.getUnreadMemberCount(message));
        return () => {
          sendbird.removeChannelHandler(`message-${message.reqId}`);
        };
    }, []);

    const channelHandler = new sendbird.ChannelHandler();

    return(
        <Pressable
            activeOpacity={0.75}
            onPress={() => onPress(message)}
            onLongPress={() => isOperator ? onLongPress(message) : onLongPress1(message)}
            style={{
                ...style.container,
                flexDirection: isMyMessage ? 'row-reverse' : 'row',
            }}
        >
            <View style={style.profileImageContainer}>
              {!message.hasSameSenderAbove && (
                <Image source={{ uri: message.sender.profileUrl }} style={style.profileImage} />
              )}
            </View>
            <View style={{ ...style.content, alignItems: isMyMessage ? 'flex-end' : 'flex-start' }}>
              {!message.hasSameSenderAbove && <Text style={style.nickname}>Operator {message.sender.nickname}</Text>}
              
            </View>
        </Pressable>
    );
};

export default withAppContext(PollFileMessage);