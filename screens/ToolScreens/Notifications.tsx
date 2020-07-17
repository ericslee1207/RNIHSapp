import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }
// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { data: 'goes here' },
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }


//export const Calendar1 = () => {
  // const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState(false);

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  //   // This listener is fired whenever a notification is received while the app is foregrounded
  //   Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  //   Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     Notifications.removeAllNotificationListeners();
  //   };
  // }, []);
  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       alignItems: 'center',
  //       justifyContent: 'space-around',
  //     }}>
  //     <Text>Your expo push token: {expoPushToken}</Text>
  //     <Button
  //       title="Press to Send Notification"
  //       onPress={async () => {
  //         await sendPushNotification(expoPushToken);
  //       }}
  //     />
  //   </View>
  // );






        //const keys=await AsyncStorage.getAllKeys();
      // for (let i = 0; i < keys.length; i++) {
      //   const key=keys[i];
      //   if (key!==null){
      //     const values=await AsyncStorage.getItem(key);
      //     if (values!==null && values.length>0){
      //       console.log(key)
      //     }
      //   }        
      // }