import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import { StatusBar } from "expo-status-bar";
import React,{useContext} from 'react'
import MainUITitle from './MainUITitle'
import AppPreferencesContext from '../context/AppPreferencesContext';
import { MaterialIcons } from '@expo/vector-icons';
import MainContext from '../context/MainContext';
import Picture from './Picture';
import ClearAnswerButton from './ClearAnswerButton'


const NewMainScreen = ({navigation}) => {
    const {theme,language} = useContext(AppPreferencesContext)
    const {takeAndCropPhoto,pickImage,isInputCardsVisible,image,chatGPTResponse,clearPicture} = useContext(MainContext)
    
  return (
    <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>
        <StatusBar style={theme.statusBarTheme} />
        <MainUITitle navigation={navigation}/>
        
    {
        image
        ?
        <>
        <Picture />
        <View style={{backgroundColor:theme.sectionBoxColor,marginHorizontal:16,borderRadius:20}}>
        <Text style={{color:theme.fontColor.primaryFontColor,marginHorizontal:10,marginTop:10,marginBottom:10}}>{chatGPTResponse ? chatGPTResponse : 'bir saniye..'}</Text>
        </View>
        <View style={{elevation:10}}>
        <TouchableOpacity onPress={clearPicture} style={{backgroundColor:theme.sectionBoxColor,height:250,justifyContent:'center',alignItems:'center',marginHorizontal:10,borderRadius:20,marginTop:50}}>
        <MaterialIcons name="photo-camera" color={theme.fontColor.primaryFontColor} style={{marginTop:10}} size={50} />
            <Text style={{fontSize:40,color:theme.fontColor.primaryFontColor,textAlign:'center'}} >
                 Başka bir fotoğraf çekmek için tıklayın.
            </Text>
        </TouchableOpacity>
        </View> 
        
        </>
        :
        <View style={styles.choicesWrapper}>
        <TouchableOpacity style={[styles.choicesSectionLeft,{backgroundColor:theme.sectionBoxColor}]} onPress={pickImage}>
        <MaterialIcons name="photo-camera" color={theme.fontColor.primaryFontColor} style={{marginTop:10}} size={50} />
            <Text style={[styles.sectionMainTitle,{color:theme.fontColor.primaryFontColor}]}>Kamerayı kullanmak için tıklayın.{'\n'}{'\n'}Bu butonu kullanarak fotoğraf çekebilirsiniz ve ben size çektiğiniz fotoğraftaki nesnelerin detaylarını söyleyeceğim.</Text>
             
         </TouchableOpacity>
         
    </View>

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
        marginHorizontal:10,
        
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
        justifyContent:'center',
        alignContent:'center',
        marginTop:100,
    },
    choicesSectionLeft:{
     
        height:500,
        
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:10,
        elevation:5,
        borderWidth:0.2
        
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