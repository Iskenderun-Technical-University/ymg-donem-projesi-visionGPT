import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import MainContext from './context/MainContext';
import AuthContext from './context/AuthContext';
import AppPreferencesContext from './context/AppPreferencesContext';
import Main from "./components/Main";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import DeviceInfo from 'react-native-device-info';  
import { auth, db } from "./firebase";
import {signInAnonymously} from "firebase/auth";
import Menu from "./components/Menu";
import * as SecureStore from 'expo-secure-store';
import { collection, query, where, getDocs, updateDoc, doc, getDoc,addDoc } from "firebase/firestore";
import * as Clipboard from 'expo-clipboard';
import secretTokens from './tokens/SecretTokens';
import RegisterScreen from "./components/RegisterScreen";
import NewMainScreen from "./components/NewMainScreen";
import TextInputSection from "./components/TextInput";




const Stack = createNativeStackNavigator();

const getUniqueID = async () => {
  uniqueID = 'test-user' //if tester mode on change it to test-user
  console.log('Unique ID: ', uniqueID);
  return uniqueID;
};



const App = () => {
  
  const appPreferences ={
    theme:{
      light:{
        fontColor:{
          primaryFontColor:'black',
          secondaryFontColor:'grey',
        },
        backgroundColor:'white',
        statusBarTheme:'dark',
        sectionBoxColor:'#EEF1FF',
        themeName:'Light',
        speechBubble:{
          userColor:'#B799FF',
        },
      },
      dark:{
        fontColor:{
          primaryFontColor:'white',
          secondaryFontColor:'#B7B7B7',
        },
        backgroundColor:'#212A3E',
        statusBarTheme:'light',
        sectionBoxColor:'#6B778D',
        themeName:'Dark',
        speechBubble:{
          userColor:'#8F43EE',
        },
      }
    },
    language:{
      primaryLanguage:'English',
      secondaryLanguage:'Turkish',
    }
  }

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
  const [theme,setTheme] = useState(appPreferences.theme.light);
  const [language,setLanguage] = useState(appPreferences.language.primaryLanguage);
  const [isTester, setIsTester] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  //STATES END

    const saveThemeToPhone = async (theme) => {
      try {
        await SecureStore.setItemAsync("theme", JSON.stringify(theme));
      } catch (error) {
        console.log(error);
      }
    };

    const isTesterMode = async () => {
      try {
        const testerMode = await getUniqueID();
        if (testerMode === "test-user") {
          setIsTester(true);
          console.log("Tester mode on");
        }
      } catch (error) {
        console.log(error);
      }
    };

    isTesterMode();


    const getThemeFromPhone = async () => {
      try {
        const theme = await SecureStore.getItemAsync("theme");
        if (theme) {
          setTheme(JSON.parse(theme));
        }
      } catch (error) {
        console.log(error);
      }
    };
    

    const changeThemeFromCache = async (theme) => {
      try {
        await SecureStore.setItemAsync("theme", JSON.stringify(theme));
        setTheme(theme);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(()=>{
      getThemeFromPhone();

    },[])

    const saveLanguageToPhone = async (language) => {
      try {
        await SecureStore.setItemAsync("language", JSON.stringify(language));
      } catch (error) {
        console.log(error);
      }
    };

    const getLanguageFromPhone = async () => {
      try {
        const language = await SecureStore.getItemAsync("language");
        if (language) {
          setLanguage(JSON.parse(language));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLanguageFromPhone();
    
    const changeLanguageFromCache = async (language) => {
      try {
        await SecureStore.setItemAsync("language", JSON.stringify(language));
        setLanguage(language);
      } catch (error) {
        console.log(error);
      }
    };


    
  
    const loginAnonymously = async () => {
      const gettingDeviceId = await getUniqueID();
      setButtonDisabled(true);
      signInAnonymously(auth)
        .then(async (userCredentials) => {
          setLoading(true);
          const user = userCredentials.user;
          console.log("Signed in anonymously with:", gettingDeviceId);
          if(user){
            await SecureStore.setItemAsync("userEmail", gettingDeviceId);
            const userRef = collection(db, "userData");
            const q = query(userRef, where("uniqueID", "==", gettingDeviceId));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
              console.log("User does not exist. Registering...");
              await SecureStore.setItemAsync("userEmail", gettingDeviceId);
              const userRef = collection(db, "userData");
              await addDoc(userRef, {
                uid: user.uid,
                count: 5,
                isCodeActive: true,
                isVerified: true,
                code: Math.floor(100000 + Math.random() * 900000),
                uniqueID: gettingDeviceId,
              });
              console.log("User registered.");
              setEmail(gettingDeviceId);
              saveThemeToPhone(theme);
              saveLanguageToPhone(language);
              getDocumentId();
              setCount(5);
              setIsVerified(true);
              setLoggedIn(true);
              setLoading(false);
              setButtonDisabled(false);
              
              
              
            } else {
              console.log("User exists. Logging in...");
              querySnapshot.forEach((doc) => {
                const UserData = doc.data();
                setCount(UserData.count);
                setEmail(UserData.uniqueID);
                setIsVerified(true);
                getDocumentId();
                setLoggedIn(true);
                setLoading(false);
                setButtonDisabled(false);
              });
            }
          }
        })
        .catch((error) => {
          console.log(error+'error is here');
          setLoading(false);
          setButtonDisabled(false);
          
        });
    };
    

  
    


    const decreaseCount = async () => {
      const userDocRef = doc(db, "userData", docId);
      await updateDoc(userDocRef, { count: count - 1 });
      setCount(count - 1);
    };



 
    const getDocumentId = async () => {
      const userEmail = await SecureStore.getItemAsync("userEmail");
      const userRef = collection(db, "userData");
      const q = query(userRef, where("uniqueID", "==", userEmail));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setDocId(doc.id);
        console.log("Document ID:", doc.id);
      });
    };
   
 
    useEffect(() => {
      setLoading(true);
      const restoreUserSession = async () => {
        const gettingDeviceId = await getUniqueID();
        const userEmail = await SecureStore.getItemAsync("userEmail");
        if (userEmail) {
          setEmail(userEmail);
          const userRef = collection(db, "userData");
          const q = query(userRef, where("uniqueID", "==", gettingDeviceId));
          const querySnapshot = await getDocs(q);     
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log("User session restored. Email:", userData.uniqueID, "count:", userData.count);
            getDocumentId();
            setEmail(userData.uniqueID);
            getThemeFromPhone();
            getLanguageFromPhone();
            setLoggedIn(true);
            setCount(userData.count);
            setIsVerified(true);
            setLoading(false);
          });
        } else {
          
          setLoading(false);
        }
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
              content: language==='English' ? secretTokens.prompt : secretTokens.prompt_tr,
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

  const startChatWithGPT = async (previousMessages, userMessage) => {
    try {
      setLoadingAnswer(true);
      const messages = [
        {
          role: "system",
          content: language==='English' ? secretTokens.chatPrompt : secretTokens.chatPrompt_tr,
        },
        ...previousMessages,
        {
          role: "user",
          content: userMessage,
        },
      ];
  
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secretTokens.openai}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          temperature: 1,
          messages: messages,
          max_tokens: 500,
          top_p: 1,
        }),
      });
  
      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;
      console.log(assistantMessage);
      setChatGPTResponse(assistantMessage);
      setLoadingAnswer(false);
      decreaseCount();
      return assistantMessage;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  



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
        
        alert(language === 'English' ? 'No text found in picture.' : 'Resimde metin bulunamadi.' );
      }
    } catch (error) {
      console.log(error, "submitToGoogle error");
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
    const userDocRef = doc(db, "userData", docId);
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data();
    if (userData.code == inputCode && userData.isCodeActive == true) {
      await updateDoc(userDocRef, { count: 5 });
      await updateDoc(userDocRef, { isCodeActive: false });
      setCount(5);
      setInputCode("");
      alert("Code is correct. You have 5 attempts.");
    } else {
      alert("Code is wrong or not active.");
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
      alert("Your attempts are over.\n Contact with Owner.");
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
      alert("Your attempts are over.");
    }

  };

  return (
    <MainContext.Provider value={{ image, googleResponse, loading, chatGPTResponse, isInputCardsVisible, clearPicture, pickImage, takeAndCropPhoto, count, setCount, inputCode, setInputCode, addAttempt, copyToClipboardChatGPTResponse, copyToClipboardQuestion, googleReplied, setGoogleReplied, setLoadingAnswer, loadingAnswer,isVerified,startChatWithGPT,setChatGPTResponse,decreaseCount,isTester,buttonDisabled }}>

      <AuthContext.Provider value={{ password, setPassword, email, setEmail, loggedIn, setLoggedIn, loading, setCount,loginAnonymously }}>
        <AppPreferencesContext.Provider value={{theme,setTheme,language,setLanguage,appPreferences,changeThemeFromCache,changeLanguageFromCache}}>

        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            {loggedIn ? (
              
              [
                <Stack.Screen key="NewMainScreen" name="NewMainScreen" component={NewMainScreen} />,
                <Stack.Screen key="Main" name="Main" component={Main} />,
                <Stack.Screen key="TextInput" name="TextInput" component={TextInputSection} />,
                <Stack.Screen key="Menu" name="Menu" component={Menu} />,
              ]
            ) 
            : 
            (
              [
                
                <Stack.Screen key="Register" name="Register" component={RegisterScreen} />,
                <Stack.Screen key="NewMainScreen" name="NewMainScreen" component={NewMainScreen} />,
                <Stack.Screen key="Main" name="Main" component={Main} />,
                <Stack.Screen key="TextInput" name="TextInput" component={TextInputSection} />,
                <Stack.Screen key="Menu" name="Menu" component={Menu} />,
              ]
            )}


          </Stack.Navigator>
        </NavigationContainer>
        </AppPreferencesContext.Provider>
      </AuthContext.Provider>
    </MainContext.Provider>



  );
}

export default App;