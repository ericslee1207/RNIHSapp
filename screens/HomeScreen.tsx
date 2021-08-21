import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Linking,
  Dimensions,
  Alert,
} from "react-native";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import {LinearGradient} from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from "../components/Themed";
import {AdayorBday} from "./AdayorBday"
import moment from "moment";
import { classDetail } from "./classDetails";
import firebase from 'firebase'

import { HorizontalCarousel } from "./HorizontalCarousel";
import {MontoFri} from "./MontoFri"
import oddPeriods from "../OddPeriods.json";
import mondayPeriods from "../MondayPeriods.json"
import tuesdayPeriods from "../TuesdayPeriods.json"
import wednesdayPeriods from "../WednesdayPeriods.json"
import thursdayPeriods from "../ThursdayPeriods.json"
import fridayPeriods from "../FridayPeriods.json"
import evenPeriods from "../EvenPeriods.json";
import { moderateScale } from "react-native-size-matters";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { useIsFocused } from "@react-navigation/native";
import CircleTimer from "./CircleTimer"
import { AuthContext } from "../components/AuthContext";
import { firebaseConfig } from "../config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let scheduleRef = firebase.firestore().collection("schedule")

function inbetween(first: string, second: string, now: string) {
  const arr = now.split(" ").join(",").split(":").join(",").split(",");
  let nowhour = parseInt(arr[0]);
  const nowminute = parseInt(arr[1]);
  const nowampm = arr[2];
  const arr1 = first.split(" ").join(",").split(":").join(",").split(",");
  let firsthour = parseInt(arr1[0]);
  const firstminute = parseInt(arr1[1]);
  const firstampm = arr1[2];
  const arr2 = second.split(" ").join(",").split(":").join(",").split(",");
  let secondhour = parseInt(arr2[0]);
  const secondminute = parseInt(arr2[1]);
  const secondampm = arr2[2];

  if (nowhour===12 && nowampm==="AM"){
    return false;
  }
  if (secondampm === "PM" && secondhour < 12) {
    secondhour += 12;
  }

  if (nowampm === "PM" && nowhour < 12) {
    nowhour += 12;
  }
  if (firstampm === "PM" && firsthour < 12) {
    firsthour += 12;
  }
  if (nowhour === firsthour) {
    if (nowminute >= firstminute) {
      return true;
    } else {
      return false;
    }
  } else if (nowhour > firsthour && nowhour < secondhour) {
    return true;
  } else if (nowhour === secondhour) {
    if (nowminute < secondminute) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

const ScheduleItem = (props: any) => {
  let trueperiod = true;
  if (props.data.period === "*") {
    trueperiod = false;
  }

  const arr = props.data.time
    .split(" ")
    .join(",")
    .split(":")
    .join(",")
    .split(",");
  let nowhour = arr[0];
  const nowminute = arr[1];
  const nowampm = arr[2];

  
  
  const inRadius = (data, currentPeriod) => {
    let radius = props.preferences.radius;
    if (Math.abs(data.id - currentPeriod.id)<radius && (data.id - currentPeriod.id) >0){
      return true;
    }
    return false;
  }
  let xDomain = Math.abs(props.data.id - props.currentPeriod.id)
  if (xDomain>1){
    xDomain=1;
  }
  let fontSize = moderateScale(25) - xDomain*moderateScale(4)
  let subFontSize = moderateScale(16) - xDomain*moderateScale(0.9)
  let height = moderateScale(100) - xDomain*moderateScale(15)
  let width = `${(72 - 11 * xDomain)}%`
  let subject = props.data.subject;
  if (props.data.period !== "*" && props.data.period !== "Flex"){
    subject = props.periodNames[props.data.subject]
  }
  if (props.highlightPeriod) {
    return (
      <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View style={[styles.scheduleFormat1, {height: height, width: width, backgroundColor: props.preferences.colorObj.primary, opacity: 0.8, borderRadius: moderateScale(55)}]}>
          {/* <Text
            style={{
              fontFamily: "OpenSansSemiBold",
              fontSize: 27,
              fontStyle: "italic",
            }}
          >
            {props.data.period}
          </Text> */}
          <Text style={{ fontFamily: "OpenSansSemiBold", fontSize:  fontSize, color: 'white'}}>
            {subject}
          </Text>
          <View
            style={{ alignItems: "flex-end", backgroundColor: "rgba(0,0,0,0)" }}
          >
            
            {/* <Detailbutton /> */}
          </View>
        </View>
          <Text
            style={{
              fontFamily: "OpenSansSemiBold",
              fontSize: subFontSize,
              fontWeight: "bold",
              marginVertical: 1,
            }}
          >
            {nowhour}:{nowminute} {nowampm}
          </Text>
        </View>
    );
  } else if (inRadius(props.data, props.currentPeriod)) {
    return (
      <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <View style={[styles.scheduleFormat1, {height: height, width: width}]}>
        {/* <Text
          style={{
            fontFamily: "OpenSansSemiBold",
            fontSize: 27,
            fontStyle: "italic",
          }}
        >
          {props.data.period}
        </Text> */}
        <Text style={{ fontFamily: "OpenSansSemiBold", fontSize: fontSize, color: props.preferences.colorObj.primary }}>
          {subject}
        </Text>
        <View
          style={{ alignItems: "flex-end", backgroundColor: "rgba(0,0,0,0)" }}
        >
          
        </View>
      </View>
      <Text
            style={{
              fontFamily: "OpenSansSemiBold",
              fontSize: subFontSize,
              fontWeight: "bold",
              marginVertical: 1,
            }}
          >
            {nowhour}:{nowminute} {nowampm}
          </Text> 
      </View>

    );
  }
  else{
    return <></>
  }
};



export default function HomeScreen() {
  const { Schedule } = React.useContext(AuthContext)
  const [periods, setPeriods] = useState()
  const [upcomingPeriods, setUpcomingPeriods] = useState()
  const [currentPeriod, setCurrentPeriod] = useState()
  const [comingPeriod, setComingPeriod] = useState()
  const [evenOrOdd, setEvenOrOdd] = useState()
  const currentDate = new Date();
  
  const [datenow, updateDate] = useState(moment(currentDate));
  const withSeconds = datenow.format("LTS");
  const dayOfWeek = datenow.format('dddd')
  const [fontSize, setFontSize] = useState(moderateScale(27))
  const [preferences, setPreferences] = useState({
    isCircle: false,
    radius: 3,
    colorObj: {
      primary :"#04b5a7",
      highlight : "hsl(165, 100%, 80%)",
      lightbackground : "rgba(233, 251, 251, 0.96)",
      darkbackground : "#D3E7EE"
    },
  })
  const [user, setUser] = useState({})
  const secondarr = withSeconds
    .split(" ")
    .join(",")
    .split(":")
    .join(",")
    .split(",");
    
  const curSecond = parseInt(secondarr[2]);
  const [index, setIndex] = useState(curSecond);
  const isFocused = useIsFocused();
  const timeNow = datenow.format("LT");
    // const timeNow = "9:55 AM"
    const datenow_split = timeNow
      .split(" ")
      .join(",")
      .split(":")
      .join(",")
      .split(",");
    const datenow_hour = parseInt(datenow_split[0]);
    const datenow_minute = parseInt(datenow_split[1])
    const datenow_ampm = datenow_split[2];
  
  useEffect(()=>{
    const setUp = async() => {
      const dayOfWeek = datenow.format("dddd")
      // const dayOfWeek = "Monday"
        if (dayOfWeek=="Tuesday"){
          await scheduleRef.doc("tuesday").get().then(async(doc)=>{
            setPeriods(doc.data().tuesday)
            setEvenOrOdd('odd')
            if (afterSchoolEnded(doc.data().tuesday)){
              await scheduleRef.doc("wednesday").get().then((doc1)=>{
                setUpcomingPeriods(doc1.data().wednesday)
              })
            }
          })
          
        }
        else if (dayOfWeek == "Wednesday"){
          await scheduleRef.doc("wednesday").get().then(async(doc)=>{
            setPeriods(doc.data().wednesday)
            setEvenOrOdd('even')
            if (afterSchoolEnded(doc.data().wednesday)){
              await scheduleRef.doc("thursday").get().then((doc1)=>{
                setUpcomingPeriods(doc1.data().thursday)
              })
            }
          })
          
        }
        else if(dayOfWeek=="Thursday"){
          await scheduleRef.doc("thursday").get().then(async(doc)=>{
            setPeriods(doc.data().thursday)
            setEvenOrOdd('odd')
            if (afterSchoolEnded(doc.data().thursday)){
              await scheduleRef.doc("friday").get().then((doc1)=>{
                setUpcomingPeriods(doc1.data().friday)
              })
            }
          })
          
        }
        else if(dayOfWeek=="Friday"){
          await scheduleRef.doc("friday").get().then(async(doc)=>{
            setPeriods(doc.data().friday)
            setEvenOrOdd('even')
            if (afterSchoolEnded(doc.data().friday)){
              await scheduleRef.doc("monday").get().then((doc1)=>{
                setUpcomingPeriods(doc1.data().monday)
              })
            }
          })
          
        }
        else if (dayOfWeek=="Monday"){
          await scheduleRef.doc("monday").get().then(async(doc)=>{
            setPeriods(doc.data().monday)
            setEvenOrOdd('neither')
            if (afterSchoolEnded(doc.data().monday)){
              await scheduleRef.doc("tuesday").get().then((doc1)=>{
                setUpcomingPeriods(doc1.data().tuesday)
              })
            }
          })
          
        }
        else{
          await scheduleRef.doc("monday").get().then(async(doc)=>{
            setPeriods(doc.data().monday)
            setEvenOrOdd('neither')
            if (afterSchoolEnded(doc.data().monday)){
              await scheduleRef.doc("monday").get().then((doc1)=>{
                setUpcomingPeriods(doc1.data().monday)
              })
            }
          })
          
        }
    }
    setUp()
    
  },[datenow_minute])
  
  useEffect(() => {
    updateDate(moment(new Date()))
      setInterval(() => {
        setIndex((index) => index + 1);
      }, 1000);
    },
    []);
  useEffect(() => {
    updateDate(moment(new Date()));
    if (periods!==undefined){
      checkCurrentandNextPeriod()
    }
  }, [index]);
  useEffect(()=>{
    const getPreferences = async() => {
      let preferences = await AsyncStorage.getItem("SettingConfigurations")
      let preferencesParsed = JSON.parse(preferences)
      setPreferences(preferencesParsed)
      let user = await AsyncStorage.getItem("accountInfo")
      let userParsed = JSON.parse(user)
      if (userParsed.firstName.length >=9){
        let size = moderateScale(27) - moderateScale(0.4)*userParsed.firstName.length
        setFontSize(size)
      }
      setUser(userParsed)

    }
    getPreferences()
  }, [isFocused])
  let classes = [];
  const changeTo24Hour = (time) => {
    const arr = time
    .split(" ")
    .join(",")
    .split(":")
    .join(",")
    .split(",");
    let hour = parseInt(arr[0]);
    let minute = parseInt(arr[1]);
    let ampm = arr[2];
    if (hour != 12 && ampm === "PM") {
      hour += 12;
    }
    if (hour == 12 && ampm=="AM"){
      hour-=12;
    }
    return [hour, minute, ampm]
  }
  const beforeSchoolStarts = () => {
    const firstPeriodTime = changeTo24Hour(periods[0].time)
    const nowTime = changeTo24Hour(timeNow)
    if (nowTime[0] < firstPeriodTime[0]){
      return true
    }
    else if (nowTime[0] == firstPeriodTime[0] && nowTime[1] < firstPeriodTime[1]){
      return true
    }
    return false
  }
  const afterSchoolEnded = (periods) => {
    const schoolEndTime = changeTo24Hour(periods[periods.length-1].time)
    const nowTime = changeTo24Hour(timeNow)
    if (nowTime[0] > schoolEndTime[0]){
      return true;
    }
    else if (nowTime[0]==schoolEndTime[0] && nowTime[1]> schoolEndTime[1]){
      return true;
    }
    else{
      return false;
    }

  }
  if (periods!==undefined && currentPeriod!==undefined && !beforeSchoolStarts() && !afterSchoolEnded(periods)){
    classes = periods.map((period) => {
      let highlightPeriod = false;
      if (period==currentPeriod){
        highlightPeriod = true
      }
      return(
      <View key={period.id} style={{ backgroundColor: "transparent"}}>
        <ScheduleItem periods={periods} preferences = {preferences} data={period} key={period.id} periodNames={Schedule} highlightPeriod={highlightPeriod} currentPeriod={currentPeriod}/>
      </View>)})
    }
    
    const checkCurrentandNextPeriod = () => {
    for (let i = 0; i < periods.length - 1; i++) {
      if (inbetween(periods[i].time, periods[i + 1].time, timeNow)) {
        setCurrentPeriod(periods[i]);
        setComingPeriod(periods[i + 1]);
      }

      // if (afterSchoolEnded()){

      // }
    }
    if (beforeSchoolStarts(periods)){
      setCurrentPeriod(periods[0])
      setComingPeriod(periods[0])
    }
    if (afterSchoolEnded(periods)){
      setCurrentPeriod(periods[0])
      setComingPeriod(periods[0])
    }
  }
    // if (periods!=undefined){
    //   checkCurrentandNextPeriod()
    // }
  return (
    <>
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, backgroundColor: 'rgba(233, 251, 251, 0.96)', }}>
      <View style={styles.container}>
      <LinearGradient colors={["rgba(233, 251, 251, 0.96)", "#D3E7EE"]} style={{position: 'absolute', top: -moderateScale(100), right:0, left: 0, height: moderateScale(1000)}}/>

        {/* <ImageBackground
          source={require("../assets/images/lightbluegradient.png")}
          style={{flex: 1, width: "100%", height: "100%"}}
          imageStyle={{opacity: 0.5}}
        > */}
          <View style={{flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'space-between', marginTop: moderateScale(5), alignItems: 'center'}}>
              <View style={{flexDirection: 'row', backgroundColor: 'transparent', flex: 1, marginLeft: moderateScale(15)}}>
              <Text
                style={{
                  fontFamily: "OpenSansLight",
                  fontSize: fontSize,
                  // fontWeight: "bold",
                  //marginTop: 25,
                  alignSelf: "flex-end",
                  marginLeft: moderateScale(9),
                  // marginBottom: moderateScale(5)
                }}
              >
                Hello,
              </Text>
              <Text
                allowFontScaling={true}
                style={{
                  fontFamily: "OpenSansSemiBold",
                  fontSize: fontSize,
                  // fontWeight: "bold",
                  //marginTop: 25,
                  alignSelf: "flex-end",
                  marginLeft: moderateScale(8),
                  // marginBottom: moderateScale(5)

                }}
              >
                {user.firstName}!
              </Text>
              </View>
              
            <View style={{backgroundColor: 'transparent',justifyContent: 'center',  marginRight: moderateScale(20), marginTop: moderateScale(0)}}>
              <AdayorBday colorObj={preferences.colorObj} day={evenOrOdd}/>
            </View>
            
            {/* <View style={{marginRight: moderateScale(30), backgroundColor: 'transparent', justifyContent: 'flex-end'}}>
              <Ionicons name="ios-settings" size={moderateScale(50)} color="green" />            
            </View> */}

          </View>
          {/* <View
            style={styles.separator}
            lightColor="#009387"
            darkColor="#009387"
          /> */}
          {periods!=undefined && currentPeriod!=undefined && comingPeriod!=undefined? 
          <HorizontalCarousel
            currentPeriod={currentPeriod}
            comingPeriod={comingPeriod}
            date={datenow}
            timeNow = {timeNow}
            colorObj={preferences.colorObj}
            isCircle={preferences.isCircle}
            preferences={preferences}
            fontSize={fontSize}
            periods = {periods}
            periodNames= {Schedule}
            upcomingPeriods={upcomingPeriods}
          />:<></>}
          {(dayOfWeek!="Saturday" && dayOfWeek!="Sunday") ? 
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              width: "90%",
              alignSelf: "center",
              paddingBottom: 20,
            }}
          >
            <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'row',  justifyContent: 'space-between', alignItems: 'center'}}>
              <View style={{backgroundColor: 'transparent', width: '100%'}}>

                {classes}
              </View>

            </View>
            

            
            
          </View>:
          <></>
          }
        {/* </ImageBackground> */}

        {/* <View style={{ width: "100%", height: 70 }}>
          <ImageBackground
            style={{
              width: "100%",
              height: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
              borderColor: "skyblue",
              borderWidth: 0.2,
              // shadowOffset: {
              //   height: -10
              // },
              shadowColor: 'skyblue',
              shadowOpacity: 1,
              backgroundColor: 'lightblue'
            }}
            imageStyle={{ opacity: 0.4, borderRadius: 10 }}
            source={require("../assets/images/IHSfront.jpg")}
          >
            <TouchableOpacity
              onPress={() => Linking.openURL("https://twitter.com/IHSVaqueros")}
              style={styles.contactlogoTO}
            >
              <Image
                style={styles.contactlogo}
                source={require("../assets/images/twitterlogo.jpg")}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.instagram.com/ihsvaqueros/")
              }
              style={styles.contactlogoTO}
            >
              <Image
                style={styles.contactlogo}
                source={require("../assets/images/iglogo.png")}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://iusd.tv/category/Schools%3EHigh+Schools%3EIrvine+High/76369332"
                )
              }
              style={styles.contactlogoTO}
            >
              <Image
                style={styles.contactlogo}
                source={require("../assets/images/itvlogo.png")}
              ></Image>
            </TouchableOpacity>
          </ImageBackground>
        </View> */}
      </View>
    </ScrollView>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    // backgroundColor: 'rgba(233, 251, 251, 0.96)',
    // backgroundColor: 'transparent'
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    flexDirection: "row",
  },
  subheader: {
    fontWeight: "bold",
  },
  dateFormat: {
    marginVertical: 15,
    fontSize: 22,
  },
  smallImage: {
    height: 20,
    width: 20,
    marginHorizontal: 3,
    marginBottom: 5,
  },
  imagesubtitle: {
    alignSelf: "center",
  },
  buttonStyle: {
    fontSize: 15,
  },
  calendarButtonStyle: {
    height: 30,
    width: 50,
  },
  scheduleFormat1: {
    justifyContent: "center",
    flexDirection: "row",
    padding: moderateScale(20),
    borderRadius: moderateScale(45),
    alignItems: 'center',
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 0.1,
    // alignSelf: 'center',
    marginVertical: "2%",
    elevation: 2
  },
  title: {
    fontSize: 90,
    fontFamily: "OpenSansSemiBold",
  },
  separator: {
    marginTop: 15,
    height: 1,
    alignSelf: "center",
    width: "90%",
  },
  verticalSeparator: {
    marginHorizontal: 5,
    height: "80%",
    width: 1,
  },
  contactlogo: {
    height: 30,
    width: 30,
    borderRadius: 15,
    opacity: 0.9,
    borderWidth: 0.5,
  },
  contactlogoTO: {
    justifyContent: "flex-end",
    marginBottom: 15,
    marginHorizontal: 2,
  },
});
