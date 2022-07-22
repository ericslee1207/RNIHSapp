import React, {useEffect, useState} from 'react'
import { View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import Slider from '@react-native-community/slider';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from '../components/AuthContext';

const PreferencesScreen = ({navigation}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [sliderValue, setSliderValue] = useState(3)
    const [colorValue, setColorValue] = useState(2)
    const [colorObj, setColorObject] = useState({})
    const {setColorObj} = React.useContext(AuthContext)
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
            else if (primary=="#ff82c5"){
                setColorValue(4)
            }
            else{
                setColorValue(5)
            }
            setIsEnabled(parsed.isCircle)
            setSliderValue(parsed.radius)
            setColorObject(parsed.colorObj)

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
        else if (colorValue==4){
            colorObj.primary = "#ff82c5"
            colorObj.highlight = "#fde0e0"
            colorObj.lightbackground = "#fff0f8"
            colorObj.darkbackground = "#ffe8e8"
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
        setColorObject(obj.colorObj)
        await AsyncStorage.setItem("SettingConfigurations", JSON.stringify(obj))
        setColorObj(obj.colorObj)
        navigation.navigate("HomeScreen")
    }
    return(
        <ScrollView style={{flex: 1, backgroundColor: colorObj.lightbackground}}>
                <View style={[styles.button, {marginTop: moderateScale(25)}]}>
                <View style={{backgroundColor: colorObj.primary, justifyContent: 'center', alignItems: 'center', paddingHorizontal: moderateScale(15), paddingVertical: moderateScale(8), marginTop: moderateScale(20), borderTopLeftRadius: moderateScale(30), borderTopRightRadius: moderateScale(30), borderBottomLeftRadius: moderateScale(30), borderBottomRightRadius: moderateScale(30)}}>
                    <Text style={styles.title}>Timer Style</Text>
                </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '70%', marginBottom: moderateScale(40), marginLeft: moderateScale(25)}}>
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
            </View>
            <View style={styles.button}>
            <View style={{backgroundColor: colorObj.primary, justifyContent: 'center', alignItems: 'center', paddingHorizontal: moderateScale(15), paddingVertical: moderateScale(8), marginTop: moderateScale(20), borderTopLeftRadius: moderateScale(30), borderTopRightRadius: moderateScale(30), borderBottomLeftRadius: moderateScale(30), borderBottomRightRadius: moderateScale(30)}}>
                    <Text style={styles.title}>Periods Visible</Text>
                </View>
            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '50%'}}>
                {/* <Text style={styles.subTitle}>Table</Text> */}
                <Slider
                    style={{width: moderateScale(210), height: moderateScale(30), marginTop: moderateScale(20)}}
                    minimumValue={3}
                    maximumValue={5}
                    minimumTrackTintColor="darkgreen"
                    maximumTrackTintColor="lightblue"
                    step={1}
                    onValueChange={(value)=>setSliderValue(value)}
                    value={sliderValue}
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: moderateScale(190)}}>
                    <Text style={styles.subTitle}>3</Text>
                    <Text style={styles.subTitle}>4</Text>
                    <Text style={styles.subTitle}>5</Text>
                </View>
                {/* <Text style={styles.subTitle}>Circle</Text> */}
                
            </View>
            </View>
            <View style={styles.button}>

            <View style={{backgroundColor: colorObj.primary, justifyContent: 'center', alignItems: 'center', paddingHorizontal: moderateScale(15), paddingVertical: moderateScale(8), marginTop: moderateScale(15), borderTopLeftRadius: moderateScale(30), borderTopRightRadius: moderateScale(30), borderBottomLeftRadius: moderateScale(30), borderBottomRightRadius: moderateScale(30)}}>
                    <Text style={styles.title}>Color Theme</Text>
                </View>
            <Slider
                    style={{width: moderateScale(200), height: moderateScale(30), marginTop: moderateScale(20)}}
                    minimumValue={1}
                    maximumValue={5}
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
                    <Text style={[styles.subTitle, {color: '#fc73c4'}]}>Pi</Text>
                    <Text style={[styles.subTitle, {color: '#7361ff'}]}>Pu</Text>


                    {/* <Text style={[styles.subTitle, {color: '#0006b8'}]}>P</Text> */}
                    
                </View>
                </View>
            <TouchableOpacity onPress={handleSubmit} style={[styles.submit, {backgroundColor: colorObj.primary}]}>
                    <Text style={styles.subTitle1}>Save</Text>
                </TouchableOpacity>
        </ScrollView> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
    title: {
        fontFamily: "OpenSansSemiBold",
                fontSize: moderateScale(20),
                // fontWeight: "bold",
                // marginBottom: moderateScale(10),
                // marginLeft: "5%",
                textAlign: 'center',
                color: 'white'
                
    },
    subTitle: {
        fontFamily: "OpenSansSemiBold",
                fontSize: moderateScale(18),
                // fontWeight: "bold",
                marginTop: moderateScale(25),
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
    },
    button: { 
        //height: '100%', 
        width: moderateScale(330),
        borderRadius: moderateScale(20), 
        // marginRight: moderateScale(6), 
        justifyContent: 'center', 
        alignItems: 'center', 
        shadowColor: "grey", 
        shadowOpacity: 0.3, 
        shadowRadius: 5, 
        backgroundColor: "white", 
        shadowOffset: {height: 1, width: 0}, 
        elevation: 7,
        margin: moderateScale(10) ,
        alignSelf: 'center'
    }
})


export default PreferencesScreen