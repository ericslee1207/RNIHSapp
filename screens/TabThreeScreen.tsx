import React, { useState } from "react";
import { StyleSheet, FlatList, Image, Dimensions, Alert } from "react-native";
import { My_SearchBar } from "../screens/Tab3Screens/SearchBar";
import { Text, View } from "../components/Themed";

import club_data from "../clubs_2019-2020.json";
import { Card, Avatar, IconButton, Title } from "react-native-paper";
import {TabView, SceneMap, TabBar} from 'react-native-tab-view'

const firstRoute= (navigation) => {
  const [clubs, setClubs] = useState(club_data);
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
    //cant have direct actions for onPress. Need to put it into a const that holds the function first
    return (
      <Card style={styles.card} onPress={()=>navigation.navigate('ClubScreen', item)}> 
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

const secondRoute = () => {
  return(
    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
      <Text>To Be Determined</Text>
    </View>
  )
}

const renderTabBar= (props: any) => {
  return(
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'pink'}}
      style={{backgroundColor: 'lightblue'}}
    />
  )
}

export default function TabTwoScreen({navigation}) {
  const [index, setIndex]= useState(0);
  const routes=[{key: 'first', title: 'Clubs'}, {key: 'second', title: 'Second'}]

  const renderScene=SceneMap({
    first: ()=>firstRoute(navigation),
    second: secondRoute
  })

  return(
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: Dimensions.get('window').width}}
    />
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
    borderColor: "lightpink",
    shadowRadius: 9,
    shadowColor: "lightblue",
    shadowOpacity: 1,
    padding: 8,
    borderLeftWidth: 7,
  },
  iconStyle: {
    height: 20,
    width: 20,
    marginRight: 25,
  },
});
