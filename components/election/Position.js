import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

export  function Position(key, children) {
  return (
    <View>
      <Text {...key}>Position</Text>
      <View>
         {...children && <TextInput />}
      </View>
    </View>
  )
}

export function Inp(){
    return (
         <InputText />
    )
}
const styles = StyleSheet.create({})