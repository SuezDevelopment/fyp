import React, { useEffect, useState} from 'react';
import { Text, View } from '../Themed';

import { withAppContext } from '../../hooks/context';
import { Pressable } from 'react-native';

const AdminMessage = props => {
  const { handler, channel, message, onPress = () => {}, onLongPress = () => {} } = props;
  const isMyMessage = message.sender.userId === handler.currentUser.userId;
  const [readReceipt, setReadReceipt] = useState(channel.members.length - 1);
  const [reply, setReply] = useState(false);

  useEffect(() => {
    const channelHandler = new handler.ChannelHandler();
    channelHandler.onReadReceiptUpdated = targetChannel => {
      if (targetChannel.url === channel.url) {
        setReadReceipt(channel.getUnreadMemberCount(message));
      }
    };
    handler.addChannelHandler(`message-${message.reqId}`, channelHandler);
    setReadReceipt(channel.getUnreadMemberCount(message));
    return () => {
      handler.removeChannelHandler(`message-${message.reqId}`);
    };
  }, []);

  return(
    <Pressable 
      activeOpacity={0.75}
      onPress={() => onPress(message)}
      onLongPress={() => onLongPress(message)}
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
          {!message.hasSameSenderAbove && <Text style={style.nickname}>{message.sender.nickname}</Text>}
          <View style={{ ...style.messageBubble, backgroundColor: isMyMessage ? '#7b53ef' : '#ddd' }}>
          <Text style={{ ...style.message, color: isMyMessage ? '#fff' : '#333' }}>{message.message}</Text>
          </View>
      </View>
      <View style={{ ...style.status, alignItems: isMyMessage ? 'flex-end' : 'flex-start' }}>
          {message.sendingStatus === 'pending' && (
            <Progress.Circle size={10} indeterminate={true} indeterminateAnimationDuration={800} color="#999" />
          )}
          {message.sendingStatus === 'succeeded' && readReceipt > 0 && (
          <Text style={style.readReceipt}>{readReceipt}</Text>
          )}
          <Text style={style.updatedAt}>{moment(message.createdAt).fromNow()}</Text>
      </View>
    </Pressable>
  )

  // return (
  //   <>
  //     <View style={style.container}>
  //       <Text style={style.message}>{message.message}</Text>
  //     </View>
  //   </>
  // );
};

const style = {
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  message: {
    fontSize: 18,
    color: '#ccc',
  },
};

export default withAppContext(AdminMessage);