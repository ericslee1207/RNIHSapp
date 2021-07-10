import React, {useState} from 'react'
import { View, StyleSheet, Text, Switch, TouchableOpacity, ScrollView } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import Slider from '@react-native-community/slider';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const ConfigureSettingsScreen = ({navigation}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [sliderValue, setSliderValue] = useState(3)
    const [colorValue, setColorValue] = useState(2)
    const [colorObj, setColorObj] = useState({})
    useEffect(()=>{
        const getDefaultValues = async() => {
            let defaultSettings = await AsyncStorage.getItem("SettingConfigurations")
            let parsed = JSON.parse(defaultSettings)
      
            let primary = parsed.colorObj.primary;
            if (primary == "#86e07b"){
                setColorValue(1)
            }
            else if (primary == "#45b5ff"){
                setColorValue(2)
            }
            else if (primary == "#04b5a7"){
                setColorValue(3)
            }
            else{
                setColorValue(4)
            }
            setIsEnabled(parsed.isCircle)
            setSliderValue(parsed.radius)
            setColorObj(parsed.colorObj)

        }
        getDefaultValues()
    }, [])

    const toggleSwitch = (value) => {
        setIsEnabled(previousState => !previousState)
    };
    const handleSubmit = async()=>{
        let colorObj = {
            primary: "",
            highlight: "",
            lightbackground: "",
            darkbackground: "",
        }
        if (colorValue==1){
            colorObj.primary = "#86e07b"
            colorObj.highlight = "#a5ff99"
            colorObj.lightbackground = "#edffed"
            colorObj.darkbackground = "#e6ffe6"
        }
        else if (colorValue==2){
            colorObj.primary = "#45b5ff"
            colorObj.highlight = "#addfff"
            colorObj.lightbackground = "#ebfeff"
            colorObj.darkbackground = "#D3E7EE"
        }
        else if (colorValue==3){
            colorObj.primary = "#04b5a7"
            colorObj.highlight = "hsl(165, 100%, 80%)"
            colorObj.lightbackground = "rgba(233, 251, 251, 0.96)"
            colorObj.darkbackground = "#D3E7EE"
        }
        else{
            colorObj.primary = "#7361ff"
            colorObj.highlight = "#adb0ff"
            colorObj.lightbackground = "#f6f5ff"
            colorObj.darkbackground = "#ccd9ff"
        }

    
        let obj = {
            isCircle: isEnabled,
            radius: sliderValue,
            colorObj: colorObj
        }
        setColorObj(colorObj)
        await AsyncStorage.setItem("SettingConfigurations", JSON.stringify(obj))
        navigation.goBack()
    }

    return(
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1,  paddingVertical: moderateScale(40), backgroundColor: "rgba(233, 251, 251, 0.96)"}}>
            <View style={{alignItems: 'center', marginBottom: moderateScale(60)}}>

            <Text style={styles.title}>Timer Style</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '50%', marginBottom: moderateScale(40)}}>
                <Text style={styles.subTitle}>Vertical</Text>
                <Switch
                    trackColor={{ false: "darkgreen", true: "lightblue" }}
                    thumbColor={isEnabled ? "darkgreen" : "lightblue"}
                    ios_backgroundColor="darkgreen"
                    onValueChange={(value)=>toggleSwitch(value)}
                    value={isEnabled}
                    style={{marginHorizontal: moderateScale(10)}}
                />
                <Text style={styles.subTitle}>Horizontal</Text>

            </View>
            <Text style={styles.title}>Periods Showing</Text>
            <View style={{flexDirection: 'col', alignItems: 'center', justifyContent: 'space-between', width: '50%'}}>
                {/* <Text style={styles.subTitle}>Table</Text> */}
                <Slider
                    style={{width: moderateScale(200), height: moderateScale(30)}}
                    minimumValue={1}
                    maximumValue={5}
                    minimumTrackTintColor="darkgreen"
                    maximumTrackTintColor="lightblue"
                    step={2}
                    onValueChange={(value)=>setSliderValue(value)}
                    value={sliderValue}
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: moderateScale(190)}}>
                    <Text style={styles.subTitle}>1</Text>
                    <Text style={styles.subTitle}>3</Text>
                    <Text style={styles.subTitle}>5</Text>
                </View>
                {/* <Text style={styles.subTitle}>Circle</Text> */}
                
            </View>
            <Text style={styles.title}>Color Theme</Text>
            <Slider
                    style={{width: moderateScale(200), height: moderateScale(30)}}
                    minimumValue={1}
                    maximumValue={4}
                    minimumTrackTintColor="darkgreen"
                    maximumTrackTintColor="lightblue"
                    step={1}
                    onValueChange={(value)=>setColorValue(value)}
                    value={colorValue}
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: moderateScale(190)}}>
                    <Text style={[styles.subTitle, {color: '#86e07b'}]}>LG</Text>
                    <Text style={[styles.subTitle, {color: '#45b5ff'}]}>LB</Text>
                    <Text style={[styles.subTitle, {color: '#04b5a7'}]}>G</Text>
                    <Text style={[styles.subTitle, {color: '#0006b8'}]}>P</Text>
                    
                </View>
            <TouchableOpacity onPress={handleSubmit} style={[styles.submit, {backgroundColor: colorObj.primary}]}>
                    <Text style={styles.subTitle1}>Save</Text>
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
    subTitle1: {
        fontFamily: "OpenSansSemiBold",
        fontSize: 20,
                // fontWeight: "bold",
    },
    customizeClasses: {
        width: '100%',
    },
    input: {
        alignSelf:'center', width: moderateScale(330)
    },
    submit: {
        height: moderateScale(60),
        width: "70%",
        alignSelf: 'center',
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: moderateScale(20),
        borderRadius: moderateScale(30)
    }
})

export default ConfigureSettingsScreen