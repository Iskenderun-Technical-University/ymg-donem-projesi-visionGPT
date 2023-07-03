import React, { useContext, useEffect, useState } from "react";
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
import { MaterialIcons } from '@expo/vector-icons';
import AppPreferencesContext from "../context/AppPreferencesContext";





const LoginScreen = ({ navigation }) => {
    
    const { password, setPassword, handleLogin, email, setEmail, loading} = useContext(AuthContext);

    const {theme,language} = useContext(AppPreferencesContext);
    
    


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
  

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.topWrapper}>
        <View style={styles.imageAndTitleWrapper}>
          <Image
            source={require("../assets/newVisionGPTIcon.png")}
            style={styles.image}
          />
          <Text style={styles.welcomeText}>Welcome{'\n'}Back!</Text>
        </View>
      </SafeAreaView>
      <View style={styles.bottomWrapper}>
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={["white","white","white","white"]}
            style={styles.gradient}
          >
            <Text style={styles.registerText}>{loading ? 'Logging in..' : 'Login' }</Text>
            {
                loading === false &&
                <>
            <Text style={styles.registerTextSub}>Access your account</Text>
            <View style={{marginTop:40}} />
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
                    onChangeText={text => setEmail(text)}
                  />
                  <MaterialIcons name="mail" style={{marginRight:20}} color={'black'} size={20} />
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
                    onChangeText={text => setPassword(text)}
                  />
                  <MaterialIcons name="lock" style={{marginRight:20}} color={'black'} size={20} />
                </View>
             
              
              <View style={styles.registerButtonWrapper}>
                <TouchableOpacity style={styles.registerButtonEmail}
                 onPress={handleLogin}
                disabled={loading ? true : false}>
                    <Text style={styles.registerButtonTextEmail}>Login</Text>
                    <MaterialIcons name="arrow-forward" color={'white'} size={20} />
                </TouchableOpacity>
              </View>
              <View style={styles.divider}/>
                      
              <TouchableOpacity style={styles.alreadyHaveAnAccountWrapper} onPress={()=>navigation.navigate('Register')}>
              <Text style={styles.alreadyHaveAnAccountText}>Don't have an account?</Text>
              <Text style={styles.alreadyHaveAnAccountTextSingIn}>Register</Text>
              </TouchableOpacity>
              
            </View>

                </>
            }
            {
                loading &&
                
                <View style={styles.loggedIn}>

                    <Text style={styles.registerTextSub}>Welcome{'\n'}{email}{'\n'}Just a second..</Text>
                </View>

            }

            
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
    loggedIn:{
        marginTop:90,
    },
    alreadyHaveAnAccountWrapper:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      marginTop:20,
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
    googleAppleButtonWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:'20%',
    },
    googleButtonText:{
        fontSize:18,
        color:'black',
        fontFamily:"Inter_200ExtraLight",
    },
    appleButtonText:{
        fontSize:18,
        color:'white',
        fontFamily:"Inter_200ExtraLight",
    },
    appleicon:{
        width:20,
        height:20,
        marginRight:5,
    },
    googleicon:{
        width:20,
        height:20,
        marginRight:5,
    },
    googleButton:{
        height:30,
        width:100,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',

    },
    appleButton:{
        height:30,
        width:100,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
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
    borderRadius: 40,
    height:30,
    flexDirection:'row'
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
    marginRight:20,
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
    fontSize: 40,
    fontFamily: "Inter_200ExtraLight",
    color: "white",
    textAlign:'center',
  },
});

export default LoginScreen;
