import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Image, Dimensions, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import TabThreeScreen from "../screens/TabThreeScreen";
import { IdCard } from "../screens/ToolScreens/IdCard";
import { CheckedOutBooks } from "../screens/ToolScreens/CheckedOutBooks";
import { Calendar1 } from "../screens/ToolScreens/Calendar";
import { Staff } from "../screens/ToolScreens/Staff";
import {
  BottomTabParamList,
  TabOneParamList,
  TabTwoParamList,
  TabThreeParamList,
} from "../types";
import { Club_Page } from "../screens/Tab3Screens/Club_Screens";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Profile"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Involvements"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-bookmark" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-contact" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Tools"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-search" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return (
    <Ionicons size={30} style={{ marginBottom: -3, marginTop: 5 }} {...props} />
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{
          headerTitle: (props) => (
            <Image
              style={{ width: 320, height: 78, alignSelf: "center" }}
              source={require("../assets/images/IHSheader.png")}
            />
          ),
          headerStyle: {
            backgroundColor: "lightblue",
            height: 170,
            shadowColor: "grey",
            shadowOffset: {
              height: 1,
            },
            shadowOpacity: 0.8,
          },
          headerTitleStyle: {
            color: "white",
          },
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
      <TabTwoStack.Screen
        name="CheckedOutBooks"
        component={CheckedOutBooks}
        options={{
          headerTitle: "Checked Out Books",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      />
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
          headerTitle: "Courses and Clubs",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
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
    </TabThreeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "lightblue",
    height: Dimensions.get('window').height*0.13,
  },
  headerTitle: {
    color: "white",
  },
});
