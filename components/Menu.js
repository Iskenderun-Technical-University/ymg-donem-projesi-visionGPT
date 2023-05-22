import { StyleSheet, Text, View, TouchableOpacity,Image,ScrollView } from 'react-native';
import React, { useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useContext } from "react";
import * as SecureStore from 'expo-secure-store';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import MainContext from '../context/MainContext';
import AppPreferencesContext from "../context/AppPreferencesContext";
import { MaterialIcons } from '@expo/vector-icons';



const Menu = ({navigation}) => {
    
    const {setPassword,email,setEmail,setLoggedIn,setCount} = useContext(AuthContext);
    const {theme,language,setTheme,setLanguage,appPreferences,changeThemeFromCache} = useContext(AppPreferencesContext);
    const {isVerified,count} = useContext(MainContext)
    
    const changeTheme = ()=>{
      if (theme.themeName === 'Dark'){
        setTheme(appPreferences.theme.light)
        changeThemeFromCache(appPreferences.theme.light)
      }else{
        setTheme(appPreferences.theme.dark)
        changeThemeFromCache(appPreferences.theme.dark)
      }
    }

    
    

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
    <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>
        <View style={styles.titleWrapper}>
      <MaterialIcons name="arrow-back-ios" color={theme.fontColor.primaryFontColor} size={20} />
      <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Text style={[styles.backText,{color:theme.fontColor.primaryFontColor}]}>Back</Text>
          </TouchableOpacity>
      </View>
        <Text style={[styles.settingsTitleText,{color:theme.fontColor.primaryFontColor}]}>Menu</Text>
        <View style={styles.userInfoWrapper}>
            <Image source={require('../assets/newVisionGPTIcon.png')} style={styles.avataricon} />
            <View>
            <Text style={[styles.email,{color:theme.fontColor.primaryFontColor}]}>{email}</Text>  
            <Text style={[styles.verified,{color:isVerified ? 'green' : 'grey'}]}>
                {isVerified ? 'Verified' : 'Not Verified'}
            </Text>
            </View>
        </View>
        <View style={styles.beProWrapper}>
          <Image source={require('../assets/hearIcon.png')} style={styles.redPremiumIcon} />
          <View>
          <Text style={styles.proTitle}>Upgrade to PRO!</Text>
          <Text style={styles.subProTitle}>no ads no restrictions</Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" style={{marginRight:10}} color={theme.fontColor.primaryFontColor} size={20} />
          
        </View>
        <ScrollView>
        <Text style={[styles.settingsName,{color:theme.fontColor.secondaryFontColor}]}>User</Text>
        <View style={[styles.settingsWrapper,{backgroundColor:theme.sectionBoxColor}]}>
          <View style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <MaterialIcons name="check-circle" style={{marginHorizontal:10}} color={theme.fontColor.primaryFontColor} size={20} />
          <Text style={[styles.settingText,{color:theme.fontColor.primaryFontColor}]}>Verify Email</Text>
          </View>
          <View style={styles.rightTexts}>
          <MaterialIcons name="arrow-forward-ios" style={[styles.inputTextIcon,{marginRight:10}]} color={theme.fontColor.primaryFontColor} size={20} />
          </View>
          </View>
          
          

        </View>

        
          <Text style={[styles.settingsName,{color:theme.fontColor.secondaryFontColor}]}>Preferences</Text>
          

        <View style={[styles.settingsWrapper,{backgroundColor:theme.sectionBoxColor}]}>
        
          <TouchableOpacity style={styles.settingRow} onPress={changeTheme}>
          <View style={styles.leftTexts}>
          <MaterialIcons name="palette" style={{marginHorizontal:10}} color={theme.fontColor.primaryFontColor} size={20} />
          <Text style={[styles.settingText,{color:theme.fontColor.primaryFontColor}]}>Theme</Text>
          </View>
          <View style={styles.rightTexts}>
          <Text style={[styles.settingTextRight,{color:theme.fontColor.secondaryFontColor}]}>{theme.themeName}</Text>
          <MaterialIcons name="cached" style={{marginRight:10}} color={theme.fontColor.primaryFontColor} size={20} />
          </View>
          </TouchableOpacity>
          
          <View style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <MaterialIcons name="translate" style={{marginHorizontal:10}} color={theme.fontColor.primaryFontColor} size={20} />
          <Text style={[styles.settingText,{color:theme.fontColor.primaryFontColor}]}>Language</Text>
          </View>
          <View style={styles.rightTexts}>
          <Text style={[styles.settingTextRight,{color:theme.fontColor.secondaryFontColor}]}>{language}</Text>
          <MaterialIcons name="cached" style={{marginRight:10}} color={theme.fontColor.primaryFontColor} size={20} />
          </View>
          </View>
          

        </View>
        <Text style={[styles.settingsName,{color:theme.fontColor.secondaryFontColor}]}>Help</Text>

        <View style={[styles.settingsWrapper,{backgroundColor:theme.sectionBoxColor}]}>
        
        <View style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <MaterialIcons name="help-center" style={{marginHorizontal:10}} color={theme.fontColor.primaryFontColor} size={20} />
          <Text style={[styles.settingText,{color:theme.fontColor.primaryFontColor}]}>Help Center</Text>
          </View>
          <View style={styles.rightTexts}>
          <MaterialIcons name="arrow-forward-ios" style={[styles.inputTextIcon,{marginRight:10}]} color={theme.fontColor.primaryFontColor} size={20} />
          </View>
          </View>
          
          
          <View style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <MaterialIcons name="help" style={{marginHorizontal:10}} color={theme.fontColor.primaryFontColor} size={20} />
          <Text style={[styles.settingText,{color:theme.fontColor.primaryFontColor}]}>FAQ</Text>
          </View>
          <View style={styles.rightTexts}>
          <MaterialIcons name="arrow-forward-ios" style={[styles.inputTextIcon,{marginRight:10}]} color={theme.fontColor.primaryFontColor} size={20} />
          </View>
          </View>
          
          <View style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <MaterialIcons name="lock" style={{marginHorizontal:10}} color={theme.fontColor.primaryFontColor} size={20} />
          <Text style={[styles.settingText,{color:theme.fontColor.primaryFontColor}]}>Privacy Policy</Text>
          </View>
          <View style={styles.rightTexts}>
          <MaterialIcons name="arrow-forward-ios" style={[styles.inputTextIcon,{marginRight:10}]} color={theme.fontColor.primaryFontColor} size={20} />
          </View>
          </View>
          
          
        </View>
        <Text style={[styles.settingsName,{color:theme.fontColor.secondaryFontColor}]}>About</Text>

        <View style={[styles.settingsWrapper,{backgroundColor:theme.sectionBoxColor}]}>
        
        <View style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <MaterialIcons name="info" style={{marginHorizontal:10}} color={theme.fontColor.primaryFontColor} size={20} />
          <Text style={[styles.settingText,{color:theme.fontColor.primaryFontColor}]}>About VisionGPT</Text>
          </View>
          <View style={styles.rightTexts}>
          <MaterialIcons name="arrow-forward-ios" style={[styles.inputTextIcon,{marginRight:10}]} color={theme.fontColor.primaryFontColor} size={20} />
          </View>
          </View>
          
          
          <View style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <MaterialIcons name="info" style={{marginHorizontal:10}} color={theme.fontColor.primaryFontColor} size={20} />
          <Text style={[styles.settingText,{color:theme.fontColor.primaryFontColor}]}>About Developer</Text>
          </View>
          <View style={styles.rightTexts}>
          <MaterialIcons name="arrow-forward-ios" style={[styles.inputTextIcon,{marginRight:10}]} color={theme.fontColor.primaryFontColor} size={20} />
          </View>
          </View>
          
          

        </View>

        

        <View style={styles.logoutRow}>
          <TouchableOpacity onPress={logout}>
          <Text style={{fontSize:18,color:'rgba(255,59,48,0.8)',marginBottom:5,marginTop:5}}>
              Logout
            </Text>
            </TouchableOpacity>
            
          </View>
          </ScrollView>
        
        
    </View>
)
}

