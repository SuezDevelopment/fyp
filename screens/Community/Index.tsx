import { StyleSheet } from 'react-native';
import * as React from 'react'
import { View } from '../../components/Themed';
import { Handler } from '../../handler';
import Communities from '../../components/community/Communities';
import { RootStackScreenProps } from '../../types';
import { useAuthentication } from '../../hooks/useAuth';

export default function Community(ModalAuth:any,route:any,{ navigation }: RootStackScreenProps<'Auth'>) {
  const handler = new Handler()
  const [channels, setChannels] = React.useState(null);
  const [isUser, setIsUser] = React.useState('');
  const {user} = useAuthentication();


  React.useEffect(() => {
    if(!user) return ModalAuth;
    setIsUser(user);
    handler.getUserFeaturedCommunity(isUser).then((channel:any)=>{
      setChannels(channel);
    }).catch(Error);
  }, []);

  return (
    <View>
      {channels ?  <Communities route={route} navigation={navigation} handler={handler} currentUser={isUser} /> : <View />}
    </View>
  );
}


