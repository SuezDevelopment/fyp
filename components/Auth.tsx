import { StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { Text, View} from './Themed'
import { useAuth } from '../realm/AuthProvider';
import {RootStackScreenProps } from '../types';

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, signUp, signIn } = useAuth();
    
  return (
    <View>
      <Text>Auth</Text>
    </View>
  )
}

const styles = StyleSheet.create({})