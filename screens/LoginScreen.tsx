import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
  Touchable,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import oddPeriods from "../OddPeriods.json";
import evenPeriods from "../EvenPeriods.json";
import specialDay from "../specialDay.json";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Animatable from "react-native-animatable";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Fumi } from "react-native-textinput-effects";
import { AuthContext } from "../components/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import MinimumDay from "../MinimumDay.json"
import moment from "moment";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import mondayPeriods from "../MondayPeriods.json";
import mondayPeriods2 from "../MondayPeriods2.json";
import Swiper from "react-native-web-swiper";
import { LinearGradient } from "expo-linear-gradient";
import uuid from "react-native-uuid";
import firebase from "firebase";
import { firebaseConfig } from "../config";
import Modal from "react-native-modal";
import tuesdayPeriods from "../TuesdayPeriods.json";
import tuesdayPeriods2 from "../TuesdayPeriods2.json";
import wednesdayPeriods from "../WednesdayPeriods.json";
import wednesdayPeriods2 from "../WednesdayPeriods2.json";
import thursdayPeriods from "../ThursdayPeriods.json";
import thursdayPeriods2 from "../ThursdayPeriods2.json";
import fridayPeriods from "../FridayPeriods.json";
import fridayPeriods2 from "../FridayPeriods2.json";
import minimumDayPeriods from "../MinimumDay.json";
import clubList from "../clubs_2020-2021.json";
import firstPepRally from "../firstPepRally.json";
import secondPepRally from "../secondPepRally.json";
import { BlurView } from "expo-blur";
import oddMinimumDay from "../oddMinimumDay.json";
import evenMinimumDay from "../evenMinimumDay.json";
import IUSDholidays from "../IUSD_holidays.json";

// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// firebase.analytics();
var userRef = firebase.firestore().collection("users");
var scheduleRef = firebase.firestore().collection("schedule");
var specialDays = firebase.firestore().collection("specialDays");
var clubRef = firebase.firestore().collection("clubs");
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
let datearr = moment().format("l").split("/");
let month = datearr[0],
  day = datearr[1],
  year = datearr[2];
