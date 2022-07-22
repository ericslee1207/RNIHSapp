import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Image, Dimensions, Alert, Platform, TouchableOpacity } from "react-native";
import { My_SearchBar } from "./Tab3Screens/SearchBar";
import { Text, View } from "../components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Avatar, IconButton, Title } from "react-native-paper";
import {TabView, SceneMap, TabBar} from 'react-native-tab-view'
import {ClubContext} from './Tab3Screens/ClubContext'
import { useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { AuthContext } from "../components/AuthContext";
import Modal from 'react-native-modal'
import clubs2021 from "../clubs_2020-2021.json"


const firstRoute= (navigation) => {
  const {clubs, clubModal, setClubModal} = React.useContext(AuthContext)

  const [clubs1, setClubs1] = React.useState(clubs)
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
    const getData = async() => {
      
      let preferences = await AsyncStorage.getItem("SettingConfigurations")
      let preferencesParsed = JSON.parse(preferences)
      setPreferences(preferencesParsed)

    }

    getData()
  }, [isFocused])

  const onChange = (query: string) => {
    const queries = clubs.filter((club) => {
      const clubdata = club.clubname.toLowerCase();
      const query_data = query.toLowerCase();
      return clubdata.indexOf(query_data) > -1;
    });
    setClubs1(queries);
  };

  const renderListItem = ({ item }) => {
    let clubinfo = item.clubinfo;
    if (item.clubinfo === undefined) {
      clubinfo = "...";
    }
    item["colorObj"] = preferences.colorObj

    //cant have direct actions for onPress. Need to put it into a const that holds the function first
    return (
      <Card style={[styles.card, {borderColor: preferences.colorObj.primary}]} onPress={()=>navigation.navigate('ClubScreen', item)}> 
        <Card.Title
          title={item.clubname}
          subtitle={clubinfo}
          right={() => (
            <IconButton style={styles.iconStyle} icon="chevron-right" />
          )}
        />
      </Card>
    );
  };
  
  return (
    <>
    
    <View style={styles.container}>
    <Modal
      isVisible={false}
      onBackdropPress={()=>setClubModal(false)}
      useNativeDriver={true}
      onBackButtonPress={()=>setClubModal(false)}
      hideModalContentWhileAnimating={true}>
        <View style={{width: '85%', marginLeft: '7.5%', height: Platform.OS=="ios" ? moderateScale(250): moderateScale(270), borderRadius: moderateScale(20)}}>
          <View style={[styles.invitationBody]}>
            <View style={{flexDirection: 'row',  width: '100%', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'OpenSansBold', fontSize: moderateScale(20)}}>Club Information</Text>
            </View>
            
            <Text style={{marginVertical: moderateScale(7), textAlign: 'center', fontSize: moderateScale(17), marginHorizontal: moderateScale(5)}}>The clubs listed here are from years 2019 to 2020. The updated club list for this year will be posted soon.</Text>
            <TouchableOpacity
                onPress={()=>setClubModal(false)}
                style={[styles.buttonstyle, {height: moderateScale(35), width: moderateScale(170), marginTop: moderateScale(12), flexDirection: 'row'}]}
              >
              <Text
                  style={{
                    color: "white",
                    fontFamily: "OpenSansSemiBold",
                    fontSize: moderateScale(17),
                    marginRight: moderateScale(5)
                  }}
                >
                  I understand
                </Text>
              </TouchableOpacity>
          </View>
        </View>
      
    </Modal>
      <My_SearchBar change_function={onChange} />
      <FlatList
        style={styles.scrollview}
        data={clubs1}
        renderItem={renderListItem}
        keyExtractor={(item) => item.clubname}
      />
    </View>
    </>
  );
}

const secondRoute = (navigation) => {
  
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
  const[finalClubs, setFinalClubs] = useState([])
  const [clubs, setClubs] = useState([]);
  useEffect(()=>{
      revealSavedClubs();
  }, [])
  const revealSavedClubs = async() => {
      let saved = await AsyncStorage.getItem("savedClubs")
      let savedParsed = JSON.parse(saved);
      setClubs(savedParsed)
      setFinalClubs(savedParsed)
  }
  const onChange = (query: string) => {
    const queries = finalClubs.filter((club) => {
      const clubdata = club.clubname.toLowerCase();
      const query_data = query.toLowerCase();
      return clubdata.indexOf(query_data) > -1;
    });
    setClubs(queries);
  };

  const renderListItem = ({ item }) => {
    let clubinfo = item.clubinfo;
    if (item.clubinfo === undefined) {
      clubinfo = "...";
    }
    item["colorObj"] = preferences.colorObj
    //cant have direct actions for onPress. Need to put it into a const that holds the function first
    return (
      <Card style={[styles.card, {borderColor: preferences.colorObj.primary}]} onPress={()=>navigation.navigate('ClubScreen', item)}> 
        <Card.Title
          title={item.clubname}
          subtitle={clubinfo}
          right={() => (
            <IconButton style={styles.iconStyle} icon="chevron-right" />
          )}
        />
      </Card>
    )
  }
  return (
    <View style={styles.container}>
      {/* <My_SearchBar change_function={onChange} /> */}
      <FlatList
        style={styles.scrollview}
        data={clubs}
        renderItem={renderListItem}
        keyExtractor={(item) => item.clubname}
      />
  </View>
  )
}


export default function ToolsScreen({navigation}) {
  
  const [index, setIndex]= useState(0);
  const routes=[{key: 'first', title: 'All Clubs'}, {key: 'second', title: 'Saved Clubs'}]
  const {colorObj} = React.useContext(AuthContext)
  const renderScene=SceneMap({
    first: ()=>firstRoute(navigation),
    second: () => secondRoute(navigation)
  })


  const [saved_clubs, save_club] = useState([])
  const {color} = React.useContext(AuthContext)
  return(
    <ClubContext.Provider value={{saved_clubs: saved_clubs, save_club: save_club}}>
      <TabView
        renderTabBar={props => <TabBar
          {...props}
          indicatorStyle={{backgroundColor: color}}
          style={{backgroundColor: colorObj.lightbackground, height: moderateScale(40)}}
          activeColor={'black'}
          inactiveColor={'grey'}
          renderLabel={({ route, focused, color }) => (
            <Text style={{ color, fontFamily: "OpenSansSemiBold" }}>
              {route.title}
            </Text>
          )}
        />}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width}}
      />
    </ClubContext.Provider>
  )  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  scrollview: {
    width: "100%",
    marginTop: 10,
  },
  card: {
    borderRadius: 10,
    width: "93%",
    height: 100,
    alignSelf: "center",
    marginVertical: 8,
    
    padding: 8,
    borderLeftWidth: 7,
    shadowOpacity: 0.35, 
    shadowRadius: 6, 
    shadowOffset: {height: 1, width: 0},
    shadowColor: 'grey',
    elevation: 5
  },
  iconStyle: {
    height: 20,
    width: 20,
    marginRight: 25,
  },
  invitationBody: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: moderateScale(20),
    padding: moderateScale(20)
  
  },
  buttonstyle: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: moderateScale(55),
    width: "90%",
    borderRadius: 15,
    marginBottom: "5%",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowColor: 'grey',
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "#04b5a7",
    opacity: 1
  },
});
