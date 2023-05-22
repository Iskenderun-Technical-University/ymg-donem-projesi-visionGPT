import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Inter_900Black,
  Inter_300Light,
  Inter_200ExtraLight,
  Inter_600SemiBold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import secretTokens from "../tokens/SecretTokens";
import AuthContext from "../context/AuthContext";
import { MaterialIcons } from '@expo/vector-icons';


const RegisterScreen = ({ navigation }) => {
const [isCheckboxChecked,setIsCheckboxChecked] = useState(false);
const { password, setPassword, email, setEmail, loading,loginOrRegister,handleRegister} = useContext(AuthContext);

  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_300Light,
    Inter_200ExtraLight,
    Inter_600SemiBold,
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  

  const alertFunc = ()=>{
    if (isCheckboxChecked === false){
        alert(secretTokens.termsOfUse);
        setIsCheckboxChecked(true);
    }
    else{
        setIsCheckboxChecked(false);
    }


  }

  const isAcceptTermsOfUse = ()=>{
    if (isCheckboxChecked){
      handleRegister();
    }else{
      alert('You have to accept terms of use.');
    }
  }


  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.topWrapper}>
        <View style={styles.imageAndTitleWrapper}>
          <Image
            source={require("../assets/newVisionGPTIcon.png")}
            style={styles.image}
          />
          <Text style={styles.welcomeText}>Hello!</Text>
        </View>
      </SafeAreaView>
      <View style={styles.bottomWrapper}>
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={["white","white"]}
            style={styles.gradient}
          >
            <Text style={styles.registerText}>Register</Text>
            <Text style={styles.registerTextSub}>Get started free</Text>

            <View style={styles.registerInfoWrapper}>

              <View style={styles.emailTextTitle}>
              
                <Text style={styles.emailText}>Email</Text>
              </View>

              
                <View style={styles.textInputWrapperEmail}>
                  <TextInput
                    inputMode="email"
                    style={styles.emailInput}
                    placeholderTextColor={"grey"}
                    placeholder="Your Email adress"
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                  />
                  <Image
                  source={require("../assets/emailicon.png")}
                  style={styles.inputEmailIcon}
                />
                </View>
                
            

              <View style={styles.emailTextTitle}>
              
                <Text style={styles.emailText}>Password</Text>
              </View>

             
                <View style={styles.textInputWrapperEmail}>
                  <TextInput
                    style={styles.emailInput}
                    secureTextEntry
                    placeholderTextColor={"grey"}
                    placeholder="Your password"
                    value={password}
                    onChangeText={(text)=>setPassword(text)}
                  />
                  <Image
                  source={require("../assets/passwordicon.png")}
                  style={styles.inputEmailIcon}
                />
                </View>
                
                
              
              <View style={styles.checkBox}>
              <BouncyCheckbox textStyle={{ fontFamily: "Inter_200ExtraLight" }} text='I Accept the Terms of Use' fillColor="purple" onPress={alertFunc}/>
              </View>
              <View style={styles.registerButtonWrapper}>
                <TouchableOpacity style={styles.registerButtonEmail}
                 onPress={isAcceptTermsOfUse}
                disabled={true}>
                    <Text style={styles.registerButtonTextEmail}>Register</Text>
                    <MaterialIcons name="arrow-forward" color={'white'} size={20} />
                </TouchableOpacity>
              </View>
              <View style={styles.divider}/>
              
              
              <TouchableOpacity style={styles.alreadyHaveAnAccountWrapper} onPress={()=>navigation.navigate('Login')}>
              <Text style={styles.alreadyHaveAnAccountText}>Already have an account ?</Text>
              <Text style={styles.alreadyHaveAnAccountTextSingIn}>Login</Text>
              </TouchableOpacity>
              
            </View>
          </LinearGradient>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    checkBox:{
        marginTop:15,
        marginLeft:'10%'
    },
    alreadyHaveAnAccountWrapper:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      marginTop:20,
    },
    googleButtonGradient:{
        borderRadius:10,
        elevation:10,
        
    },
    continueWithText:{
        color: "black",
        textAlign: "center",
        
        fontSize: 18,
        fontFamily: "Inter_200ExtraLight",
        marginBottom:20,
    },
    alreadyHaveAnAccountText:{
        color: "black",
        textAlign: "center",

        fontSize: 16,
        fontFamily: "Inter_200ExtraLight",
        marginTop:15,
       
    },
    alreadyHaveAnAccountTextSingIn:{
      color: "black",
      textAlign: "center",
      marginLeft: 16,
      fontSize: 18,
      fontFamily: "Inter_400Regular",
      marginTop:15,
    },
    
    divider:{
        height: StyleSheet.hairlineWidth,
        backgroundColor:'black',
        marginTop:50,
        marginHorizontal:70,
        marginBottom:10,
    },
  gradientButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height:40,
    width:'100%'
  },
  registerButtonWrapper:{
    marginHorizontal:40,
    marginTop:20,
  },
  registerButtonEmail: {
    backgroundColor: "rgba(115,114,253,1)",
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:40,
    borderRadius: 10,
  },
  bottomWrapper: {
    flex: 1,
    backgroundColor: "black",
  },
  registerButtonTextEmail: {
    color: "white",
    fontSize: 22,
    fontFamily: "Inter_400Regular",
  },
  
  inputWrapper: {
    flexDirection: "row",
  },
  inputEmailIcon: {
    height: 20,
    width: 20,
    marginRight:5,
  },
  emailTextTitle: {
    marginLeft: "15%",
    marginTop: 20,
    marginBottom: 5,
    flexDirection:'row',
  },
  emailInput:{
    height:60,
    marginHorizontal:20,
},
  
  textInputWrapperEmail:{  
    backgroundColor:'#DDE6ED',
    height:45,
    marginHorizontal:40,
    borderRadius:15,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
},
  registerTextSub: {
    color: "black",
    textAlign: "center",
    marginBottom:40,
    fontSize: 18,
    fontFamily: "Inter_200ExtraLight",
  },
  registerText: {
    color: "black",
    textAlign: "center",

    marginTop: 16,
    fontSize: 36,
    fontFamily: "Inter_300Light",
  },
  image: {
    height: 200,
    width: 200,
  },
  emailText: {
    color: "black",
    fontFamily: "Inter_200ExtraLight",
    fontSize: 15,
  },
  imageAndTitleWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  topWrapper: {
    backgroundColor: "black",
    paddingTop: 10,
  },
  gradientContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
  },

  welcomeText: {
    fontSize: 60,
    fontFamily: "Inter_200ExtraLight",
    color: "white",
  },
});

export default RegisterScreen;
