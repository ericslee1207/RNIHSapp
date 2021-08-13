import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Image, Dimensions, Alert } from "react-native";
import { My_SearchBar } from "../screens/Tab3Screens/SearchBar";
import { Text, View } from "../components/Themed";
import AsyncStorage from "@react-native-community/async-storage";

import club_data from "../clubs_2019-2020.json";
import { Card, Avatar, IconButton, Title } from "react-native-paper";
import {TabView, SceneMap, TabBar} from 'react-native-tab-view'
import {ClubContext} from './Tab3Screens/ClubContext'
import { useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";

const firstRoute= (navigation) => {
  const [clubs, setClubs] = useState(club_data);
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

  const onChange = (query: string) => {
    const queries = club_data.filter((club) => {
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
    );
  };
  return (
    <View style={styles.container}>
      <My_SearchBar change_function={onChange} />
      <FlatList
        style={styles.scrollview}
        data={clubs}
        renderItem={renderListItem}
        keyExtractor={(item) => item.clubname}
      />
    </View>
  );
}

const secondRoute = (navigation, preferences) => {
  
  
  const[finalClubs, setFinalClubs] = useState([])
  const [clubs, setClubs] = useState([]);
  let savedClubs = useContext(ClubContext).saved_clubs
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
      <My_SearchBar change_function={onChange} />
      <FlatList
        style={styles.scrollview}
        data={clubs}
        renderItem={renderListItem}
        keyExtractor={(item) => item.clubname}
      />
  </View>
  )
}


export default function TabTwoScreen({navigation}) {
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
  const [index, setIndex]= useState(0);
  const routes=[{key: 'first', title: 'All Clubs'}, {key: 'second', title: 'Saved Clubs'}]

  const renderScene=SceneMap({
    first: ()=>firstRoute(navigation),
    second: () => secondRoute(navigation, preferences)
  })


  const [saved_clubs, save_club] = useState([])

  return(
    <ClubContext.Provider value={{saved_clubs: saved_clubs, save_club: save_club}}>
      <TabView
        renderTabBar={props => <TabBar
          {...props}
          indicatorStyle={{backgroundColor: preferences.colorObj.primary}}
          style={{backgroundColor: 'rgba(233, 251, 251, 0.96)', height: moderateScale(40)}}
          activeColor={preferences.colorObj.primary}
          inactiveColor={preferences.colorObj.primary}
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
});
