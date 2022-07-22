import React, {useEffect, useState} from 'react'
import { View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import Slider from '@react-native-community/slider';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from '../components/AuthContext';

const RallyScheduleScreen = ({navigation}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [colorObj, setColorObject] = useState({})
    const [user, setUser] = useState({})
    const {setColorObj} = React.useContext(AuthContext)
    useEffect(()=>{
        const getDefaultValues = async() => {
            let defaultSettings = await AsyncStorage.getItem("SettingConfigurations")
            let parsed = JSON.parse(defaultSettings)  
            let user = await AsyncStorage.getItem('accountInfo')
            user = JSON.parse(user) 
            setUser(user)
            console.log(user.isFirstPepRally)         
            setIsEnabled(user.isFirstPepRally)
            setColorObject(parsed.colorObj)
        }
        getDefaultValues()
    }, [])

    const toggleSwitch = (value) => {
        setIsEnabled(value)
    };
    const handleSubmit = async()=>{
        console.log("isFirstPepRally",isEnabled)
        if (user!==null){
            let data = {
                firstName: user.firstName,
                lastName: user.lastName,
                shortID: user.shortID,
                longID: user.longID,
                graduationYear: user.graduationYear,
                isFirstPepRally: isEnabled
              }
              await AsyncStorage.setItem("accountInfo", JSON.stringify(data)).then(()=>navigation.navigate("HomeScreen"));
            //   navigation.navigate("HomeScreen")

        }
    }
    return(
        <ScrollView style={{flex: 1, backgroundColor: colorObj.lightbackground}}>
                <View style={[styles.button, {marginTop: moderateScale(25)}]}>
                <View style={{backgroundColor: colorObj.primary, justifyContent: 'center', alignItems: 'center', paddingHorizontal: moderateScale(15), paddingVertical: moderateScale(8), marginTop: moderateScale(20), borderTopLeftRadius: moderateScale(30), borderTopRightRadius: moderateScale(30), borderBottomLeftRadius: moderateScale(30), borderBottomRightRadius: moderateScale(30)}}>
                    <Text style={styles.title}>Pep Rally Schedule</Text>
                </View>
                <View>
                    <Text style={{fontSize: moderateScale(17), marginTop: moderateScale(20), marginHorizontal: moderateScale(20),textAlign: 'center'}}>
                        Is your fourth period in the social science, math, humanities, or the world language building?
                    </Text>
                </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: moderateScale(40)}}>
                <Text style={styles.subTitle}>Yes</Text>
                <Switch
                    trackColor={{ false: "darkgreen", true: "lightblue" }}
                    thumbColor={isEnabled ? "darkgreen" : "lightblue"}
                    ios_backgroundColor="darkgreen"
                    onValueChange={(value)=>toggleSwitch(value)}
                    value={isEnabled}
                    style={{marginHorizontal: moderateScale(10)}}
                />
                <Text style={styles.subTitle}>No</Text>

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


export default RallyScheduleScreen