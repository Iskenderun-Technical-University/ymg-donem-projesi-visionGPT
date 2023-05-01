import { StatusBar } from "react-native";
import ContentLoader from "react-native-easy-content-loader";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";



const Main = () => {
    return (
        <View style={styles.container}>
          <View style={styles.titleWrapper}>
            <Text style={styles.titleText}>VisionGPT</Text>
            <TouchableOpacity>
            <Image source={(require('./assets/menuIcon.png'))} style={styles.menuIcon}/>
            </TouchableOpacity>
          </View>
          <StatusBar style="dark" />
          <ScrollView>
            { image === null && 
            <View style={styles.tutorialTips}>
            <Text style={styles.tutorialTipsTitle}>How to use</Text>
            <Text style={styles.tutorialTipsContent}>
              1. To get started, take a photo or select an image from your gallery. {"\n"}
              2. Wait for the app to analyze the text in the photo. {"\n"}
              3. View the GPT-3 generated text analysis. {"\n"}
            </Text>
            </View>
            }
          {image && (
            <View style={styles.pictureWrapper}>
              <Image source={{ uri: image }} style={styles.picture} />
              {googleResponse.responses &&
              <View style={styles.googleResponseWrapper}>
              <Text style={styles.googleResponseText}>
                {googleResponse.responses &&
                  googleResponse.responses[0].fullTextAnnotation &&
                  googleResponse.responses[0].fullTextAnnotation.text}
              </Text>  
              </View>
              }
            </View>
            
          )}
          {
                loading && image &&
                <View style={styles.loader}>
                  <Text style={styles.loadingText}>Loading..</Text>
                    <ContentLoader active pRows={5} tWidth={"100%"} pWidth={["40%", "20%", "30%", "25%","45%"]} >
                      
                    </ContentLoader>
                    </View>
              }
    
          
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
            
              { chatGPTResponse !== '' ? 
              <View style={styles.chatGPTResponseWrapper}>
              <Text style={styles.chatGPTText}>
                {chatGPTResponse}
              </Text>  
              </View>
              :
              null
              }
            
            {
            chatGPTResponse !== '' ?
            <View style={styles.clearButtonWrapper}>
            <TouchableOpacity
                style={styles.clearPictureButton}
                onPress={clearPicture}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
              
              </View>
              :
               
               null}
          </ScrollView>
          
        </View>
  );
}

export default Main;

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF",
    },
    infoDescription: {
      marginHorizontal: 20,
      fontSize: 14,
      marginTop:30,
      color: "#8E8E93",
      textAlign: "center",
    },
    menuIcon:{
      width:30,
      height:30,
    },
    titleWrapper:{
      flexDirection:'row',
      marginTop:70,
      marginHorizontal:16,
      justifyContent:'space-between',
      alignItems:'center',
    },
  tutorialTips: {
    marginTop: 80,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tutorialTipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8E8E93',
  },
  tutorialTipsContent: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'left',
    color: '#8E8E93',
  },
  loadingText:{
    marginTop: 10,
    marginBottom:5,
    fontSize: 14,
    textAlign: 'left',
    marginLeft:10,
    color: '#8E8E93',
  },
    titleText: {
      fontSize: 32,
      color: "#000000",
    },
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
    loader:{
      marginTop:20,
      marginHorizontal:50,
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
      marginTop: "30%",
      height: 150,
      justifyContent: "center",
      marginBottom:"100%",
    },
    picture: {
      width: "80%",
      height: 250,
      borderRadius: 10,
    },
    pictureWrapper: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
    },
    clearPictureButton: {
      backgroundColor: "#FF3B30",
      width: "30%",
      height: 30,
      borderRadius: 10,
      marginTop: 10,
      justifyContent: "center",
    },
    clearButtonText: {
      textAlign: "center",
      justifyContent: "center",
      fontSize: 18,
      color: "white",
    },
    takePhotoButtonTest: {
      color: "red",
    },
    flipCameraText: {
      color: "red",
    },
    camera: {
      backgroundColor: "red",
    },
    cameraCaptureScreen: {
      marginTop: 50,
      height: 250,
      width: "80%",
      justifyContent: "center",
    },
    cameraWrapper: {
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContainer: {
      backgroundColor: "#34C759",
      width: "30%",
      height: 30,
      borderRadius: 10,
      marginTop: 10,
      justifyContent: "center",
    },
    captureText: {
      textAlign: "center",
      justifyContent: "center",
      fontSize: 18,
      color: "white",
    },
    googleResponseText: {
      marginTop: 10,
      fontSize: 10,
      textAlign: 'left',
      color: '#8E8E93',
    },
    chatGPTText: {
      color: "white",
      fontSize: 20,
      marginBottom: 40,
    },
    chatGPTResponseWrapper: {
      backgroundColor: "#34C759",
      borderRadius: 10,
      marginHorizontal: 30,
      alignItems: "center",
      marginTop: 20,
      borderWidth: 3,
      borderColor: "#34C759",
    },
    clearButtonWrapper: {
      alignItems: "center",
      marginBottom:200
    },
  });