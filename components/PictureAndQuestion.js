import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import MainContext from '../context/MainContext'

const PictureAndQuestion = () => {
  const { image, googleResponse, copyToClipboardQuestion } = useContext(MainContext);
  return (
    <>
      {
        image &&

        <View style={styles.pictureWrapper}>
          <Image source={{ uri: image }} style={styles.picture} />
          {googleResponse.responses && (
            <View style={styles.googleResponseWrapper}>
              <View style={styles.questionTitleWrapper}>
                <Text style={styles.questionTitleText}>Question</Text>
              </View>
              <Text style={styles.googleResponseText}>
                {googleResponse.responses &&
                  googleResponse.responses[0].fullTextAnnotation &&
                  googleResponse.responses[0].fullTextAnnotation.text}
              </Text>
              <View style={styles.questionCopyButtonWrapper}>
                <TouchableOpacity
                  style={styles.questionCopyButton}
                  onPress={copyToClipboardQuestion}
                >
                  <Text style={styles.copyButtonText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      }
    </>
  )
}

export default PictureAndQuestion

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




  picture: {
    width: "95%",
    height: 250,
    borderRadius: 10,
  },
  pictureWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },


  googleResponseWrapper: {
    backgroundColor: "#F6F1F1",
    borderRadius: 10,
    marginTop: 3,
  },
  googleResponseText: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 5,
    fontSize: 10,
    textAlign: "left",
    color: "#212A3E",
  },

});