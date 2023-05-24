import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useState } from "react";
import AppPreferencesContext from "../context/AppPreferencesContext";

const BotResponseMessage = ({ message, botResponseTime }) => {
  const { theme } = useContext(AppPreferencesContext);
  return (
    <>
      <View style={styles.botResponseWrapper}>
        <View
          style={[
            styles.textWrapper,
            {
              backgroundColor:
                theme.themeName === "Dark" ? "#394867" : "#EEF1FF",
            },
          ]}
        >
          <Text
            style={[styles.text, { color: theme.fontColor.primaryFontColor }]}
          >
            {message}
          </Text>
          <Text style={[styles.timeText,{ color: theme.fontColor.primaryFontColor }]}>{botResponseTime}</Text>
        </View>
      </View>
    </>
  );
};

export default BotResponseMessage;

const styles = StyleSheet.create({
  speechBubbleTitle:{
    marginLeft:10,
    marginTop:5,
  },
  text:{
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 5,
    color: "white",
  },
  timeText: {
    marginBottom: 5,
    textAlign: "right",
    marginRight: 10,
    fontWeight: "100",
    fontSize:12,
  },
  textWrapper: {
    maxWidth: "70%",
    minWidth: "20%",
    marginLeft: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  botResponseWrapper: {
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
    marginVertical: 10,
  },
  botResponseText: {
    marginHorizontal: 10,
    marginVertical: 15,
  },
  botResponseImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
});
