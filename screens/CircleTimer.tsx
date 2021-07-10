import moment from 'moment'
import React from 'react'
import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { moderateScale } from 'react-native-size-matters'

const CircleTimer = (props: any) => {
    
    const datenow = props.date;
    const arr = "5:40 PM"
    .split(" ")
    .join(",")
    .split(":")
    .join(",")
    .split(",");
  const bef = "5:30 PM"
    .split(" ")
    .join(",")
    .split(":")
    .join(",")
    .split(",");
  const dateLT = datenow
    .format("LT")
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
  let rightPercentage=((timeLeft/timeLeft1))*100;
  if (
    (nowampm === "PM" && nowhour > 15) ||
    (nowampm === "AM" && nowhour === 12)
  ) {
    timeLeft = 0;
    rightPercentage = 100;
    subtitle = "ended";
    subject = "School";
  } else if (nowhour <= 8 && nowampm === "AM") {
    subtitle = "starts in";
    subject = "School";
    rightPercentage=100
  } else if (nowampm === "PM" && nowhour === 15 && nowminute >= 25) {
    timeLeft = 0;
    rightPercentage = 0
    subtitle = "ended";
    subject = "School";
  }
  
  let day = moment().format('dddd');
  if (day==="Saturday"|| day==="Sunday"){
    subject="Weekend!";
    subtitle=""
    timeLeft=0;
  }

    return(
      <View style={{marginVertical: moderateScale(22), backgroundColor: 'transparent'}}>
        <CountdownCircleTimer
        trailColor="white"
        isPlaying={true}
        onComplete={()=>{return [true]}}
        duration={timeLeft1*60}
        size={250}
        initialRemainingTime={timeLeft*60}
        strokeWidth={16}
        colors={[
          ['#004777', 0.4],
          ['#F7B801', 0.4],
          ['#A30000', 0.2],
        ]}>
          
        {({ remainingTime }) => {
          let showSeconds = false;
          if (remainingTime < 60){
            showSeconds = true;
          }
          return(
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.subject}>{subject}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
                {!showSeconds ? 
                <>
                <Text style={styles.remaining}>{(remainingTime/60).toFixed(0)}</Text>
                <Text style = {styles.subtitle}>minutes</Text>
                    </>
                :
                <>
                    <Text style = {styles.remaining}>{remainingTime}</Text>
                    <Text style = {styles.subtitle}>seconds</Text>
                    </>
                }
                
            </View>
          )
        }}
        </CountdownCircleTimer>

          
      </View>
    )
  }

  const styles = StyleSheet.create({
    subject: {
        fontSize: moderateScale(25)
    },
    subtitle: {
        fontSize: moderateScale(20)
    },
    remaining: {
        fontSize: moderateScale(30)
    }
  })
  export default CircleTimer