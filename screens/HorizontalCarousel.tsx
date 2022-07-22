import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import { Provider as PaperProvider, Card } from "react-native-paper";

import { Text, View } from "../components/Themed";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { MontoFri } from "./MontoFri";
import moment from 'moment'
import { moderateScale, verticalScale, moderateVerticalScale, } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';
import { AuthContext } from "../components/AuthContext";
import oddPeriods from "../OddPeriods.json"
import evenPeriods from "../EvenPeriods.json"
import mondayPeriods from "../MondayPeriods.json"
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlassyView from "../components/GlassyView";
export const HorizontalCarousel = (props: any) => {
  const { Schedule, isHoliday } = React.useContext(AuthContext)
  const [activeIndex, setActiveIndex] = useState(0);
  const dayOfWeek = props.date.format("dddd")
  
  // const dayOfWeek = "Monday"
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
  let upcomingPeriods = []
  if (props.upcomingPeriods!=undefined){
    upcomingPeriods=props.upcomingPeriods
  }
  
  
  const datenow = props.timeNow
  let subtitle = "ends in";
  let subject = props.currentPeriod.subject;
  if (props.currentPeriod.period !== "*" && props.currentPeriod.period !== "Flex"){
    subject = props.periodNames[props.currentPeriod.subject]
  }

  //crusty logic
  let comingPeriodStartTime = changeTo24Hour(props.comingPeriod.time)
  let currentPeriodStartTime = changeTo24Hour(props.currentPeriod.time)
  let nowTime = changeTo24Hour(datenow)
  


  let hourdiff = comingPeriodStartTime[0] - nowTime[0];
  let minutediff = comingPeriodStartTime[1] - nowTime[1];
  let timeLeftUntilPeriodEnds = hourdiff * 60 + minutediff;
  
  let periodHourLength = comingPeriodStartTime[0] - currentPeriodStartTime[0];
  let periodMinuteLength = comingPeriodStartTime[1] - currentPeriodStartTime[1];
  let periodTotalLength = periodHourLength * 60 + periodMinuteLength;
  if (props.comingPeriod.period!="*" && props.comingPeriod.id!=0){
    timeLeftUntilPeriodEnds-=5;
    periodTotalLength-=5;

    if (timeLeftUntilPeriodEnds <= 0 ){
      subject = props.comingPeriod.subject;
      if (props.comingPeriod.period != "*" && props.comingPeriod.period != "Flex"){
        subject = props.periodNames[props.comingPeriod.subject]
      }
      subtitle="starts in"
      timeLeftUntilPeriodEnds+=5
      periodTotalLength=5;
    }
  }

  let rightPercentage=((timeLeftUntilPeriodEnds/periodTotalLength))*100;
 
  let schoolEndTime = changeTo24Hour(props.periods[props.periods.length-1].time)
  let schoolStartTime = changeTo24Hour(props.periods[0].time);

  if (
    (nowTime[2] === "PM" && nowTime[0] > schoolEndTime[0])
  ) {
    timeLeftUntilPeriodEnds = 0;
    rightPercentage = 100;
    subtitle = "ended";
    subject = "School";
  } else if (nowTime[0] < schoolStartTime[0] && nowTime[2] === schoolStartTime[2]) {
    subtitle = "starts in";
    subject = "School";
    rightPercentage=100
  } else if (nowTime[2] === schoolEndTime[2] && nowTime[0] === schoolEndTime[0] && nowTime[1] >= schoolEndTime[1]) {
    timeLeftUntilPeriodEnds = 0;
    rightPercentage = 0
    subtitle = "ended";
    subject = "School";
  }
  else if (nowTime[0]==schoolStartTime[0] && nowTime[2]==schoolStartTime[2]){
    if (nowTime[1]<schoolStartTime[1]){
      subtitle = "starts in";
      subject = "School";
      rightPercentage=100
    }
  }
  if (dayOfWeek==="Saturday"|| dayOfWeek==="Sunday"){
    subject="Weekend!";
    subtitle=""
    timeLeftUntilPeriodEnds=0;
    rightPercentage=100
  }
  let fontColor = props.colorObj.primary;
  if (subtitle == "starts in"){
    fontColor = "#FF6E7A"
  }

  if (isHoliday){
    subject="No School!"
    subtitle = ""
    timeLeftUntilPeriodEnds=0
    rightPercentage = 100
  }
  
  let count = 0
  const upcomingClasses = upcomingPeriods.map((period)=>{
    let subject = period.subject;
    if (Schedule[period.subject]!==undefined){
      subject = Schedule[period.subject]
    }
    count++
    if (count<=props.preferences.radius){
    return(
    <View key={period.id} style={{ backgroundColor: "transparent"}}>
      <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <View style={[styles.scheduleFormat1, {height: moderateScale(85), width: "61%"}]}>
        {/* <GlassyView style={{width: '100%', height: '100%'}}> */}
        <Text style={{ fontFamily: "OpenSansSemiBold", fontSize: moderateScale(21), color: props.preferences.colorObj.primary }}>
          {subject}
        </Text>
        <View
          style={{ alignItems: "flex-end", backgroundColor: "rgba(0,0,0,0)" }}
        >
          
        </View>
        {/* </GlassyView> */}
      </View>
      <Text
            style={{
              fontFamily: "OpenSansSemiBold",
              fontSize: moderateScale(15.1),
              fontWeight: "bold",
              marginVertical: 1,
            }}
          >
            {period.time}
          </Text> 
      </View>
    </View>
  )}})
  const timeTracker = () => {
    
    const HorizontalTimer = () => {
      return(
        <View style={{backgroundColor: 'transparent', width: '91.5%', height: moderateScale(2.5), marginTop: '5%', borderColor: 'white', justifyContent: 'center', flexDirection: 'column', borderBottomRightRadius: moderateScale(100), borderBottomLeftRadius: moderateScale(100),marginBottom: moderateScale(-0.5), alignSelf: 'center'}}>
          {<View style={{backgroundColor: props.colorObj.primary, height: moderateScale(2.5), marginRight: `${rightPercentage}%`, borderColor: 'white',  borderBottomRightRadius: moderateScale(100), borderBottomLeftRadius: moderateScale(100),marginBottom: moderateScale(1), }}>
          </View>
        }
        </View>
      )
      
    }


    return (
      <>
      <View
        style={{
          borderRadius: moderateScale(20),
          height: moderateVerticalScale(177),
          marginBottom: moderateScale(10),
          backgroundColor: 'white',
          //padding: 20,
          //paddingBottom: 30,
          width: '90%',
          marginLeft: '5%',
          marginTop: '4%',
          shadowOffset: {height: 0, width: 0},
          shadowOpacity: 0.12,
          shadowRadius: 8,
          elevation: 5
          // justifyContent: 'center',
          // paddingTop: '8%'
        }}
      >
        {props.isCircle==false ? 
        <View style={{flex: 10, borderRadius: moderateScale(20)}}>
          <View style={{
              flex: 3, 
              backgroundColor: props.colorObj.primary, 
              borderTopRightRadius: moderateScale(20), 
              borderTopLeftRadius: moderateScale(20),
              padding: moderateScale(10),
              maxHeight: moderateScale(60),
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <Text style={{
              fontFamily: 'OpenSansBold', 
              fontSize: moderateScale(25),
              color: 'white',
              marginLeft: moderateScale(12)
            }}>{subject}</Text>
            <Text style={{
              fontFamily: 'OpenSansRegular', 
              fontSize: moderateScale(25),
              color: 'white',
              marginLeft: moderateScale(8)
            }}>{subtitle}</Text>
          </View>
          <View style={{flex: 7, borderBottomLeftRadius: moderateScale(20), borderBottomRightRadius: moderateScale(20), alignItems: 'center', flexDirection: 'row', }}>
            <Text style={{
              fontFamily: 'OpenSansRegular',
              fontSize: moderateScale(80),
              color: props.colorObj.primary,
              marginLeft: moderateScale(30)
            }}>{timeLeftUntilPeriodEnds}</Text>
            <Text style={{
              fontFamily: 'OpenSansRegular',
              fontSize: moderateScale(22),
              color: "grey",
              alignSelf: 'flex-end',
              marginLeft: moderateScale(25),
              marginBottom: moderateScale(7)
            }}>minutes</Text>
          </View>
          <HorizontalTimer/>
        </View> :

            
        <View style={styles.header}>
          <View 
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: 'center',
              backgroundColor: 'transparent',
              height: '100%'
            }}
          >
            <Text style={{
              fontFamily: 'OpenSansBold', 
              fontSize: moderateScale(25),
              color: props.colorObj.primary,
              alignSelf: 'center',
            }} allowFontScaling={true}>{subject}</Text>
            {subtitle!=""? 
            <Text style={{
              fontFamily: 'OpenSansRegular', 
              fontSize: moderateScale(25),
              color: fontColor,
              // marginLeft: moderateScale(-20)
            }}>{subtitle}</Text>
            :<></>}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: props.colorObj.primary,
              height: '100%',
              borderTopRightRadius: moderateScale(20),
              borderBottomRightRadius: moderateScale(20)


            }}
          >
            <Text style={{ fontSize: moderateScale(80), color: "white"}}>{timeLeftUntilPeriodEnds}</Text>
            <Text style={{
              fontFamily: 'OpenSansSemiBold',
              fontSize: moderateScale(16),
              color: "white",
              //alignSelf: 'flex-end',
              // marginLeft: moderateScale(25),
              // marginBottom: moderateScale(7)
            }}>minutes</Text>
            
          </View>
        </View>}
        {/* <HorizontalTimer/> */}
        
      </View>
      {!isHoliday && subtitle !="ended" && (subtitle!="starts in" || subject!="School") && subject!= "Weekend!"? 
      <View style={{backgroundColor: 'transparent', flexDirection: 'row', marginLeft: '5%'}}>
      <Text
          style={{
            marginVertical: moderateScale(5),
            fontFamily: "OpenSansLight",
            fontSize: props.fontSize-moderateScale(2),
            // fontWeight: "bold",
            //marginTop: 25,
            alignSelf: "flex-end",
            marginLeft: "2%",
          }}
        >
          Current
        </Text>
        <Text
          style={{
            marginVertical: moderateScale(5),

            fontFamily: "OpenSansSemiBold",
            fontSize: props.fontSize-moderateScale(2),
            // fontWeight: "bold",
            //marginTop: 25,
            // alignSelf: "flex-end",
            marginLeft: "3%",
          }}
        >
          Schedule
        </Text>
      </View>:
      <>
      <View style={{backgroundColor: 'transparent', flexDirection: 'row', marginLeft: '5%'}}>        
      <Text
          style={{
            marginVertical: moderateScale(5),
            fontFamily: "OpenSansLight",
            fontSize: props.fontSize-moderateScale(2),
            // fontWeight: "bold",
            //marginTop: 25,
            alignSelf: "flex-end",
            marginLeft: "2%",
          }}
        >
          Upcoming
        </Text>
        <Text
          style={{
            marginVertical: moderateScale(5),

            fontFamily: "OpenSansSemiBold",
            fontSize: props.fontSize-moderateScale(2),
            // fontWeight: "bold",
            //marginTop: 25,
            // alignSelf: "flex-end",
            marginLeft: "3%",
          }}
        >
          Schedule
        </Text>
        </View>
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
              {upcomingClasses}
            </View>
            {/* <View style={{ height: height, width: 1, backgroundColor: "grey", justifyContent: 'space-between', alignItems: 'center'}}>
              {pointers}
            </View>  */}

          </View>
          

          
          
        </View>
      </>
      }
      </>
    );
  };
  const carouselItems = [
    {
      body: timeTracker,
    },
    // {
    //   title: "Today",
    //   body: today,
    // },
  ];
  const _renderItem = ({ item }) => {
    return <item.body />;
  };
  const Pagination1 = () => {
    return (
      <Pagination
        dotsLength={2}
        activeDotIndex={activeIndex}
        dotStyle={{
          width: 7,
          height: 7,
          borderRadius: 5,
          marginHorizontal: 8,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle = {{height: moderateScale(40), paddingTop: moderateScale(10)}}
      />
    );
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      <Carousel
        layout={"default"}
        itemHeight={Dimensions.get("window").height * 0.8}
        data={carouselItems}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width}
        renderItem={_renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      {/* <Pagination1 /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
    flex: 2,
  },
  subheader: {
    fontWeight: "bold",
    fontSize: 20,
  },
  dateFormat: {
    marginVertical: 22,
    fontSize: 30, color: 'lightblue'
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
  scheduleFormat: {
    width: "90%",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 10,
    marginLeft: "5%",
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0)",
  },
  title: {
    fontSize: 80,
    fontFamily: "OpenSansSemiBold",
    color: "lightblue",
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: "100%",
  },
  verticalSeparator: {
    marginHorizontal: 1,
    height: "80%",
    width: 1,
    marginTop: 20,
  },
  contactlogo: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
  },
  contactlogoTO: {
    justifyContent: "flex-end",
    marginBottom: 22,
    marginHorizontal: 2,
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
});
