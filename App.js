import React, { Component } from "react";
import { SafeAreaView, ImageBackground, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default function ReminderApk() {
  const clicked = () => {
    alert("You've drunk water! Good job, dude")
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.waterReminder}>WaterReminder</Text>
      <View style={styles.rect}></View>
      <Image source={require('./images/Bottle.png')}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <TouchableOpacity onPress={clicked} style={styles.button}>
        <Text style={styles.text}>Drink Water</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
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
  image: {
    width: 250,
    height: 400,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: "rgba(254,246,246,1)",
    fontSize: 20
  },
  button: {
    paddingVertical: 9,
    paddingHorizontal: 15,
    backgroundColor: '#0096FF'
  },
});
