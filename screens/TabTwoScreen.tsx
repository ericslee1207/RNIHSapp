import * as React from "react";
import { StyleSheet, Image, Button } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Icon,
} from "native-base";

import EditScreenInfo from "../components/EditScreenInfo";
import { View } from "../components/Themed";
import { ToolList } from "./ToolList";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "../navigation";
import { AuthContext } from "../components/AuthContext";

const tools = [
  {
    id: 0,
    icon: "https://image.flaticon.com/icons/png/512/426/426327.png",
    type: "ID Card",
    name: "IdCard",
  },
  {
    id: 1,
    icon:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Closed_Book_Icon.svg/1200px-Closed_Book_Icon.svg.png",
    type: "Checked Out Books",
    name: "CheckedOutBooks",
  },
  {
    id: 2,
    icon:
      "https://cdn.iconscout.com/icon/free/png-512/office-staff-9-1184344.png",
    type: "Staff",
    name: "Staff",
  },
  {
    id: 3,
    icon: "https://freeiconshop.com/wp-content/uploads/edd/calendar-flat.png",
    type: "Calendar",
    name: "Calendar",
  },
];

function MainScreen(props) {
  const {SignOut} = React.useContext(AuthContext)
  return (
    <View style={styles.container}>
      <ToolList tools={tools} navigation={props.navigation} />
      <Button title='Sign out' onPress={()=>SignOut()}/>
    </View>
  );
}

const Stack = createStackNavigator();
export default function TabTwoScreen({ navigation }) {
  return <MainScreen navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30
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
