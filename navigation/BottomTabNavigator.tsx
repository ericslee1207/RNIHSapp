import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import * as React from "react";
import { Image, Dimensions, StyleSheet, View, TouchableOpacity, Platform } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import Colors from "../constants/Colors";
import { Feather } from '@expo/vector-icons'; 
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/HomeScreen";
import ToolsScreen from "../screens/ToolsScreen";
import ListOfClubsScreen from "../screens/ListOfClubsScreen";
import { IdCard } from "../screens/ToolScreens/IdCard";
import { Calendar1 } from "../screens/ToolScreens/Calendar";
import { Staff } from "../screens/ToolScreens/Staff";
import {moderateScale, verticalScale, scale} from 'react-native-size-matters'
import ConfigurePersonalInfoScreen from "../screens/ConfigurePersonalInfoScreen";
import ConfigureSettingsScreen from "../screens/ConfigureSettingsScreen";
import {
  BottomTabParamList,
  TabOneParamList,
  TabTwoParamList,
  TabThreeParamList,
} from "../types";
import { Club_Page } from "../screens/Tab3Screens/Club_Screens";
import { MyClubs } from "../screens/Tab3Screens/MyClubs"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import PreferencesScreen from "../screens/PreferencesScreen";
import AboutScreen from "../screens/AboutScreen";
import { AuthContext } from "../components/AuthContext";

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({navigation}) {
  const {colorObj} = React.useContext(AuthContext)
  return (
    <>
    {/* <View style={styles.homebuttonbackground}>
      <TouchableOpacity onPress={()=> navigation.navigate('Profile')} style={{backgroundColor: 'transparent'}}>
        <Image style={styles.homeButton} source={require('../assets/images/diffhome.png')}/>
      </TouchableOpacity>
    </View> */}
    
    <BottomTab.Navigator
      initialRouteName="Profile"
      activeColor={colorObj.primary}
      inactiveColor='grey'
      shifting={true}
      barStyle={{
      }}
    >
      <BottomTab.Screen
        name="Involvements"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-bookmark" color={color} />
          ),
          tabBarColor: colorObj.darkbackground,
          tabBarLabel: ''
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} />
          ),
          tabBarColor: colorObj.darkbackground,
          tabBarLabel: '',
          
        }}
      />
      <BottomTab.Screen
        name="Tools"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-search" color={color} />
          ),
          tabBarColor: colorObj.darkbackground,
          tabBarLabel: ''
        }}
      />
    </BottomTab.Navigator>
    </>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return (
    
    <Ionicons size={30} style={{ marginBottom: -3, marginTop:0 }} {...props} />

  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

export function TabOneNavigator({navigation}) {
  const {colorObj} = React.useContext(AuthContext)
  const onPfpClick = () => {
    navigation.navigate("ConfigurePersonalInfo")
  }
  const onSettingsClick = () => {
    navigation.navigate("ConfigureSettings")
  }
  return (
    <TabOneStack.Navigator mode="modal">
      <TabOneStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: (props) => {
            if (colorObj.primary=="#04b5a7"){
              return(
                <Image
                  style={{ width: moderateScale(150), height: moderateScale(45), alignSelf: "flex-start",}}
                  source={require("../assets/images/darkgreenIHSheader.png")}
                />
              )
            }
            else if (colorObj.primary=="#45b5ff"){
                return(
                  <Image
                    style={{ width: moderateScale(150), height: moderateScale(45), alignSelf: "flex-start",}}
                    source={require("../assets/images/lightblueIHSHeader.png")}
                  />
                )
            }
            else if (colorObj.primary=="#ff82c5"){
              return(
                <Image
                  style={{ width: moderateScale(150), height: moderateScale(45), alignSelf: "flex-start",}}
                  source={require("../assets/images/pinkIHSHeader.png")}
                />
              )
            }
            else if (colorObj.primary=="#86e07b"){
              return(
                <Image
                  style={{ width: moderateScale(150), height: moderateScale(45), alignSelf: "flex-start",}}
                  source={require("../assets/images/lightgreenIHSHeader.png")}
                />
              )
            }
            else{
              return(
                <Image
                  style={{ width: moderateScale(150), height: moderateScale(45), alignSelf: "flex-start",}}
                  source={require("../assets/images/purpleIHSHeader.png")}
                />
              )
            }
          },
          headerLeft: (props)=>(
            null
          ),
          headerRight: (props)=>(
            <>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            {/* <TouchableOpacity onPress={onPfpClick} style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: moderateScale(10)}}>
              <MaterialCommunityIcons name="account-circle-outline" size={moderateScale(43)} color="darkgreen"/>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={onSettingsClick} style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: moderateScale(20)}}>
              <Entypo name="dots-three-horizontal" size={moderateScale(35)} color="black" />              
              </TouchableOpacity>
            </View>
            </>
          ),
          headerStyle: {
            backgroundColor: colorObj.lightbackground,
            height: verticalScale(78),
            shadowColor: "transparent",
            shadowOffset: {
              height: 0.2,
            },
            shadowOpacity: 0.8,
            elevation: 0
          },
          headerTitleStyle: {
            color: "white",
          },
          // headerLeft: (props)=>(
          //   <Image
          //   style={{ width: moderateScale(200), height: moderateScale(60), alignSelf: "center", marginLeft: moderateScale(20) }}
          //   source={require("../assets/images/darkgreenIHSheader.png")}
          // />
          // )
        }}
      />
      <TabOneStack.Screen
        name="SetClasses"
        component={ConfigurePersonalInfoScreen}
        options={{
          headerLeft: (props)=>(
            <Feather name="x" size={moderateScale(22)} onPress={()=>navigation.navigate("HomeScreen")} color="black" style={{marginLeft: moderateScale(30)}}/>
          ),
          headerTitle: "Personalize Classes",
          headerStyle:{
            backgroundColor: colorObj.lightbackground,

          }
        }}
      />
      <TabOneStack.Screen
        name="ConfigureSettings"
        component={ConfigureSettingsScreen}
        options={{
          headerLeft: (props)=>(
            <Feather name="x" size={moderateScale(22)} onPress={()=>navigation.navigate("HomeScreen")} color="black" style={{marginLeft: moderateScale(30)}}/>
          ),
          headerTitle: "Settings",
          headerStyle: {backgroundColor: colorObj.lightbackground}
        }}
      />
      <TabOneStack.Screen
        name="Preferences"
        component={PreferencesScreen}
        options={{
          headerLeft: (props)=>(
            <Feather name="x" size={moderateScale(22)} onPress={()=>navigation.navigate("HomeScreen")} color="black" style={{marginLeft: moderateScale(30)}}/>
          ),
          headerTitle: "Preferences",
          headerStyle: {backgroundColor: colorObj.lightbackground}
        }}
      />
      <TabOneStack.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerLeft: (props)=>(
            <Feather name="x" size={moderateScale(22)} onPress={()=>navigation.navigate("HomeScreen")} color="black" style={{marginLeft: moderateScale(30)}}/>
          ),
          headerTitle: "About",
          headerStyle: {backgroundColor: colorObj.lightbackground}
        }}
      />
</TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  const {colorObj} = React.useContext(AuthContext)
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="ToolsScreen"
        component={ToolsScreen}
        options={{
          headerTitle: "Tools",
          headerStyle: [styles.header, {backgroundColor: colorObj.lightbackground}],
          headerTitleStyle: styles.headerTitle,
          headerLeft: null

        }}
      />
      <TabTwoStack.Screen
        name="IdCard"
        component={IdCard}
        options={{
          headerTitle: "ID Card",
          headerStyle: [styles.header, {backgroundColor: colorObj.lightbackground}],
          headerTitleStyle: styles.headerTitle,
        }}
      />
      {/* <TabTwoStack.Screen
        name="CheckedOutBooks"
        component={CheckedOutBooks}
        options={{
          headerTitle: "Checked Out Books",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      /> */}
      <TabTwoStack.Screen
        name="Staff"
        component={Staff}
        options={{
          headerTitle: "Staff",
          headerStyle: [styles.header, {backgroundColor: colorObj.lightbackground}],
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <TabTwoStack.Screen
        name="Calendar"
        component={Calendar1}
        options={{
          headerTitle: "Calendar",
          headerStyle: [styles.header, {backgroundColor: colorObj.lightbackground}],
          headerTitleStyle: styles.headerTitle,
        }}
      />
    </TabTwoStack.Navigator>
  );
}
const TabThreeStack = createStackNavigator<TabThreeParamList>();
function TabThreeNavigator() {
  const {colorObj} = React.useContext(AuthContext)

  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="ListOfClubsScreen"
        component={ListOfClubsScreen}
        options={{
          headerTitle: "Clubs",
          headerStyle: [styles.header, {backgroundColor: colorObj.lightbackground}],
          headerTitleStyle: styles.headerTitle,
          headerLeft: null
        }}
      />

      <TabThreeStack.Screen
        name="ClubScreen"
        component={Club_Page}
        options={{
          headerTitle: 'Clubs',
          headerStyle: [styles.header, {backgroundColor: colorObj.lightbackground}],
          headerTitleStyle: styles.headerTitle
        }}
        
        />
        <TabThreeStack.Screen
        name="MyClubs"
        component={MyClubs}
        options={{
          headerTitle: 'My Clubs',
          headerStyle: [styles.header, {backgroundColor: colorObj.lightbackground}],
          headerTitleStyle: styles.headerTitle
        }}
        
        />
    </TabThreeStack.Navigator>
  );
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgba(233, 251, 251, 0.96)",
    height: moderateScale(80),
    shadowColor: "transparent",
    elevation: 0

  },
  headerTitle: {
    color: "black",
  },
  homeButton: {
    width: 45, 
    height: 45,
    alignSelf: 'center',
  },
  homebuttonbackground: {
    zIndex: 100,
    position: 'absolute',
    borderRadius: 73/2,
    width: 73, 
    height: 73,
    backgroundColor: 'white',
    alignSelf: 'center',
    bottom: '2%',
    borderWidth: 5,
    borderColor: '#009387',
    justifyContent: 'center'
  },
  
});
