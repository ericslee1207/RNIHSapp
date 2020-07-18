import React, { useState } from "react";
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
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Fumi } from "react-native-textinput-effects";
import { AuthContext } from "../components/AuthContext";

export const Login = ({ navigation }) => {
  const { SignIn } = React.useContext(AuthContext);

  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const newDataUser = (text: string) => {
    if (text.length > 0) {
      setData({
        email: text,
        password: data.password,
      });
    }
  };
  const newDataPass = (text: string) => {
    if (text.length > 0) {
      setData({
        email: data.email,
        password: text,
      });
    }
  };

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
            <Text style={styles.welcome}>IUSD Login</Text>
            <View style={{ width: "90%" }}>
              <FumiInputUser newDataUser={newDataUser} />
              <FumiInputPassword newDataPass={newDataPass} />
            </View>

            <View style={{ width: "100%" }}>
              <TouchableOpacity
                onPress={() => SignIn()}
                style={styles.buttonstyle}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Acquire",
                    fontSize: 18,
                  }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const FumiInputUser = ({ newDataUser }) => {
  return (
    <Fumi
      label={"Username"}
      style={{
        marginVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "lightblue",
      }}
      iconClass={FontAwesomeIcon}
      iconName={"user"}
      iconColor={"#f95a25"}
      iconSize={20}
      inputPadding={16}
      autoCapitalize="none"
      onChangeText={(text) => newDataUser(text)}
    />
  );
};

const FumiInputPassword = ({ newDataPass }) => {
  return (
    <Fumi
      label={"Password"}
      style={{
        marginVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "lightblue",
      }}
      iconClass={FontAwesomeIcon}
      iconName={"lock"}
      iconColor={"#f95a25"}
      iconSize={20}
      inputPadding={16}
      autoCapitalize="none"
      secureTextEntry={true}
      onChangeText={(text) => newDataPass(text)}
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
    fontFamily: "Acquire",
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
    fontFamily: "Trebuchet MS",
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
    backgroundColor: "#009387",
    width: "90%",
    borderRadius: 15,
    marginVertical: "10%",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
  },
});
