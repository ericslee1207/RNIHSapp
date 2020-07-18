import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Provider as PaperProvider, Card } from "react-native-paper";

import { Text, View } from "../components/Themed";

import Carousel, { Pagination } from "react-native-snap-carousel";
import { MontoFri } from "./TabOneScreen";
export const HorizontalCarousel = (props: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const datenow = props.date;
  const today = () => {
    return (
      <Card
        style={{
          borderRadius: 7,
          height: Dimensions.get("window").height * 0.23,
          marginBottom: 10,
          width: "90%",
          shadowColor: "grey",
          shadowOffset: { width: 3, height: 3 },
          shadowOpacity: 0.5,
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.header}>
          <View
            style={{
              flexDirection: "column",
              width: "40%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
            }}
          >
            <Text style={styles.title}>A</Text>
            <Text style={styles.subheader}>Day</Text>
          </View>
          <View
            style={styles.verticalSeparator}
            lightColor="darkgreen"
            darkColor="rgba(255,255,255,0.1)"
          />
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 20,
              backgroundColor: "rgba(0,0,0,0)",
            }}
          >
            <Text style={styles.dateFormat}>{datenow.format("LL")}</Text>
            <MontoFri date={datenow} />
          </View>
        </View>
      </Card>
    );
  };
  const arr = props.curPeriod.time
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
  let nexthour = parseInt(arr[0]);
  const nextminute = parseInt(arr[1]);
  const nextampm = arr[2];
  let subtitle = "ends in";
  let subject = props.randomPeriod.subject;
  if (nowhour != 12 && nowampm === "PM") {
    nowhour += 12;
  }
  if (nexthour != 12 && nowampm === "PM") {
    nexthour += 12;
  }
  let hourdiff = nexthour - nowhour;
  let minutediff = nextminute - nowminute;
  let timeLeft = hourdiff * 60 + minutediff;
  if (
    (nowampm === "PM" && nowhour > 15) ||
    (nowampm === "AM" && nowhour == 12)
  ) {
    timeLeft = 0;
    subtitle = "ended";
    subject = "School";
  } else if (nowhour <= 8 && nowampm === "AM") {
    subtitle = "starts in";
    subject = "School";
  } else if (nowampm === "PM" && nowhour === 15 && nowminute >= 25) {
    timeLeft = 0;
    subtitle = "ended";
    subject = "School";
  }
  const timeTracker = () => {
    return (
      <Card
        style={{
          borderRadius: 7,
          height: Dimensions.get("window").height * 0.23,
          marginBottom: 10,
          width: "90%",
          shadowColor: "grey",
          shadowOffset: { width: 3, height: 3 },
          shadowOpacity: 0.5,
          alignSelf: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <View style={styles.header}>
          <View
            style={{
              flexDirection: "column",
              width: "40%",
              justifyContent: "flex-start",
            }}
          >
            <Text style={{ fontSize: 30 }}>{subject}</Text>
            <Text style={styles.subheader}>{subtitle}</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
              marginLeft: 20,
              backgroundColor: "rgba(0,0,0,0)",
            }}
          >
            <Text style={{ fontSize: 85, color: "lightblue" }}>{timeLeft}</Text>
            <Text style={{ alignSelf: "center" }}>minutes</Text>
          </View>
        </View>
      </Card>
    );
  };
  const carouselItems = [
    {
      title: "Today",
      body: today,
    },
    {
      body: timeTracker,
    },
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
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle = {{height: 50, paddingTop: 10}}
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
        layout={"stack"}
        itemHeight={Dimensions.get("window").height * 0.8}
        data={carouselItems}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width}
        renderItem={_renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination1 />
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
    height: "93%",
    justifyContent: "center",
    marginHorizontal: 5,
    flexDirection: "row",
    backgroundColor: "transparent",
    marginRight: "8.8%",
  },
  subheader: {
    fontWeight: "bold",
    fontSize: 20,
  },
  dateFormat: {
    marginVertical: 22,

    fontSize: 28,
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
    fontFamily: "Trebuchet MS",
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
});
