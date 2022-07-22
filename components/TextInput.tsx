import React from 'react'
import {StyleSheet} from "react-native"
import { Madoka } from "react-native-textinput-effects";

const TextInput = ({onChange, label}) => {
    return(
        <Madoka
                style={styles.textBox}
                borderColor={"lightblue"}
                inputPadding={16}
                inputStyle={{ color: "black" }}
                onChangeText={(text) => onChange(text)}
                label={label}
                maxLength={22}
            />
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    header:{
        fontSize: 30,
        fontWeight: 'bold'
    },
    textBox: {
        width: "90%", 
        height: 30, 
        marginTop: "3%"
    }
})

export default TextInput;