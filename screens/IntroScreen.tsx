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
import { BlurView } from 'expo-blur';

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
                    <LinearGradient start={{ x: 0, y: 0 }} colors={["#4afff0", "#45b5ff"]} style={{ height: '100%', position: 'absolute', width: '100%', overflow: 'hidden' }} />
                    <ImageBackground style={{height: '100%', width: '100%', overflow: 'hidden'}} source={require('../assets/images/IHSAerielView_Cut.jpg')} imageStyle={{opacity: 0.55}}>
                        <View style={styles.top}>
                            {/* <ImageBackground style={{overflow: 'hidden', backgroundColor: 'white', borderRadius: moderateScale(100)}} source={require("../assets/images/colorback4.png")}>
                            <BlurView 
                                intensity={100}
                                tint='light'
                                style={[styles.outercircle]}
                            >
                                <LinearGradient 
                                    colors={['rgba(0,0,0,0.0)', 'rgba(232,255,239,0.3)']}
                                    start={{x: 0, y: 1}}
                                    end= {{x: 1, y: 1}}
                                    style={{height: '100%', width: '100%', justifyContent: 'center', alignItems :'center', }}
                                >  */}
                                <View style={styles.outercircle}>
                                <View style={styles.innercircle}>
                                    <Image source={require('../assets/images/IHSLOGOSquare.png')} style={styles.logo}/>
                                </View>
                                </View>
                                {/* </LinearGradient>
                            </BlurView>
                            </ImageBackground> */}
                            {/* <Text style={styles.title}>IHS Mobile</Text> */}
                        </View>
                        <Animatable.View 
                        
                        style={styles.bottom}
                        animation='fadeInUpBig'
                        >
                            {/* <ImageBackground source={require("../assets/images/colorback4.png")} style={{height: '100%', width: '100%'}}>
                            <BlurView 
                                intensity={100}
                                tint="light"
                                style={{flex: 1, height: '100%', width: '100%', borderTopLeftRadius: moderateScale(25), borderTopRightRadius: moderateScale(25), }}
                            >
                                <LinearGradient 
                                    colors={['rgba(0,0,0,0.0)', 'rgba(232,255,239,0.3)']}
                                    start={{x: 0, y: 1}}
                                    end= {{x: 1, y: 1}}
                                    style={{height: '100%', width: '100%'}}
                                > */}
                                        <Text style={styles.welcome}><Text style={{fontFamily: 'OpenSansSemiBold', color: 'black'}}>Welcome To </Text>IHS Mobile!</Text>
                                    <View style={{height: 2, backgroundColor: "#45b5ff", width: '30%', alignSelf: 'center'}}/>

                                    <View style={{width: '100%'}}>
                                        <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{alignSelf: 'center',alignItems: 'center' ,justifyContent: 'center', height: moderateScale(55), backgroundColor: '#04b5a7', width: '80%', borderRadius: 15, marginVertical: '10%', shadowOffset: {width: 2, height: 2}, shadowOpacity: 0.3}}>
                                            <Text style={{color: 'white', fontFamily: 'OpenSansSemiBold', fontSize: moderateScale(17)}}>Sign Up</Text>
                                        </TouchableOpacity>
                                    </View>
                                {/* </LinearGradient>
                            
                            </BlurView>
                            </ImageBackground> */}
                        </Animatable.View>
                    </ImageBackground>
                </View>
            
        )
    }
    
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
        overflow: 'hidden'
    },
    top: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    bottom: {
        flex: 1,
        // backgroundColor: 'rgba(255, 255, 255, 1)',

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'white'
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
        height: moderateScale(179), 
        width: moderateScale(179), 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: moderateScale(179/2),
        borderColor: '#45b5ff',
        backgroundColor: 'transparent',
                borderWidth: 5,

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
        height: moderateScale(189), 
        width: moderateScale(189), 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: moderateScale(189/2),
        backgroundColor: 'rgba(255, 255, 255, 1)',
        overflow: 'hidden'
    },
})