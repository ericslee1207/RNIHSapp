import React, { useState } from "react";
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
import { View, SectionList, StyleSheet, Alert } from "react-native";
import staffData from "../../exStaff.json";
import { Staff_List } from "./staff_list";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { moderateScale } from "react-native-size-matters";
import { useIsFocused } from "@react-navigation/native";

const DropDownMenu = (props) => {
  const [allBackground, setAllBackground]= useState("darkgreen");
  const [teacherBackground, setTeacherBackground]= useState("");
  
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableHighlight
        onPress={()=>{props.switchDatatoAll(); setTeacherBackground('transparent'); setAllBackground("darkgreen")}}
        style={{
          width: 85,
          height: 30,
          borderWidth: 1.5,
          borderColor: "white",
          alignItems: "center",
          justifyContent: "center",
          borderBottomLeftRadius: 10,
          borderTopLeftRadius: 10,
          backgroundColor: allBackground
        }}
      >
        <Text style={{ fontSize: 12, color: "white" }}>All</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={()=>{props.switchDatatoTeacher(); setTeacherBackground('darkgreen'); setAllBackground("transparent")}}
        style={{
          width: 85,
          height: 30,
          borderLeftWidth: 0,
          borderWidth: 1.5,
          borderColor: "white",
          alignItems: "center",
          justifyContent: "center",
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor: teacherBackground
        }}
      >
        <Text style={{ fontSize: 12, color: "white" }}>My Teachers</Text>
      </TouchableHighlight>
    </View>
  );
};
for (let i = 0; i < staffData.length; i++) {

}
export const Staff = () => {
  const [preferences, setPreferences] = useState({
    isCircle: false,
    radius: 3,
    colorObj: {
      primary :"#04b5a7",
      highlight : "hsl(165, 100%, 80%)",
      lightbackground : "rgba(233, 251, 251, 0.96)",
      darkbackground : "#D3E7EE"
    }
  })
  const isFocused = useIsFocused()
  useEffect(()=>{
    const getPreferences = async() => {
      let preferences = await AsyncStorage.getItem("SettingConfigurations")
      let preferencesParsed = JSON.parse(preferences)
      setPreferences(preferencesParsed)
    }
    getPreferences()
  }, [isFocused])
  let DATA = [...staffData];
  // const [myTeachersObject, setMyTeachersObject] = useState({})
  // useEffect(()=>{
  //   const getTeacherData = async() => {
  //     let my_Teachers = await AsyncStorage.getItem("Teachers")
  //     let filtered = DATA.filter((teacher)=>my_Teachers.includes(teacher.Name))
  //     setMyTeachersObject(filtered)
  //   }
  //   getTeacherData()
  // }, [])
  for (let i = 0; i < DATA.length; i++) {
    let element = DATA[i];
    element["id"]=i
  }
  const [staffdata, setStaffData] = useState(DATA);
  const render_Item = (titles) => {
    return (
      <View style={styles.title}>
        <Text style={styles.header}>{titles.section.title}</Text>
      </View>
    );
  };
  const render_staffs = (data) => {
    return (
      <Content>
        <Staff_List preferences={preferences} data={data.item} />
      </Content>
    );
  };
  const staff = staffdata.reduce((obj, worker) => {
    let names = worker.Name.split(" ");
    let lastName = names[names.length-1]
    const key = lastName.charAt(0);
    if (obj[key] === undefined) {
      obj[key] = [];
    }
    return {
      ...obj,
      [key]: [...obj[key], worker],
    };
  }, []);
  let index = 0;
  const workers = Object.keys(staff)
    .sort()
    .map((key) => ({
      title: key,
      data: staff[key],
    }));

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "rgba(233, 251, 251, 0.96)",
        }}
      >
        {/* <DropDownMenu
          // switchDatatoTeacher={() => {
          //   setStaffData((data) => myTeachersObject);
          // }}
          switchDatatoAll={() => {
            setStaffData((data) => DATA);
          }}
        /> */}
      </View>
      <SectionList
        renderSectionHeader={render_Item}
        renderItem={render_staffs}
        sections={workers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    fontSize: 30,
    fontFamily: "OpenSansSemiBold",
    fontWeight: "bold",
  },
  staff: {
    fontSize: 20,
  },
  title: {
    padding: 15,
    borderBottomColor: "lightgrey",
    shadowColor: "lightgrey",
    shadowOffset: {
      height: 3,
      width: 5,
    },
    shadowOpacity: 1,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
