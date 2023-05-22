import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView,Text, TouchableOpacity } from "react-native";
import PhotoInputCard from "./PhotoInputCard";
import Picture from "./Picture";
import TutorialTips from "./TutorialTips";
import AddAttemptInput from "./AddAttemptInput";
import ChatGPTResponse from "./ChatGPTResponse";
import GoogleTextDetector from "./GoogleTextDetector";
import ClearAndSolutionButtons from "./ClearAndSolutionButtons";
import React,{useContext} from "react";
import MainContext from "../context/MainContext";
import AppPreferencesContext from "../context/AppPreferencesContext";
import { MaterialIcons } from '@expo/vector-icons';


const Main = ({navigation}) => {
  const {image} = useContext(MainContext);
  const {theme,language} = useContext(AppPreferencesContext);
 
  return (
    <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>
      <View style={styles.titleWrapper}>
      <MaterialIcons name="arrow-back" color={theme.fontColor.primaryFontColor} size={20} />
      <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Text style={[styles.backText,{color:theme.fontColor.primaryFontColor}]}>Back</Text>
          </TouchableOpacity>
      </View>
      {   
        image ==null &&
        <Text style={[styles.visionInputTitle,{color:theme.fontColor.primaryFontColor}]}>Visual Input</Text>
      }
   
      <StatusBar style={theme.StatusBarTheme} />
      <ScrollView>
        <TutorialTips />
        <Picture />
        <GoogleTextDetector />
        <AddAttemptInput />
        <PhotoInputCard />
        <ChatGPTResponse />
        <ClearAndSolutionButtons />
      </ScrollView>
      
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
 
  visionInputTitle:{
    fontSize:40,
    fontWeight:'300',
    marginLeft:30,
    marginTop:24,
    marginBottom:80,
  },
  titleWrapper:{
    marginTop:70,
    marginHorizontal:16,
    flexDirection:'row',
    alignItems:'center',
  },
  backText:{
    fontSize:18,
  },
  container: {
    flex: 1,
  },

});
