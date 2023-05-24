import { StyleSheet, Text, View } from 'react-native'
import React,{useContext} from 'react'
import AppPreferencesContext from '../context/AppPreferencesContext'

const UserMessage = ({userPrompt,userPromptTime}) => {
  const {theme} = useContext(AppPreferencesContext)

  return (
    <View style={styles.speechBubbleWrapper}>
    <View style={[styles.speechBubble,{backgroundColor:theme.themeName ==='Dark' ? '#8F43EE' : '#B799FF'}]}>
              <Text style={[styles.speechBubbleText,{color:'white'}]}>{userPrompt}</Text>
              <Text style={styles.timeText}>{userPromptTime}</Text>
    </View>
    </View>
  )
}

export default UserMessage

const styles = StyleSheet.create({
  timeText:{
    color:'white',
    marginBottom:5,
    textAlign:'right',
    marginRight:10,
    fontWeight:'100',
  },
  speechBubbleWrapper:{
    alignItems:'flex-end',
    justifyContent:'center',
    flex:1,
  },
  speechBubble: {
    maxWidth:'70%',
    minWidth:'20%',
    marginRight: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,

  },
  speechBubbleText: {
    marginHorizontal: 10,
    marginTop:15,
    marginBottom:5,
    color: 'white',
  },

})