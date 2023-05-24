import { StyleSheet, Text, View } from 'react-native'
import React,{useContext} from 'react'
import AppPreferencesContext from '../context/AppPreferencesContext'

const UserMessage = ({userPrompt}) => {
  const {theme} = useContext(AppPreferencesContext)

 
  return (
    <View style={styles.speechBubbleWrapper}>
    <View style={[styles.speechBubble,{backgroundColor:theme.themeName ==='Dark' ? '#8F43EE' : '#B799FF'}]}>
              <Text style={[styles.speechBubbleText,{color:'white'}]}>{userPrompt}</Text>
    </View>
    </View>
  )
}

export default UserMessage

const styles = StyleSheet.create({
  speechBubbleWrapper:{
    alignItems:'flex-end',
    justifyContent:'center',
    flex:1,

  },
  speechBubble: {
    maxWidth:'70%',
    marginRight: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,

  },
  speechBubbleText: {
    marginHorizontal: 10,
    marginVertical: 15,
    color: 'white',
  },

})