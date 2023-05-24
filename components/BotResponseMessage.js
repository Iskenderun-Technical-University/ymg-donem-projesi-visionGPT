import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useState } from "react";
import AppPreferencesContext from "../context/AppPreferencesContext";

const BotResponseMessage = ({ message }) => {

  const {theme} = useContext(AppPreferencesContext)
  return (
    <>
      <View style={styles.botResponseWrapper}>
        <View style={[styles.textWrapper,{ backgroundColor:theme.themeName ==='Dark' ? "#394867":"#DDE6ED"}]}>
          <Text style={[styles.text,{color:theme.fontColor.primaryFontColor}]}>{message}</Text>
        </View>
      </View>
    </>
  );
};

export default BotResponseMessage;

const styles = StyleSheet.create({
  text: { marginHorizontal: 10, marginVertical: 15, color: "white" },
  textWrapper: {
    maxWidth:'70%',
    marginLeft: 20,
    borderTopRightRadius:20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    
  },
  botResponseWrapper: {
    alignItems:'flex-start',
    justifyContent:'center',
    flex:1,
    marginVertical:10,
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
