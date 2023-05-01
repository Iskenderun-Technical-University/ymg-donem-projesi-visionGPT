import { StatusBar } from "expo-status-bar";
import ContentLoader from "react-native-easy-content-loader";
import { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import RegisterAndLogin from "./components/RegisterAndLogin";

const App = () => {
  const prompt = "You are an AI language model and you have to answer the following question as briefly as possible, providing only the correct answer without any explanations like ('Answer : B) example '). Here is the prompt: ";
  
  const [isInputCardsVisible, setIsInputCardsVisible] = useState(true);
  const [image, setImage] = useState(null);
  const [googleResponse, setGoogleResponse] = useState("");
  const [chatGPTResponse, setChatGPTResponse] = useState("");
  const [loading,setLoading] = useState(false);
  

  const uriToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const submitToChatGPT = async (question) =>{
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer <OpenAI API>`,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          temperature: 0.7,
          prompt: prompt + question,
          max_tokens: 500,
          top_p: 1,
        }),
      });
      const data = await response.json();
      console.log(data);
      setChatGPTResponse(data.choices[0].text);
    } catch (error) {
      console.log(error)
    }
    
  }

  const submitToGoogle = async (base64) => {
    try {
      setLoading(true);
      let body = JSON.stringify({
        requests: [
          {
            features: [{ type: "TEXT_DETECTION", maxResults: 5 }],
            image: {
              content: base64.split(",")[1],
            },
          },
        ],
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          "<Google Vision API>",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: body,
        }
      );
      let responseJson = await response.json();
      console.log(responseJson);
      setGoogleResponse(responseJson);
      setLoading(false);
      submitToChatGPT(responseJson.responses[0].fullTextAnnotation.text);
      console.log(responseJson.responses[0].fullTextAnnotation.text);
      console.log('submittedChatGPT')
      if (
        !responseJson.responses ||
        !responseJson.responses[0].fullTextAnnotation
      ) {
        alert("No text detected", "No text was found in the image.");
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const clearPicture = () => {
    setImage(null);
    setIsInputCardsVisible(true);
    setGoogleResponse('');
    setChatGPTResponse('');
    setLoading(false);
  };

  const takeAndCropPhoto = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
        return;
      }
      

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        const base64 = await uriToBase64(result.assets[0].uri);
        submitToGoogle(base64);
        setIsInputCardsVisible(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      MediaTypeOptions: "images",
      aspect: [4,3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const base64 = await uriToBase64(result.assets[0].uri);
      submitToGoogle(base64);
      setIsInputCardsVisible(false);
    }
  };

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
export default App;