import React from 'react'
import {View, Text, } from 'react-native'

export const AdayorBday = ({day}) => {
    if (day==='even'){
        return(
            <View style={{alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginTop: 18}}>
                <View style={{height: 40, width: 40, backgroundColor: 'white', borderRadius:20, borderWidth: 1, borderColor: 'lightgrey', alignItems: 'center', justifyContent: 'center', marginRight: 25, }}>
                    <Text style={{color: 'lightgrey'}}>Odd</Text>
                </View>
                <View style={{height: 45, width: 45, backgroundColor: 'lightblue', borderRadius: 22.5,borderWidth: 1, borderColor: 'lightblue', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontSize: 15,}}>Even</Text>
                </View>
                
            
            </View>
        )
    }
    else{
        return(
            <View style={{alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginTop: 18}}>
                <View style={{height: 45, width: 45, backgroundColor: 'lightblue', borderRadius: 22.5,borderWidth: 1, borderColor: 'lightblue', alignItems: 'center', justifyContent: 'center', marginRight: 25, }}>
                    <Text style={{color: 'white', fontSize: 15,}}>Odd</Text>
                </View>
                <View style={{height: 40, width: 40, backgroundColor: 'white', borderRadius:20, borderWidth: 1, borderColor: 'lightgrey', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'lightgrey'}}>Even</Text>
                </View>
            
            </View>
        )
    }
    
}