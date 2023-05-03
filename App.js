import { useState, useRef, useContext, useEffect } from "react";
import {
  StyleSheet
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import RegisterAndLogin from "./components/RegisterAndLogin";
import MainContext from './context/MainContext';
import AuthContext from './context/AuthContext';
import Main from "./components/Main";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { useNavigation } from '@react-navigation/core'
import Menu from "./components/Menu";
import * as SecureStore from 'expo-secure-store';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";


const Stack = createNativeStackNavigator();

const App = () => {
  const prompt = "You are an AI language model and you have to answer the following question as briefly as possible, providing only the correct answer without any explanations like ('Answer : B) example '). Here is the prompt: ";

  const [isInputCardsVisible, setIsInputCardsVisible] = useState(true);
  const [image, setImage] = useState(null);
  const [googleResponse, setGoogleResponse] = useState("");
  const [chatGPTResponse, setChatGPTResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [count, setCount] = useState(0); //number of attempts will be set via firebase firestore cloud database
  const [docId, setDocId] = useState('');
  const [inputCode, setInputCode] = useState("");



  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        const userData = {
          email: user.email,
          token: user.refreshToken,
        };
        await SecureStore.setItemAsync("userData", JSON.stringify(userData));
        await SecureStore.setItemAsync("userEmail", user.email);
  
        const userRef = collection(db, "userData");
        const q = query(userRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const firestoreUserData = doc.data();
          setCount(firestoreUserData.count);
        });
      })
      .catch((error) => alert(error.message));
  };
  

  useEffect(() => {
    const restoreUserSession = async () => {
      const userEmail = await SecureStore.getItemAsync("userEmail");
      if (userEmail) {
        setEmail(userEmail);
        const userRef = collection(db, "userData"); 
        const q = query(userRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          console.log("User session restored. Email:", userData.email, "count:", userData.count);
          setDocId(doc.id); 
          setEmail(userData.email);
          setLoggedIn(true);
          setCount(userData.count);
          }
        );
      }
    };
    restoreUserSession();
  }, []);
  

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

  const submitToChatGPT = async (question) => {
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
        "Google Vision API",
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

  const addAttempt = async () => {
    if (!docId) {
      console.log("User document not found.");
      return;
    }
  
    const userDocRef = doc(db, "userData", docId);
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();
    console.log(userData.code,userData.isCodeActive)
  
    if (userData.isCodeActive && userData.code === inputCode) {
      await updateDoc(userDocRef, {
        count: 25, //if user has code give 25 more attemps 
        isCodeActive: false,
      });
      setCount(25);
      alert("Code accepted!");
    } else {
      alert("Invalid code or code is not active.");
    }
  };
  

  const takeAndCropPhoto = async () => {

    if (count > 0) {
      const userDocRef = doc(db, "userData", docId);
      
      
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
          return;
        }
  
  
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [5, 3],
          quality: 1,
        });
  
        if (!result.canceled) {
          setImage(result.assets[0].uri);
          const base64 = await uriToBase64(result.assets[0].uri);
          submitToGoogle(base64);
          setIsInputCardsVisible(false);
          await updateDoc(userDocRef, { count: count - 1 });
          setCount(count - 1);
        }
      }
      catch (error) {
        alert(error);
      }
    } else {
      alert("Your 25 attempts are over.\n Contact with Owner.");
    } 
  };

  const pickImage = async () => {
    if (count > 0) {
      const userDocRef = doc(db, "userData", docId);
      
      
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      MediaTypeOptions: "images",
      aspect: [5, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const base64 = await uriToBase64(result.assets[0].uri);
      submitToGoogle(base64);
      setIsInputCardsVisible(false);
      await updateDoc(userDocRef, { count: count - 1 });
      setCount(count - 1);
    }
    } else {
      alert("Your 25 attempts are over.");
    }
    
  };

  return (
    <MainContext.Provider value={{ image, googleResponse, loading, chatGPTResponse, isInputCardsVisible, clearPicture, pickImage, takeAndCropPhoto,count,setCount,inputCode,setInputCode,addAttempt }}>
      <AuthContext.Provider value={{ password, setPassword, email, setEmail, handleLogin, loggedIn, setLoggedIn }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            {loggedIn ? (
              [
                <Stack.Screen key="Main" name="Main" component={Main} />,
                <Stack.Screen key="Menu" name="Menu" component={Menu} />,
              ]
            ) : (
              [
                <Stack.Screen key="Login" name="Login" component={RegisterAndLogin} />,
                <Stack.Screen key="Main" name="Main" component={Main} />,
                <Stack.Screen key="Menu" name="Menu" component={Menu} />,
              ]
            )}


          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </MainContext.Provider>



  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  infoDescription: {
    marginHorizontal: 20,
    fontSize: 14,
    marginTop: 30,
    color: "#8E8E93",
    textAlign: "center",
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  titleWrapper: {
    flexDirection: 'row',
    marginTop: 70,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
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
  loadingText: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 10,
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
  loader: {
    marginTop: 20,
    marginHorizontal: 50,
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
    marginBottom: "100%",
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
    marginBottom: 200
  },
});
export default App;