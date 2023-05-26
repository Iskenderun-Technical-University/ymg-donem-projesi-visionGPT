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
import AuthContext from "../context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import secretTokens from '../tokens/SecretTokens'

const RegisterScreen = () => {
  const { loginAnonymously, loading } = useContext(AuthContext);

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

  const startLogin = () => {
    loginAnonymously();
  };

  return (
    <>
      <StatusBar style="dark" />
        <View style={styles.gradientContainer}>
          <LinearGradient colors={["white", "white"]} style={styles.gradient}>
              {
                loading ? 
                
                <>
                <Text style={styles.registerText}>
                Welcome Again! 
              </Text>
              <View style={{justifyContent:'center',alignItems:'center'}}>
              <Image source={require('../assets/newVisionGPTIcon.png')} style={{width:250,height:250}} />
              </View>
                  <Text style={styles.registerTextSub}>
                    Just a second...{'\n'}
                  I am preparing the application for you
                  </Text>
                  
                  </>
                
                
                : 
                <>
              <Text style={styles.registerText}>
              Welcome !
            </Text>
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <Image source={require('../assets/newVisionGPTIcon.png')} style={{width:250,height:250}} />
            </View>
                <Text style={styles.registerTextSub}>
                  VisionGPT{"\n"} You can scan text with camera or chat with bot powered by {'\n'}ChatGPT AI
                </Text>
                <View style={styles.registerButtonWrapper}>
                  <TouchableOpacity
                    style={styles.registerButtonEmail}
                    onPress={startLogin}
                    disabled={false}
                  >
                    <Text style={styles.registerButtonTextEmail}>Start </Text>
                    <MaterialIcons
                      name="arrow-forward-ios"
                      color={"white"}
                      size={18}
                    />
                  </TouchableOpacity>
                  <View>
                      <Text
                        style={{
                          fontSize: 10,
                          textAlign: "center",
                          color: "black",
                          fontWeight: "300",
                          marginTop:10,
                        }}
                      >
                        By clicking 'Start', you agree to our Terms of Use.
                        We're committed to respecting your rights and privacy.
                      </Text>
                      <TouchableOpacity onPress={()=> alert(secretTokens.termsOfUse)} style={{marginBottom:40}}>
                        <Text style={{
                          fontSize: 10,
                          textAlign: "center",
                          color: "black",
                          fontWeight: "500",
                          marginTop:10,
                          marginBottom:10
,                          
                        }}>Terms of Use</Text>
                      </TouchableOpacity>
           
                  </View>
                </View>
                </>
              }
              
              
            
          </LinearGradient>
        </View>

    </>
  );
};

const styles = StyleSheet.create({
 

  registerButtonWrapper: {
    marginHorizontal: 40,
    
  },
  registerButtonEmail: {
    backgroundColor: "#52006A",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRadius: 10,
  },

  registerButtonTextEmail: {
    color: "white",
    fontSize: 27,
    fontFamily: "Inter_400Regular",
  },



  registerTextSub: {
    color: "#321E1E",
    textAlign: "center",
    marginBottom: 20,
    marginHorizontal: 16,
    fontSize: 24,
    fontFamily: "Inter_900Black",
  },
  registerText: {
    color: "black",
    textAlign: "center",
    fontSize: 50,
    fontFamily: "Inter_900Black",
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
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    justifyContent:'center',
  },
  welcomeText: {
    fontSize: 60,
    fontFamily: "Inter_200ExtraLight",
    color: "white",
  },
});

export default RegisterScreen;
