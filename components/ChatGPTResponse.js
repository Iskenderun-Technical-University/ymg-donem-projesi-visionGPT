import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import MainContext from '../context/MainContext'
import AnswerLoading from "./AnswerLoading";
import SolutionButton from './SolutionButton';

const ChatGPTResponse = () => {
    const {chatGPTResponse,copyToClipboardChatGPTResponse,loadingAnswer} = useContext(MainContext);
    //TO-DO
    //Need a button for this component that stops operations instantly
  return (
    <>
    {
      loadingAnswer && 
      <AnswerLoading />
    }
    {chatGPTResponse && (
          <View style={styles.chatGPTResponseWrapper}>
            <View style={styles.cardTitleWrapper}>
              <Text style={styles.cardTitleText}>Answer</Text>
            </View>
            <Text style={styles.chatGPTText}>{chatGPTResponse.answer}</Text>
            <View style={styles.copyButtonWrapper}>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={copyToClipboardChatGPTResponse}
              >
                <Text style={styles.copyButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      
    
    </>
    
  )
}

export default ChatGPTResponse

const styles = StyleSheet.create({
    
    cardTitleWrapper: {
      marginLeft:5,
      marginTop: 3,
    },
    cardTitleText: {
      color: "black",
      
    },
    copyButtonText: {
      color: "white",
    },
    
    copyButtonWrapper: {
      justifyContent: "center",
      alignItems: "flex-end",
    },
    copyButton: {
      width: 50,
      height: 20,
      backgroundColor: "#05BFDB",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "white",
      marginRight:10,
      marginBottom:5,
      elevation:5,
    },
    chatGPTText: {
      color: "black",
      fontSize: 16,
      marginBottom: 20,
      marginTop:10,
      textAlign: 'center',
    },
    chatGPTResponseWrapper: {
      backgroundColor: "rgba(246, 254, 239, 1)",
      borderRadius: 20,
      marginHorizontal: 16,
      marginTop: 20,
      borderWidth: 3,
      borderColor: "rgba(193, 229, 215, 1)",
      justifyContent:'center',
      elevation:5,
      
    },
    
  });