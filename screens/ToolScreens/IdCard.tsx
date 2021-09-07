import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, Dimensions, ImageBackground, Image} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment"
import { moderateScale } from 'react-native-size-matters';
import Barcode from 'react-native-barcode-svg';

let datearr = moment().format('l').split("/")
let month= datearr[0], day = datearr[1], year = datearr[2]
if (parseInt(month) >= 6 && parseInt(day) >= 3){
    year = {start: parseInt(year), end: parseInt(year)+1}
}
else{
    year = {start: parseInt(year)-1, end: parseInt(year)}
}
export const IdCard = () => {
    const[data, setData] = useState({firstName: "", lastName: "", shortID: "", longID: "", grade: ""})
    useEffect(()=>{
        const func = async() => {
            let accountInfo = await AsyncStorage.getItem("accountInfo")
            setData(JSON.parse(accountInfo))
        }
        func()
    }, [])
    const Ihsimage = () => {
        return(
            <Image style={{height: moderateScale(110), width: moderateScale(110), margin: moderateScale(10)}} source={require('../../assets/images/IHSLOGO.png')}/>
        )
    }
    return(
    <View style={styles.container}>
        <Card style={styles.card}>
            <Card.Title title={data.lastName + ", " + data.firstName} style={styles.cardTitle} titleStyle={{fontSize: moderateScale(25)}}/>
            <View style={{paddingHorizontal: 23, marginBottom: 5,justifyContent: 'space-between', width: '100%', flexDirection: 'row'}}>
                <Text style={{fontSize: moderateScale(20)}}>{12-(data.graduationYear-year.end)}</Text>
                <Text style={{fontSize: moderateScale(20)}}>{data.longID}</Text>
                <Text style={{fontSize: moderateScale(20), fontWeight: 'bold'}}>{data.shortID}</Text>
            </View>
            <View style={{width: '100%', height: 5, backgroundColor: "#006400"}}/>
            <View style={{flexDirection: 'row', height: '65%', padding: 30, justifyContent: 'center', alignItems: 'center'}}>
            
            <View style={{flexDirection: 'column', width: '100%', alignItems: 'center'}}>
            {/* <ImageBackground source={require('../../assets/images/silverBackground.png')} style={{width: '80%', height: '65%'}}>
            </ImageBackground> */}
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0}}>
                <Text style={{fontSize: moderateScale(30), fontWeight: 'bold'}}>{year.start}</Text>
                <Ihsimage/>
                <Text style={{fontSize: moderateScale(30), fontWeight: 'bold'}}>{year.end}</Text>
            </View>
                <Barcode value={data.longID} format="CODE39" height={moderateScale(60)} maxWidth={moderateScale(288)}/>
            </View>
            {/* <Image source={require('../../assets/images/Patrick.jpg')} style={{width: '30%', height: '95%', borderWidth: 3, borderColor: 'black'}}/> */}
            </View>
            
            
        </Card>
    </View>
    )
}

const styles=StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    card: {
        width: moderateScale(470),
        height: moderateScale(320),
        borderRadius: 15,
        marginTop: moderateScale(97),
        transform: [{rotate: '90deg'}],

    },
    cardTitle: {
        backgroundColor: 'transparent',
    }
})