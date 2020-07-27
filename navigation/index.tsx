import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import {Intro} from '../screens/IntroScreen'
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import {Login} from '../screens/LoginScreen';
import { View } from 'react-native-animatable';
import { ActivityIndicator } from 'react-native-paper';
import {AuthContext} from '../components/AuthContext';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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

  // React.useEffect(() => {
  //   setTimeout(()=>{setIsLoading(false)}, 2000)
  // }, []);

  const verifyUser = React.useMemo(() => ({
    SignIn: ()=> {
      setUserToken('fkld');
      setIsLoading(false);
    },
    SignOut: ()=>{
      setUserToken(null);
      setIsLoading(false)
    }
  }), [])

  if (isLoading){
    return(
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator color="lightblue" size="large"/>
      </View>
    )
  }
  return (
    <AuthContext.Provider value={{SignIn: verifyUser.SignIn, SignOut: verifyUser.SignOut}}>
      {userToken===null?(
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Introduction" component={Intro}/>
          <RootStack.Screen name="Login" component={Login}/>
        </RootStack.Navigator>
      ):
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Root" component={BottomTabNavigator} />
        </RootStack.Navigator>}
      
    </AuthContext.Provider>
  );
}
