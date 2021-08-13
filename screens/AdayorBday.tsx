import React from 'react'
import {View, Text, } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

export const AdayorBday = ({colorObj,day}) => {
    if (day==='odd'){
        return(
            <View style={{alignSelf: 'center', flexDirection: 'row', alignItems: 'center'}}>
                {/* <View style={{height: moderateScale(46), width: moderateScale(46), backgroundColor: 'white', borderRadius:moderateScale(23), borderWidth: 0, borderColor: 'lightgrey', alignItems: 'center', justifyContent: 'center', marginRight: moderateScale(10), shadowColor: 'grey', shadowOffset: {height: 1, width: 1}, shadowOpacity: 0.3, elevation: 3}}>
                    <Text style={{fontWeight: 'bold',color: 'lightgrey', fontSize:moderateScale(15)}}>Even</Text>
                </View> */}
                <View style={{height: moderateScale(44), width: moderateScale(44), backgroundColor: colorObj.primary, borderRadius: moderateScale(22),borderWidth: 0, borderColor: 'lightblue', alignItems: 'center', justifyContent: 'center',shadowColor: 'grey', marginRight: moderateScale(5),shadowOffset: {height: 1, width: 1}, shadowOpacity: 0.3, elevation: 3}}>
                    <Text style={{fontWeight: 'bold',color: 'white', fontSize: moderateScale(15),}}>Odd</Text>
                </View>
                
            
            </View>
        )
    }
    else if (day=="even"){
        return(
            <View style={{alignSelf: 'center', flexDirection: 'row', alignItems: 'center'}}>
                <View style={{height: moderateScale(44), width: moderateScale(44), backgroundColor: colorObj.primary, borderRadius: moderateScale(22),borderWidth: 0, borderColor: 'lightblue', alignItems: 'center', justifyContent: 'center', marginRight: moderateScale(5), shadowColor: 'grey', shadowOffset: {height: 1, width: 1}, shadowOpacity: 0.3, elevation: 3}}>
                    <Text style={{fontWeight: 'bold', color: 'white', fontSize: moderateScale(15),}}>Even</Text>
                </View>
                {/* <View style={{height: moderateScale(48), width: moderateScale(46), backgroundColor: 'white', borderRadius:moderateScale(23), borderWidth: 0, borderColor: 'lightgrey', alignItems: 'center', justifyContent: 'center',shadowColor: 'grey', shadowOffset: {height: 1, width: 1}, shadowOpacity: 0.3, elevation: 3}}>
                    <Text style={{fontWeight: 'bold',color: 'lightgrey', fontSize:moderateScale(15)}}>Odd</Text>
                </View> */}
            
            </View>
        )
    }
    else{
        return(
            <></>
            // <View style={{alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginTop: 18}}>
            //     <View style={{marginRight: moderateScale(10),height: moderateScale(48), width: moderateScale(48), backgroundColor: 'white', borderRadius:moderateScale(24), borderWidth: 0, borderColor: 'lightgrey', alignItems: 'center', justifyContent: 'center',shadowColor: 'grey', shadowOffset: {height: 1, width: 1}, shadowOpacity: 0.3, elevation: 3}}>
            //         <Text style={{fontWeight: 'bold',color: 'lightgrey', fontSize:moderateScale(15)}}>Even</Text>
            //     </View>
            //     <View style={{height: moderateScale(48), width: moderateScale(48), backgroundColor: 'white', borderRadius:moderateScale(24), borderWidth: 0, borderColor: 'lightgrey', alignItems: 'center', justifyContent: 'center',shadowColor: 'grey', shadowOffset: {height: 1, width: 1}, shadowOpacity: 0.3, elevation: 3}}>
            //         <Text style={{fontWeight: 'bold',color: 'lightgrey', fontSize:moderateScale(15)}}>Odd</Text>
            //     </View>
            // </View>
        )
    }
    
}