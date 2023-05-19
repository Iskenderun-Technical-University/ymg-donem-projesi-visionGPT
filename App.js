import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import MainContext from './context/MainContext';
import AuthContext from './context/AuthContext';
import Main from "./components/Main";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword,createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import Menu from "./components/Menu";
import * as SecureStore from 'expo-secure-store';
import { collection, query, where, getDocs, updateDoc, doc, getDoc,addDoc } from "firebase/firestore";
import * as Clipboard from 'expo-clipboard';
import secretTokens from './tokens/SecretTokens';
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";


const Stack = createNativeStackNavigator();

const App = () => {


  //STATES START
  const [isInputCardsVisible, setIsInputCardsVisible] = useState(true);
  const [image, setImage] = useState(null);
  const [googleResponse, setGoogleResponse] = useState("");
  const [chatGPTResponse, setChatGPTResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [count, setCount] = useState(10);
  const [docId, setDocId] = useState('');
  const [inputCode, setInputCode] = useState("");
  const [googleReplied, setGoogleReplied] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  //STATES END


  

    const loginOrRegister = async (userInfo) => {
      const userRef = collection(db, "userData");
      const q = query(userRef, where("email", "==", userInfo.email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("User does not exist. Registering...");
        await SecureStore.setItemAsync("userEmail", userInfo.email);
        const userRef = collection(db, "userData");
        await addDoc(userRef, {
          email: userInfo.email,
          count: 25,
          isCodeActive: false,
          isVerified: true,
          code: generateSixDigitCode(),
        });
        console.log("User registered.");
        setEmail(userInfo.email);
        setLoggedIn(true);
        setCount(25);
        setIsVerified(true);
        getDocumentId();
      } else {
        await SecureStore.setItemAsync("userEmail", userInfo.email);
        console.log("User exists. Logging in...");
        querySnapshot.forEach((doc) => {
          const UserData = doc.data();
          setCount(UserData.count);
          setEmail(UserData.email);
          setIsVerified(true);
          getDocumentId();
        });
        setLoggedIn(true);
      }
    };
    
  
    const handleRegister = () => {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredentials) => {
          const user = userCredentials.user;
          console.log("Registered with:", user.email);
          await SecureStore.setItemAsync("userEmail", user.email);
          const userRef = collection(db, "userData");
          await addDoc(userRef, {
            email: user.email,
            count: 25,
            isCodeActive: false,
            isVerified: false,
            code: generateSixDigitCode(),
          });
          sendEmailVerification(auth.currentUser);
          console.log("User registered.");
          setEmail(user.email);
          setLoggedIn(true);
          getDocumentId();
          setCount(25);
          setIsVerified(false);
        })
        .catch((error) => alert(error.message));
    };

  
    const changeToVerified = async () => {
      const userDocRef = doc(db, "userData", docId);
      await updateDoc(userDocRef, { isVerified: true });
      setIsVerified(true);
    };


    

 
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        await SecureStore.setItemAsync("userEmail", user.email);
        const userEmail = await SecureStore.getItemAsync("userEmail");
        const userRef = collection(db, "userData");
        const q = query(userRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);
        try {
          querySnapshot.forEach((doc) => {
            const UserData = doc.data();
            setCount(UserData.count);
            setEmail(UserData.email);
            setIsVerified(UserData.isVerified);
            console.log('is verified',UserData.isVerified);
            getDocumentId();
          });
          setLoggedIn(true);

        } catch (error) {
          console.log(error);
        }

      })
      .catch((error) => alert(error.message));
  };




  const generateSixDigitCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    return code;
  };



  const getDocumentId = async () => {
    const userEmail = await SecureStore.getItemAsync("userEmail");
    const userRef = collection(db, "userData");
    const q = query(userRef, where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setDocId(doc.id);
      console.log(doc.id);
    });
  };

  

  useEffect(() => {
    setLoading(true);
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
          getDocumentId();
          setEmail(userData.email);
          setLoggedIn(true);
          setCount(userData.count);
          setIsVerified(userData.isVerified);
          console.log(userData.isVerified);
          if(userData.isVerified ===true){
            changeToVerified();
          }
          setLoading(false);
        }
        );
      }
      setLoading(false);
    };
    restoreUserSession();
  }, []);

  

  const copyToClipboardChatGPTResponse = async () => {
    await Clipboard.setStringAsync(chatGPTResponse.solution);
    alert('Copied!');
  };
  const copyToClipboardQuestion = async () => {
    await Clipboard.setStringAsync(googleResponse);
    alert('Copied!');
  };

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
      setLoadingAnswer(true);
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secretTokens.openai}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          temperature: 1,
          messages: [
            {
              role: "system",
              content: secretTokens.prompt
            },
            {
              role: "user",
              content: question
            }
          ],
          max_tokens: 500,
          top_p: 1,
        }),
      });
      const data = await response.json();
      setChatGPTResponse(JSON.parse(data.choices[0].message.content));
      setLoadingAnswer(false);
    } catch (error) {
      console.log(error);
    }
  };
  //GPT model Davinci
  // const submitToChatGPT = async (question) => {
  //   try {
  //     const response = await fetch("https://api.openai.com/v1/completions", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${APItokens.openai}`,
  //       },
  //       body: JSON.stringify({
  //         model: "text-davinci-003", 
  //         temperature: 0.7,
  //         prompt: prompt + question,
  //         max_tokens: 500,
  //         top_p: 1,
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     setChatGPTResponse(data.choices[0].text);
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }



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
        `${secretTokens.google_vision}`,
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
      if (responseJson.responses[0].fullTextAnnotation?.text) {
       
        setGoogleResponse(responseJson.responses[0].fullTextAnnotation.text);
        setGoogleReplied(true);
        setLoading(false);
        submitToChatGPT(responseJson.responses[0].fullTextAnnotation.text);
        console.log("submittedChatGPT");
      } else {
        
        setGoogleResponse("");
        setGoogleReplied(false);
        setLoading(false);
        alert("No text was found in the image.");
      }
    } catch (error) {
      console.log(error, "submitToGoogle");
      alert(error)
    }
  };


  const clearPicture = () => {
    setImage(null);
    setIsInputCardsVisible(true);
    setGoogleResponse('');
    setChatGPTResponse('');
    setLoading(false);
    setGoogleReplied(false);
    setLoadingAnswer(false);
  };

  const addAttempt = async () => {
    if (!docId) {
      console.log("User document not found.");
      return;
    }

    const userDocRef = doc(db, "userData", docId);
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();
    console.log(userData.code, userData.isCodeActive)

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
    <MainContext.Provider value={{ image, googleResponse, loading, chatGPTResponse, isInputCardsVisible, clearPicture, pickImage, takeAndCropPhoto, count, setCount, inputCode, setInputCode, addAttempt, copyToClipboardChatGPTResponse, copyToClipboardQuestion, googleReplied, setGoogleReplied, setLoadingAnswer, loadingAnswer,isVerified }}>

      <AuthContext.Provider value={{ password, setPassword, email, setEmail, handleLogin, loggedIn, setLoggedIn, loading, setCount,loginOrRegister,handleRegister }}>
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
            ) 
            : 
            (
              [
                <Stack.Screen key="Login" name="Login" component={LoginScreen} />,
                <Stack.Screen key="Register" name="Register" component={RegisterScreen} />,
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

export default App;