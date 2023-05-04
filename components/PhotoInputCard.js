import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import MainContext from '../context/MainContext'

const PhotoInputCard = () => {
    const {takeAndCropPhoto,pickImage,isInputCardsVisible} = useContext(MainContext)
  return (

    <>
    {isInputCardsVisible && (
    <View style={styles.infoSectionCard}>
            <View style={styles.infoSubTitleWrapper}>
              <Text style={styles.infoText}>Take photo or Select image</Text>
            </View>
            <View style={styles.buttonsWrapper}>
              <TouchableOpacity
                style={styles.takePhotoButton}
                onPress={takeAndCropPhoto}
              >
                <Text style={styles.buttonTextStyle}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.takePhotoButton}
                onPress={pickImage}
              >
                <Text style={styles.buttonTextStyle}>Select Picture</Text>
              </TouchableOpacity>
            </View>
          </View>
    )}
          </>
  )
}

export default PhotoInputCard
const styles = StyleSheet.create({
    takePhotoButton: {
      backgroundColor: "#007AFF",
      width: "30%",
      height: 30,
      borderRadius: 5,
      marginHorizontal: 10,
      justifyContent: "center",
      textAlign: "auto",
    },
    buttonsWrapper: {
      justifyContent: "center",
      flexDirection: "row",
      marginTop: 20,
    },
    buttonTextStyle: {
      fontSize: 15,
      textAlign: "center",
      color: "white",
    },
    infoSubTitleWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },
    infoText: {
      fontSize: 18,
      color: "#000000",
    },
    infoSectionCard: {
      backgroundColor: "#F2F2F7",
      marginHorizontal: 20,
      borderRadius: 20,
      height: 150,
      justifyContent: "center",
    },

  });