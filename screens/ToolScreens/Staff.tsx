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
import DATA from "../../exStaff.json";
import Teacher_Data from "../../Teacher_Data.json";
import { Staff_List } from "./staff_list";
import { TouchableHighlight } from "react-native-gesture-handler";

const DropDownMenu = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableHighlight
        onPress={props.switchDatatoAll}
        style={{
          width: 85,
          height: 30,
          borderWidth: 1.5,
          borderColor: "white",
          alignItems: "center",
          justifyContent: "center",
          borderBottomLeftRadius: 10,
          borderTopLeftRadius: 10,
        }}
      >
        <Text style={{ fontSize: 12, color: "white" }}>All</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={props.switchDatatoTeacher}
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
        }}
      >
        <Text style={{ fontSize: 12, color: "white" }}>My Teachers</Text>
      </TouchableHighlight>
    </View>
  );
};
let my_teachers = [];
for (let i = 0; i < Teacher_Data.length; i++) {
  const period = Teacher_Data[i].period;
  if (period != "*") {
    my_teachers.push(Teacher_Data[i].teacher);
  }
}
export const Staff = () => {
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
        <Staff_List data={data.item} />
      </Content>
    );
  };
  const staff = staffdata.reduce((obj, worker) => {
    const key = worker.last_name.charAt(0);
    if (obj[key] === undefined) {
      obj[key] = [];
    }
    return {
      ...obj,
      [key]: [...obj[key], worker],
    };
  }, []);
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
          backgroundColor: "lightblue",
          padding: 10,
        }}
      >
        <DropDownMenu
          switchDatatoTeacher={() => {
            setStaffData((data) => my_teachers);
          }}
          switchDatatoAll={() => {
            setStaffData((data) => DATA);
          }}
        />
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
    fontFamily: "Trebuchet MS",
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