const styles = StyleSheet.create({
  backText:{
    fontSize:18,
  },
  titleWrapper:{
    flexDirection:'row',
    marginTop:70,
    marginHorizontal:16,
  },
  proTitle:{
    color:'white',
    fontSize:28,
    fontWeight:'300',
  },
  subProTitle:{
    color:'white',
    
  },
  redPremiumIcon:{
    width:70,
    height:70,
    marginLeft:30,
    

  },
  beProWrapper:{
    backgroundColor:'#9254C8',
    height:100,
    marginHorizontal:20,
    borderRadius:10,
    marginBottom:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    elevation:20,
  },
  settingsName:{
    marginHorizontal:20,
    marginBottom:5,
    fontWeight:'300',
  },
  logoutRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:100,
  },
  appOwnerText:{
    color:'grey',
    fontWeight:'100',
  },
  appOwner:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-end',
    marginBottom:16,
  },
  rightTexts:{
    flexDirection:'row',
    alignItems:'center',
  },
  leftTexts:{
    flexDirection:'row',
    alignItems:'center',
  },
  rightArrowIcon:{
    height:20,
    width:20,
    marginHorizontal:10,
  },
  settingTextRight:{
    marginRight:5,
    fontSize:16,
    fontWeight:'300',
  },
  divider:{
    height:StyleSheet.hairlineWidth,
    backgroundColor:'grey'
  },
  settingRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginVertical:10,
  },
  settingText:{
    fontSize:20,
    fontWeight:'300',
    marginTop:5,
    marginBottom:5,
   
  },
  settingsWrapper:{
    marginHorizontal:20,
    marginBottom:20,
    
    borderRadius:10,  
  },
  userInfoWrapper:{
    
    flexDirection:'row',
    alignItems:'center',
  },
  avataricon:{
    height:150,
    width:150,
  },
  settingsTitleText:{
    fontSize:40,
    fontWeight:'300',
    marginLeft:30,
    marginTop:24,
  },
  backButtonWrapper:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  backButtonText:{
    fontSize:18,
  },
container: {
    flex: 1,
},
header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop:50,
    marginHorizontal:16,
},


verified: {
    fontSize: 16,
    fontWeight:'300',
    
},
email: {
    fontSize: 22,
    fontWeight:'300'
},
attempts: {
    fontSize: 16,
    color: "#666",
},

});
export default Menu;