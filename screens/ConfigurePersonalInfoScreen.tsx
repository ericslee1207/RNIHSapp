import AsyncStorage from '@react-native-community/async-storage';
import React from 'react'
import { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import { moderateScale } from 'react-native-size-matters';
import { Fumi } from "react-native-textinput-effects";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const ConfigurePersonalInfoScreen = ({navigation}) => {
    let obj = {
        p1: "",
        p2: "",
        p3: "",
        p4: "",
        p5: "",
        p6: ""
    }

    const handleSubmit = async() => {
        
        await AsyncStorage.setItem("Teachers", JSON.stringify(obj))
        navigation.goBack()
    }
    const FumiInput = ({ objKey, type, icon }) => {
        const onChange = (text) => {
            obj[objKey] = text;
        }
        return (
          <Fumi
            label={type}
            style={{
              marginBottom: "4%",
              borderRadius: 20,
              borderWidth: 1,
              height: 10,
              borderColor: "lightblue",
            }}
          
            iconClass={FontAwesomeIcon}
            iconName={icon}
            iconColor={"#f95a25"}
            iconSize={20}
            inputPadding={16}
            autoCapitalize="none"
            onChangeText={(text) => onChange(text)}
          />
        );
      };
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Teachers</Text>
            <View style={styles.customizeClasses}>
                <View style={styles.input}>
                    {/* <Text style={styles.subTitle}>Period 1:</Text> */}
                    <FumiInput objKey={"p1"} type="Period 1 Teacher Last Name"  icon="user"/>                
                </View>
                <View style={styles.input}>
                    {/* <Text style={styles.subTitle}>Period 1:</Text> */}
                    <FumiInput objKey={"p2"} type="Period 2 Teacher Last Name"  icon="user"/>                
                </View>
                <View style={styles.input}>
                    {/* <Text style={styles.subTitle}>Period 1:</Text> */}
                    <FumiInput objKey={"p3"} type="Period 3 Teacher Last Name"  icon="user"/>                
                </View>
                <View style={styles.input}>
                    {/* <Text style={styles.subTitle}>Period 1:</Text> */}
                    <FumiInput objKey={"p4"}type="Period 4 Teacher Last Name"  icon="user"/>                
                </View>
                <View style={styles.input}>
                    {/* <Text style={styles.subTitle}>Period 1:</Text> */}
                    <FumiInput  objKey={"p5"}type="Period 5 Teacher Last Name"  icon="user"/>                
                </View>
                <View style={styles.input}>
                    {/* <Text style={styles.subTitle}>Period 1:</Text> */}
                    <FumiInput objKey={"p6"} type="Period 6 Teacher Last Name"  icon="user"/>                
                </View>
                <View style={styles.input}>
                    {/* <Text style={styles.subTitle}>Period 1:</Text> */}
                    <FumiInput  objKey={"p7"}type="Period 7 Teacher Last Name"  icon="user"/>                
                </View>
                <KeyboardAvoidingView style={styles.input} behavior="padding">
                    {/* <Text style={styles.subTitle}>Period 1:</Text> */}
                    <FumiInput objKey={"p8"} type="Period 8 Teacher Last Name"  icon="user"/>                
                </KeyboardAvoidingView>
                <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
                <Text>Submit</Text>
                </TouchableOpacity>
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
    title: {
        fontFamily: "OpenSansSemiBold",
                fontSize: 30,
                // fontWeight: "bold",
                marginVertical: 25,
                alignSelf: "flex-start",
                marginLeft: "5%",
                
    },
    subTitle: {
        fontFamily: "OpenSansSemiBold",
                fontSize: 20,
                // fontWeight: "bold",
                marginTop: 25,
                alignSelf: "flex-start",
                marginBottom: moderateScale(20)
    },
    customizeClasses: {
        width: '100%',
    },
    input: {
        alignSelf:'center', width: moderateScale(330)
    },
    submit: {
        height: moderateScale(40),
        width: "90%",
        alignSelf: 'center',
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ConfigurePersonalInfoScreen