// import React, { useState, useEffect, useContext } from "react";
// import {
//   Text,
//   View,
//   Dimensions,
//   StyleSheet,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Platform,
// } from "react-native";
// import {AuthContext} from '../../components/AuthContext'
// import DateTimePicker from "react-native-modal-datetime-picker";
// import {
//   Card,
//   Title,
//   Paragraph,
//   TextInput,
//   Button,
//   FAB,
// } from "react-native-paper";
// import { CalendarList, Agenda, Calendar } from "react-native-calendars";
// import IUSD_events from "../../IUSD_events.json";
// import moment from "moment";
// import { Madoka } from "react-native-textinput-effects";
// import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import AsyncStorage from "@react-native-community/async-storage";


// export const AddCalendarEvent=({navigation})=>{
//     const {datePresed} = useContext(AuthContext)
//     const {isTimePickerVisible, setTimePicker, chosenTime, setTime, 
//         listofEvents, editList, modalVisible, toggleModal, name, newName, 
//         description, newDescription} = React.useContext(AuthContext)

//         const cancel = () => {
//             newName("");
//             newDescription("");
//             setTime("");
//             toggleModal(false);
//           };
      
          
//           const submit = () => {
//             saveData();
//           };
//           const saveData = async () => {
//             const storedData = await AsyncStorage.getItem(datePresed);
      
//             let newData = [] as any;
      
//             if (storedData === null) {
//               // save
//               await AsyncStorage.setItem(datePresed, JSON.stringify([]));
//             } else {
//               const storedDataParsed = JSON.parse(storedData);
//               newData = [
//                 ...storedDataParsed,
//                 { name: name, description: description, time: chosenTime },
//               ].sort((a, b) => b.time - a.time);
//               await AsyncStorage.setItem(datePresed, JSON.stringify(newData));
//             }
//             // if (newData !== []) {
//             //   const newpair = {
//             //     [datePresed]: { marked: true, dotColor: "darkturquoise" },
//             //   };
//             //   newmarkedDate((object) => Object.assign(object, newpair));
//             //   await AsyncStorage.setItem("indicator", JSON.stringify(markedDates));
//             // }
//             newName("");
//             newDescription("");
//             setTime("");
//             toggleModal(false);
//             editList(newData);
//           };
    
//     return(
//         <TouchableWithoutFeedback
//             onPress={Keyboard.dismiss}
//             accessible={false}
//           >
//             <View style={styles.modalStyle}>
//               <Title style={{ marginTop: "5%" }}>New Event</Title>
//               <Madoka
//                 style={{ width: "90%", height: 30, marginTop: "3%" }}
//                 borderColor={"lightblue"}
//                 inputPadding={16}
//                 inputStyle={{ color: "black" }}
//                 onChangeText={(text) => newName(text)}
//                 value={name}
//                 label="Name"
//               />
//               <Madoka
//                 style={{ width: "90%", height: 30 }}
//                 borderColor={"lightgreen"}
//                 inputPadding={16}
//                 inputStyle={{ color: "black" }}
//                 onChangeText={(text) => newDescription(text)}
//                 value={description}
//                 label="Description"
//               />
//               <View
//                 style={{
//                   width: "100%",
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   paddingLeft: 15,
//                   paddingRight: 25,
//                 }}
//               >
//                 <Button
//                   onPress={() => setTimePicker(true)}
//                   style={{ marginBottom: 15, alignSelf: "flex-start" }}
//                 >
//                   Set Time
//                 </Button>
//                 <Text
//                   style={{
//                     fontSize: 25,
//                     fontFamily: "OpenSansSemiBold",
//                     alignSelf: "flex-start",
//                   }}
//                 >
//                   {chosenTime}
//                 </Text>
//               </View>
//               <DateTimePicker
//                 isVisible={isTimePickerVisible}
//                 onConfirm={(datetime) => [
//                   setTimePicker(false),
//                   setTime(moment(datetime).format("LT")),
//                 ]}
//                 onCancel={() => setTimePicker(false)}
//                 mode={"time"}
//                 is24Hour={false}
//               />
//               <View
//                 style={{
//                   flexDirection: "row",
//                   backgroundColor: "transparent",
//                   justifyContent: "center",
//                 }}
//               >
//                 <TouchableOpacity
//                   style={styles.addEventButton}
//                   onPress={()=>{submit; navigation.goBack()}}
//                 >
//                   <Text style={{ fontSize: 15, color: "white" }}>
//                     Add Event
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.cancelEventButton}
//                   onPress={()=>{cancel; navigation.goBack()}}
//                 >
//                   <Text style={{ fontSize: 15, color: "white" }}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </TouchableWithoutFeedback>
//     )
// }



// const styles = StyleSheet.create({
//     title: {
//       fontSize: 27,
//       marginVertical: "5%",
//       marginHorizontal: 15,
//     },
//     descriptionCard: {
//       marginVertical: "1.5%",
//       padding: 20,
//       borderRadius: 10,
//       borderLeftWidth: 7,
//       borderColor: "darkturquoise",
//       shadowRadius: 5,
//       shadowColor: "mediumturquoise",
//     },
//     titleCard: {
//       marginVertical: "5%",
//       width: "100%",
//       backgroundColor: "white",
//       padding: 15,
//       borderRadius: 10,
//       flexDirection: "row",
//       shadowOffset: {
//         width: 4,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//       justifyContent: "space-between",
//     },
//     addEventButton1: {
//       margin: 16,
//       right: 0,
//       bottom: 0,
//     },
//     addEventButton: {
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "lightblue",
//       height: 40,
//       width: 155,
//       borderRadius: 10,
//       marginRight: 5,
//     },
//     cancelEventButton: {
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "lightpink",
//       height: 40,
//       width: 155,
//       marginLeft: 5,
//       borderRadius: 10,
//     },
//     modalStyle: {
//       alignSelf: "center",
//       backgroundColor: "white",
//       width: "100%",
//       height: Dimensions.get("window").height * 0.41,
//       borderRadius: 20,
//       alignItems: "center",
//       marginBottom: "4%",
//       shadowOffset: {
//         width: 4,
//         height: 4,
//       },
//       shadowOpacity: 0.3,
//     },
//   });
  