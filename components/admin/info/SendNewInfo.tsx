import { 
    TextInput,
    Pressable,
    Platform,
    StyleSheet
} from 'react-native'
import React, {useRef, useState} from 'react'
import { View, Text } from '../../Themed'
import colors from '../../Colors'

function SendNewInfo({onSubmit}:{onSubmit:any}) {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const handleSubmit = () => {
        onSubmit({body, title});
        setBody("");
        setTitle("");
    }

    return (
        <View style={styles.form}>
            <View style={{flexDirection : 'column', flex: 1}}>
            <TextInput
                value={title}
                placeholder="Information Title"
                onChangeText={setTitle}
                autoCorrect={false}
                autoCapitalize="none"
                style={styles.textInput}
            />
            <TextInput
                value={body}
                placeholder="Information Body"
                onChangeText={setBody}
                multiline
                numberOfLines={5}
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

export default SendNewInfo

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