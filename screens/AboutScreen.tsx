import React, {useState} from 'react'
import {View, StyleSheet, Image, Text, ScrollView, TouchableOpacity, Linking, Button} from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { MaterialIcons } from '@expo/vector-icons'; 
const AboutScreen = () => {
    
    return(
        <ScrollView style={styles.container}>
            <View style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: moderateScale(75), width: moderateScale(150), height: moderateScale(150), borderWidth: 6, borderColor: "#04b5a7", alignSelf: 'center'}}>
                <Image style={{height: moderateScale(130), width: moderateScale(130), borderRadius: moderateScale(65)}} source={require("../assets/images/correctCropLogo.png")}/>
            </View>
            <View style={{width: '100%', backgroundColor: 'white', marginTop: moderateScale(20), borderRadius: moderateScale(20), padding: moderateScale(15)}}>
                <Text style={{alignSelf: 'center', fontFamily: "OpenSansSemiBold", fontSize: moderateScale(19)}}>
                    The Beginning
                </Text>
                <Text style={{textAlign: 'justify',marginVertical: moderateScale(10), marginHorizontal: moderateScale(10), fontFamily: "OpenSansRegular", fontSize: moderateScale(15)}}>
                    Irvine High Mobile first started as a mission to provide Irvine High School students with a dependable dynamic schedule. It was developed in 2020 and released in 2021. 
                </Text>
            </View>
            <View style={{alignItems: 'center',width: '100%', backgroundColor: 'white', marginTop: moderateScale(20), borderRadius: moderateScale(20), padding: moderateScale(15), marginBottom: moderateScale(0)}}>
                <Text style={{textAlign: 'center',alignSelf: 'center', fontFamily: "OpenSansSemiBold", fontSize: moderateScale(19)}}>
                    School Information
                </Text>
                <Text style={{fontFamily: 'OpenSansSemiBold',textAlign: 'center',marginTop: moderateScale(10), marginHorizontal: moderateScale(10),  fontSize: moderateScale(16)}}>
                    IHS Main Office #: <Text style={{fontSize: moderateScale(15),fontFamily: 'OpenSansRegular'}}>{"\n"}(949) 936 7000</Text>
                </Text>
                <Text style={{textAlign: 'center',marginTop: moderateScale(10), marginHorizontal: moderateScale(10), fontFamily: 'OpenSansSemiBold',fontSize: moderateScale(16)}}>
                    IHS Address: <Text style={{fontSize: moderateScale(15),fontFamily: 'OpenSansRegular'}}>{"\n"}4321 Walnut Ave. Irvine, CA 92604-2239</Text>
                </Text>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        {/* <TouchableOpacity onPress={()=>Linking.openURL("https://www.instagram.com/eric_le.e/")}>
                            <Image source={require("../assets/images/instagramLogo.png")} style={{height: moderateScale(35), width: moderateScale(35), marginTop: moderateScale(10)}}/>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity onPress={()=>Linking.openURL(`mailto:ericslee1207@gmail.com`)}>
                            <MaterialIcons name="email" size={moderateScale(35)} color="lightblue" style={{marginTop: moderateScale(8), marginLeft: moderateScale(5)}}/>
                        </TouchableOpacity> */}
                    </View>
                    
            </View>
            <View style={{alignItems: 'center',width: '100%', backgroundColor: 'white', marginTop: moderateScale(20), borderRadius: moderateScale(20), padding: moderateScale(15), marginBottom: moderateScale(50)}}>
                <Text style={{textAlign: 'center',alignSelf: 'center', fontFamily: "OpenSansSemiBold", fontSize: moderateScale(19)}}>
                    Send Feedback
                </Text>
                <Text style={{textAlign: 'justify',marginVertical: moderateScale(10), marginHorizontal: moderateScale(10), fontFamily: "OpenSansRegular", fontSize: moderateScale(15)}}>
                    Any feedbacks appreciated!
                </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        {/* <TouchableOpacity onPress={()=>Linking.openURL("https://www.instagram.com/eric_le.e/")}>
                            <Image source={require("../assets/images/instagramLogo.png")} style={{height: moderateScale(35), width: moderateScale(35), marginTop: moderateScale(10)}}/>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={()=>Linking.openURL(`mailto:ericslee1207@gmail.com`)}>
                            <MaterialIcons name="email" size={moderateScale(35)} color="lightblue" style={{marginTop: moderateScale(8), marginLeft: moderateScale(5)}}/>
                        </TouchableOpacity>
                    </View>
                    
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(233, 251, 251, 0.96)",
        // alignItems: 'center',
        paddingTop: moderateScale(20),
        paddingHorizontal: moderateScale(30),

    }
})

export default AboutScreen