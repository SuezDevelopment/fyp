import { 
    TextInput,
    Pressable,
    Platform,
    StyleSheet
} from 'react-native'
import React, {useRef, useState} from 'react'
import { View, Text } from '../../Themed'
import colors from '../../Colors'

const colleges = [
    {
        COLENSMA:[
            "Architecture",
            "Estate Management"
        ]
    },
    {
        COPAS:[
            "Biological Sciences And Biotechnology",
            "Chemistry And Biochemistry",
            "Mathematics, Physics, And Computer Science",
            "Pure And Applied Physics"
        ]
    },
    {
        COLAW:[
            "Public And Property Law",
            "Private And International Law"
        ]
    },
    {
        CASMAS:[
            "Economics",
            "Business Administration",
            "Accounting And Finance",
            "Mass Communication",
            "International Relations",
            "Philosophy",
            "Criminology and Security Studies",
            "Political Science",
            "Psychology",
            "Public Administration",
            "Peace Studies and Conflict Resolution",

        ]
    }

]
const pos = []

export default function AddCandidatas() {
    const [fullname, setFullname] = useState("");
    const [position, setPosition] = useState("");
    const [matricNo, setMatricNo] = useState("");
    const [dept, setDept] = useState("");

    const handleSubmit = (onSubmit:any)=>{
        onSubmit({fullname,position,matricNo,dept})
    }

  return (
    <View style={styles.form}>
      <View style={{flexDirection : 'column', flex: 1}}>
        <TextInput
          value={fullname}
          placeholder="Fullname"
          onChangeText={setFullname}
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.textInput}
        />
        <TextInput
          value={matricNo}
          placeholder="Enter Task Description"
          onChangeText={setMatricNo}
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.textInput}
        />
      </View>
      <Pressable onPress={handleSubmit} style={styles.submit}>
        <Text style={styles.icon}>＋</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    form: {
      height: 'auto',
      marginBottom: 20,
      flexDirection: "row",
      ...Platform.select({
        ios: {
          shadowColor: colors.black,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.7,
          shadowRadius: 3,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    textInput: {
      paddingHorizontal: 15,
      paddingVertical: Platform.OS === "ios" ? 15 : 0,
      borderRadius: 5,
      backgroundColor: colors.white,
      fontSize: 17,
      marginBottom: 12
    },
    submit: {
      height: 50,
      width: 50,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 20,
      borderRadius: 5,
      backgroundColor: colors.purple,
    },
    icon: {
      color: colors.white,
      textAlign: "center",
      fontSize: 17,
      fontWeight: "bold",
    },
});
  