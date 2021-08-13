import React, {useState} from 'react'
import { View, StyleSheet, Text, Switch, TouchableOpacity, ScrollView } from 'react-native'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { FontAwesome5 } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-community/async-storage';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

const ConfigureSettingsScreen = ({navigation}) => {
    const [colorObj, setColorObj] = useState({})
    React.useEffect(()=>{
        const getDefaultValues = async() => {
            let defaultSettings = await AsyncStorage.getItem("SettingConfigurations")
            let parsed = JSON.parse(defaultSettings)
            setColorObj(parsed.colorObj)

        }
        getDefaultValues()
    }, [])
    return(
        <View style={{flex: 2,  paddingHorizontal: moderateScale(20), backgroundColor: "rgba(233, 251, 251, 0.96)", justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Preferences")}>
                    <FontAwesome5 name="pencil-ruler" size={moderateScale(30)} color= {colorObj.primary}/>
                    <Text style={styles.title}>Preferences</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("SetClasses", {colorObj: colorObj})}>
                    <Ionicons name="school-outline" size={moderateScale(35)} color={colorObj.primary} />                    
                    <Text style={styles.title}>Set Classes</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: moderateScale(12)}}>
                
                <TouchableOpacity style={[styles.button]} onPress={()=>navigation.navigate("About")}>
                    <Feather name="info" size={moderateScale(30)} color={colorObj.primary} />
                    <Text style={styles.title}>General Info</Text>
                </TouchableOpacity>
            
            </View>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
    title: {
        fontFamily: "OpenSansSemiBold",
                fontSize: moderateScale(16),
                // fontWeight: "bold",
                // marginBottom: moderateScale(10),
                // marginLeft: "5%",
                textAlign: 'center',
                marginTop: moderateScale(10)
                
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
        flex: 1/2, 
        height: moderateScale(170),
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
        marginHorizontal: moderateScale(6) ,
    }
})

export default ConfigureSettingsScreen