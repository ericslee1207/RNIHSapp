import {Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon} from 'native-base';
import React from 'react';
import {TouchableHighlight, Linking} from 'react-native'
export const Staff_List = (props) => {
    return(
        <ListItem key={props.data.id}>
            <Left>
                <Thumbnail style={{height: 50, width: 50}} source={{uri: props.data.pfp}}/>
            </Left>
            <Body style={{marginLeft: -110}}>
                <Text style={{fontFamily: 'Trebuchet MS', fontSize: 18}}>{`${props.data.last_name}, ${props.data.first_name}`}</Text>
            </Body>
            <Right>
                <TouchableHighlight style={{height: 20, width: 40}} onPress={()=>{Linking.openURL(`mailto:${props.data.email}`)}}>
                    <Text style={{color: 'green'}}>Email</Text>
                </TouchableHighlight>
            </Right>
        </ListItem>
    )
}