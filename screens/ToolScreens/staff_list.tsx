import {Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon} from 'native-base';
import React from 'react';
import {TouchableHighlight, Linking, View} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 

import { moderateScale } from 'react-native-size-matters';
export const Staff_List = (props) => {
    const namearr = props.data.Name.split(" ")
    const firstNameInitial = namearr[0].charAt(0);
    const lastNameInitial = namearr[namearr.length-1].charAt(0)
    let textColor="black"
    if (props.preferences.colorObj.primary =="#7361ff"){
        textColor="white"
    }
    return(
        <ListItem key={props.data.id}>
            <Left>
                <View style={{height: moderateScale(52), width: moderateScale(52), borderRadius: moderateScale(26),justifyContent: 'center', alignItems: 'center', backgroundColor: props.preferences.colorObj.primary, opacity: 0.9, shadowColor: "grey", shadowOpacity: 0.9, shadowOffset: {height: 1, width:1}}}>
                    <Text style={{fontFamily: 'OpenSansSemiBold', fontSize: moderateScale(16), color: textColor}}>{firstNameInitial}{lastNameInitial}</Text>
                </View>          
                </Left>
            <Body style={{marginLeft: -110}}>
                <Text style={{fontFamily: 'OpenSansSemiBold', fontSize: moderateScale(18)}}>{props.data.Name}</Text>
            </Body>
            <Right>
                <TouchableHighlight style={{height: moderateScale(20), width: moderateScale(40)}} onPress={()=>{Linking.openURL(`mailto:${props.data.Email}`)}}>
                    <Text style={{color: 'green', fontSize: moderateScale(15), fontFamily: 'OpenSansRegular'}}>Email</Text>
                </TouchableHighlight>
            </Right>
        </ListItem>
    )
}