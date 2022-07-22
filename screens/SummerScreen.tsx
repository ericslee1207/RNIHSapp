import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View, Text, ImageBackground, Platform, Dimensions, TouchableOpacity } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
const SummerScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <LinearGradient start={{ x: 0, y: 0 }} colors={["#009387", "#45b5ff"]} style={{ height: '100%', position: 'absolute', width: '100%' }} />

            <ImageBackground style={{ flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }} source={require('../assets/images/IHSAerielView_Cut.jpg')} imageStyle={{ opacity: 0.42 }}>
                <View style={{ width: '90%', alignSelf: 'center', borderRadius: moderateScale(20), overflow: 'hidden', }}>

                    <BlurView tint={"light"} intensity={100} style={{
                        padding: moderateScale(20), width: '100%', borderRadius: moderateScale(80), alignSelf: 'center', shadowOffset: { height: 0, width: 0 },
                        shadowOpacity: 0.12,
                        shadowRadius: 8,
                        elevation: 5
                    }}>
                        <Text style={{ textAlign: 'center', alignSelf: 'center', fontFamily: 'OpenSansBold', fontSize: moderateScale(30), color: 'black' }}>
                            Enjoy Your
                        </Text>
                        <Text style={{ textAlign: 'center', alignSelf: 'center', fontFamily: 'OpenSansBold', fontSize: moderateScale(55), color: '#044726' }}>
                            Summer!
                        </Text>
                        <TouchableOpacity onPress={()=>navigation.navigate("Root")} style={{width: '100%', height: moderateScale(40), backgroundColor: '#009387', justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(10), borderRadius: 20}}>
                            <Text style={{color: 'white', fontFamily: "OpenSansBold", fontSize: moderateScale(16)}}>Proceed to Home</Text>
                        </TouchableOpacity>
                        <Text style={{ alignSelf: 'center', fontSize: moderateScale(15), marginTop: moderateScale(10), color: 'black' }}>First Day: August 19, 2021</Text>
                    </BlurView>
                </View>

            </ImageBackground>
        </View>
    )
}

export default SummerScreen