if (parseInt(month) >= 6 && parseInt(day) >= 3) {
  year = { start: parseInt(year), end: parseInt(year) + 1 };
} else {
  year = { start: parseInt(year) - 1, end: parseInt(year) };
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    Alert.alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export const Login = ({ navigation }) => {
  const { SignIn, setSchedule, setColorObj } = React.useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(false);

  const swiperRef = useRef(null);
  const [index, updateIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  let disabled = true;
  let opacity = 0.3;
  let bc = "#92d1cc";
  const goToHome = () => {
    SignIn();
  };

  const proceedToHome = async () => {
    setLoading(true);
    let colorObj = {
      primary: "#04b5a7",
      highlight: "hsl(165, 100%, 80%)",
      lightbackground: "rgba(233, 251, 251, 0.96)",
      darkbackground: "#D3E7EE",
    };
    setColorObj(colorObj);
    let idd = uuid.v4().toString();
    await userRef
      .doc(idd)
      .set({
        uuid: idd,
        firstName: firstName,
        lastName: lastName,
      })
      .then(() => {
        console.log("Saved!");
      })
      .catch((e) => {
        console.log(e);
      });

    let defaultSchedule = {
      "Period 1": "Period 1",
      "Period 2": "Period 2",
      "Period 3": "Period 3",
      "Period 4": "Period 4",
      "Period 5": "Period 5",
      "Period 6": "Period 6",
      "Period 7": "Period 7",
      "Period 8": "Period 8",
    };
    let settings = { isCircle: false, radius: 3, colorObj: colorObj };
    let data = {
      firstName: firstName,
      lastName: lastName,
      shortID: shortID,
      longID: longID,
      graduationYear: graduationYear,
    };
    await AsyncStorage.setItem("accountInfo", JSON.stringify(data));
    await AsyncStorage.setItem(
      "scheduleDetails",
      JSON.stringify(defaultSchedule)
    ).then(() => setSchedule(defaultSchedule));
    await AsyncStorage.setItem(
      "SettingConfigurations",
      JSON.stringify(settings)
    )
      .then(() => setLoading(false))
      .then(goToHome);
  };

  const skipStep = async () => {
    setLoading(true);
    let colorObj = {
      primary: "#04b5a7",
      highlight: "hsl(165, 100%, 80%)",
      lightbackground: "rgba(233, 251, 251, 0.96)",
      darkbackground: "#D3E7EE",
    };
    setColorObj(colorObj);
    let idd = uuid.v4().toString();
    await userRef
      .doc(idd)
      .set({
        uuid: idd,
        firstName: firstName,
        lastName: lastName,
      })
      .then(() => {
        console.log("Saved!");
      })
      .catch((e) => {
        console.log(e);
      });

    let defaultSchedule = {
      "Period 1": "Period 1",
      "Period 2": "Period 2",
      "Period 3": "Period 3",
      "Period 4": "Period 4",
      "Period 5": "Period 5",
      "Period 6": "Period 6",
      "Period 7": "Period 7",
      "Period 8": "Period 8",
    };
    let settings = { isCircle: false, radius: 3, colorObj: colorObj };
    let data = {
      firstName: firstName,
      lastName: lastName,
    };
    await AsyncStorage.setItem("accountInfo", JSON.stringify(data));
    await AsyncStorage.setItem(
      "scheduleDetails",
      JSON.stringify(defaultSchedule)
    ).then(() => setSchedule(defaultSchedule));
    await AsyncStorage.setItem(
      "SettingConfigurations",
      JSON.stringify(settings)
    )
      .then(() => {
        setSecondModalVisible(false);
        setLoading(false);
      })
      .then(goToHome);
    // Alert.alert("Skip Step", "Skipping this step will mean you will not have access to your virtual ID card. Recommended for staff or parents.")
  };

  const [firstName, setfirst] = useState("");
  const [lastName, setlast] = useState("");
  const [shortID, setShortID] = useState("");
  const [longID, setLongID] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [modalVisible, setModalVisible] = useState(true);
  const [secondModalVisible, setSecondModalVisible] = useState(false);

  const inputData = () => {
    // specialDays.doc("8-18-2021").set({schedule: specialDay})
    scheduleRef.doc("monday").set({ monday: mondayPeriods2 });
    scheduleRef.doc("tuesday").set({ tuesday: tuesdayPeriods2 });
    scheduleRef.doc("wednesday").set({ wednesday: wednesdayPeriods2 });
    scheduleRef.doc("thursday").set({ thursday: thursdayPeriods2 });
    scheduleRef.doc("friday").set({ friday: firstPepRally });
    // clubRef.doc("clubs").set({clubs: clubList})
    // scheduleRef.doc("secondPepRally").set({secondPepRally: secondPepRally})
    // scheduleRef.doc("firstPepRally").set({firstPepRally: firstPepRally})
    // scheduleRef.doc('holidays').set({holidays: IUSDholidays})
  };

  const newDataLongID = (text: string) => {
    if (text.length > 0) {
      setLongID(text);
    }
  };

  const newDataFirstName = (text: string) => {
    if (text.length > 0) {
      setfirst(text);
    }
  };
  const newDataLastName = (text: string) => {
    if (text.length > 0) {
      setlast(text);
    }
  };
  const newDataShortID = (text: string) => {
    if (text.length > 0) {
      setShortID(text);
    }
  };
  const newDataGrade = (text: string) => {
    if (text.length > 0) {
      setGraduationYear(text);
    }
  };
  if (
    (longID.length == 9 || longID.length == 8) &&
    shortID.length == 5 &&
    firstName.length > 0 &&
    lastName.length > 0 &&
    parseInt(graduationYear) <= year.start + 4 &&
    parseInt(graduationYear) >= year.end
  ) {
    disabled = false;
    opacity = 1;
    bc = "#009387";
  } else {
    disabled = true;
    opacity = 0.3;
    bc = "#92d1cc";
  }

  const window = Dimensions.get("window");
  return (
    <>
      {loading ? (
        <ActivityIndicator
          style={{
            zIndex: 999,
            position: "absolute",
            width: window.width,
            height: window.height,
            backgroundColor: "lightgrey",
            opacity: 0.4,
          }}
          animating={loading}
          color={"darkgreen"}
          size="large"
        />
      ) : (
        <></>
      )}

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        useNativeDriver={true}
        onBackButtonPress={() => setModalVisible(false)}
        hideModalContentWhileAnimating={true}
      >
        <View
          style={{
            width: "85%",
            marginLeft: "7.5%",
            height:
              Platform.OS == "ios" ? moderateScale(340) : moderateScale(370),
          }}
        >
          <View style={[styles.invitationBody]}>
            <AntDesign
              name="Safety"
              size={moderateScale(40)}
              color="#04b5a7"
              style={{ marginBottom: moderateScale(10) }}
            />
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSansBold",
                  fontSize: moderateScale(20),
                }}
              >
                Your Data
              </Text>
            </View>

            <Text
              style={{
                marginVertical: moderateScale(7),
                textAlign: "center",
                fontSize: moderateScale(17),
                marginHorizontal: moderateScale(5),
              }}
            >
              To maintain your security and to abide by school policies, the
              data you input cannot be seen or shared by the developer. It will
              be stored local to your device, so only you will be able to see
              them.
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={[
                styles.buttonstyle,
                {
                  height: moderateScale(35),
                  width: moderateScale(170),
                  marginTop: moderateScale(12),
                  flexDirection: "row",
                },
              ]}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "OpenSansSemiBold",
                  fontSize: moderateScale(17),
                  marginRight: moderateScale(5),
                }}
              >
                Proceed
              </Text>
              <AntDesign
                name="checkcircleo"
                size={moderateScale(18)}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={secondModalVisible}
        onBackdropPress={() => setSecondModalVisible(true)}
        useNativeDriver={true}
        onBackButtonPress={() => setSecondModalVisible(true)}
        hideModalContentWhileAnimating={true}
      >
        <View
          style={{
            width: "85%",
            marginLeft: "7.5%",
            height:
              Platform.OS == "ios" ? moderateScale(290) : moderateScale(310),
          }}
        >
          <View style={[styles.invitationBody]}>
            <AntDesign
              name="login"
              size={moderateScale(40)}
              color="#04b5a7"
              style={{ marginBottom: moderateScale(10) }}
            />
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSansBold",
                  fontSize: moderateScale(20),
                }}
              >
                Are you sure?
              </Text>
            </View>

            <Text
              style={{
                marginVertical: moderateScale(7),
                textAlign: "center",
                fontSize: moderateScale(17),
                marginHorizontal: moderateScale(5),
              }}
            >
              Skipping this step will mean your virtual ID card can't be
              created. Recommended for staff or parents.
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={skipStep}
                style={[
                  styles.buttonstyle,
                  {
                    height: moderateScale(45),
                    width: moderateScale(115),
                    marginTop: moderateScale(12),
                    flexDirection: "row",
                    marginRight: moderateScale(5),
                  },
                ]}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "OpenSansSemiBold",
                    fontSize: moderateScale(17),
                    marginRight: moderateScale(5),
                  }}
                >
                  Yes
                </Text>
                {/* <AntDesign name="checkcircleo" size={moderateScale(18)} color="white"/> */}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSecondModalVisible(false);
                }}
                style={[
                  styles.buttonstyle,
                  {
                    height: moderateScale(45),
                    width: moderateScale(115),
                    marginTop: moderateScale(12),
                    flexDirection: "row",
                    marginLeft: moderateScale(5),
                    backgroundColor: "#ff675c",
                  },
                ]}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "OpenSansSemiBold",
                    fontSize: moderateScale(17),
                    marginRight: moderateScale(5),
                  }}
                >
                  No
                </Text>
                {/* <AntDesign name="checkcircleo" size={moderateScale(18)} color="white"/> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            colors={["#4afff0", "#45b5ff"]}
            style={{ height: "100%", position: "absolute", width: "100%" }}
          />

          <ImageBackground
            style={{ height: height, width: width }}
            source={require("../assets/images/IHSAerielView_Cut.jpg")}
            imageStyle={{ opacity: 0.55 }}
          >
            <View style={styles.top}>
              <View
                style={{
                  backgroundColor: "white",
                  borderTopRightRadius: moderateScale(30),
                  borderBottomRightRadius: moderateScale(30),
                  marginVertical: moderateScale(20),
                  paddingVertical: moderateScale(5),
                  paddingHorizontal: moderateScale(20),
                }}
              >
                <Text style={styles.title}>Sign Up</Text>
              </View>
            </View>

            <Animatable.View style={styles.bottom} animation="fadeInUpBig">
              {/* <ImageBackground source={require("../assets/images/colorback4.png")} style={{ height: '100%', width: '100%' }}>
                <BlurView
                  intensity={100}
                  tint="light"
                  style={{ flex: 1, height: '100%', width: '100%', borderTopLeftRadius: moderateScale(25), borderTopRightRadius: moderateScale(25), }}
                >
                  <LinearGradient
                    colors={['rgba(0,0,0,0.0)', 'rgba(232,255,239,0.3)']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{ height: '100%', width: '100%' }}
                  > */}
              <View style={{ flex: 1, width: "100%" }}>
                <Swiper
                  onIndexChanged={(index) => updateIndex(index)}
                  gesturesEnabled={() => false}
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
                    <Text style={styles.welcome}>Basic Information</Text>
                    <FumiInput
                      type="First Name"
                      newData={newDataFirstName}
                      icon="user"
                    />
                    <FumiInput
                      type="Last Name"
                      newData={newDataLastName}
                      icon="user"
                    />
                    <Button title="Input DATA" onPress={inputData} />
                  </View>
                  <View style={styles.customizeClasses}>
                    <Text style={styles.welcome}>IHS Information</Text>
                    <FumiInputNumber
                      type="Short ID (5 digit)"
                      newData={newDataShortID}
                      icon="id-card"
                    />
                    <FumiInputNumber
                      type="Long ID (9 digit)"
                      newData={newDataLongID}
                      icon="id-card"
                    />
                    <FumiInputNumber
                      type={`Graduating Year (${year.end}-${year.start + 4})`}
                      newData={newDataGrade}
                      icon="graduation-cap"
                    />
                  </View>
                </Swiper>
              </View>
              <View style={{ width: "100%", justifyContent: "center" }}>
                {index == 1 ? (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert(
                          "Are you sure?",
                          "Skipping this step will mean your virtual ID card can't be created. Recommended for staff or parents.",
                          [
                            { text: "Yes", onPress: skipStep },
                            { text: "No", onPress: () => {} },
                          ]
                        )
                      }
                      style={[
                        styles.buttonstyle,
                        {
                          marginBottom: moderateScale(15),
                          backgroundColor: "rgb(250, 190, 88)",
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontFamily: "OpenSansSemiBold",
                          fontSize: 18,
                        }}
                      >
                        Skip this step
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={proceedToHome}
                      disabled={disabled}
                      style={[
                        styles.buttonstyle,
                        {
                          backgroundColor: bc,
                          marginBottom: moderateScale(40),
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontFamily: "OpenSansSemiBold",
                          fontSize: 18,
                        }}
                      >
                        Create
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      if (firstName.length > 0 && lastName.length > 0) {
                        swiperRef.current.goToNext();
                      } else {
                        Alert.alert("All fields must be entered");
                      }
                    }}
                    style={[
                      styles.buttonstyle,
                      { marginBottom: moderateScale(70) },
                    ]}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "OpenSansSemiBold",
                        fontSize: 18,
                      }}
                    >
                      Next
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {/* </LinearGradient>

                </BlurView>
              </ImageBackground> */}
            </Animatable.View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const FumiInput = ({ newData, type, icon }) => {
  return (
    <Fumi
      label={type}
      style={{
        marginBottom: "4%",
        borderRadius: 20,
        // borderWidth: 1,
        height: moderateScale(10),
        // borderColor: "lightblue",
        backgroundColor: "rgba(233, 251, 251, 0.96)",
      }}
      iconClass={FontAwesomeIcon}
      iconName={icon}
      iconColor={"#04b5a7"}
      iconSize={moderateScale(25)}
      inputPadding={moderateScale(15)}
      autoCapitalize="none"
      onChangeText={(text) => newData(text)}
    />
  );
};
const FumiInputNumber = ({ newData, type, icon }) => {
  return (
    <Fumi
      label={type}
      style={{
        marginBottom: "4%",
        borderRadius: 20,
        // borderWidth: 1,
        // borderColor: "lightblue",
        backgroundColor: "rgba(233, 251, 251, 0.96)",
      }}
      keyboardType="numeric"
      iconClass={FontAwesomeIcon}
      iconName={icon}
      iconColor={"#04b5a7"}
      iconSize={moderateScale(20)}
      inputPadding={moderateScale(15)}
      autoCapitalize="none"
      onChangeText={(text) => newData(text)}
    />
  );
};

const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
    justifyContent: "flex-start",
  },
  top: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  bottom: {
    flex: 3.5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 25,
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "white",
  },
  title: {
    fontSize: moderateScale(27),
    color: "#04b5a7",
    fontFamily: "OpenSansSemiBold",
  },
  innercircle: {
    borderWidth: 8,
    height: height * 0.22,
    width: width * 0.49,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 150,
    borderColor: "darkslategrey",
    backgroundColor: "transparent",
  },
  welcome: {
    marginBottom: "8%",
    fontFamily: "OpenSansSemiBold",
    fontSize: moderateScale(20),
    fontStyle: "italic",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: "2%",
  },
  buttonstyle: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: moderateScale(55),
    width: "90%",
    borderRadius: 15,
    marginBottom: "5%",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowColor: "grey",
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "#04b5a7",
    opacity: 1,
  },

  customizeClasses: {
    flex: 1,
    // alignItems: 'center',
    padding: moderateScale(20),
  },
  invitationBody: {
    alignSelf: "center",
    // justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
  },
});
