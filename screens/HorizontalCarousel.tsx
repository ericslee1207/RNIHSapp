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

export const HorizontalCarousel = (props: any) => {
  const { Schedule } = React.useContext(AuthContext)
  const currentDate = new Date();
  const [activeIndex, setActiveIndex] = useState(0);
  const dayOfWeek = moment(currentDate).format('dddd')
  let upcomingPeriods = [];
  // const dayOfWeek = "Tuesday"
  
  const datenow = props.date.format("LT");

  const arr = props.comingPeriod.time
    .split(" ")
    .join(",")
    .split(":")
    .join(",")
    .split(",");
  const bef = props.currentPeriod.time
    .split(" ")
    .join(",")
    .split(":")
    .join(",")
    .split(",");
    //datenow.format("LT")
  // const dateLT = datenow
  //   .format("LT")
  //   .split(" ")
  //   .join(",")
  //   .split(":")
  //   .join(",")
  //   .split(",");
  const dateLT = datenow
    .split(" ")
    .join(",")
    .split(":")
    .join(",")
    .split(",");
  let nowhour = parseInt(dateLT[0]);
  let nowminute = parseInt(dateLT[1]);
  let nowampm = dateLT[2];
  let befhour = parseInt(bef[0]);
  let befminute = parseInt(bef[1]);
  let befampm = bef[2];

  let nexthour = parseInt(arr[0]);
  const nextminute = parseInt(arr[1]);
  const nextampm = arr[2];
  let subtitle = "ends in";
  let subject = props.currentPeriod.subject;
  if (nowhour != 12 && nowampm === "PM") {
    nowhour += 12;
  }
  if (nexthour != 12 && nextampm === "PM") {
    nexthour += 12;
  }
  let hourdiff = nexthour - nowhour;
  let minutediff = nextminute - nowminute;
  let timeLeft = hourdiff * 60 + minutediff;
  if (befhour != 12 && befampm === "PM") {
    befhour += 12;
  }
  let hourdiff1 = nexthour - befhour;
  let minutediff1 = nextminute - befminute;
  let timeLeft1 = hourdiff1 * 60 + minutediff1;
  if (dayOfWeek=="Monday" && props.comingPeriod.period!="*" && props.comingPeriod.id!=0){
    timeLeft-=5;
    timeLeft1-=5;
    if (timeLeft <= 0 ){
      subject = props.comingPeriod.subject;
      subtitle="starts in"
      timeLeft+=5
      timeLeft1=5;
    }
  }
  if (dayOfWeek!="Monday" && props.comingPeriod.period!="*" && props.comingPeriod.id!=1){
    timeLeft-=5;
    timeLeft1-=5;
    if (timeLeft <= 0 ){
      subject = props.comingPeriod.subject;
      subtitle="starts in"
      timeLeft+=5
      timeLeft1=5;
    }
  }
  let rightPercentage=((timeLeft/timeLeft1))*100;
 
  if (
    (nowampm === "PM" && nowhour > 15) ||
    (nowampm === "AM" && nowhour === 12)
  ) {
    timeLeft = 0;
    rightPercentage = 100;
    subtitle = "ended";
    subject = "School";
  } else if (nowhour < 8 && nowampm === "AM") {
    subtitle = "starts in";
    subject = "School";
    rightPercentage=100
  } else if (nowampm === "PM" && nowhour === 15 && nowminute >= 50) {
    timeLeft = 0;
    rightPercentage = 0
    subtitle = "ended";
    subject = "School";
  }
  else if (nowhour==8 && nowampm=="AM"){
    if (nowminute<30 && dayOfWeek!="Monday"){
      subtitle = "starts in";
      subject = "School";
      rightPercentage=100
    }
  }
  if (dayOfWeek==="Saturday"|| dayOfWeek==="Sunday"){
    subject="Weekend!";
    subtitle=""
    timeLeft=0;
    rightPercentage=0
  }
  let fontColor = props.colorObj.primary;
  if (subtitle == "starts in"){
    fontColor = "#FF6E7A"
  }

  if (dayOfWeek=="Tuesday" || dayOfWeek=="Thursday"){
    if (subject=="School" && subtitle=="starts in"){
      upcomingPeriods = Schedule.odd
    }
    if (subject=="School" && subtitle=="ended"){
      upcomingPeriods=Schedule.even
    }
  }
  else if(dayOfWeek=="Wednesday"){
    if (subject=="School" && subtitle=="starts in"){
      upcomingPeriods = Schedule.even
    }
    if (subject=="School" && subtitle=="ended"){
      upcomingPeriods=Schedule.odd
    }
  }
  else if(dayOfWeek=="Friday"){
    if (subject=="School" && subtitle=="starts in"){
      upcomingPeriods = Schedule.even
    }
    if (subject=="School" && subtitle=="ended"){
      upcomingPeriods=Schedule.monday
    }
  }
  else if (dayOfWeek=="Monday"){
    if (subject=="School" && subtitle=="starts in"){
      upcomingPeriods = Schedule.monday
    }
    if (subject=="School" && subtitle=="ended"){
      upcomingPeriods=Schedule.odd
    }
  }
  else{
    upcomingPeriods=Schedule.monday
  }
  let count = 0
  const upcomingClasses = upcomingPeriods.map((period)=>{
    const arr = period.time
      .split(" ")
      .join(",")
      .split(":")
      .join(",")
      .split(",");
    const nowhour = arr[0];
    const nowminute = arr[1];
    const nowampm = arr[2];
    count++
    if (count<=props.preferences.radius){
    return(
    <View key={period.id} style={{ backgroundColor: "transparent"}}>
      <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <View style={[styles.scheduleFormat1, {height: moderateScale(85), width: "61%"}]}>
        {/* <Text
          style={{
            fontFamily: "OpenSansSemiBold",
            fontSize: 27,
            fontStyle: "italic",
          }}
        >
          {props.data.period}
        </Text> */}
        <Text style={{ fontFamily: "OpenSansSemiBold", fontSize: moderateScale(21), color: props.preferences.colorObj.primary }}>
          {period.subject}
        </Text>
        <View
          style={{ alignItems: "flex-end", backgroundColor: "rgba(0,0,0,0)" }}
        >
          
        </View>
      </View>
      <Text
            style={{
              fontFamily: "OpenSansSemiBold",
              fontSize: moderateScale(15.1),
              fontWeight: "bold",
              marginVertical: 1,
            }}
          >
            {nowhour}:{nowminute} {nowampm}
          </Text> 
      </View>
    </View>
  )}})
  const timeTracker = () => {
    
    const HorizontalTimer = () => {
      return(
        <View style={{backgroundColor: 'transparent', width: '91.5%', height: moderateScale(2.5), marginTop: '5%', borderColor: 'white', justifyContent: 'center', flexDirection: 'column', borderBottomRightRadius: moderateScale(100), borderBottomLeftRadius: moderateScale(100),marginBottom: moderateScale(-0.5), alignSelf: 'center'}}>
          {<View style={{backgroundColor: props.colorObj.primary, height: moderateScale(2.5), marginRight: `${rightPercentage}%`, borderColor: 'white',  borderBottomRightRadius: moderateScale(100), borderBottomLeftRadius: moderateScale(100),marginBottom: moderateScale(1), }}>
            {/* <MaterialCommunityIcons style={{marginLeft: `${rightPercentage-1}%`}} size={40} name="chevron-right"/> */}
          </View>
        //   :
        //   <View style={{backgroundColor: 'lightgrey', height: 14,  borderRadius: 15, borderColor: 'white', borderWidth: 1}}>
        //   {/* <MaterialCommunityIcons style={{marginLeft: `${rightPercentage-1}%`}} size={40} name="chevron-right"/> */}
        // </View>
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
            }}>{timeLeft}</Text>
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
            <Text style={{ fontSize: moderateScale(80), color: "white"}}>{timeLeft}</Text>
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
      {subtitle !="ended" && (subtitle!="starts in" || subject!="School") && subject!= "Weekend!"? 
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
