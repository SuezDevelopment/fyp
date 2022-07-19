import { StyleSheet} from 'react-native';
import { View } from '../components/Themed';
import React from 'react'
import Auth from '../components/Auth'
import { RootStackScreenProps } from '../types';
import { useAuthentication } from '../hooks/useAuth';


export default function AuthScreen({ navigation }: RootStackScreenProps<'Auth'>) {
  const {user} = useAuthentication();
  
  React.useEffect(()=>{

    if (user != null) {
        navigation.navigate('Root')
    }
  },[user]);
  
  return (
    <View>
      <Auth />
    </View>
  )
}

const styles = StyleSheet.create({})