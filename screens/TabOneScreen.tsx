import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { Provider as PaperProvider, Title } from "react-native-paper";

import { Text, View } from "../components/Themed";

import { CurrentDate } from "./curDate";
import moment from "moment";
import { classDetail } from "./classDetails";

import { HorizontalCarousel } from "./HorizontalCarousel";
import periods from "../Teacher_Data.json";

let randomPeriod = periods[0];
let currentPeriod = periods[1];

// for (let i = 0; i < periods.length; i++) {
//   const arr=periods[i].time.split(' ').join(',').split(':').join(',').split(',');
//   let nowhour=parseInt(arr[0]);
//   const nowminute=parseInt(arr[1]);
//   const nowampm=arr[2];
//   if (nowhour===12 || nowhour<4){
//     Object.assign(periods[i].time,{ampm: 'PM'})
//   }
//   else{
//     Object.assign(periods[i].time, {ampm: 'AM'})
//   }

// }

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
  const datenow = props.date.format("LT");
  const datenow_split = datenow
    .split(" ")
    .join(",")
    .split(":")
    .join(",")
    .split(",");
  const datenow_hour = parseInt(datenow_split[0]);
  const datenow_ampm = datenow_split[2];
  let nextPeriod = {};
  let trueperiod = true;
  if (props.data.period === "*") {
    trueperiod = false;
  }
  let curPeriod = {};
  for (let i = 0; i < periods.length - 1; i++) {
    if (inbetween(periods[i].time, periods[i + 1].time, datenow)) {
      curPeriod = periods[i];
      nextPeriod = periods[i + 1];
    }
  }
  let lastObj = {
    period: 5,
    subject: "Finishing Time",
    time: "3:25 PM",
    id: 4,
  };
  if (inbetween(periods[periods.length - 1].time, lastObj.time, datenow)) {
    curPeriod = periods[periods.length - 1];
    nextPeriod = {
      period: 5,
      subject: "Finishing Time",
      time: "3:25 PM",
      id: 4,
    };
  }
  const Detailbutton = () => {
    if (trueperiod) {
      return (
        <TouchableOpacity
          style={{ width: 50, height: 20, backgroundColor: "rgba(0,0,0,0)" }}
          onPress={() => classDetail(props.data)}
        >
          <Text style={{ color: "#1e90ff" }}>Details</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };
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
    nextPeriod = periods[0];
  }
  if (curPeriod === props.data) {
    currentPeriod = nextPeriod;
    randomPeriod = props.data;
    return (
      // <Card style={{
      //   borderRadius: 10,shadowRadius: 6, shadowOpacity: 0.6, shadowColor: 'green',
      //    shadowOffset:{width: 0.4, height: 0.4}, backgroundColor: 'lightgreen', opacity: 0.6
      // }}>
      <ImageBackground
        source={require("../assets/images/lightGreenbanner1.jpg")}
        style={{
          width: "100%",
          shadowRadius: 6,
          shadowOpacity: 0.4,
          shadowColor: "green",
          shadowOffset: { width: 2, height: 2 },
        }}
        imageStyle={{ opacity: 0.5, borderRadius: 15 }}
      >
        <View style={styles.scheduleFormat}>
          <Text
            style={{
              fontFamily: "Trebuchet MS",
              fontSize: 27,
              fontStyle: "italic",
            }}
          >
            {props.data.period}
          </Text>
          <Text style={{ fontFamily: "Trebuchet MS", fontSize: 22 }}>
            {props.data.subject}
          </Text>
          <View
            style={{ alignItems: "flex-end", backgroundColor: "rgba(0,0,0,0)" }}
          >
            <Text
              style={{
                fontFamily: "Trebuchet MS",
                fontSize: 15,
                fontWeight: "bold",
                marginVertical: 1,
              }}
            >
              {nowhour}:{nowminute} {nowampm}
            </Text>
            <Detailbutton />
          </View>
        </View>
      </ImageBackground>
      //</Card>
    );
  } else {
    return (
      <View style={styles.scheduleFormat}>
        <Text
          style={{
            fontFamily: "Trebuchet MS",
            fontSize: 27,
            fontStyle: "italic",
          }}
        >
          {props.data.period}
        </Text>
        <Text style={{ fontFamily: "Trebuchet MS", fontSize: 22 }}>
          {props.data.subject}
        </Text>
        <View
          style={{ alignItems: "flex-end", backgroundColor: "rgba(0,0,0,0)" }}
        >
          <Text
            style={{
              fontFamily: "Trebuchet MS",
              fontSize: 15,
              fontWeight: "bold",
              marginVertical: 1,
            }}
          >
            {nowhour}:{nowminute} {nowampm}
          </Text>
          <Detailbutton />
        </View>
      </View>
    );
  }
};

export const MontoFri = (props: any) => {
  return <CurrentDate date={props.date.format("dddd")} />;
};

export default function TabOneScreen() {
  const currentDate = new Date();
  const [datenow, updateDate] = useState(moment(currentDate));
  const withSeconds = moment(currentDate).format("LTS");
  const secondarr = withSeconds
    .split(" ")
    .join(",")
    .split(":")
    .join(",")
    .split(",");
  const curSecond = parseInt(secondarr[2]);
  const [index, setIndex] = useState(curSecond);
  const secondsLeft = 60000 - curSecond * 1000;
  useEffect(() => {
    setTimeout(() => {
      setInterval(() => {
        setIndex((index) => index + 1);
      }, 60000);
    }, secondsLeft);
  }, []);
  useEffect(() => {
    updateDate((date) => moment(new Date()));
  }, [index]);

  const classes = periods.map((period) => (
    <View key={period.id} style={{ backgroundColor: "transparent" }}>
      <ScheduleItem date={datenow} data={period} key={period.id} />
      <View
        style={{
          height: 0.7,
          width: "90%",
          backgroundColor: "white",
          marginVertical: 5,
          alignSelf: "center",
        }}
      />
    </View>
  ));
  return (
    //need to render this constantly without refreshing the entire file
    <ScrollView style={{ backgroundColor: "lightblue" }}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/lightbluegradient.png")}
          style={{ width: "100%" }}
        >
          <Title
            style={{
              fontFamily: "Trebuchet MS",
              fontSize: 29,
              fontWeight: "bold",
              marginTop: 25,
              alignSelf: "flex-start",
              marginLeft: "5%",
            }}
          >
            For today...
          </Title>
          <View
            style={styles.separator}
            lightColor="#006400"
            darkColor="#006400"
          />
          <HorizontalCarousel
            randomPeriod={randomPeriod}
            curPeriod={currentPeriod}
            date={datenow}
          />

          <View
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              width: "90%",
              alignSelf: "center",
              paddingVertical: 30,
            }}
          >
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 27,
                fontFamily: "Trebuchet MS",
                fontWeight: "bold",
                marginBottom: 15,
              }}
            >
              Schedule
            </Text>
            {/* <Card style={{width: 350, height: 300, shadowColor: 'black', shadowOffset: {width: 5, height: 5}, borderColor: 'green', borderWidth: 1.5, borderRadius: 10}}> */}
            {classes}
            {/* </Card> */}
          </View>
        </ImageBackground>

        <View style={{ width: "100%", height: 70 }}>
          <ImageBackground
            style={{
              width: "100%",
              height: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
              borderColor: "black",
              borderWidth: 0.2,
            }}
            imageStyle={{ opacity: 0.4 }}
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
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
    fontSize: 90,
    fontFamily: "Trebuchet MS",
  },
  separator: {
    marginVertical: 15,
    height: 2,
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