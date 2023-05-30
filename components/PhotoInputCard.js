import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React,{useContext} from 'react'
import MainContext from '../context/MainContext'
import AppPreferencesContext from '../context/AppPreferencesContext';
import { MaterialIcons } from '@expo/vector-icons';


const PhotoInputCard = () => {
    const {takeAndCropPhoto,pickImage,isInputCardsVisible} = useContext(MainContext)
    const {theme,language} = useContext(AppPreferencesContext)
  return (
    <>
    {
      isInputCardsVisible && (
        <View style={styles.choicesWrapper}>
        <TouchableOpacity style={[styles.choicesSectionLeft,{backgroundColor:theme.sectionBoxColor}]} onPress={takeAndCropPhoto}>
        <MaterialIcons name="photo-camera" color={theme.fontColor.primaryFontColor} style={{marginTop:10}} size={40} />
            
            <Text style={[styles.sectionText,{color:theme.fontColor.primaryFontColor}]}>{language ==='English' ? 'Take a\nPhoto' : 'Bir Fotograf Cekin'}</Text>    
         </TouchableOpacity>
         <TouchableOpacity style={[styles.choicesSectionRight,{backgroundColor:theme.sectionBoxColor}]} onPress={pickImage}>
         <MaterialIcons name="image" color={theme.fontColor.primaryFontColor} style={{marginTop:10}} size={40} />
           
            <Text style={[styles.sectionText,{color:theme.fontColor.primaryFontColor}]}>{language ==='English' ? 'Choose an\n Image' : 'Bir Fotograf\nSecin'}</Text>    
         </TouchableOpacity>
      </View>
      )
    }
    
          </>
  )
}

export default PhotoInputCard
const styles = StyleSheet.create({
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
    takePhotoButton: {
      backgroundColor: "#7372fd",
      width: "30%",
      height: 30,
      borderRadius: 5,
      marginHorizontal: 10,
      justifyContent: "center",
      textAlign: "auto",
      elevation:5,
    },
    buttonsWrapper: {
      justifyContent: "center",
      flexDirection: "row",
      marginTop: 20,
    },
    buttonTextStyle: {
      fontSize: 15,
      textAlign: "center",
      color: "white",
    },
    infoSubTitleWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },
    infoText: {
      fontSize: 18,
      color: "#000000",
    },
    infoSectionCard: {
      backgroundColor: "#F2F2F7",
      marginHorizontal: 20,
      borderRadius: 20,
      height: 150,
      justifyContent: "center",
      elevation:8,
      marginBottom:50,
    },

  });