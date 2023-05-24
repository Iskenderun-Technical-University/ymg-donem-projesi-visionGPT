import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UserMessage = ({userPrompt}) => {
  return (
    <View style={{backgroundColor:'#8F43EE',marginLeft:'30%',marginRight:20,borderTopLeftRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
              <Text style={{marginHorizontal:10,marginVertical:15,color:'white'}}>{userPrompt}</Text>
    </View>
  )
}

export default UserMessage

const styles = StyleSheet.create({

})