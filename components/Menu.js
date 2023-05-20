import { StyleSheet, Text, View, TouchableOpacity,Image,ScrollView } from 'react-native';
import React, { useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useContext } from "react";
import * as SecureStore from 'expo-secure-store';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import MainContext from '../context/MainContext';
import { MaterialIcons } from '@expo/vector-icons';



const Menu = ({navigation}) => {
    const languages ={
      english:'English',
      turkish:'Turkish'
    }
    const themes={
      light:'Light',
      dark:'Dark'
    }
    const {setPassword,email,setEmail,setLoggedIn,setCount} = useContext(AuthContext);
    const {isVerified,count} = useContext(MainContext)
    const [language, setLanguage] = useState(languages.english);
    const [theme, setTheme] = useState(themes.light);
    

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
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButtonWrapper} onPress={()=>navigation.navigate('Main')}>
                <MaterialIcons name="arrow-back" size={24} color="black" />
                <Text style={styles.backButtonText}>Main</Text>
            </TouchableOpacity>
            
        </View>
        <Text style={styles.settingsTitleText}>Settings</Text>

        <View style={styles.userInfoWrapper}>
            <Image source={require('../assets/newIcon.png')} style={styles.avataricon} />
            <View>
            <Text style={styles.email}>{email}</Text>  
            <Text style={[styles.verified,{color:isVerified ? 'green' : 'black'}]}>
                {isVerified ? 'Verified' : 'Not Verified'}
            </Text>
            </View>
        </View>
        <Text style={styles.settingsName}>User</Text>
        
        <View style={styles.settingsWrapper}>
        <View style={styles.divider}/>
        <View style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <Image style={[styles.rightArrowIcon,{marginHorizontal:5}]} source={require('../assets/diamondIcon.png')} />
          <Text style={styles.settingText}>Upgrade to PRO! </Text>
          </View>
          <View style={styles.rightTexts}>
          <Image style={styles.rightArrowIcon} source={require('../assets/rightArrowIcon.png')} />
          </View>
          </View>
          
          <View style={styles.divider}/>
          <View style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <Image style={[styles.rightArrowIcon,{marginRight:5,marginLeft:5,}]} source={require('../assets/checkIcon.png')} />
          <Text style={styles.settingText}>Verify Email</Text>
          </View>
          <View style={styles.rightTexts}>
          <Image style={styles.rightArrowIcon} source={require('../assets/rightArrowIcon.png')} />
          </View>
          </View>
          <View style={styles.divider}/>
          

        </View>

        
          <Text style={styles.settingsName}>Preferences</Text>
          

        <View style={styles.settingsWrapper}>
        <View style={styles.divider}/>
          <View style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <Image style={[styles.rightArrowIcon,{marginRight:5,marginLeft:5,}]} source={require('../assets/newThemeIcon.png')} />
          <Text style={styles.settingText}>Theme</Text>
          </View>
          <View style={styles.rightTexts}>
          <Text style={styles.settingTextRight}>{themes.light}</Text>
          <Image style={styles.changeIcon} source={require('../assets/changeIcon.png')} />
          </View>
          </View>
          <View style={styles.divider}/>
          <View style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <Image style={[styles.rightArrowIcon,{marginRight:5,marginLeft:5,}]} source={require('../assets/languageIcon.png')} />
          <Text style={styles.settingText}>Language</Text>
          </View>
          <View style={styles.rightTexts}>
          <Text style={styles.settingTextRight}>{languages.english}</Text>
          <Image style={styles.changeIcon} source={require('../assets/changeIcon.png')} />
          </View>
          </View>
          <View style={styles.divider}/>

        </View>
        <Text style={styles.settingsName}>About</Text>

        <View style={styles.settingsWrapper}>
        <View style={styles.divider}/>
        <View style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <Image style={[styles.rightArrowIcon,{marginRight:5,marginLeft:5,}]} source={require('../assets/aboutIcon.png')} />
          <Text style={styles.settingText}>About VisionGPT</Text>
          </View>
          <View style={styles.rightTexts}>
          <Image style={styles.rightArrowIcon} source={require('../assets/rightArrowIcon.png')} />
          </View>
          </View>
          
          <View style={styles.divider}/>
          <View style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <Image style={[styles.rightArrowIcon,{marginRight:5,marginLeft:5,}]} source={require('../assets/aboutIcon.png')} />
          <Text style={styles.settingText}>About Developer</Text>
          </View>
          <View style={styles.rightTexts}>
          <Image style={styles.rightArrowIcon} source={require('../assets/rightArrowIcon.png')} />
          </View>
          </View>
          <View style={styles.divider}/>
          

        </View>

        <Text style={styles.settingsName}>Help</Text>

        <View style={styles.settingsWrapper}>
        <View style={styles.divider}/>
        <View style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <Image style={[styles.rightArrowIcon,{marginRight:5,marginLeft:5,}]} source={require('../assets/helpCenterIcon.png')} />
          <Text style={styles.settingText}>Help Center</Text>
          </View>
          <View style={styles.rightTexts}>
          <Image style={styles.rightArrowIcon} source={require('../assets/rightArrowIcon.png')} />
          </View>
          </View>
          
          <View style={styles.divider}/>
          <View style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <Image style={[styles.rightArrowIcon,{marginRight:5,marginLeft:5,}]} source={require('../assets/faqIcon.png')} />
          <Text style={styles.settingText}>FAQ</Text>
          </View>
          <View style={styles.rightTexts}>
          <Image style={styles.rightArrowIcon} source={require('../assets/rightArrowIcon.png')} />
          </View>
          </View>
          <View style={styles.divider}/>
          <View style={styles.settingRow}>
          <View style={styles.leftTexts}>
          <Image style={[styles.rightArrowIcon,{marginRight:5,marginLeft:5,}]} source={require('../assets/privacyIcon.png')} />
          <Text style={styles.settingText}>Privacy Policy</Text>
          </View>
          <View style={styles.rightTexts}>
          <Image style={styles.rightArrowIcon} source={require('../assets/rightArrowIcon.png')} />
          </View>
          </View>
          <View style={styles.divider}/>
          

        </View>

        <View style={styles.logoutRow}>
          <TouchableOpacity onPress={logout}>
          <Text style={{fontSize:18,color:'rgba(255,59,48,0.8)',marginBottom:5,marginTop:5}}>
              Logout
            </Text>
            </TouchableOpacity>
            
          </View>
        
        
    </View>
)
}

const styles = StyleSheet.create({
  settingsName:{
    marginHorizontal:40,
    marginBottom:5,
    fontWeight:'300',
  },
  logoutRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
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
  changeIcon:{
    width:15,
    height:15,
    marginRight:5,
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
  },
  settingTextRight:{
    marginRight:5,
    fontSize:16,
    color:'#999',
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

  },
  settingText:{
    fontSize:20,
    fontWeight:'300',
    marginTop:5,
    marginBottom:5,
   
  },
  settingsWrapper:{
    marginHorizontal:40,
    marginBottom:20,
    backgroundColor:'white',
    
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
    backgroundColor: "white",
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
    color: "#222",
    fontWeight:'300'
},
attempts: {
    fontSize: 16,
    color: "#666",
},

});
export default Menu;