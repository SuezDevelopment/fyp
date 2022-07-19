// deno-lint-ignore-file no-explicit-any
// deno-lint-ignore-file import-prefix-missing
import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Text, View } from 'react-native';

const VoteBtn = (props:any) => {
  const {user} = props;
  const [count, setCount] = useState(0);
  
  const onPress = () => {
    if(!user) return null;
    setCount(count + 1);
  };
  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>Count: {count}</Text>
      </View>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.button}>
          <Text>Vote</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  countText: {
    color: '#FF00FF',
  },
});

export default VoteBtn;