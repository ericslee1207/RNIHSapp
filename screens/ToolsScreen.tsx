import * as React from "react";
import { StyleSheet, Image, Button, Alert } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { View } from "../components/Themed";
import { ToolList } from "./ToolList";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "../navigation";
import { AuthContext } from "../components/AuthContext";

const tools = [
  {
    id: 3,
    icon: "https://freeiconshop.com/wp-content/uploads/edd/calendar-flat.png",
    type: "Calendar",
    name: "Calendar",
  },
  {
    id: 1,
    icon: "https://falconpostjhs.com/wp-content/uploads/2020/09/malin.png",
    type: "Flex Time",
    name: "FlexTime"
  },
  {
    id: 0,
    icon: "https://image.flaticon.com/icons/png/512/426/426327.png",
    type: "ID Card",
    name: "IdCard",
  },
  {
    id: 2,
    icon:
      "https://cdn.iconscout.com/icon/free/png-512/office-staff-9-1184344.png",
    type: "Staff",
    name: "Staff",
  },
  {
    id: 4,
    icon:
      "https://cdn3.iconfinder.com/data/icons/ballicons-reloaded-free/512/icon-70-512.png",
    type: "El Vaquero",
    name: "El Vaquero",
  },
  {
    id: 5,
    icon: "https://cdn3.iconfinder.com/data/icons/basic-ui-15/512/1040_man_with_circle_c-512.png",
    name: "Delete Account",
    type: "Delete Account"
  }
];

function MainScreen(props) {
  return (
    <View style={styles.container}>
      <ToolList tools={tools} navigation={props.navigation} />
      {/* <Button title='Sign out' onPress={()=>Alert.alert(
        "Sign Out",
        "",
        [
        {
          text: 'Yes',
          onPress: () => SignOut()
        },
        {
          text: 'No',
          onPress: () => console.log('canceled')
        }
      ],
      {cancelable: false}
      )}/> */}
    </View>
  );
}

const Stack = createStackNavigator();
export default function ToolsScreen({ navigation }) {
  return <MainScreen navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    //backgroundColor: "rgba(233, 251, 251, 0.96)"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
