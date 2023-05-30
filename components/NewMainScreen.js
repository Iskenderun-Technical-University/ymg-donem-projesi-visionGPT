import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import { StatusBar } from "expo-status-bar";
import React,{useContext} from 'react'
import MainUITitle from './MainUITitle'
import AppPreferencesContext from '../context/AppPreferencesContext';
import { MaterialIcons } from '@expo/vector-icons';
import MainContext from '../context/MainContext';
import secretTokens from '../tokens/SecretTokens';


const NewMainScreen = ({navigation}) => {
    const {theme,language} = useContext(AppPreferencesContext)
    const {email,isTester} = useContext(MainContext)
    
  return (
    <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>
        <StatusBar style={theme.statusBarTheme} />
    <MainUITitle navigation={navigation}/>
    <View style={styles.tutorialWrapper}>
    <Image source={require('../assets/newVisionGPTIcon.png')}  style={styles.visionGPTIcon}/>
    <Text style={[styles.tutorialText,{color:theme.fontColor.primaryFontColor}]}>
        {language === 'English' ? "Scan texts using camera or\nget answers by typing." : 'Kamera ile yazilari tarayin ya da\nyazarak cevaplar alin.'}
        </Text>
    </View>
    

    <View style={styles.choicesWrapper}>
        <TouchableOpacity style={[styles.choicesSectionLeft,{backgroundColor:theme.sectionBoxColor}]} onPress={() => navigation.navigate("Main")}>
        <MaterialIcons name="center-focus-weak" color={theme.fontColor.primaryFontColor} style={{marginTop:10}} size={40} />
            <Text style={[styles.sectionMainTitle,{color:theme.fontColor.primaryFontColor}]}>
                {language === 'English' ? "Visual Input" : 'Gorsel Girdi'}
            </Text>
            <Text style={[styles.sectionText,{color:theme.fontColor.secondaryFontColor}]}>
                {language === 'English' ? 'Take a Photo' : 'Fotograf Cek'}
                </Text>    
         </TouchableOpacity>
         <TouchableOpacity style={[styles.choicesSectionRight,{backgroundColor:theme.sectionBoxColor}]} onPress={()=>navigation.navigate('TextInput')}>
         <MaterialIcons name="keyboard" color={theme.fontColor.primaryFontColor} style={{marginTop:10}} size={40} />
            <Text style={[styles.sectionMainTitle,{color:theme.fontColor.primaryFontColor}]}>
                {language === 'English' ? "Text Input" : 'Yazi Girdisi'}
                </Text>
            <Text style={[styles.sectionText,{color:theme.fontColor.secondaryFontColor}]}>
                {language === 'English' ? 'Type a Question' : 'Bir soru yazin'}
                </Text>    
         </TouchableOpacity>
    </View>
    
    {
        isTester ? 
        <View style={{flex:1,justifyContent:'flex-end',marginBottom:60}}>
        <TouchableOpacity onPress={()=>alert(language === 'English' ? secretTokens.tester_message.english : secretTokens.tester_message.turkish)} style={{elevation:20,justifyContent:'center',flexDirection:'row',alignItems:'center',marginTop:50,alignContent:'center',backgroundColor:'#B70404',marginHorizontal:100,borderRadius:10,height:40}}>
        <MaterialIcons name="bug-report" color={'white'} size={20} />
        <Text style={{color:'white',fontSize:18}}>{language === 'English' ? 'Test User' : 'Test Kullanicisi'}</Text>
        </TouchableOpacity>
        </View>
        :
        null
    }
    
    

    </View>
  )
}


const styles = StyleSheet.create({
    chooseOneText:{
        fontSize:20,
        marginBottom:10,
        color:'grey',
        fontWeight:'bold'
    },
    sectionMainTitle:{
        fontSize:20,
        textAlign:'center',
        marginTop:30,
    },
    sectionIcon:{
        width:50,
        height:50,
        marginTop:10,
    },
    sectionText:{   
        fontSize:18,
        marginBottom:10,
        textAlign:'center',
        color:'grey'
    },
    container:{
        flex:1,
    },
    choicesWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',

    },
    choicesSectionLeft:{
     
        height:140,
        width:140,
        borderRadius:20,
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft:40,
    },
    choicesSectionRight:{
        
        height:140,
        width:140,
        borderRadius:20,
        justifyContent:'space-between',
        alignItems:'center',
        marginRight:40,
    },
    visionGPTIcon:{
        height:200,
        width:200,
    },

    tutorialWrapper:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:70,
    },
    tutorialText:{
        marginHorizontal:50,
        textAlign:'center',
        fontWeight:'400',
        fontSize:18,
        marginBottom:30,
    }
})

export default NewMainScreen;