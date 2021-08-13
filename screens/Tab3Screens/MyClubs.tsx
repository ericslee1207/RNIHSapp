import React, { useEffect, useState } from 'react';
import { Text, View } from "../../components/Themed";
import {Card} from 'react-native-paper'
import { StyleSheet, Dimensions } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import {Subtitle} from 'native-base'
import {ClubContext} from './ClubContext'
import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from 'react-native';


export const MyClubs= ({navigation, route})=>{
    const [savedClubs, saveClub] = useState([]);

    let {clubname, clubadvisor, clubroom, clubmeeting, clubleader, clubinfo} = route.params.item
    let font_size=50
    if (clubinfo===undefined){
        clubinfo='NA'
    }
    const name_arr=clubname.split(' ')
    if (name_arr.length>=5){
        font_size=40
    }


    return(
        <ScrollView style={{backgroundColor: 'white', height: '100%'}}>
            <View style={styles.container}>
                <View style={styles.clubTitle}>
                    <Text style={[styles.title, {fontSize: font_size}]}>{clubname}</Text>       
                </View>
                <View style={{height: 1, width: '90%', backgroundColor: 'lightblue', marginVertical: 20, alignSelf: 'center'}}/>
                <Card style={styles.cardstyle}>
                    <Text style={styles.infoHeader}>Description:</Text>
                    <Text style={styles.additional_info_text}>{clubinfo}</Text>
                </Card>
                <Card style={styles.cardstyle}>
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
        shadowRadius: 3, 
        shadowOpacity: 0.4, 
        shadowOffset: {width: 2, height: 2}, 
        marginTop: 10,
        elevation: 5

    },
    clubTitle: {
        backgroundColor: 'transparent', 
        marginTop: 10, 
        alignSelf: 'center', 
        height: 200, 
        justifyContent: 'center'
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