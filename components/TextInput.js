import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../context/MainContext'
import AppPreferencesContext from "../context/AppPreferencesContext";
import { MaterialIcons } from '@expo/vector-icons';

const TextInputSection = ({ navigation }) => {
  const { count, image, isVerified } = useContext(MainContext);
  const { theme, language } = useContext(AppPreferencesContext);
  const [userPrompt, setUserPrompt] = useState('');
  const [isPress,setIsPress] = useState(false);

  const startChat = () =>{
    if(userPrompt !== ''){
      setIsPress(true);
    }else{
      setIsPress(false);
    }
  }

  useEffect(()=>{
    if(userPrompt === ''){
      setIsPress(false);
    }
  },[userPrompt])

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: theme.backgroundColor }]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      
        
          <View style={styles.titleWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="arrow-back-ios" color={theme.fontColor.primaryFontColor} size={20} />
              <Text style={[styles.backText, { color: theme.fontColor.primaryFontColor }]}>Back</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: count > 0 ? '#AA77FF' : '#DF2E38', borderRadius: 20, justifyContent: 'center' }}>
              <MaterialIcons name="local-activity" style={{ marginLeft: 10, marginRight: 10 }} color={'white'} size={20} />
              <Text style={[styles.countText, { color: 'white' }]}>{count}</Text>
            </View>
          </View>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex:1}}>
            { userPrompt === '' && 
          <Text style={[styles.TextInput, { color: theme.fontColor.primaryFontColor }]}>Text Input</Text>
            }
          <View style={styles.howToUseSectionWrapper}>
            {
              userPrompt === ''? 
              <>
            <Image source={require('../assets/newVisionGPTIcon.png')} style={{height: 150,width: 150}} />
            <Text style={{color: theme.fontColor.secondaryFontColor,fontSize:20}}>
                How can i help you ? 
              </Text>
              </>
            : 
            <>
            <Image source={require('../assets/newVisionGPTIcon.png')} style={{height: 100,width: 100,marginTop:30}} />
            <Text style={{color: theme.fontColor.secondaryFontColor,justifyContent:'flex-start',flex:1}}>
                How can i help you ? 
              </Text>
              </>
            }
              
          </View>
          {
            isPress === true && userPrompt !== '' &&
          <View style={{backgroundColor:'#5C469C',marginLeft:'30%',marginRight:20,borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,}}>
              <Text style={{marginHorizontal:10,marginVertical:15,color:theme.fontColor.primaryFontColor}}>{userPrompt}</Text>
          </View>
          }

          <View style={[styles.textInputMainWrapper,{justifyContent: userPrompt !=='' ? 'flex-end' : null,marginBottom:30}]}> 
          <View style={[styles.textInputWrapper, { backgroundColor: theme.sectionBoxColor }]}>
            <TextInput
              style={[styles.inputTextStyle, { color: theme.fontColor.primaryFontColor }]}
              placeholderTextColor={theme.fontColor.primaryFontColor}
              placeholder="Type here..."
              onChangeText={(text)=>setUserPrompt(text)}
            />
            <TouchableOpacity onPress={startChat}>
            <MaterialIcons name="arrow-forward-ios" style={styles.inputTextIcon} color={theme.fontColor.primaryFontColor} size={20} />
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  )
}

export default TextInputSection;

const styles = StyleSheet.create({
  textInputMainWrapper:{  
    flex:1,
    
  },
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  countText: {
    fontSize: 20,
    marginRight: 10,
  },
  inputTextIcon: {
    marginRight: 20,
  },
  inputTextStyle: {
    height: 60,
    marginHorizontal: 20,
  },
  textInputWrapper: {
    height: 60,
    marginHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  howToUseSectionWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
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
    marginTop: 10,
    fontSize: 18,
    textAlign: "left",
    color: "grey",
  },
  titleWrapper: {
    marginTop: 70,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backText: {
    fontSize: 18,
  },
  TextInput: {
    fontSize: 40,
    fontWeight: '300',
    marginLeft: 30,
    marginTop: 24,
    marginBottom: 80,
  },

});
