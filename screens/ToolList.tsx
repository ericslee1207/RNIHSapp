import * as React from "react";
import { Image, Alert, StyleSheet } from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  View
} from "native-base";
import { AuthContext } from "../components/AuthContext";
import AsyncStorage from "@react-native-community/async-storage";
import { moderateScale } from "react-native-size-matters";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";

export const ToolList = (props) => {
  const onDelete = async () => {
    SignOut()
    await AsyncStorage.clear();
  }
  const [preferences, setPreferences] = React.useState({
    isCircle: false,
    radius: 3,
    colorObj: {
      primary :"#04b5a7",
      highlight : "hsl(165, 100%, 80%)",
      lightbackground : "rgba(233, 251, 251, 0.96)",
      darkbackground : "#D3E7EE"
    }
  })
  const handleLink = async (link) => {
    await WebBrowser.openBrowserAsync(link);
  };
  const isFocused = useIsFocused()
  React.useEffect(()=>{
    const getPreferences = async() => {
      let preferences = await AsyncStorage.getItem("SettingConfigurations")
      let preferencesParsed = JSON.parse(preferences)
      setPreferences(preferencesParsed)
    }
    getPreferences()
  }, [isFocused])
  const { SignOut } = React.useContext(AuthContext)
  const tools = props.tools;
  const availableTools = props.tools.map((tool) => (
    <ListItem
      key={tool.id}
      onPress={() => {
        if (tool.name == "Delete Account") {
          Alert.alert(
            "Delete Account",
            "",
            [
              {
                text: 'Yes',
                onPress: onDelete
              },
              {
                text: 'No',
                onPress: () => console.log('canceled')
              }
            ],
            { cancelable: false }

          )
        }
        else if (tool.name == "El Vaquero") {
          handleLink("https://ihselvaquero.com/")
        }
        else if (tool.name == "FlexTime") {
          handleLink("https://teachmore.org/irvine/students/")
        }
        else {
          props.navigation.navigate(tool.name)
        }
      }}
    >
      <Left>
        <Thumbnail
          style={{ width: moderateScale(60), height: moderateScale(60) }}
          source={{ uri: `${tool.icon}` }}
        />
      </Left>
      <Body style={{ marginLeft: -100 }}>
        <Text style={{ fontSize: 25 }}>{tool.type}</Text>
      </Body>
      <Right style={{ justifyContent: "center" }}>
        <Image
          style={{ width: 20, height: 10, marginRight: 10 }}
          source={require("../assets/images/arrowIcon.png")}
        />
      </Right>


    </ListItem>
  ));
  return (
    <View style={{ flex: 3, padding: moderateScale(25) }}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => props.navigation.navigate(tools[0].name)} style={{ flex: 2.5 / 5, height: '100%', borderRadius: moderateScale(20), marginRight: moderateScale(6), justifyContent: 'center', alignItems: 'center', shadowColor: "grey", shadowOpacity: 0.3, shadowRadius: 5, backgroundColor: "white", shadowOffset: {height: 1, width: 0}, elevation: 7 }}>
          <AntDesign name="calendar" size={moderateScale(38)} color={preferences.colorObj.primary} />
          <Text style={[styles.text, {color: "black"}]}>{tools[0].type}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLink("https://teachmore.org/irvine/students/")} style={{ flex: 2.5 / 5,  height: '100%', borderRadius: moderateScale(20), marginLeft: moderateScale(6), justifyContent: 'center', alignItems: 'center' , shadowColor: "grey", shadowOpacity: 0.3, shadowRadius: 5, backgroundColor: "white", shadowOffset: {height: 1, width: 0}, elevation: 7 }}>
          <AntDesign name="clockcircleo" size={moderateScale(38)} color={preferences.colorObj.primary} />
          <Text style={styles.text}>{tools[1].type}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => props.navigation.navigate(tools[2].name)} style={{ flex: 2.5 / 5,  height: '100%', borderRadius: moderateScale(20), marginRight: moderateScale(6), justifyContent: 'center', alignItems: 'center', shadowColor: "grey", shadowOpacity: 0.3, shadowRadius: 5, backgroundColor: "white", shadowOffset: {height: 1, width: 0}, elevation:7 }}>
          <AntDesign name="idcard" size={moderateScale(38)} color={preferences.colorObj.primary} />
          <Text style={styles.text}>{tools[2].type}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate(tools[3].name)} style={{ flex: 2.5 / 5,  height: '100%', borderRadius: moderateScale(20), marginLeft: moderateScale(6), justifyContent: 'center', alignItems: 'center', shadowColor: "grey", shadowOpacity: 0.3, shadowRadius: 5, backgroundColor: "white", shadowOffset: {height: 1, width: 0}, elevation: 7  }}>
          <Feather name="users" size={moderateScale(38)} color={preferences.colorObj.primary} />          
        <Text style={styles.text}>{tools[3].type}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleLink("https://ihselvaquero.com/")} style={{ flex: 2.5 / 5,  height: '100%', borderRadius: moderateScale(20), marginRight: moderateScale(6), justifyContent: 'center', alignItems: 'center', shadowColor: 'grey', shadowOpacity: 0.3, shadowRadius: 5, backgroundColor: "white", shadowOffset: {height: 1, width: 0}, elevation: 7  }}>
          <Ionicons name="newspaper-outline" size={moderateScale(38)} color={preferences.colorObj.primary} />
          <Text style={styles.text}>{tools[4].type}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>
          Alert.alert(
            "Are you sure?",
            "This will permanently delete your account and its data",
            [
              {
                text: 'Yes',
                onPress: onDelete
              },
              {
                text: 'No',
                onPress: () => console.log('canceled')
              }
            ],
            { cancelable: false }

          )
        } style={{ flex: 2.5 / 5, height: '100%', borderRadius: moderateScale(20), marginLeft: moderateScale(6), justifyContent: 'center', alignItems: 'center', shadowColor: "grey", shadowOpacity: 0.3, shadowRadius: 5, backgroundColor: "white", shadowOffset: {height: 1, width: 0}, elevation: 7  }}>
          <AntDesign name="deleteuser" size={moderateScale(38)} color={preferences.colorObj.primary} />
          <Text style={styles.text}>{tools[5].type}</Text>
        </TouchableOpacity>
      </View>
    </View>
    // <Container>
    //   <Content showsVerticalScrollIndicator={false}>
    //     <List showsVerticalScrollIndicator={false}>{availableTools}</List>
    //   </Content>
    // </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(12),
    maxHeight: moderateScale(150)
  },
  text: {
    marginTop: moderateScale(5),
    fontFamily: 'OpenSansSemiBold'
  }
})