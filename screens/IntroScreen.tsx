import React from 'react'
import {View, Text, StyleSheet, Dimensions, Button, Image, ImageBackground} from 'react-native'
import { useFonts } from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable'
import AppLoading from "expo-app-loading"
import { moderateScale } from 'react-native-size-matters';
import { useEffect } from 'react';
import { useState } from 'react';

export const Intro = ({navigation}) => {
    const[loading, setLoading] = useState(false);
    let [fontsLoaded] = useFonts({
            "OpenSansLight": require('../assets/fonts/Open_Sans/OpenSans-Light.ttf'),
            "OpenSansRegular": require('../assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
            "OpenSansSemiBold": require('../assets/fonts/Open_Sans/OpenSans-SemiBold.ttf'),
            "OpenSansBold": require("../assets/fonts/Open_Sans/OpenSans-Bold.ttf")
        })
    
    
    
    
    if (!fontsLoaded){
        return <AppLoading/>
    }
    else{
        return (
            
                <View style={styles.container}>
                    <ImageBackground style={{height: '100%', width: '100%'}} source={require('../assets/images/IHSAerielView_Cut.jpg')} imageStyle={{opacity: 0.4}}>
                        <View style={styles.top}>
                            <View style={styles.outercircle}>
                                <View style={styles.innercircle}>
                                    <Image source={require('../assets/images/IHSLOGO.png')} style={styles.logo}/>
                                </View>
                            </View>
                            <Text style={styles.title}>Irvine High App</Text>
                        </View>
                        <Animatable.View 
                        style={styles.bottom}
                        animation='fadeInUpBig'
                        >
                            <Text style={styles.welcome}>Welcome IHS Student</Text>
                            <View style={{width: '100%'}}>
                                <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{alignSelf: 'center',alignItems: 'center' ,justifyContent: 'center', height: moderateScale(55), backgroundColor: '#04b5a7', width: '80%', borderRadius: 15, marginVertical: '10%', shadowOffset: {width: 2, height: 2}, shadowOpacity: 0.3}}>
                                    <Text style={{color: 'white', fontFamily: 'OpenSansSemiBold', fontSize: moderateScale(17)}}>Student Onboard</Text>
                                </TouchableOpacity>
                            </View>
                        </Animatable.View>
                    </ImageBackground>
                </View>
            
        )
    }
    
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    top: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center',
        borderWidth: 5,
        borderColor: 'white'
    },
    logo: {
        height: moderateScale(130),
        width: moderateScale(130),
        opacity: 0.8
    },
    title: {
        fontSize: 33,
        margin: 20,
        color: 'white',
        fontFamily: 'OpenSansSemiBold',
    },
    innercircle: {
        borderWidth: 8, 
        height: moderateScale(186), 
        width: moderateScale(186), 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 150,
        borderColor: 'darkslategrey',
        backgroundColor: 'transparent'
    },
    welcome: {
        margin: '8%',
        fontFamily: 'OpenSansSemiBold',
        fontSize: moderateScale(20),
        fontStyle: 'italic',
        fontWeight: 'bold',
        alignSelf: 'flex-start',

    },
    outercircle: {
        height: moderateScale(200), 
        width: moderateScale(200), 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 150,
        backgroundColor: 'lightcyan'
    },
})