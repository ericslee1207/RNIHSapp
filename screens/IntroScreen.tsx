import React from 'react'
import {View, Text, StyleSheet, Dimensions, Button, Image, ImageBackground} from 'react-native'
import { useFonts } from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable'
import AppLoading from "expo-app-loading"
import { moderateScale } from 'react-native-size-matters';
import { useEffect } from 'react';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

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
                    <LinearGradient start={{ x: 0, y: 0 }} colors={["#009387", "#45b5ff"]} style={{ height: '100%', position: 'absolute', width: '100%' }} />
                    <ImageBackground style={{height: '100%', width: '100%'}} source={require('../assets/images/IHSAerielView_Cut.jpg')} imageStyle={{opacity: 0.4}}>
                        <View style={styles.top}>
                            <View style={styles.outercircle}>
                                <View style={styles.innercircle}>
                                    <Image source={require('../assets/images/IHSLOGOSquare.png')} style={styles.logo}/>
                                </View>
                            </View>
                            {/* <Text style={styles.title}>IHS Mobile</Text> */}
                        </View>
                        <Animatable.View 
                        style={styles.bottom}
                        animation='fadeInUpBig'
                        >
                            <Text style={styles.welcome}><Text style={{fontFamily: 'OpenSansRegular', color: 'grey'}}>Welcome</Text> IHS Student!</Text>
                            <View style={{height: 2, backgroundColor: "#45b5ff", width: '30%'}}/>

                            {/* <Image source={require("../assets/images/newlogowhite.png")} style={{height: moderateScale(45), width: moderateScale(300), marginTop: moderateScale(30)}}/> */}
                            <View style={{width: '100%'}}>
                                <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{alignSelf: 'center',alignItems: 'center' ,justifyContent: 'center', height: moderateScale(55), backgroundColor: '#04b5a7', width: '80%', borderRadius: 15, marginVertical: '10%', shadowOffset: {width: 2, height: 2}, shadowOpacity: 0.3}}>
                                    <Text style={{color: 'white', fontFamily: 'OpenSansSemiBold', fontSize: moderateScale(17)}}>Sign Up</Text>
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
        backgroundColor: 'rgba(255, 255, 255, 1)',

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center',
        // borderWidth: 5,
        // borderColor: 'white',
        
    },
    logo: {
        height: moderateScale(140),
        width: moderateScale(140),
        opacity: 1,
        borderRadius: moderateScale(0)
    },
    title: {
        fontSize: moderateScale(33),
        margin: 20,
        color: 'white',
        fontFamily: 'OpenSansSemiBold',
    },
    innercircle: {
        borderWidth: 5, 
        height: moderateScale(169), 
        width: moderateScale(169), 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 50,
        borderColor: '#45b5ff',
        backgroundColor: 'transparent'
    },
    welcome: {
        marginHorizontal: '8%',
        marginVertical: '8%',
        fontFamily: 'OpenSansSemiBold',
        fontSize: moderateScale(24),
        fontStyle: 'italic',
        alignSelf: 'center',
        color: "#009387"
    },
    outercircle: {
        height: moderateScale(180), 
        width: moderateScale(180), 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
})