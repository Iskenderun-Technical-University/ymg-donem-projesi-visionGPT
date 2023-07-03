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
    const {theme,language,setTheme,setLanguage,appPreferences,changeThemeFromCache,changeLanguageFromCache} = useContext(AppPreferencesContext);
    const {isVerified,count} = useContext(MainContext)
    
    const changeTheme = () =>{
      if (theme.themeName === 'Dark'){
        setTheme(appPreferences.theme.light)
        changeThemeFromCache(appPreferences.theme.light)
      }else{
        setTheme(appPreferences.theme.dark)
        changeThemeFromCache(appPreferences.theme.dark)
      }
    }

    const changeLanguage = ()=>{
      if(language === 'English'){
        setLanguage(appPreferences.language.secondaryLanguage);
        changeLanguageFromCache(appPreferences.language.secondaryLanguage);
      }else{
        setLanguage(appPreferences.language.primaryLanguage);
        changeLanguageFromCache(appPreferences.language.primaryLanguage);
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
        
        navigation.navigate('Register')
      } catch (e) {
        console.error(e);
      }
  }
    

  return (
    <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>
        <View style={styles.titleWrapper}>
          <TouchableOpacity onPress={()=>navigation.goBack()} style={{flexDirection:'row',alignItems:'center'}}>
          <MaterialIcons name="arrow-back-ios" color={theme.fontColor.primaryFontColor} size={20} />
          </TouchableOpacity>
          <Text style={[styles.settingsTitleText,{color:theme.fontColor.primaryFontColor}]}>Menu</Text>
          <View style={{flexDirection:'row',alignItems:'center',backgroundColor:count>0 ? '#AA77FF' : '#DF2E38',borderRadius:20,justifyContent:'center'}}>
          <MaterialIcons name="local-activity" style={{marginLeft:10,marginRight:10}} color={'white'} size={20} />
          <Text style={[styles.countText,{color:'white'}]}>{count}</Text>
          </View>
          
      </View>
        
        <View style={styles.userInfoWrapper}>
            <Image source={require('../assets/newVisionGPTIcon.png')} style={styles.avataricon} />
            <View>
            <Text style={[styles.email,{color:theme.fontColor.primaryFontColor}]}>{email}</Text> 
            {
              email === 'test-user' ?  
              <Text style={[styles.verified,{color:'orange'}]}>
                {language === 'English' ? 'This is a tester account' : 'Bu bir tester hesabi'}
              
            </Text>
            :
            <Text style={[styles.verified,{color: isVerified ? 'green' : 'grey'}]}>
            {language ==='English' ? isVerified ? 'Verified' : 'Not Verified' : isVerified ? 'Hesap Onaylandi' : 'Hesap Onaylanmadi'}
        </Text>
            } 
            
            </View>
        </View>
        <TouchableOpacity style={[styles.beProWrapper,{backgroundColor: '#AA77FF'}]} onPress={()=>alert('On Progress..')}>
        <MaterialIcons name="auto-awesome" style={[styles.inputTextIcon,{marginLeft:10}]} color={'white'} size={40} />
          <View>
          <Text style={[styles.proTitle,{color:'white'}]}>{language === 'English' ? 'Upgrade to Pro !' : 'Pro Versiyona Yukselt !'}</Text>
          <Text style={{color:'white'}}>{language === 'English' ? 'No ads No Restrictions' : 'Reklam yok Kisitlama yok'}</Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" style={{marginRight:10}} color={'white'} size={20} />
          
        </TouchableOpacity>
        <ScrollView>
        
          <Text style={[styles.settingsName,{color:theme.fontColor.primaryFontColor,marginTop:20}]}>
            {language === 'English' ? 'Preferences' : 'Tercihler'}
          </Text>
          

        <View style={[styles.settingsWrapper,{backgroundColor:theme.sectionBoxColor}]}>
        
          <TouchableOpacity style={styles.settingRow} onPress={changeTheme}>
          <View style={styles.leftTexts}>
          <MaterialIcons name="palette" style={{marginHorizontal:10}} color={theme.fontColor.primaryFontColor} size={20} />
          <Text style={[styles.settingText,{color:theme.fontColor.primaryFontColor}]}>{language === 'English' ? 'Theme' : 'Tema'}</Text>
          </View>
          <View style={styles.rightTexts}>
          <Text style={[styles.settingTextRight,{color:theme.fontColor.primaryFontColor}]}>{theme.themeName}</Text>
          <MaterialIcons name="cached" style={{marginRight:10}} color={theme.fontColor.primaryFontColor} size={20} />
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingRow} onPress={changeLanguage}>
          <View style={styles.leftTexts}>
          <MaterialIcons name="translate" style={{marginHorizontal:10}} color={theme.fontColor.primaryFontColor} size={20} />
          <Text style={[styles.settingText,{color:theme.fontColor.primaryFontColor}]}>{language === 'English' ? 'Language' : 'Dil'}</Text>
          </View>
          <View style={styles.rightTexts}>
          <Text style={[styles.settingTextRight,{color:theme.fontColor.primaryFontColor}]}>{language === 'English' ? 'English' : 'Turkce'}</Text>
          <MaterialIcons name="cached" style={{marginRight:10}} color={theme.fontColor.primaryFontColor} size={20} />
          </View>
          </TouchableOpacity>
          

        </View>
        <Text style={[styles.settingsName,{color:theme.fontColor.primaryFontColor}]}>{language === 'English' ? 'Help' : 'Yardim'}</Text>

        <View style={[styles.settingsWrapper,{backgroundColor:theme.sectionBoxColor}]}>
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <MaterialIcons name="help-center" style={{marginHorizontal:10}} color={theme.fontColor.primaryFontColor} size={20} />
          <Text style={[styles.settingText,{color:theme.fontColor.primaryFontColor}]}>{language ==='English' ? 'Help Center' : 'Yardim Merkezi'}</Text>
          </View>
          <View style={styles.rightTexts}>
          <MaterialIcons name="arrow-forward-ios" style={[styles.inputTextIcon,{marginRight:10}]} color={theme.fontColor.primaryFontColor} size={20} />
          </View>
          </TouchableOpacity>
          
          
          <TouchableOpacity style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <MaterialIcons name="help" style={{marginHorizontal:10}} color={theme.fontColor.primaryFontColor} size={20} />
          <Text style={[styles.settingText,{color:theme.fontColor.primaryFontColor}]}>{language === 'English' ? 'FAQ' : 'SSS'}</Text>
          </View>
          <View style={styles.rightTexts}>
          <MaterialIcons name="arrow-forward-ios" style={[styles.inputTextIcon,{marginRight:10}]} color={theme.fontColor.primaryFontColor} size={20} />
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <MaterialIcons name="lock" style={{marginHorizontal:10}} color={theme.fontColor.primaryFontColor} size={20} />
          <Text style={[styles.settingText,{color:theme.fontColor.primaryFontColor}]}>{language ==='English' ? 'Privacy Policy' : 'Gizlilik Politikasi'}</Text>
          </View>
          <View style={styles.rightTexts}>
          <MaterialIcons name="arrow-forward-ios" style={[styles.inputTextIcon,{marginRight:10}]} color={theme.fontColor.primaryFontColor} size={20} />
          </View>
          </TouchableOpacity>
          
          
        </View>
        <Text style={[styles.settingsName,{color:theme.fontColor.primaryFontColor}]}>{language ==='English' ? 'About' : 'Hakkinda'}</Text>

        <View style={[styles.settingsWrapper,{backgroundColor:theme.sectionBoxColor}]}>
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <MaterialIcons name="info" style={{marginHorizontal:10}} color={theme.fontColor.primaryFontColor} size={20} />
          <Text style={[styles.settingText,{color:theme.fontColor.primaryFontColor}]}>{language === 'English' ? 'About VisionGPT' : 'VisionGPT Hakkinda'}</Text>
          </View>
          <View style={styles.rightTexts}>
          <MaterialIcons name="arrow-forward-ios" style={[styles.inputTextIcon,{marginRight:10}]} color={theme.fontColor.primaryFontColor} size={20} />
          </View>
          </TouchableOpacity>
          
          
          
          
          

        </View>

        

        <View style={styles.logoutRow}>
          <TouchableOpacity onPress={logout}>
          <Text style={{fontSize:18,color:'rgba(255,59,48,0.8)',marginBottom:5,marginTop:5}}>
              {language === 'English' ? 'Logout' : 'Cikis'}
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
  countText:{
    fontSize:20,
    marginRight:10,
  },
  titleWrapper:{
    flexDirection:'row',
    marginTop:70,
    marginHorizontal:16,
    justifyContent:'space-between',
    alignItems:'center'
  },
  proTitle:{
    
    fontSize:22,
    fontWeight:'300',
  },
  redPremiumIcon:{
    width:50,
    height:50,
    marginLeft:30,
    

  },
  beProWrapper:{
    height:60,
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
    marginBottom:200,
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
    fontSize:20,
    fontWeight:'300',

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