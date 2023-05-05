import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import MainContext from '../context/MainContext'

const ChatGPTResponse = () => {
    const {chatGPTResponse,copyToClipboardChatGPTResponse} = useContext(MainContext);
  return (
    <>
    {chatGPTResponse !== "" ? (
          <View style={styles.chatGPTResponseWrapper}>
            <View style={styles.cardTitleWrapper}>
              <Text style={styles.cardTitleText}>Response</Text>
            </View>
            <Text style={styles.chatGPTText}>{chatGPTResponse}</Text>
            <View style={styles.copyButtonWrapper}>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={copyToClipboardChatGPTResponse}
              >
                <Text style={styles.copyButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
    </>
  )
}

export default ChatGPTResponse

const styles = StyleSheet.create({
    
    cardTitleWrapper: {
      marginRight: "75%",
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
      borderWidth: 0.3,
      borderColor: "white",
    },
    chatGPTText: {
      color: "#333333",
      fontSize: 20,
      marginBottom: 30,
      marginTop:10,
      textAlign: "center",
    },
    chatGPTResponseWrapper: {
      backgroundColor: "rgba(0, 255, 0, 0.4)",
      borderRadius: 10,
      marginHorizontal: 16,
      marginTop: 20,
      borderWidth: 3,
      borderColor: "rgba(0, 255, 0, 0.5)",
      justifyContent:'center',
    },
    
  });