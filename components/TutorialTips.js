import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useContext } from 'react'
import MainContext from '../context/MainContext'
import AppPreferencesContext from "../context/AppPreferencesContext";
import { MaterialIcons } from '@expo/vector-icons';

const TutorialTips = () => {
  const { count, image,isVerified } = useContext(MainContext);
  const {theme,language} = useContext(AppPreferencesContext);
  return (
    <>
    {
      image === null && (
        <View style={styles.howToUseSectionWrapper}>
        <Image source={require('../assets/newVisionGPTIcon.png')} style={styles.visionGPTIcon} />
        <View style={styles.tutorialTips}>

          <Text style={[styles.tutorialTipsContent,{color:theme.fontColor.secondaryFontColor}]}>
            {language==='English' ? `1- Select an Image or Take a Picture\n2- Crop the field with the texts\nyou want to ask` : `1- Bir resim secin veya cekin\n2- Sormak istediginiz metinleri\nkare icine alin`}
            
          </Text>
        </View>
        </View>
      )
    }
      
    </>
  )
}

export default TutorialTips;

const styles = StyleSheet.create({
  howToUseSectionWrapper:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  visionGPTIcon:{
    height:150,
    width:150,
    marginLeft:100,
  },
  countCodeInput: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 3,
  },
  countCodeWrapper: {
    backgroundColor: "grey",
    height: 30,
    marginHorizontal: 100,
    borderRadius: 10,
    marginBottom: 10,
  },

  tutorialTips: {
    textAlign:'left',
    paddingRight:100,
  },
  countTextWrapper: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
    marginBottom: 10,
  },
  tutorialTipsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8E8E93",
  },
  countText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "left",
    color: "#8E8E93",
  },
  tutorialTipsContent: {
    marginTop:10,
    fontSize: 14,
    textAlign: "left",
    color: "#8E8E93",
  },

});
