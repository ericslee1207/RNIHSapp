import React from 'react'
import {View, Text, StyleSheet, Dimensions, Button, Image, ImageBackground} from 'react-native'
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable'


export const Intro = ({navigation}) => {
    let [fontsLoaded] = useFonts({
        'Acquire' : require('../assets/fonts/Acquire.otf')
    })

    if (!fontsLoaded){
        return <AppLoading/>
    }
    else{
        return (
            
                <View style={styles.container}>
                    <ImageBackground style={{height: height, width: width}} source={require('../assets/images/IHSAerielView_Cut.jpg')} imageStyle={{opacity: 0.4}}>
                        <View style={styles.top}>
                            <View style={styles.outercircle}>
                                <View style={styles.innercircle}>
                                    <Image source={require('../assets/images/IHSLOGO.png')} style={styles.logo}/>
                                </View>
                            </View>
                            <Text style={styles.title}>Irvine High</Text>
                        </View>
                        <Animatable.View 
                        style={styles.bottom}
                        animation='fadeInUpBig'
                        >
                            <Text style={styles.welcome}>Welcome IHS Student</Text>
                            <View style={{width: '100%'}}>
                                <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{alignSelf: 'center',alignItems: 'center' ,justifyContent: 'center', height: 55, backgroundColor: '#009387', width: '80%', borderRadius: 15, marginVertical: '10%', shadowOffset: {width: 2, height: 2}, shadowOpacity: 0.6}}>
                                    <Text style={{color: 'white', fontFamily: 'Acquire'}}>Student Log In</Text>
                                </TouchableOpacity>
                            </View>
                        </Animatable.View>
                    </ImageBackground>
                </View>
            
        )
    }
    
}

const {height, width} = Dimensions.get('window')
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
        height: height*0.18,
        width: width*0.29,
        opacity: 0.8
    },
    title: {
        fontSize: 33,
        margin: 20,
        color: 'white',
        fontFamily: 'Acquire',
    },
    innercircle: {
        borderWidth: 8, 
        height: height*0.22, 
        width: width*0.49, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 150,
        borderColor: 'darkslategrey',
        backgroundColor: 'transparent'
    },
    welcome: {
        margin: '8%',
        fontFamily: 'Trebuchet MS',
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
        alignSelf: 'flex-start',

    },
    outercircle: {
        height: height*0.24, 
        width: width*0.53, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 150,
        backgroundColor: 'lightcyan'
    },
})