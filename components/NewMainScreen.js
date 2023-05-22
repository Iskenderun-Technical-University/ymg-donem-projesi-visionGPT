import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import { StatusBar } from "expo-status-bar";
import React,{useContext} from 'react'
import MainUITitle from './MainUITitle'
import AppPreferencesContext from '../context/AppPreferencesContext';
import { MaterialIcons } from '@expo/vector-icons';

const NewMainScreen = ({navigation}) => {
    const {theme,setTheme,language,setLanguage} = useContext(AppPreferencesContext)
  return (
    <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>
        <StatusBar style={theme.statusBarTheme} />
    <MainUITitle navigation={navigation}/>
    <View style={styles.tutorialWrapper}>
    <Image source={require('../assets/newVisionGPTIcon.png')}  style={styles.visionGPTIcon}/>
    <Text style={[styles.tutorialText,{color:theme.fontColor.primaryFontColor}]}>Scan texts using camera or{'\n'}get answers by typing.</Text>
    
    </View>

    <View style={styles.choicesWrapper}>
        <TouchableOpacity style={[styles.choicesSectionLeft,{backgroundColor:theme.sectionBoxColor}]} onPress={() => navigation.navigate("Main")}>
        <MaterialIcons name="center-focus-weak" color={theme.fontColor.primaryFontColor} style={{marginTop:10}} size={40} />
            <Text style={[styles.sectionMainTitle,{color:theme.fontColor.primaryFontColor}]}>Visual Input</Text>
            <Text style={[styles.sectionText,{color:theme.fontColor.secondaryFontColor}]}>Take a Photo</Text>    
         </TouchableOpacity>
         <TouchableOpacity style={[styles.choicesSectionRight,{backgroundColor:theme.sectionBoxColor}]} onPress={()=>navigation.navigate('TextInput')}>
         <MaterialIcons name="keyboard" color={theme.fontColor.primaryFontColor} style={{marginTop:10}} size={40} />
            <Text style={[styles.sectionMainTitle,{color:theme.fontColor.primaryFontColor}]}>Text Input</Text>
            <Text style={[styles.sectionText,{color:theme.fontColor.secondaryFontColor}]}>Type a Question</Text>    
         </TouchableOpacity>
    </View>

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