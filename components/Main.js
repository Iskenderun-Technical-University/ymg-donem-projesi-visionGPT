import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView,Text, TouchableOpacity } from "react-native";
import PhotoInputCard from "./PhotoInputCard";
import Picture from "./Picture";
import TutorialTips from "./TutorialTips";
import AddAttemptInput from "./AddAttemptInput";
import ChatGPTResponse from "./ChatGPTResponse";
import GoogleTextDetector from "./GoogleTextDetector";
import ClearAndSolutionButtons from "./ClearAndSolutionButtons";



const Main = ({navigation}) => {
   return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={()=>navigation.goBack()}>
                <Text style={styles.backText}>{'<'} Back</Text>
            </TouchableOpacity>
      </View>
      <Text style={styles.visionInputTitle}>Vision Input</Text>
   
      <StatusBar style="dark" />
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
  },
  titleWrapper:{
    flexDirection:'row',
    marginTop:70,
    marginHorizontal:16,

  },
  backText:{
    fontSize:18,
  },
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },

});
