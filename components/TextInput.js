import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput } from 'react-native'
import React, { useContext } from 'react'
import MainContext from '../context/MainContext'
import AppPreferencesContext from "../context/AppPreferencesContext";
import { MaterialIcons } from '@expo/vector-icons';

const TextInputSection = ({navigation}) => {
  const { count, image,isVerified } = useContext(MainContext);
  const {theme,language} = useContext(AppPreferencesContext);
  return (
    <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>
    
    <View style={styles.titleWrapper}>
      <MaterialIcons name="arrow-back-ios" color={theme.fontColor.primaryFontColor} size={20} />
      <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Text style={[styles.backText,{color:theme.fontColor.primaryFontColor}]}>Back</Text>
          </TouchableOpacity>
      </View>
      <Text style={[styles.TextInput,{color:theme.fontColor.primaryFontColor}]}>Text Input</Text>
        <View style={styles.howToUseSectionWrapper}>
        <Image source={require('../assets/newVisionGPTIcon.png')} style={styles.visionGPTIcon} />
        <View style={styles.tutorialTips}>
          <Text style={[styles.tutorialTipsContent,,{color:theme.fontColor.secondaryFontColor}]}>
            Type your question below
          </Text>
        </View>
        </View>
        <View style={[styles.textInputWrapper,{backgroundColor:theme.sectionBoxColor}]}>
        <TextInput
                    style={[styles.inputTextStyle,{color:theme.fontColor.primaryFontColor}]}
                    placeholderTextColor={theme.fontColor.primaryFontColor}
                    placeholder="Type here..."
                  />
        <MaterialIcons name="arrow-forward-ios" style={styles.inputTextIcon} color={theme.fontColor.primaryFontColor} size={20} />
        </View>
      
      
    </View>
  )
}

export default TextInputSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    inputTextIcon:{
       
        marginRight:20,
    },
    inputTextStyle:{
        height:60,
        marginHorizontal:20,
    },
    textInputWrapper:{  
        height:60,
        marginHorizontal:20,
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
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
  
  tutorialTipsContent: {
    marginTop:10,
    fontSize: 18,
    textAlign: "left",
    color: "grey",
  },
  titleWrapper:{
    flexDirection:'row',
    marginTop:70,
    marginHorizontal:16,
  },
  backText:{
    fontSize:18,
  },
  TextInput:{
    fontSize:40,
    fontWeight:'300',
    marginLeft:30,
    marginTop:24,
    marginBottom:80,
  },

});
