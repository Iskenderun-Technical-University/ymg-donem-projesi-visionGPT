import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import MainContext from '../context/MainContext'
import QuestionLoading from './QuestionLoading'

const GoogleTextDetector = () => {
    const {googleReplied,googleResponse,copyToClipboardQuestion,clearPicture,image,loading}=useContext(MainContext)
  return (
    <>
    {loading &&
      <QuestionLoading />
    }
    {googleReplied  && image && loading === false &&(
        <View style={styles.googleResponseWrapper}>
          <View style={styles.questionTitleWrapper}>
            <Text style={styles.questionTitleText}>Question</Text>
          </View>
          <Text testID="question-text" style={styles.googleResponseText}>
            {googleResponse}
          </Text>
          <View style={styles.questionCopyButtonWrapper}>
            <TouchableOpacity
              style={styles.questionCopyButton}
              onPress={copyToClipboardQuestion}
              testID="copy-button"
            >
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } 
    { googleReplied === false && image && loading === false &&
      <View style={[styles.googleResponseWrapper,{alignItems:'center'}]}>
      <View style={styles.questionTitleWrapper}>
        <Text style={styles.questionTitleText}>Error</Text>
      </View>
      <Text testID="error-text" style={styles.googleResponseText}>
        No text in picture
      </Text>
      <View style={[styles.questionCopyButtonWrapper,{alignItems:'center',marginTop:20}]}>
        <TouchableOpacity
          style={[styles.questionCopyButton,{backgroundColor:'#FF3B30'}]}
          onPress={clearPicture}
          testID="back-button"
        >
          <Text style={[styles.copyButtonText]}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
      }
      </>
  )
}

export default GoogleTextDetector

const styles = StyleSheet.create({
    questionTitleWrapper: {
        marginTop: 3,
        marginLeft: 5,
      },
    
      copyButtonText: {
        color: "white",
      },
      questionCopyButtonWrapper: {
        justifyContent: "center",
        alignItems: "flex-end",
      },
      questionCopyButton: {
        width: 50,
        height: 20,
        backgroundColor: "#05BFDB",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.3,
        borderColor: "white",
      },
      googleResponseWrapper: {
        backgroundColor: "#F6F1F1",
        borderRadius: 10,
        marginTop: 3,
        marginHorizontal:16,
      },
      googleResponseText: {
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 5,
        fontSize: 10,
        textAlign: "left",
        color: "#212A3E",
      },
    
})