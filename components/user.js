import React, { useState } from 'react';
import { Image,Pressable } from 'react-native';
import { Text,View } from './Themed';
import {Iconn} from './Icon';
import { withAppContext } from '../hooks/context';

const User = (props) => {
    const { user, selected, selectable, onSelect } = props;
    const [select, setSelect] = useState(selected);
    const onPress = () => {
        if (selectable) {
          setSelect(!select);
          onSelect(user);
        }
    };
  return (
    <Pressable activeOpacity={0.75} style={style.container} onPress={() => onPress()}>
      <View style={style.profileImageContainer}>
        <Image source={{ uri: user.profileUrl }} style={style.profileImage} />
        {selected && <Icon name="done" color="#fff" size={40} style={style.check} />}
      </View>
      <Text style={style.nickname}>{user.nickname || '(Unnamed)'}</Text>
    </Pressable>
  )
}

const style = {
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 8,
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    width: 40,
    height: 40,
    marginRight: 12,
  },
  profileImage: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderWidth: 0,
    borderRadius: 20,
  },
  check: {
    position: 'absolute',
    width: 40,
    height: 40,
    opacity: 0.6,
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: '#666',
  },
  nickname: {
    fontSize: 18,
    color: '#666',
  },
};


export default withAppContext(User);