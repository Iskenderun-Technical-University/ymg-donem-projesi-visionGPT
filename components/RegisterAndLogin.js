import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AuthContext from "../context/AuthContext";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";


import React, { useContext,useEffect } from "react";

const RegisterAndLogin = ({navigation}) => {
  const {password,setPassword,handleLogin,email,setEmail,loggedIn,setLoggedIn} = useContext(AuthContext);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('Main')
        setLoggedIn(true);
      }
    })
    return unsubscribe
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.titleWrapper}>
        <Text style={styles.loginText}>VisionGPT</Text>
      </View>
      <View style={styles.emailSubTitleWrapper}>
        <Text style={styles.tutorialTipsTitle}>Email</Text>
      </View>
      <View style={styles.textInputWrapperEmail}>
        <TextInput style={styles.input} value={email} onChangeText={text => setEmail(text)}/>
      </View>
      <View style={styles.passwordSubTitleWrapper}>
        <Text style={styles.tutorialTipsTitle}>Password</Text>
      </View>
      <View style={styles.textInputWrapperPassword}>
        <TextInput style={styles.input} value={password} onChangeText={text => setPassword(text)} secureTextEntry/>
      </View>
      <View style={styles.loginButtonWrapper}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonTextStyle}>Login {">"} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterAndLogin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  titleWrapper: {
    marginTop: "20%",
    marginHorizontal: 24,
  },
  loginText: {
    fontSize: 36,
    color: "white",
  },
  textInputWrapperEmail:{
    backgroundColor: "#d9d9d9",
    marginHorizontal: 80,
    height: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  textInputWrapperPassword: {
    backgroundColor: "#d9d9d9",
    marginHorizontal: 80,
    height: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  input: {
    marginLeft: 10,
    justifyContent: "center",
    color: "black",
    marginTop:4,
    fontSize:14,
  },
  loginButton: {
    backgroundColor: "black",
    width: "30%",
    height: 30,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    textAlign: "auto",
    alignItems: "center",
  },
  loginButtonWrapper: {
    alignItems: "center",
    marginTop: 30,
  },
  buttonTextStyle: {
    color: "#007AFF",
    fontSize: 18,
    fontWeight: "500",
  },
  emailSubTitleWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop:'50%',
  },
  passwordSubTitleWrapper:{
    justifyContent: "center",
    alignItems: "center",
    marginTop:10,
  },
  tutorialTipsTitle: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    color: "#8E8E93",
  },
});
