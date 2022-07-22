import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Modal,
  TouchableOpacity,
  Alert
} from "react-native";
import { Feather } from '@expo/vector-icons';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Fumi } from "react-native-textinput-effects";
import DateTimePicker from "react-native-modal-datetime-picker"
import {
  Card,
  Title,
  Paragraph,
  TextInput,
  FAB,
  Button
} from "react-native-paper";
import { CalendarList, Agenda, Calendar } from "react-native-calendars";
import IUSD_events from "../../IUSD_events.json";
import moment from "moment";
import { Madoka } from "react-native-textinput-effects";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale } from "react-native-size-matters";
import { useIsFocused } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 0 },
  });
}

export const Calendar1 = () => {
  useEffect(() => {
      // setInterval(() => {
      //   schedulePushNotification()
      // }, 5000);
  }, []);
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
  const getCurrentDate = () => {
    const formatted = moment(new Date()).format("L").split("/");

    return formatted[2] + "-" + formatted[0] + "-" + formatted[1];
  };
  const [markedDates, newmarkedDate] = useState({});
  const [markedDate, setMarkDate] = useState({});
  const [datePressed, changeDate] = useState(getCurrentDate());

  const startup = async () => {
    let newData = {} as any;
    let eventData = await AsyncStorage.getItem(datePressed)
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
    newmarkedDate({ ...newData, ...markedDate });
    if (eventData != null) {
      editList(JSON.parse(eventData))
    }
    else {
      editList([])
    }
  };

  useEffect(() => {
    startup();
  }, [markedDate]);
  useEffect(() => {
    updateInitialData();
  }, []);
  const updateInitialData = async () => {
    const storedData = await AsyncStorage.getItem(datePressed);
    let newData = [] as any;

    if (storedData === null) {
      // save
      await AsyncStorage.setItem(datePressed, JSON.stringify([]));
    } else {
      const storedDataParsed = JSON.parse(storedData);
      newData = [
        ...storedDataParsed]
      await AsyncStorage.setItem(datePressed, JSON.stringify(newData));
    }

    editList(newData)
  };
  const SetEvent = (props: any) => {

    const clearAsyncStorage = async () => {
      AsyncStorage.clear();
    };

    const my_events = props.listOfEvents.map((event) => {
      if (event.name !== "" && event.description !== "" && event.time !== "") {
        const eventname = event.name;
        return (
          <Card key={event.name} style={[styles.descriptionCard, {borderColor: preferences.colorObj.primary}]}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {event.name}
              </Text>

              <Button onPress={() => props.deletenow(eventname)}>Delete</Button>
            </View>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "OpenSansSemiBold",
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
    const renderItem = ({ item }) => (
      <Card key={item.name} style={styles.descriptionCard}>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {item.name}
          </Text>

          <Button onPress={() => props.deletenow(item.name)}>Delete</Button>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "OpenSansSemiBold",
            alignSelf: "flex-start",
          }}
        >
          {item.time}
        </Text>
        <Text
          style={{
            color: "grey",
            marginTop: 10,
            fontSize: 15,
          }}
        >
          {item.description}
        </Text>
      </Card>
    );
    //AsyncStorage.setItem(props.datePressed, JSON.stringify(listofEvents))
    return (
      <View style={{}}>
        <View style={styles.titleCard}>
          <Text style={styles.title}>{props.datePressed}</Text>
          <FAB
            style={[styles.addEventButton1, {backgroundColor: preferences.colorObj.primary}]}
            small
            icon="plus"
            onPress={() => props.toggleModal(true)}
          />
        </View>
        {/* <FlatList
          keyExtractor={(o)=>o.name}
          data={props.listOfEvents}
          renderItem={renderItem}
        /> */}
        {my_events}
      </View>
    );
  };
  const [listofEvents, editList] = useState([]); //initial value of useState would be what you get from another API/database
  const saveData = async (name, description, chosenTime) => {
    const storedData = await AsyncStorage.getItem(datePressed);
    let newData = [] as any;

    if (storedData === null) {
      // save
      let obj = { name: name, description, time: chosenTime }
      await AsyncStorage.setItem(datePressed, JSON.stringify([obj]));
      newData = [obj]
    } else {
      const storedDataParsed = JSON.parse(storedData);
      newData = [
        ...storedDataParsed,
        { name: name, description: description, time: chosenTime },
      ].sort(function (a, b) {
        return new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time);
      });
      await AsyncStorage.setItem(datePressed, JSON.stringify(newData));
    }
    if (newData !== []) {
      const newpair = {
        [datePressed]: { marked: true, dotColor: "darkturquoise" },
      };
      newmarkedDate((object) => Object.assign(object, newpair));
      await AsyncStorage.setItem("indicator", JSON.stringify(markedDates));
    }
    toggleModal(false);
    editList(newData);
  };
  const submit = (name, description, chosenTime) => {
    if (name.length > 0 && description.length>0 && chosenTime!=""){
      saveData(name, description, chosenTime);
    }
    else{
      Alert.alert("Fields cannot be blank")
    }
  };
  const cancel = () => {
    toggleModal(false);
  };
  const deletenow = (id: string) => {
    const onDelete = async () => {
      const storedData = await AsyncStorage.getItem(datePressed);
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
        await AsyncStorage.setItem(datePressed, stringifieddata);
      }
      if (stringifieddata === JSON.stringify([])) {
        const newArr = Object.keys(markedDates).reduce((object, key) => {
          if (key !== datePressed) {
            object[key] = markedDates[key]
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
  const AddEventComponent = () => {
    const [name, newName] = useState("")
    const [description, newDescription] = useState("");
    const [isTimePickerVisible, setTimePicker] = useState(false);
    const [chosenTime, setTime] = useState("");

    return (
      <View style={styles.modalStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: moderateScale(20) }}>
          <Feather name="x" size={moderateScale(24)} color="black" onPress={cancel} />
          <Title style={{ marginLeft: "25%" }}>New Event</Title>
        </View>

        <Fumi
          style={{ width: "90%", height: moderateScale(30), marginTop: "3%" }}
          // borderColor={"lightblue"}
          //inputPadding={16}
          onChangeText={(text) => newName(text)}
          //value={name}
          iconClass={FontAwesomeIcon}
          iconName="user"
          label="Title"
          maxLength={22}
          iconColor={preferences.colorObj.primary}

        />
        <Fumi
          style={{ width: "90%", height: moderateScale(30) }}
          // borderColor={"lightgreen"}
          // inputPadding={16}
          // inputStyle={{ color: "black" }}
          onChangeText={(text) => newDescription(text)}
          iconClass={FontAwesomeIcon}
          iconName="pencil"
          //value={description}
          label="Description"
          iconColor={preferences.colorObj.primary}

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
              fontSize: moderateScale(18),
              fontFamily: "OpenSansSemiBold",
              alignSelf: "flex-start",
              color: preferences.colorObj.primary
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
          display="spinner"
          is24Hour={false}
        />

          <TouchableOpacity
            style={[styles.addEventButton, {backgroundColor: preferences.colorObj.primary}]}
            onPress={() => submit(name, description, chosenTime)}
          >
            <Text style={{ fontSize: moderateScale(15), color: "white" }}>
              Add Event
            </Text>
          </TouchableOpacity>
      </View>
    )
  }
  const ondatePress = (day) => {
    changeDate(day.dateString);
    const newMarkedObject = {
      [day.dateString]: { selected: true, selectedColor: "lightblue" },
    };
    setMarkDate(newMarkedObject);
  };
  const [isModalVisible, toggleModal] = useState(false)
  return (
    <ScrollView style={{ flex: 1, }}>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
        >
          <View style={{ height: "100%", justifyContent: 'center', borderTopRightRadius: moderateScale(30), borderTopLeftRadius: moderateScale(30), shadowOpacity: 0.2, shadowOffset: { height: -4, width: 0 }, padding: moderateScale(30) }}>
            <AddEventComponent />
          </View>

        </Modal>
      </View>

      <View style={{ justifyContent: "center", padding: 10 }}>
        <Calendar
          style={{ borderRadius: 10, }}
          onDayPress={(day) => {
            ondatePress(day);
          }}

          markedDates={markedDates}
        />
        <SetEvent deletenow={deletenow} listOfEvents={listofEvents} toggleModal={toggleModal} datePressed={datePressed} />
        {/* <TouchableOpacity style={styles.addEventButton} onPress={toggleModal}>
          <Text>Plus</Text>
        </TouchableOpacity> */}

      </View>
    </ScrollView>
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
      width: 2,
      height: 2,
    },
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    justifyContent: "space-between",
    elevation: 3
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
    height: moderateScale(37),
    width: '100%',
    borderRadius: 10,
    // marginRight: 5,
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
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(10),
    height: moderateScale(300),
    borderRadius: 20,
    //alignItems: "center",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    elevation: 3
  },
});
