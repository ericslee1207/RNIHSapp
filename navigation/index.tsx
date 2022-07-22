import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, StyleSheet, Button, ActivityIndicator, Dimensions } from 'react-native';
import {Intro} from '../screens/IntroScreen'
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import {Login} from '../screens/LoginScreen';
import { View } from 'react-native-animatable';
import {AuthContext} from '../components/AuthContext';
import {TabOneNavigator} from './BottomTabNavigator'
import OnboardingPageTwo from "../screens/OnboardingTwo"
import OnboardingPageOne from "../screens/OnboardingOne"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ClubContext } from '../screens/Tab3Screens/ClubContext';
import SummerScreen from "../screens/SummerScreen"
import moment from 'moment';
import BannerScreen from "../screens/BannerScreen"
import IUSDevents from "../IUSD_holidays.json"
import oddPeriods from "../OddPeriods.json"
import evenPeriods from "../EvenPeriods.json"
import mondayPeriods from "../MondayPeriods.json"
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import firebase from "firebase"
import { firebaseConfig } from "../config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let clubRef = firebase.firestore().collection("clubs")
var scheduleRef = firebase.firestore().collection("schedule")

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [userToken, setUserToken] = React.useState(null as any)
  const [savedClubs, changeStatusClub1] = React.useState([])
  const [schedule, setSchedule] = React.useState([])
  const [currentPeriod, setCurrentPeriod] = React.useState({})
  const [nextPeriod, setNextPeriod] = React.useState({})
  const [colorObj, setColorObj] = React.useState({})
  const [index, setIndex] = React.useState()
  const [clubs, setClubs] = React.useState([])
  const [clubModal, setClubModal] = React.useState(true)
  const [user, setUser] = React.useState({})
  const [holidays, setHolidays] = React.useState()
  // React.useEffect(() => {
  //   setTimeout(()=>{setIsLoading(false)}, 2000)
  // }, []);
  const date = moment().format("l")
  // const date = "11/11/2021"

  let isHoliday = false;
  let holiday = undefined;
  if (holidays!==undefined){
    holidays.forEach(element => {
      let startDate = element.eventDateStart
      let endDate = element.eventDateEnd
      let from = Date.parse(startDate)
      let to = Date.parse(endDate)
      let check = Date.parse(date)
      if((check <= to && check >= from)){
        holiday = element
        isHoliday= true;
      } 
    });
  }
  
  React.useEffect(()=>{
    const func = async() => {
      setIsLoading(true)
      await scheduleRef.doc("holidays").get().then(async(doc)=>{
        setHolidays(doc.data().holidays)
      })
      await clubRef.doc("clubs").get().then(async(doc)=>{
        setClubs(doc.data().clubs)
      })
      firebase.firestore().collection("users").get().then(function(querySnapshot) {      
        console.log(querySnapshot.size); 
      });
      let user = await AsyncStorage.getItem("accountInfo");
      setUser(JSON.parse(user))
      let savedClubs = await AsyncStorage.getItem("savedClubs")
      let schedule = await AsyncStorage.getItem("scheduleDetails")
      let preferences = await AsyncStorage.getItem("SettingConfigurations")
      if (schedule!==null){
        schedule = JSON.parse(schedule)
        setSchedule(schedule)
      }
      if (user==null){
        let colorObj = {
          primary: "#04b5a7",
          highlight: "hsl(165, 100%, 80%)",
          lightbackground: "rgba(233, 251, 251, 0.96)",
          darkbackground: "#D3E7EE"
        }
        setColorObj(colorObj)
        setUserToken(null);
      }
      
      else{
        if (schedule==null){
          let defaultSchedule = {
            odd: oddPeriods,
            even: evenPeriods,
            monday: mondayPeriods
          }
          await AsyncStorage.setItem("scheduleDetails", JSON.stringify(defaultSchedule))
          .then(()=>setSchedule(defaultSchedule))
        }
        if (preferences == null){
          let colorObj = {
            primary: "#04b5a7",
            highlight: "hsl(165, 100%, 80%)",
            lightbackground: "rgba(233, 251, 251, 0.96)",
            darkbackground: "#D3E7EE"
          }
          let settings = {isCircle: false, radius: 3, colorObj: colorObj}
          await AsyncStorage.setItem("SettingConfigurations", JSON.stringify(settings))

        }
        preferences = JSON.parse(preferences)
        setColorObj(preferences.colorObj)
        setUserToken("true")

      }
      if (savedClubs!==null){
        savedClubs = JSON.parse(savedClubs);
        changeStatusClub1(savedClubs);
      }
      setIsLoading(false)
    }
    func()
  }, [])

  const verifyUser = React.useMemo(() => ({
    SignIn: ()=> {
      let colorObj = {
        primary: "#04b5a7",
        highlight: "hsl(165, 100%, 80%)",
        lightbackground: "rgba(233, 251, 251, 0.96)",
        darkbackground: "#D3E7EE"
      }
      setColorObj(colorObj)
      setUserToken('true');
      setIsLoading(false)
    },
    SignOut: ()=>{
      let colorObj = {
        primary: "#04b5a7",
        highlight: "hsl(165, 100%, 80%)",
        lightbackground: "rgba(233, 251, 251, 0.96)",
        darkbackground: "#D3E7EE"
      }
      setColorObj(colorObj)
      setUserToken(null);
      setIsLoading(false)
      //delete from asyncstorage
    }
  }), [])
  
  const window = Dimensions.get('window')

  return (
    <>
    {isLoading ? <ActivityIndicator style={{zIndex: 999,position: 'absolute',width: window.width, height: window.height, backgroundColor: 'lightgrey', opacity: 0.4}} animating={isLoading} color={"darkgreen"} size="large"/>:
      <></>
      }
    <AuthContext.Provider value={{SignIn: verifyUser.SignIn, SignOut: verifyUser.SignOut, Schedule: schedule, setSchedule: setSchedule, currentPeriod: currentPeriod, setCurrentPeriod: setCurrentPeriod, nextPeriod: nextPeriod, setNextPeriod: setNextPeriod, isHoliday: isHoliday, setColorObj: setColorObj, colorObj: colorObj, clubs: clubs, setClubs: setClubs, clubModal: clubModal, setClubModal: setClubModal, user: user, setUser: setUser
    }}>
      <ClubContext.Provider value={{saved_clubs: savedClubs, changeStatusClub: changeStatusClub1}}>
        {
        // isSummer() ? 
        //   <RootStack.Navigator>
        //     <RootStack.Screen name="Summer" component={SummerScreen} options={{gestureEnabled: false, headerShown: false}}/>
        //   </RootStack.Navigator>
        // :
        userToken===null?(
          <RootStack.Navigator initialRouteName="Introduction" screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <RootStack.Screen name="Introduction" component={Intro}/>
            <RootStack.Screen name="Login" component={Login}/>
          </RootStack.Navigator>
        ): isHoliday ? 
          <RootStack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
            {/* <RootStack.Screen name="OnboardingOne" component={OnboardingPageOne}/>
            <RootStack.Screen name="OnboardingTwo" component={OnboardingPageTwo} /> */}
              <RootStack.Screen name="Banner" component={BannerScreen} initialParams={{holiday: holiday}}/>
              <RootStack.Screen name="Root" component={BottomTabNavigator} />
              <RootStack.Screen name="Home" component={TabOneNavigator}/> 
          </RootStack.Navigator>:
          <RootStack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <RootStack.Screen name="Root" component={BottomTabNavigator} />
            <RootStack.Screen name="Home" component={TabOneNavigator} />
        </RootStack.Navigator>
          } 
      </ClubContext.Provider>
    </AuthContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  headerStyle:{
    backgroundColor: 'white'
  },
  topRight:{
    paddingRight: 25
  }
})