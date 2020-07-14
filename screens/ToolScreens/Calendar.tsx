
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DateTimePicker from 'react-native-modal-datetime-picker'
import { Card, Title, Paragraph, TextInput, Button } from "react-native-paper";
import { CalendarList, Agenda, Calendar } from "react-native-calendars";
import IUSD_events from "../../IUSD_events.json";
import moment from "moment";
import { Madoka } from "react-native-textinput-effects";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from '@react-native-community/async-storage'


export const Calendar1 = () => {




  
  const SetEvent = (props) => {
    const [isTimePickerVisible, setTimePicker] = useState(false)
    const [chosenTime, setTime]= useState('')
    const [listofEvents, editList] = useState([]); //initial value of useState would be what you get from another API/database
    const [modalVisible, toggleModal] = useState(false);
    const [name, newName] = useState("");
    const [description, newDescription] = useState("");
    
    
    useEffect(()=>{
      saveData1()
    },[])
    
    const saveData = async () => {
        const arrData = [{name: name, description: description, time: chosenTime}]; // [{ name, phone}] from the textInput
      
        const storedData = await AsyncStorage.getItem(props.datePressed);
        console.log(storedData)
      
        let newData = [] as any;
      
        if (storedData === null) {
          // save
          await AsyncStorage.setItem(props.datePressed, JSON.stringify([]));
        } else {
          const storedDataParsed = JSON.parse(storedData);
          newData = [...storedDataParsed, {name: name, description: description, time: chosenTime}];
          await AsyncStorage.setItem(props.datePressed, JSON.stringify(newData));
        }
        newName("");
        newDescription("");
        setTime('')
        toggleModal(false);
        console.log(newData)
        editList(newData);
      };
      const saveData1 = async () => {
        const arrData = [{name: name, description: description, time: chosenTime}]; // [{ name, phone}] from the textInput
      
        const storedData = await AsyncStorage.getItem(props.datePressed);
        console.log(storedData)
      
        let newData = [] as any;
      
        if (storedData === null) {
          // save
          await AsyncStorage.setItem(props.datePressed, JSON.stringify(arrData));
        } else {
          const storedDataParsed = JSON.parse(storedData);
          newData = [...storedDataParsed];
          await AsyncStorage.setItem(props.datePressed, JSON.stringify(newData));
        }
        newName("");
        newDescription("");
        setTime('')
        toggleModal(false);
        console.log(newData)
        editList(newData);
      };
    
    
    
    
    
    
    const cancel = () => {
      newName("");
      newDescription("");
      setTime('')
      toggleModal(false);
    };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    const submit = () => {
      saveData();
    };
    

    const my_events = listofEvents.map((event) => { if(event.name!=='' && event.description!=='' && event.time!==''){
      return(
      <View key={event.name} style={{ paddingHorizontal: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{event.name}</Text>
          
          <Button
            onPress={() =>
              editList((list) =>
                list.filter(
                  (maybedeleteevent) => maybedeleteevent.name != event.name
                )
              ) 
            }
          >
            Delete
          </Button>
        </View>
        <Text style={{fontSize: 20, fontFamily: 'Trebuchet MS', alignSelf: 'flex-start'}}>{event.time}</Text>
        <Text
          style={{
            color: "grey",
            marginTop: 10,
            fontSize: 15,
          }}
        >
          {event.description}
        </Text>
        <View style={{height: 1, backgroundColor: 'darkgreen', width: '100%', marginVertical: 15}}/>
      </View>
      )
    }
    else{
      console.log('nothing')
    }      
    });
    //AsyncStorage.setItem(props.datePressed, JSON.stringify(listofEvents))
    if (modalVisible === false) {
      return (
        <Card style={styles.descriptionCard}>
          <Text style={styles.title}>{props.datePressed}</Text>
          <View
            style={{
              height: 1,
              backgroundColor: "darkgreen",
              width: "90%",
              alignSelf: "center",
              marginVertical: 15,
            }}
          />
          {my_events}
          <TouchableOpacity
            style={styles.addEventButton1}
            onPress={() => toggleModal(true)}
          >
            <Text style={{ fontSize: 15, color: "white" }}>Add Event</Text>
          </TouchableOpacity>
        </Card>
      );
    } else {
      return (
        <View>
          <Card style={styles.descriptionCard}>
            <Text style={styles.title}>{props.datePressed}</Text>
            <View
              style={{
                height: 1,
                backgroundColor: "darkgreen",
                width: "90%",
                alignSelf: "center",
                marginVertical: 15,
              }}
            />
            {my_events}
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
              <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 25}}>
                <Button onPress={()=>setTimePicker(true)} style={{marginBottom: 15, alignSelf: 'flex-start'}}>
                  Set Time
                </Button>
                <Text style={{fontSize: 25, fontFamily: 'Trebuchet MS', alignSelf: 'flex-start'}}>{chosenTime}</Text>
              </View>       
              <DateTimePicker
                isVisible={isTimePickerVisible}
                onConfirm={(datetime)=>[setTimePicker(false), setTime(moment(datetime).format('LT'))]}
                onCancel={()=>setTimePicker(false)}
                mode={'time'}
                
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
        </View>
      );
    }
  };
  
  
  
  
  
  
  
  
  
  
  
  
  const getCurrentDate = () => {
    const formatted = moment(new Date()).format("L").split("/");

    return formatted[2] + "-" + formatted[1] + "-" + formatted[0];
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
          style={{ borderRadius: 10}}
          onDayPress={(day) => {
            ondatePress(day);
          }}
          markedDates={markedDate}
        />
        <SetEvent datePressed={datePressed} />
      </View>
    </KeyboardAwareScrollView>
  );
};


































const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    alignSelf: "center",
    marginHorizontal: 15,
  },
  descriptionCard: {
    marginVertical: "5%",
    padding: 20,
    borderRadius: 10,
  },
  addEventButton1: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    height: 35,
    width: "60%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: '4%'
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
    height: Dimensions.get("window").height * 0.43,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 15
  },
});
