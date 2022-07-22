import AsyncStorage from "@react-native-async-storage/async-storage";
import React from 'react'
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity, Button, Alert } from 'react-native'
import { moderateScale } from 'react-native-size-matters';
import { Fumi } from "react-native-textinput-effects";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Swiper from 'react-native-web-swiper';
import { AuthContext } from '../components/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const ConfigurePersonalInfoScreen = ({navigation, route}) => {
    const colorObj = route.params.colorObj
    const {Schedule, setSchedule} = React.useContext(AuthContext)
    let obj = Schedule
    const [object, setObject] = useState(obj)
    const swiperRef = useRef(null);
    const [index, updateIndex] = useState(0);
    const [loading, setLoading] = useState(false)
    const goNext = () => {
      let goAhead = true
      Object.values(object).forEach((element) => {
        if(element.length < 3){
          Alert.alert("Minimum length must be 3 letters")
          goAhead=false
        }
        else if (element.length > 11){
          Alert.alert("Maximum length must be 11 letters")
          goAhead=false
        }
      });
      if (goAhead){
        swiperRef.current.goToNext()
      }
    }
    const goPrev = () => {
        swiperRef.current.goToPrev()
    }
    const [allBackground, setAllBackground]= useState(colorObj.primary);
    const [teacherBackground, setTeacherBackground]= useState("");
    const DropDownMenu = () => {
        return (
          <View style={{ flexDirection: "row", alignSelf: 'center' }}>
            <TouchableOpacity
              onPress={()=>{goPrev() ;setTeacherBackground('transparent'); setAllBackground(colorObj.primary)}}
              style={{
                width: moderateScale(150),
                height: moderateScale(40),
                borderWidth: 1.5,
                borderColor: colorObj.primary,
                alignItems: "center",
                justifyContent: "center",
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10,
                backgroundColor: allBackground
              }}
            >
              <Text style={{ fontSize: moderateScale(15), color: "black" }}>Odd</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{goNext();setTeacherBackground(colorObj.primary); setAllBackground("transparent")}}
              style={{
                width: moderateScale(150),
                height: moderateScale(40),
                borderLeftWidth: 0,
                borderWidth: 1.5,
                borderColor: colorObj.primary,
                alignItems: "center",
                justifyContent: "center",
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                backgroundColor: teacherBackground
              }}
            >
              <Text style={{ fontSize: moderateScale(15), color: "black" }}>Even</Text>
            </TouchableOpacity>
          </View>
        );
      };
    const handleSubmit = async() => {
        let goAhead = true;
        Object.values(object).forEach((element) => {
          if(element.length < 3){
            Alert.alert("Minimum length must be 3 letters")
            goAhead=false
          }
          else if (element.length > 11){
            Alert.alert("Maximum length must be 11 letters")
            goAhead=false
          }
        });
        if (goAhead){
          setLoading(true)
            setSchedule(object)
            await AsyncStorage.setItem("scheduleDetails", JSON.stringify(Schedule))
            .then(()=>setLoading(false))
            navigation.navigate("HomeScreen")
        }
    }
    const FumiInput = ({ objKey, type, icon }) => {
        const [text, changeText] = useState(Schedule[objKey])
        const onChange = (text) => {
            changeText(text)
            setObject((prev)=>{
              let newVal = Object.assign(prev, {})
              newVal[objKey] = text;
              return newVal
            })
        }
        return (
          <Fumi
            label={type}
            style={{
              marginBottom: moderateScale(10),
              borderRadius: 20,
              height: moderateScale(12),
              width: '100%',
            }}
            value={text}

            iconClass={MaterialCommunityIcons}
            iconName={icon}
            iconColor={colorObj.primary}
            iconSize={moderateScale(25)}
            inputPadding={moderateScale(15)}
            
            inputStyle={{marginTop: moderateScale(-11)}}
            autoCapitalize="none"
            onChangeText={(text) => onChange(text)}
          />
        );
      };
    return(
        <View style={[styles.container, {backgroundColor: colorObj.lightbackground}]}>
            {/* <DropDownMenu /> */}
            <Swiper
                onIndexChanged={(index)=>updateIndex(index)}
                gesturesEnabled={()=>false}
                ref={swiperRef}
                controlsProps={{
                    dotsTouchable: true,
                    prevPos: false,
                    nextPos: false,
                    DotComponent: ({ index, isActive, onPress }) => (
                    <View
                        style={[
                        isActive
                            ? { backgroundColor: "white" }
                            : { backgroundColor: "black" },
                        ]}
                    />
                    ),
                }}
                >
                <View style={styles.customizeClasses}>
                  <View style={{marginBottom: moderateScale(20), alignItems: 'center', justifyContent:'center', backgroundColor: colorObj.primary, paddingHorizontal: moderateScale(14), borderRadius: moderateScale(20), paddingVertical: moderateScale(5)}}>
                    <Text style={{color: 'white',fontSize: moderateScale(22), fontFamily: 'OpenSansSemiBold'}}>Odd Periods</Text>
                  </View>
                    <FumiInput objKey="Period 1" type={"Period 1"}icon="pencil"/>
                    <FumiInput objKey="Period 3" type={"Period 3"} icon="pencil"/>
                    <FumiInput objKey="Period 5" type={"Period 5"} icon="pencil"/>
                    <FumiInput objKey="Period 7" type={"Period 7"} icon="pencil"/>
                </View>
                <View style={styles.customizeClasses}>
                <View style={{marginBottom: moderateScale(20), alignItems: 'center', justifyContent:'center', backgroundColor: colorObj.primary, paddingHorizontal: moderateScale(14), borderRadius: moderateScale(20), paddingVertical: moderateScale(5)}}>
                    <Text style={{color: 'white',fontSize: moderateScale(22), fontFamily: 'OpenSansSemiBold'}}>Even Periods</Text>
                  </View>                   
                    <FumiInput objKey="Period 2" type={"Period 2"} icon="pencil"/>
                    <FumiInput objKey="Period 4" type={"Period 4"} icon="pencil"/>
                    <FumiInput objKey="Period 6" type={"Period 6"} icon="pencil"/>
                    <FumiInput objKey="Period 8" type={"Period 8"} icon="pencil"/>
                </View>
            </Swiper>
            <View style={{flex: 1/3, justifyContent: 'center', alignItems: 'center'}}>
              {index==0 ?
              <TouchableOpacity onPress={goNext} style={[styles.submit, {backgroundColor: colorObj.primary}]}>
                    <Text style={styles.subTitle1}>Next</Text>
                </TouchableOpacity>:
                <TouchableOpacity onPress={handleSubmit} style={[styles.submit, {backgroundColor: colorObj.primary}]}>
                <Text style={styles.subTitle1}>Save</Text>
            </TouchableOpacity>}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: 'rgba(233, 251, 251, 0.96)',
        paddingHorizontal: moderateScale(20)
    },
    title: {
        fontFamily: "OpenSansSemiBold",
                fontSize: 30,
                // fontWeight: "bold",
                marginVertical: 25,
                alignSelf: "flex-start",
                marginLeft: "5%",
                
    },
    subTitle: {
        fontFamily: "OpenSansSemiBold",
                fontSize: 20,
                // fontWeight: "bold",
                marginTop: 25,
                alignSelf: "flex-start",
                marginBottom: moderateScale(20)
    },
    customizeClasses: {
        flex: 1,
        alignItems: 'center',
        padding: moderateScale(20),
    },
    input: {
        alignSelf:'center', width: moderateScale(330)
    },
    submit: {
      height: moderateScale(60),
      width: "90%",
      alignSelf: 'center',
      backgroundColor: 'lightblue',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: moderateScale(20),
      borderRadius: moderateScale(30)
  },
    subTitle1: {
      fontFamily: "OpenSansSemiBold",
      fontSize: 20,
              // fontWeight: "bold",
  },
})

export default ConfigurePersonalInfoScreen