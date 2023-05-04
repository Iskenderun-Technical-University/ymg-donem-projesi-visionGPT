import { StatusBar } from "expo-status-bar";

import { StyleSheet, View, ScrollView } from "react-native";

import PhotoInputCard from "./PhotoInputCard";
import PictureAndQuestion from "./PictureAndQuestion";
import TutorialTips from "./TutorialTips";
import AddAttemptInput from "./AddAttemptInput";
import MainUITitle from "./MainUITitle";
import QuestionLoading from "./QuestionLoading";
import ChatGPTResponse from "./ChatGPTResponse";
import ClearAnswerButton from "./ClearAnswerButton";


const Main = ({navigation}) => {
   return (
    <View style={styles.container}>

      <MainUITitle navigation={navigation}/>
      <View style={styles.divider} />
      <StatusBar style="dark" />

      <ScrollView>
        <TutorialTips />
        <PictureAndQuestion />
        <QuestionLoading />
        <AddAttemptInput />
        <PhotoInputCard />
        <ChatGPTResponse />
        <ClearAnswerButton />
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
