import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import * as React from "react";
import { Image, Dimensions, StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons'; 

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import TabThreeScreen from "../screens/TabThreeScreen";
import { IdCard } from "../screens/ToolScreens/IdCard";
import { CheckedOutBooks } from "../screens/ToolScreens/CheckedOutBooks";
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

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({navigation}) {

  return (
    <>
    {/* <View style={styles.homebuttonbackground}>
      <TouchableOpacity onPress={()=> navigation.navigate('Profile')} style={{backgroundColor: 'transparent'}}>
        <Image style={styles.homeButton} source={require('../assets/images/diffhome.png')}/>
      </TouchableOpacity>
    </View> */}
    
    <BottomTab.Navigator
      initialRouteName="Profile"
      activeColor='#009387'
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
          tabBarColor: '#D3E7EE',
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
          tabBarColor: '#D3E7EE',
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
          tabBarColor: '#D3E7EE',
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
  const onPfpClick = () => {
    navigation.navigate("ConfigurePersonalInfo")
  }
  const onSettingsClick = () => {
    navigation.navigate("ConfigureSettings")
  }
  return (
    <TabOneStack.Navigator mode="modal">
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{
          headerTitle: (props) => (
            <Image
            style={{ width: moderateScale(150), height: moderateScale(45), alignSelf: "center",  }}
            source={require("../assets/images/darkgreenIHSheader.png")}
          />
          // <></>
          ),
          
          headerRight: (props)=>(
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            {/* <TouchableOpacity onPress={onPfpClick} style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: moderateScale(10)}}>
              <MaterialCommunityIcons name="account-circle-outline" size={moderateScale(43)} color="darkgreen"/>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={onSettingsClick} style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: moderateScale(20)}}>
              <AntDesign name="setting" size={moderateScale(35)} color="darkgreen" />            
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: 'rgba(233, 251, 251, 0.96)',
            height: moderateScale(88),
            shadowColor: "transparent",
            shadowOffset: {
              height: 0.2,
            },
            shadowOpacity: 0.8,
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
      {/* <TabOneStack.Screen
        name="ConfigurePersonalInfo"
        component={ConfigurePersonalInfoScreen}
        options={{
          headerLeft: (props)=>(
            <Foundation name="x" size={24} onPress={()=>navigation.navigate("TabOneScreen")} color="black" style={{marginLeft: moderateScale(30)}}/>
          ),
          headerTitle: "Configure Personal Information"
        }}
      /> */}
      <TabOneStack.Screen
        name="ConfigureSettings"
        component={ConfigureSettingsScreen}
        options={{
          headerLeft: (props)=>(
            <Foundation name="x" size={24} onPress={()=>navigation.navigate("TabOneScreen")} color="black" style={{marginLeft: moderateScale(30)}}/>
          ),
          headerTitle: "Configure Settings",
          headerStyle: {backgroundColor: "rgba(233, 251, 251, 0.96)"}
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{
          headerTitle: "Tools",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: null

        }}
      />
      <TabTwoStack.Screen
        name="IdCard"
        component={IdCard}
        options={{
          headerTitle: "ID Card",
          headerStyle: styles.header,
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
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <TabTwoStack.Screen
        name="Calendar"
        component={Calendar1}
        options={{
          headerTitle: "Calendar",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      />
    </TabTwoStack.Navigator>
  );
}
const TabThreeStack = createStackNavigator<TabThreeParamList>();
function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{
          headerTitle: "Clubs",
          headerStyle: [styles.header],
          headerTitleStyle: styles.headerTitle,
          headerLeft: null
        }}
      />

      <TabThreeStack.Screen
        name="ClubScreen"
        component={Club_Page}
        options={{
          headerTitle: 'Clubs',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle
        }}
        
        />
        <TabThreeStack.Screen
        name="MyClubs"
        component={MyClubs}
        options={{
          headerTitle: 'My Clubs',
          headerStyle: styles.header,
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
  }
});
