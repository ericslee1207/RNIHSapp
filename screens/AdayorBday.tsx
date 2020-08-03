import React from 'react'
import {View, Text, } from 'react-native'

export const AdayorBday = ({day}) => {

    if (day==='A'){
        return(
            <View style={{alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginTop: 22}}>
                <View style={{height: 45, width: 45, backgroundColor: 'lightblue', borderRadius:22.5, marginRight: 25, borderWidth: 1, borderColor: 'lightblue', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontSize: 25,}}>A</Text>
                </View>
                <View style={{height: 40, width: 40, backgroundColor: 'white', borderRadius: 20,borderWidth: 1, borderColor: 'lightgrey', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'lightgrey'}}>B</Text>
                </View>
            </View>
        )
    }
    else{
        return(
            <View style={{alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginTop: 22}}>
                <View style={{height: 40, width: 40, backgroundColor: 'white', borderRadius:20, marginRight: 25, borderWidth: 1, borderColor: 'lightgrey', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'lightgrey'}}>A</Text>
                </View>
                <View style={{height: 45, width: 45, backgroundColor: 'lightblue', borderRadius: 22.5,borderWidth: 1, borderColor: 'lightblue', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontSize: 25,}}>B</Text>
                </View>
            </View>
        )
    }
    
}