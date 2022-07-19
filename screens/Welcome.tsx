import { StyleSheet} from 'react-native'
import * as React from 'react'
import { View } from '../components/Themed';
import Welcome from '../components/Welcome';
import { RootStackScreenProps } from '../types';
import { useAuthentication } from '../hooks/useAuth';
import { Text} from '../components/Themed';


export default function WelcomeScreen({ navigation }: RootStackScreenProps<'WelcomeScreen'>) {
  const [isAdmin, setIsAdmin] = React.useState(false)
  const { user } = useAuthentication();
  React.useEffect(()=>{
      if (user != null) {
        setIsAdmin(false)
        navigation.navigate('Root')
      }
  },[user]);
  return (
    <View>
      <Welcome />
      <Text>
        mhvjvchcyxkbjjhlvjvljdtsardf
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({})