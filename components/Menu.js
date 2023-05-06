import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import AuthContext from '../context/AuthContext';
import {useContext } from "react";
import * as SecureStore from 'expo-secure-store';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';



const Menu = ({navigation}) => {
    const {password,setPassword,handleLogin,email,setEmail,loggedIn,setLoggedIn,setCount} = useContext(AuthContext);

    
    const logout = async () => {
      try {
        await signOut(auth);
        await SecureStore.deleteItemAsync("userEmail");
        console.log('logout');
        setLoggedIn(false);
        setEmail('');
        setCount(0);
        setPassword('');
        navigation.navigate('Login')
      } catch (e) {
        console.error(e);
      }
  }
    

  return (
    <View style={styles.container}>
        <View style={styles.backIconWrapper}>
            <TouchableOpacity onPress={()=>navigation.navigate('Main')}>
            <Text style={styles.backIconText}>{"<"} Back</Text>
            </TouchableOpacity>
        </View>
      
      <View style={styles.loginButtonWrapper}>
      <Text>{email}</Text>
        <TouchableOpacity style={styles.loginButton} onPress={logout}>
          <Text style={styles.buttonTextStyle}>Logout </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
    },
    backIconWrapper:{
        marginTop:60,
        marginHorizontal:16,
    },
    loginButton: {
        backgroundColor: "white",
        width: "30%",
        height: 30,
        borderRadius: 10,
        marginHorizontal: 10,
        justifyContent: "center",
        textAlign: "auto",
        alignItems: "center",
      },
      backIconText:{
        fontSize:24,
        color:'black',
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
})