import React, { useEffect, useState } from 'react';
import { Text, View } from "../../components/Themed";
import {Card} from 'react-native-paper'
import { StyleSheet, Dimensions } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import {Subtitle} from 'native-base'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ClubContext} from './ClubContext'
import { moderateScale } from 'react-native-size-matters';

export const Club_Page= ({navigation, route})=>{
    let context = React.useContext(ClubContext)
    const [type, setType] = useState("all")
    useEffect(()=>{
        const func = async() => {
            let saved = await AsyncStorage.getItem("savedClubs");
            let savedParsed = JSON.parse(saved)
            for (let i = 0; i < savedParsed?.length; i++){
                if (savedParsed[i].clubname == route.params.clubname){
                    setType("saved")
                }
            }
        }
        func()
    }, [])
    let {clubname, clubadvisor, clubroom, clubmeeting, clubleader, clubinfo} = route.params
    let font_size=moderateScale(50)
    if (clubinfo===undefined){
        clubinfo='NA'
    }
    const name_arr=clubname.split(' ')
    let totalCharacters=0;
    for (let i = 0; i < name_arr.length; i++){
        totalCharacters+=name_arr[i].length;
    }   
    if (totalCharacters>=20){
        font_size=moderateScale(40)
    }
    if (totalCharacters>=30){
        font_size=moderateScale(30)
    }
    
    const changeStatusClub = async() => {
        if (type=="all"){
            let prev = await AsyncStorage.getItem("savedClubs");
            //let prevParsed = JSON.parse(prev);
            if (prev==null){
                await AsyncStorage.setItem("savedClubs", JSON.stringify([]))
            }
            else{
                let parsed = JSON.parse(prev)
                let newData = [...parsed, route.params]
                await AsyncStorage.setItem("savedClubs", JSON.stringify(newData)).then(context.changeStatusClub(newData));
                
                navigation.goBack()
            }
        }
        else{
            let prev = await AsyncStorage.getItem("savedClubs");
            let parsed = JSON.parse(prev)
            let newData = parsed.filter((p)=>p.clubname !== clubname)
            await AsyncStorage.setItem("savedClubs", JSON.stringify(newData)).then(context.changeStatusClub(newData))
            navigation.goBack()
        }
    }

    // const AddToSavedClubs = () =>{
        
    //     save_club((my_clubs) => my_clubs.concat(route.params))
    //     console.log(saved_clubs)
    // }

    return(
        <ScrollView style={{backgroundColor: 'white', height: '100%'}}>
            <View style={styles.container}>
                <View style={styles.clubTitle}>
                    <Text adjustsFontSizeToFit={true} style={[styles.title, {fontSize: font_size, color: route.params.colorObj.primary}]}>{clubname}</Text>       
                </View>
                <View style={{height: 1, width: '90%', backgroundColor: 'lightblue', marginVertical: moderateScale(10), alignSelf: 'center'}}/>
                <Card style={[styles.cardstyle, {shadowColor: route.params.colorObj.primary}]}>
                    <Text style={styles.infoHeader}>Description:</Text>
                    <Text style={styles.additional_info_text}>{clubinfo}</Text>
                </Card>
                <Card style={[styles.cardstyle, {shadowColor: route.params.colorObj.primary}]}>
                    <Text style={{fontSize: 23, fontWeight: 'bold', marginBottom: 5, fontFamily: 'OpenSansSemiBold'}}>Additional Info:</Text>
                    <View style={{backgroundColor: 'transparent', paddingRight: 160}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.additional_info_header}>President: </Text>
                            <Text style={styles.additional_info_text}>{clubleader}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.additional_info_header}>Advisor: </Text>
                            <Text style={styles.additional_info_text}>{clubadvisor}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.additional_info_header}>Room: </Text>
                            <Text style={styles.additional_info_text}>{clubroom}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.additional_info_header}>Meeting: </Text>
                            <Text style={styles.additional_info_text}>{clubmeeting}</Text>
                        </View>
                    </View>
                    {/* <Text style={{fontSize: 17, color: 'grey', fontStyle: 'italic', marginVertical: 6}}>{clubinfo}</Text> */}
                </Card>
                <TouchableOpacity style={[styles.applyButton,{backgroundColor: route.params.colorObj.primary}]} onPress={changeStatusClub}>
                    {type == "all"? <Text style={styles.infoHeader}>Save</Text>:
                        <Text style={styles.infoHeader}>Unsave</Text>
                    }
                </TouchableOpacity>
            </View>
            
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 15,
    },
    title: {
        fontFamily: 'OpenSansSemiBold',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        textAlign: 'center', 
        color: 'black'
    },
    additional_info_header:{
        fontSize: 18, 
        color: 'black', 
        marginTop: 6, 
        fontFamily: 'OpenSansSemiBold'
    },
    additional_info_text: {
        fontSize: 17, 
        color: 'grey', 
        fontStyle: 'italic', 
        marginVertical: 6, 
        fontFamily: 'OpenSansSemiBold'
    },
    cardstyle: {
        alignItems: 'flex-start', 
        padding: 11, 
        borderRadius: 10, 
        shadowRadius: 5, 
        shadowOpacity: 0.3, 
        shadowOffset: {width: 1, height: 1}, 
        marginTop: 10,

    },
    clubTitle: {
        backgroundColor: 'transparent', 
        marginTop: moderateScale(10), 
        alignSelf: 'center', 
        height: moderateScale(150), 
        justifyContent: 'center',
        marginBottom: moderateScale(15),
    },
    infoHeader: {
        fontSize: 23, 
        fontWeight: 'bold', 
        fontFamily: 'OpenSansSemiBold'
    },
    applyButton: {
        width: '100%', 
        height: 60, 
        backgroundColor: 'rgba(0, 147, 135, 0.6)', 
        marginVertical: 20, 
        borderRadius: 10, 
        alignSelf: 'center', 
        shadowOpacity: 0.3, 
        shadowOffset: {width:0, height: 3}, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})