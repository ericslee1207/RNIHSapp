import React from 'react';
import {Text, View, StyleSheet, Dimensions, ImageBackground, Image} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';

const year=[{start: 2020, end: 2021}]
export const IdCard = () => {
    const Ihsimage = () => {
        return(
            <Image style={{height: 110, width: 110, margin: 10}} source={require('../../assets/images/IHSLOGO.png')}/>
        )
    }
    return(
    <View style={styles.container}>
        <Card style={styles.card}>
            <Card.Title title='Lee, Eric' style={styles.cardTitle} titleStyle={{fontSize: 25}}/>
            <View style={{paddingHorizontal: 23, marginBottom: 5,justifyContent: 'space-between', width: '100%', flexDirection: 'row'}}>
                <Text style={{fontSize: 20}}>11</Text>
                <Text style={{fontSize: 20}}>19639</Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Lunch</Text>
            </View>
            <View style={{width: '100%', height: 5, backgroundColor: "#006400"}}/>
            <View style={{flexDirection: 'row', height: '75%', padding: 30}}>
            
            <View style={{flexDirection: 'column', width: '70%', alignItems: 'flex-start'}}>
            {/* <ImageBackground source={require('../../assets/images/silverBackground.png')} style={{width: '80%', height: '65%'}}>
            </ImageBackground> */}
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: -10}}>
                <Text style={{fontSize: 33, fontWeight: 'bold'}}>{year[0].start}</Text>
                <Ihsimage/>
                <Text style={{fontSize: 33, fontWeight: 'bold'}}>{year[0].end}</Text>
            </View>
            <Image source={require('../../assets/images/barcode.jpg')} style={{width: '90%', height: '30%'}}/>
            </View>
            <Image source={require('../../assets/images/Patrick.jpg')} style={{width: '30%', height: '95%', borderWidth: 3, borderColor: 'black'}}/>
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
        width: Dimensions.get('window').height*0.65,
        height: Dimensions.get('window').width*0.86,
        borderRadius: 15,
        marginTop: Dimensions.get('window').height*0.18,
        transform: [{rotate: '90deg'}],

    },
    cardTitle: {
        backgroundColor: 'transparent',
    }
})