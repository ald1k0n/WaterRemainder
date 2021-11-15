import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React,  { useState, useEffect, useRef, Component } from 'react';
import { SafeAreaView,ImageBackground, StyleSheet, Text, View, Button,Image, Dimensions,TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';



import axios from 'axios';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const clicked =()=> alert("You've drunk water! Good job, dude");
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
   
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Water Reminder</Text>
      <View style={styles.rect}></View>
      <Image source={{
        width:250,
        height:250,
        uri: "https://cdn-icons-png.flaticon.com/512/1967/1967685.png"
      }}/>
      <Button style={styles.button} title='Drink water' onPress={clicked, async () => {
          await schedulePushNotification();}}/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Don't forget about watter!",
      body: 'Drink it',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(7,7,7,1)",
    alignItems: "center",
    justifyContent: "center"
  },
  waterReminder: {
    color: "rgba(246,243,243,1)",
    fontSize: 31
  },
  rect: {
    top: 5,
    width: 240,
    height: 1,
    backgroundColor: "#E6E6E6"
  },
  waterReminderStack: {
    width: 267,
    height: 43,
    marginTop: 84,
    marginLeft: 54  
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },

  button: {
    paddingVertical: 9,
    paddingHorizontal: 15,
    backgroundColor: '#0096FF'
  },

  text: {
    color: "rgba(254,246,246,1)",
    fontSize: 20
  },

});
