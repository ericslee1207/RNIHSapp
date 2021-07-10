import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  Image,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
  Platform
} from "react-native";
import Constants from 'expo-constants';
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Fumi } from "react-native-textinput-effects";
import { AuthContext } from "../components/AuthContext";
import AsyncStorage from "@react-native-community/async-storage";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    Alert.alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export const Login = ({ navigation }) => {
  const { SignIn } = React.useContext(AuthContext);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  let disabled = true;
  const proceedToHome = async() =>{
    let colorObj = {
      primary: "#04b5a7",
      highlight: "hsl(165, 100%, 80%)",
      lightbackground: "rgba(233, 251, 251, 0.96)",
      darkbackground: "#D3E7EE"
    }
    let settings = {isCircle: false, radius: 3, colorObj: colorObj}
    await AsyncStorage.setItem("accountInfo", JSON.stringify(data));
    await AsyncStorage.setItem("SettingConfigurations", JSON.stringify(settings))
    .then(SignIn)
    // .then(()=>{
    //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //     // setNotification(notification);
    //     console.log(notification)
    //   });
    //   console.log(expoPushToken)
    // })
    
  }
  const [data, setData] = React.useState({
    longID: "",
    firstName: "",
    lastName: "",
    shortID: "",
    grade: ""
  });

  const newDataLongID = (text: string) => {
    if (text.length > 0) {
      setData({
        longID: text,
        firstName: data.firstName,
        lastName: data.lastName,
        shortID: data.shortID,
        grade: data.grade
      });
    }
  };
 
  const newDataFirstName = (text: string) => {
    if (text.length > 0) {
      setData({
        longID: data.longID,
        firstName: text,
        lastName: data.lastName,
        shortID: data.shortID,
        grade: data.grade
      });
    }
  };
  const newDataLastName = (text: string) => {
    if (text.length > 0) {
      setData({
        longID: data.longID,
        firstName: data.firstName,
        lastName: text,
        shortID: data.shortID,
        grade: data.grade
      });
    }
  };
  const newDataShortID = (text: string) => {
    if (text.length > 0) {
      setData({
        longID: data.longID,
        firstName: data.firstName,
        lastName: data.lastName,
        shortID: text,
        grade: data.grade
      });
    }
  };
  const newDataGrade = (text: string) => {
    if (text.length > 0) {
      setData({
        longID: data.longID,
        firstName: data.firstName,
        lastName: data.lastName,
        shortID: data.shortID,
        grade: text
      });
    }
  };
  let bc = "#b0d4ba"
  if (data.longID.length==9 && data.shortID.length==5 && data.firstName.length>0 && data.lastName.length>0 && parseInt(data.grade)>=9 && parseInt(data.grade)<=12){
    disabled=false
    bc = "#009387"

  }
  else{
    disabled=true;
    bc = "#b0d4ba"
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <ImageBackground
          style={{ height: height, width: width }}
          source={require("../assets/images/IHSAerielView_Cut.jpg")}
          imageStyle={{ opacity: 0.4 }}
        >
          <View style={styles.top}>
            <Text style={styles.title}>IHS Student</Text>
          </View>

          <Animatable.View style={styles.bottom} animation="fadeInUpBig">
            <Text style={styles.welcome}>Account Setup</Text>
            <ScrollView style={{ width: "90%", flex: 1 }}>
              {/* <FumiInput type="IUSD Email" newData = {newDataUser} icon="user"/> */}
              <FumiInput type="First Name" newData={newDataFirstName} icon="user"/>
              <FumiInput type="Last Name" newData={newDataLastName} icon="user"/>
              <FumiInputNumber type="Short ID" newData={newDataShortID} icon="user"/>
              <FumiInputNumber type="Long ID" newData={newDataLongID} icon="user"/>
              <FumiInputNumber type="Grade" newData={newDataGrade} icon="user"/>
            </ScrollView>

            <View style={{ width: "100%" }}>
              <TouchableOpacity
                onPress={proceedToHome}
                disabled={disabled}
                style={[styles.buttonstyle, {backgroundColor: bc}]}
  
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
            </View>
          </Animatable.View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const FumiInput = ({ newData, type, icon }) => {
  return (
    <Fumi
      label={type}
      style={{
        marginBottom: "4%",
        borderRadius: 20,
        borderWidth: 1,
        height: 10,
        borderColor: "lightblue",
      }}
    
      iconClass={FontAwesomeIcon}
      iconName={icon}
      iconColor={"#f95a25"}
      iconSize={20}
      inputPadding={16}
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
        borderWidth: 1,
        borderColor: "lightblue",
      }}
      keyboardType="numeric"
      iconClass={FontAwesomeIcon}
      iconName={icon}
      iconColor={"#f95a25"}
      iconSize={20}
      inputPadding={16}
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
  },
  top: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  bottom: {
    flex: 3,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    borderWidth: 5,
    borderColor: "white",
  },
  logo: {
    height: height * 0.18,
    width: width * 0.29,
    opacity: 0.8,
  },
  title: {
    fontSize: 36,
    margin: 25,
    color: "white",
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
    margin: "8%",
    fontFamily: "OpenSansSemiBold",
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  outercircle: {
    height: height * 0.24,
    width: width * 0.53,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 150,
    backgroundColor: "lightcyan",
  },
  buttonstyle: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    width: "90%",
    borderRadius: 15,
    marginVertical: "10%",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
  },
});
