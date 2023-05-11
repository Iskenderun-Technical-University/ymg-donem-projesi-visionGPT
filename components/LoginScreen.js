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
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import secretTokens from "../tokens/SecretTokens";


WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
    
    const { password, setPassword, handleLogin, email, setEmail, loading,loginOrRegister} = useContext(AuthContext);
    const [token, setToken] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest(secretTokens.googleAuthTokens);
    
    
    useEffect(() => {
      if (response?.type === 'success') {
        const { authentication } = response;
        const { accessToken } = authentication;
        setToken(accessToken);
        getUserInfo(accessToken);
      }
    }, [response]);


    
    const getUserInfo = async (accessToken) => {
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const userInfo = await userInfoResponse.json();
      setUserInfo(userInfo);
      console.log(userInfo);
      loginOrRegister(userInfo);
    };

    const loginWithGoogle = async () => {
      try {
        await promptAsync();
      } catch (err) {
        console.log(err);
      }
    };


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
      <StatusBar style="dark" />
      <SafeAreaView style={styles.topWrapper}>
        <View style={styles.imageAndTitleWrapper}>
          <Image
            source={require("../assets/cuttedicon.png")}
            style={styles.image}
          />
          <Text style={styles.welcomeText}>Welcome{'\n'}Back!</Text>
        </View>
      </SafeAreaView>
      <View style={styles.bottomWrapper}>
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={["white","white","white","rgba(115,114,253,0.1)"]}
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
              <Image
                  source={require("../assets/emailicon.png")}
                  style={styles.inputEmailIcon}
                />
                <Text style={styles.emailText}>Email</Text>
              </View>

              <View style={styles.textInputWrapper}>
                <View style={styles.textInputWrapperEmail}>
                  <TextInput
                    inputMode="email"
                    style={styles.emailInput}
                    placeholderTextColor={"grey"}
                    placeholder="Your Email adress"
                    value={email}
                    onChangeText={text => setEmail(text)}
                  />
                </View>
              </View>

              <View style={styles.emailTextTitle}>
              <Image
                  source={require("../assets/passwordicon.png")}
                  style={styles.inputEmailIcon}
                />
                <Text style={styles.emailText}>Password</Text>
              </View>

              <View style={styles.textInputWrapper}>
                <View style={styles.textInputWrapperEmail}>
                  <TextInput
                    style={styles.emailInput}
                    secureTextEntry
                    placeholderTextColor={"grey"}
                    placeholder="Your password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                  />
                </View>
                
                
              </View>
              
              
              
              <View style={styles.registerButtonWrapper}>
                <TouchableOpacity style={styles.registerButtonEmail}
                 onPress={handleLogin}
                disabled={loading ? true : false}>
                  <LinearGradient
                    colors={[        
                    "rgba(115,114,253,1)",
                    '#2A2F4F',
                    ]}
                    start={[0,0]}
                    end={[1,1]}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.registerButtonTextEmail}>Login</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={styles.divider}/>
              <Text style={styles.continueWithText}>Or login with </Text>

              <View style={styles.googleAppleButtonWrapper}>
              <LinearGradient
                    colors={[        
                        'white',
                        "white",
                    ]}
                    start={[0,0]}
                    end={[1,1]}
                    style={styles.googleButtonGradient}
                  >

                    <TouchableOpacity style={styles.googleButton}
                            disabled={!request}
                            onPress={loginWithGoogle
                            }


                    >
                        <Image source={require('../assets/googleicon.png')} style={styles.googleicon}/>
                        <Text style={styles.googleButtonText}>Google</Text>
                        </TouchableOpacity>

                        </LinearGradient>
                    
                        <LinearGradient
                    colors={[        
                        'grey',
                        "grey",
                    ]}
                    start={[0,0]}
                    end={[1,1]}
                    style={styles.googleButtonGradient}
                  >
                        
                    <TouchableOpacity style={styles.appleButton} disabled>
                        <Image source={require('../assets/appleiconwhitenew.png')} resizeMode="contain" style={styles.appleicon}/>
                        <Text style={styles.appleButtonText}>Apple</Text>
                        </TouchableOpacity>
                        
                        </LinearGradient>
                        
                
            
              </View>
              
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
    googleButtonGradient:{
        borderRadius:10,
        elevation:10,
        shadowColor: "black",

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
        marginTop:15,
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
    backgroundColor:'transparent',
    height:40,
    justifyContent:'center',
    marginHorizontal:'10%',
    marginTop:20,
  },
  registerButtonEmail: {
    backgroundColor: "rgba(115,114,253,0.7)",
    height:40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation:20,
  },
  bottomWrapper: {
    flex: 1,
    backgroundColor: "rgba(157,154,253,0.9)",
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
  emailInput: {
    color: "black",
    marginTop: 4,
    textAlign: "center",
  },
  textInputWrapper: {
    flexDirection: "row",
    marginHorizontal: "5%",
    justifyContent: "center",
  },
  textInputWrapperEmail: {
    backgroundColor: "rgba(209,209,253,1)",
    height: 35,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(115,114,253,0.7)",
    alignItems: "center",
    width: "90%",
    elevation:10,
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
    backgroundColor: "rgba(157,154,253,0.9)",
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
    color: "black",
    textAlign:'center',
  },
});

export default LoginScreen;
