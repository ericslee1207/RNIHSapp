import React from 'react';
import {View, StyleSheet, Dimensions} from "react-native"

const OnboardingHeader = (props) =>{
    return(
        <View style={[props.style ,styles.header]}>
            {props.children}
        </View>
    )
}
const window = Dimensions.get('window')
const styles = StyleSheet.create({
    header: {
        
        height: window.height*0.06,
        position: 'absolute',
        top: window.height*0.04,
        width: "100%",
        alignItems: 'center',
        paddingHorizontal: window.width*0.06,
        flexDirection: 'row',
        backgroundColor: 'white',
        zIndex: 99
    }
})

export default OnboardingHeader;