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

import { HorizontalCarousel } from "./HorizontalCarousel";
import {MontoFri} from "./MontoFri"
import oddPeriods from "../OddPeriods.json";
import mondayPeriods from "../MondayPeriods.json"
import evenPeriods from "../EvenPeriods.json";
import { moderateScale } from "react-native-size-matters";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { useIsFocused } from "@react-navigation/native";
import CircleTimer from "./CircleTimer"
import { AuthContext } from "../components/AuthContext";

const currentDate = new Date();
const day = moment(currentDate).format('l').split("/")[0];
const dayOfWeek = moment(currentDate).format('dddd')
// const dayOfWeek = "Tuesday"
let evenOrOdd: any;
let currentPeriod: any;
let comingPeriod: any;
if (dayOfWeek=="Tuesday" || dayOfWeek=="Thursday"){
  evenOrOdd="odd"
  currentPeriod = {
    period: 1,
    subject: "NA",
    room: "NA",
    time: "8:30 AM",
    id: 2
  };
  comingPeriod = {
    period: 2,
    subject: "NA",
    room: "NA",
    time: "10:00 AM",
    id: 3
  };
}
else if(dayOfWeek=="Wednesday" || dayOfWeek=="Friday"){
  evenOrOdd="even"
  currentPeriod = {
    period: 1,
    subject: "NA",
    room: "NA",
    time: "8:30 AM",
    id: 2
  };
  comingPeriod = {
    period: 2,
    subject: "NA",
    room: "NA",
    time: "10:00 AM",
    id: 3
  };
}
else{
  evenOrOdd="neither"
  currentPeriod = {
    period: 1,
    subject: "NA",
    room: "NA",
    time: "8:00 AM",
    id: 0
  };
  comingPeriod = {
    period: 2,
    subject: "NA",
    room: "NA",
    time: "9:00 AM",
    id: 1
  };
}

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
  const datenow = moment().format('LT');
  // const datenow = "7:59 AM"
  const datenow_split = datenow
    .split(" ")
    .join(",")
    .split(":")
    .join(",")
    .split(",");
  const datenow_hour = parseInt(datenow_split[0]);
  const datenow_minute = parseInt(datenow_split[1])
  const datenow_ampm = datenow_split[2];
  let nextPeriod = {};
  let trueperiod = true;

  if (props.data.period === "*") {
    trueperiod = false;
  }
  let curPeriod = {};
  let stoppingPoint = 0;
  for (let i = 0; i < props.periods.length - 1; i++) {
    if (inbetween(props.periods[i].time, props.periods[i + 1].time, datenow)) {
      curPeriod = props.periods[i];
      nextPeriod = props.periods[i + 1];
      stoppingPoint = i;
    }
  }
  let lastObj = {
    period: "*",
    subject: "Finishing Time",
    time: "3:50 PM",
    id: 10,
  };
  if (inbetween(props.periods[props.periods.length - 1].time, lastObj.time, datenow)) {
    curPeriod = props.periods[props.periods.length - 1];
    nextPeriod = lastObj;
    stoppingPoint = props.periods.length - 1;
  }

  // const Detailbutton = () => {
  //   if (trueperiod) {
  //     return (
  //       <TouchableOpacity
  //         style={{ width: 50, height: 20, backgroundColor: "rgba(0,0,0,0)" }}
  //         onPress={() => classDetail(props.data)}
  //       >
  //         <Text style={{ color: "#1e90ff" }}>Details</Text>
  //       </TouchableOpacity>
  //     );
  //   } else {
  //     return null;
  //   }
  // };
  const arr = props.data.time
    .split(" ")
    .join(",")
    .split(":")
    .join(",")
    .split(",");
  let nowhour = arr[0];
  const nowminute = arr[1];
  const nowampm = arr[2];
  // if (nowampm=='AM' && (nowhour===12 || nowhour<8)){
  //   nextPeriod=periods[0]
  // }
  if (datenow_ampm === "AM" && datenow_hour < 8) {
    comingPeriod = props.periods[0];
  }
  if (dayOfWeek!="Monday" && datenow_ampm === "AM" && datenow_hour == 8 && datenow_minute<30) {
    comingPeriod = props.periods[0];
  }
  
  const inRadius = (data, curPeriod) => {
    let radius = props.preferences.radius;
    if (Math.abs(data.id - curPeriod.id)<radius && (data.id - curPeriod.id) >0){
      return true;
    }
    return false;
  }
  let xDomain = Math.abs(props.data.id - curPeriod.id)
  if (xDomain>1){
    xDomain=1;
  }
  let fontSize = moderateScale(25) - xDomain*moderateScale(4)
  let subFontSize = moderateScale(16) - xDomain*moderateScale(0.9)
  let height = moderateScale(100) - xDomain*moderateScale(15)
  let width = `${(72 - 11 * xDomain)}%`

  if (curPeriod === props.data ) {
    comingPeriod = nextPeriod;
    currentPeriod = curPeriod;
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
            {props.data.subject}
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
  } else if (inRadius(props.data, curPeriod)) {
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
          {props.data.subject}
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



export default function TabOneScreen() {
//   AsyncStorage.getAllKeys((err, keys) => {
//   AsyncStorage.multiGet(keys, (error, stores) => {
//     stores.map((result, i, store) => {
//       console.log({ [store[i][0]]: store[i][1] });
//       return true;
//     });
//   });
// });
  const { Schedule } = React.useContext(AuthContext)
  let periods: any;
  const currentDate = new Date();
  const [datenow, updateDate] = useState(moment(currentDate));
  const withSeconds = moment(currentDate).format("LTS");
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
  const dayOfWeek = moment(currentDate).format('dddd')
  if (dayOfWeek=="Tuesday" || dayOfWeek=="Thursday"){
    periods=Schedule.odd
  }
  else if(dayOfWeek=="Wednesday"){
    periods=Schedule.even
  }
  else if(dayOfWeek=="Friday"){
    periods = Schedule.even
  }
  else if (dayOfWeek=="Monday"){
    periods = Schedule.monday;
  }
  else{
    periods=Schedule.monday
  }
  // console.log(upcomingPeriods)
  const [user, setUser] = useState({})
  const secondarr = withSeconds
    .split(" ")
    .join(",")
    .split(":")
    .join(",")
    .split(",");
  const curSecond = parseInt(secondarr[2]);
  const [index, setIndex] = useState(curSecond);
  const secondsLeft = 60000 - curSecond * 1000;
  const isFocused = useIsFocused();
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
  useEffect(() => {
    updateDate(moment(new Date()))
    setTimeout(() => {
      updateDate(moment(new Date()))
      setInterval(() => {
        setIndex((index) => index + 1);
      }, 5000);
    }, secondsLeft);
    
  }, []);
  useEffect(() => {
    updateDate(moment(new Date()));
  }, [index]);
  

  const classes = periods.map((period) => (
    <View key={period.id} style={{ backgroundColor: "transparent"}}>
      <ScheduleItem periods={periods} preferences = {preferences} date={datenow} data={period} key={period.id} />
    </View>
  ));
    
  // if (user.firstName.length >=9){
  //   fontSize = fontSize - moderateScale(2)*user.firstName.length
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
          {true ? 
          <HorizontalCarousel
            currentPeriod={currentPeriod}
            comingPeriod={comingPeriod}
            date={datenow}
            colorObj={preferences.colorObj}
            isCircle={preferences.isCircle}
            preferences={preferences}
            fontSize={fontSize}
          />:
            <CircleTimer 
            currentPeriod={currentPeriod}
            comingPeriod={comingPeriod}
            date={datenow}/>
          }
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
              {/* <View style={{ height: height, width: 1, backgroundColor: "grey", justifyContent: 'space-between', alignItems: 'center'}}>
                {pointers}
              </View>  */}

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
