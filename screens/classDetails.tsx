import react from "react";
import { View, Text, Alert } from "react-native";

export const classDetail = (props) => {
  Alert.alert(
    "Class Details",
    `Teacher: ${props.teacher.first_name} ${props.teacher.last_name}\nRoom Number: ${props.room}`,
    [{ text: "Done" }],
    { cancelable: true }
  );
};
