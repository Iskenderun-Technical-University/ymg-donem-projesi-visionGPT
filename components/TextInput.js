import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput } from 'react-native'
import React, { useContext } from 'react'
import MainContext from '../context/MainContext'

const TextInputSection = ({navigation}) => {
  const { count, image,isVerified } = useContext(MainContext);
  return (
    <>
    
    <View style={styles.titleWrapper}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={()=>navigation.goBack()}>
                <Text style={styles.backText}>{'<'} Back</Text>
            </TouchableOpacity>
      </View>
      <Text style={styles.TextInput}>Text Input</Text>
        <View style={styles.howToUseSectionWrapper}>
        <Image source={require('../assets/newVisionGPTIcon.png')} style={styles.visionGPTIcon} />
        <View style={styles.tutorialTips}>
          <Text style={styles.tutorialTipsContent}>
            Type your question below
          </Text>
        </View>
        </View>
        <View style={styles.textInputWrapper}>
        <TextInput
                    style={styles.inputTextStyle}
                    placeholderTextColor={"black"}
                    placeholder="Type here..."
                  />
        <Image source={require('../assets/rightArrowIcon.png')} style={styles.inputTextIcon}/>
        </View>
      
      
    </>
  )
}

export default TextInputSection;

const styles = StyleSheet.create({
    inputTextIcon:{
        height:20,
        width:20,
        marginRight:20,
    },
    inputTextStyle:{
        height:60,
        marginHorizontal:20,
    },
    textInputWrapper:{  
        backgroundColor:'#DDE6ED',
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
