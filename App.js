import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React,  { useState, useEffect, useRef, Component } from 'react';
import { SafeAreaView, ImageBackground, StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Water Reminder</Text>
      <View style={styles.rect}></View>
      <Image source={{
        width:250,
        height:250,
        uri: "https://cdn-icons-png.flaticon.com/512/1967/1967685.png"
      }}/>
      <TouchableOpacity style={styles.button} onPress={async () => {
          await schedulePushNotification();}}>
            <Text style={{color: "white"}}>Drink Water!</Text>
          </TouchableOpacity>
      <TouchableOpacity
        title="FAQ"
        onPress={() => navigation.navigate('Details')}
      >
        <Text>FAQ</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 20}}> 1) Loss of excess weight. If you drink a glass of water before a meal, your stomach will begin to work more efficiently. Often water helps a person overcome a false sense of hunger.{"\n"}
      2) Facilitation of the work of internal organs. Fluid reduces the load on the liver and kidneys, removes toxins and harmful substances from the body.{"\n"}
       3) Combat fatigue. It is especially important to drink water for those who play sports and train regularly.</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
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
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="WaterReminder v1.0.0" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
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
    backgroundColor: "#fff",
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
    color: "#000000",
    fontSize: 20
  },
});

