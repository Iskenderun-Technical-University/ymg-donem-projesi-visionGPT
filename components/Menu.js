import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import AuthContext from '../context/AuthContext';
import {useContext } from "react";
import * as SecureStore from 'expo-secure-store';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import MainContext from '../context/MainContext';




const Menu = ({navigation}) => {
    const {setPassword,email,setEmail,setLoggedIn,setCount} = useContext(AuthContext);

    const {isVerified,count} = useContext(MainContext)
    
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
    <>
    <View style={styles.backIconWrapper}>
            <TouchableOpacity onPress={()=>navigation.navigate('Main')}>
            <Text style={styles.backIconText}>{"<"} Back</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
             <Text style={styles.buttonTextStyle}>Logout</Text>
             <Image style={styles.logoutIcon} source={require('../assets/logoutIconBlue.png')}/>
            </TouchableOpacity>
  
        </View>
    <View style={styles.container}>
        

      <View style={styles.allText}>
        

        <View style={styles.verifiedViewWrapper}>
          
          <Text style={styles.allTextFonts}>
            {isVerified ? 'Verified' : 'Not Verified'}
          </Text>
          {
            isVerified ? 
          <Image  style={styles.verifiedIcon} source={require('../assets/verified_icon.png')}/>
            : 
          <Image  style={styles.verifiedIcon} source={require('../assets/notVerifiedIcon.png')}/>
          }
          
        </View>
  
        <Text style={styles.allTextFonts}>{email}</Text>  
        <Text style={styles.allTextFonts}>Attemps: {count}</Text>
        
      

      </View>

        
      
    </View>
    </>
  )
}

export default Menu

const styles = StyleSheet.create({
  rightArrowIcon:{
    width:15,
    height:15,
  },
  logoutIcon:{
    width:20,
    height:20,
    marginLeft:5,
  },
  allTextFonts:{
    fontSize:16,
    marginTop:5,
  },
  verifiedViewWrapper:{ 
    flexDirection:'row',
    alignItems:'center',
  
  },
  allText:{
    justifyContent:'center',
    alignItems:'center',
    marginBottom:100,
  },
  verifiedIcon:{
      width:30,
      height:30,
    },
    container:{
        flex:1,
        justifyContent:'center',
    },
    backIconWrapper:{
        marginTop:60,
        marginHorizontal:16,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    logoutButton: {
        justifyContent: "center",
        flexDirection:'row',
       
      },
      backIconText:{
        fontSize:20,
        color:'#007AFF',
      },
      buttonTextStyle: {
        color: "#007AFF",
        fontSize: 18,
        fontWeight: "500",
      },
})