import React from 'react'
import {View, Text, } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

export const AdayorBday = ({colorObj,day}) => {
    if (day==='odd'){
        return(
            <View style={{alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginTop: 18}}>
                <View style={{height: moderateScale(48), width: moderateScale(48), backgroundColor: 'white', borderRadius:moderateScale(24), borderWidth: 1, borderColor: 'lightgrey', alignItems: 'center', justifyContent: 'center', marginRight: 25, }}>
                    <Text style={{fontWeight: 'bold',color: 'lightgrey', fontSize:moderateScale(17)}}>E</Text>
                </View>
                <View style={{height: moderateScale(53), width: moderateScale(53), backgroundColor: colorObj.primary, borderRadius: moderateScale(26.5),borderWidth: 1, borderColor: 'lightblue', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold',color: 'white', fontSize: moderateScale(19),}}>O</Text>
                </View>
                
            
            </View>
        )
    }
    else{
        return(
            <View style={{alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginTop: 18}}>
                <View style={{height: moderateScale(53), width: moderateScale(53), backgroundColor: colorObj.primary, borderRadius: moderateScale(26.5),borderWidth: 1, borderColor: 'lightblue', alignItems: 'center', justifyContent: 'center', marginRight: 25, }}>
                    <Text style={{fontWeight: 'bold', color: 'white', fontSize: moderateScale(19),}}>E</Text>
                </View>
                <View style={{height: moderateScale(48), width: moderateScale(48), backgroundColor: 'white', borderRadius:moderateScale(24), borderWidth: 1, borderColor: 'lightgrey', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold',color: 'lightgrey', fontSize:moderateScale(17)}}>O</Text>
                </View>
            
            </View>
        )
    }
    
}