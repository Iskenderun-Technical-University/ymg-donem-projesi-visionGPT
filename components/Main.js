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
  const {image,count} = useContext(MainContext);
  const {theme,language} = useContext(AppPreferencesContext);
 
  return (
    <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>
      <View style={styles.titleWrapper}>
      
          <TouchableOpacity onPress={()=>navigation.goBack()} style={{flexDirection:'row',alignItems:'center'}}>
            <MaterialIcons name="arrow-back-ios" color={theme.fontColor.primaryFontColor} size={20} />
                <Text style={[styles.backText,{color:theme.fontColor.primaryFontColor}]}>Back</Text>
          </TouchableOpacity>

          <View style={{flexDirection:'row',alignItems:'center',backgroundColor:count>0 ? '#AA77FF' : '#DF2E38',borderRadius:20,justifyContent:'center'}}>
          <MaterialIcons name="local-activity" style={{marginLeft:10,marginRight:10}} color={'white'} size={20} />
          <Text style={[styles.countText,{color:'white'}]}>{count}</Text>
          </View>

      </View>
      {   
        image ==null &&
        <Text style={[styles.visionInputTitle,{color:theme.fontColor.primaryFontColor}]}>Visual Input</Text>
      }
   
      <StatusBar style={theme.themeName === 'Dark' ? 'light' : 'dark'} />
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
  backText:{
    fontSize:18,
  },
  countText:{
    fontSize:20,
    marginRight:10,
  },
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
    justifyContent:'space-between',
  },
  
  container: {
    flex: 1,
  },

});
