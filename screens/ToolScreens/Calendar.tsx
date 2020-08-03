import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import {
  Card,
  Title,
  Paragraph,
  TextInput,
  Button,
  FAB,
} from "react-native-paper";
import { CalendarList, Agenda, Calendar } from "react-native-calendars";
import IUSD_events from "../../IUSD_events.json";
import moment from "moment";
import { Madoka } from "react-native-textinput-effects";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-community/async-storage";

export const Calendar1 = () => {
  const [markedDates, newmarkedDate] = useState({});
  const startup = async () => {
    let newData = {} as any;
    const storedIndicators = await AsyncStorage.getItem("indicator");
    if (storedIndicators === null) {
      await AsyncStorage.setItem("indicator", JSON.stringify({}));
    } else {
      const parsedStoredIndicator = JSON.parse(storedIndicators);
      newData = parsedStoredIndicator;
      await AsyncStorage.setItem(
        "indicator",
        JSON.stringify(parsedStoredIndicator)
      );
    }
    newmarkedDate(newData);
  };
  useEffect(() => {
    startup();
  }, []);
  const SetEvent = (props: any) => {
    const [isTimePickerVisible, setTimePicker] = useState(false);
    const [chosenTime, setTime] = useState("");
    const [listofEvents, editList] = useState([]); //initial value of useState would be what you get from another API/database
    const [modalVisible, toggleModal] = useState(false);
    const [name, newName] = useState("");
    const [description, newDescription] = useState("");

    useEffect(() => {
      updateInitialData();
    }, []);

    const saveData = async () => {
      const storedData = await AsyncStorage.getItem(props.datePressed);

      let newData = [] as any;

      if (storedData === null) {
        // save
        await AsyncStorage.setItem(props.datePressed, JSON.stringify([]));
      } else {
        const storedDataParsed = JSON.parse(storedData);
        newData = [
          ...storedDataParsed,
          { name: name, description: description, time: chosenTime },
        ].sort((a, b) => b.time - a.time);
        await AsyncStorage.setItem(props.datePressed, JSON.stringify(newData));
      }
      if (newData !== []) {
        const newpair = {
          [props.datePressed]: { marked: true, dotColor: "darkturquoise" },
        };
        newmarkedDate((object) => Object.assign(object, newpair));
        await AsyncStorage.setItem("indicator", JSON.stringify(markedDates));
      }
      newName("");
      newDescription("");
      setTime("");
      toggleModal(false);
      editList(newData);
    };
    const clearAsyncStorage = async () => {
      AsyncStorage.clear();
    };
    const updateInitialData = async () => {
      const storedData = await AsyncStorage.getItem(props.datePressed);

      let newData = [] as any;

      if (storedData === null) {
        // save
        await AsyncStorage.setItem(props.datePressed, JSON.stringify([]));
      } else {
        const storedDataParsed = JSON.parse(storedData);
        newData = [
          ...storedDataParsed]
        await AsyncStorage.setItem(props.datePressed, JSON.stringify(newData));
      }

      editList(newData)
    };

    const cancel = () => {
      newName("");
      newDescription("");
      setTime("");
      toggleModal(false);
    };

    const deletenow = (id: string) => {
      const onDelete = async () => {
        const storedData = await AsyncStorage.getItem(props.datePressed);
        let stringifieddata = [] as any;
        let newData = [] as any;
        if (storedData !== null) {
          const storedDataParsed = JSON.parse(storedData);
          newData = storedDataParsed.filter((data) => data.name != id);
          try {
            await AsyncStorage.removeItem(id);
          } catch (e) {
            console.log(e);
          }
          stringifieddata = JSON.stringify(newData);
          await AsyncStorage.setItem(props.datePressed, stringifieddata);
        }
        if (stringifieddata===JSON.stringify([])){
          const newArr = Object.keys(markedDates).reduce((object, key) => {
            if (key !== props.datePressed) {
              object[key]=markedDates[key]
            }
            return object
          }, {})
          await AsyncStorage.setItem(
            'indicator',
            JSON.stringify(newArr)
          )
        }
        editList(newData);
      };
      onDelete();
    };

    const submit = () => {
      saveData();
    };

    const my_events = listofEvents.map((event) => {
      if (event.name !== "" && event.description !== "" && event.time !== "") {
        const eventname = event.name;
        return (
          <Card key={event.name} style={styles.descriptionCard}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {event.name}
              </Text>

              <Button onPress={() => deletenow(eventname)}>Delete</Button>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Trebuchet MS",
                alignSelf: "flex-start",
              }}
            >
              {event.time}
            </Text>
            <Text
              style={{
                color: "grey",
                marginTop: 10,
                fontSize: 15,
              }}
            >
              {event.description}
            </Text>
          </Card>
        );
      }
    });
    //AsyncStorage.setItem(props.datePressed, JSON.stringify(listofEvents))
    if (modalVisible === false) {
      return (
        <View>
          <View style={styles.titleCard}>
            <Text style={styles.title}>{props.datePressed}</Text>
            <FAB
              style={styles.addEventButton1}
              small
              icon="plus"
              onPress={() => toggleModal(true)}
            />
          </View>
          {my_events}
        </View>
      );
    } else {
      return (
        <View>
          <Card style={styles.titleCard}>
            <Text style={styles.title}>{props.datePressed}</Text>
          </Card>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={styles.modalStyle}>
              <Title style={{ marginTop: "5%" }}>New Event</Title>
              <Madoka
                style={{ width: "90%", height: 30, marginTop: "3%" }}
                borderColor={"lightblue"}
                inputPadding={16}
                inputStyle={{ color: "black" }}
                onChangeText={(text) => newName(text)}
                value={name}
                label="Name"
              />
              <Madoka
                style={{ width: "90%", height: 30 }}
                borderColor={"lightgreen"}
                inputPadding={16}
                inputStyle={{ color: "black" }}
                onChangeText={(text) => newDescription(text)}
                value={description}
                label="Description"
              />
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 15,
                  paddingRight: 25,
                }}
              >
                <Button
                  onPress={() => setTimePicker(true)}
                  style={{ marginBottom: 15, alignSelf: "flex-start" }}
                >
                  Set Time
                </Button>
                <Text
                  style={{
                    fontSize: 25,
                    fontFamily: "Trebuchet MS",
                    alignSelf: "flex-start",
                  }}
                >
                  {chosenTime}
                </Text>
              </View>
              <DateTimePicker
                isVisible={isTimePickerVisible}
                onConfirm={(datetime) => [
                  setTimePicker(false),
                  setTime(moment(datetime).format("LT")),
                ]}
                onCancel={() => setTimePicker(false)}
                mode={"time"}
                is24Hour={false}
              />
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "transparent",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.addEventButton}
                  onPress={submit}
                >
                  <Text style={{ fontSize: 15, color: "white" }}>
                    Add Event
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelEventButton}
                  onPress={cancel}
                >
                  <Text style={{ fontSize: 15, color: "white" }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
          {my_events}
        </View>
      );
    }
  };

  const getCurrentDate = () => {
    const formatted = moment(new Date()).format("L").split("/");

    return formatted[2] + "-" + formatted[0] + "-" + formatted[1];
  };

  const ondatePress = (day) => {
    changeDate(day.dateString);
    const newMarkedObject = {
      [day.dateString]: { selected: true, selectedColor: "lightblue" },
    };
    setMarkDate(newMarkedObject);
  };
  const [datePressed, changeDate] = useState(getCurrentDate());
  const [markedDate, setMarkDate] = useState({});

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={{ justifyContent: "center", padding: 10 }}>
        <Calendar
          style={{ borderRadius: 10 }}
          onDayPress={(day) => {
            ondatePress(day);
          }}
          markedDates={markedDates}
        />
        <SetEvent datePressed={datePressed} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 27,
    marginVertical: "5%",
    marginHorizontal: 15,
  },
  descriptionCard: {
    marginVertical: "1.5%",
    padding: 20,
    borderRadius: 10,
    borderLeftWidth: 7,
    borderColor: "darkturquoise",
    shadowRadius: 5,
    shadowColor: "mediumturquoise",
  },
  titleCard: {
    marginVertical: "5%",
    width: "100%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    justifyContent: "space-between",
  },
  addEventButton1: {
    margin: 16,
    right: 0,
    bottom: 0,
  },
  addEventButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    height: 40,
    width: 155,
    borderRadius: 10,
    marginRight: 5,
  },
  cancelEventButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightpink",
    height: 40,
    width: 155,
    marginLeft: 5,
    borderRadius: 10,
  },
  modalStyle: {
    alignSelf: "center",
    backgroundColor: "white",
    width: "100%",
    height: Dimensions.get("window").height * 0.41,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: "4%",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
  },
});
