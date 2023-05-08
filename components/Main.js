import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView } from "react-native";
import PhotoInputCard from "./PhotoInputCard";
import Picture from "./Picture";
import TutorialTips from "./TutorialTips";
import AddAttemptInput from "./AddAttemptInput";
import MainUITitle from "./MainUITitle";
import ChatGPTResponse from "./ChatGPTResponse";
import GoogleTextDetector from "./GoogleTextDetector";
import ClearAndSolutionButtons from "./ClearAndSolutionButtons";
import RegisterScreen from "./RegisterScreen";





const Main = ({navigation}) => {

   return (
    <View style={styles.container}>
      <MainUITitle navigation={navigation}/>
      <View style={styles.divider} />
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
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "grey",
    marginHorizontal: 16,
    marginTop: 16,
  },
});
