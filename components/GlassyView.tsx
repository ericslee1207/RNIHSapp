import React from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { moderateScale } from 'react-native-size-matters';


const GlassyView = ({children, style, key}) => {
    return (
        <View key={key || 0} style={{ overflow: 'hidden', backgroundColor: 'white', borderRadius: moderateScale(100), ...style }} >
            <BlurView
                intensity={80}
                tint='light'
                // style={{style}}
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.0)', 'rgba(232,255,239,0.3)']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', }}
                >
                    {children}
                </LinearGradient>
            </BlurView>
        </View>
    )
}

export default GlassyView