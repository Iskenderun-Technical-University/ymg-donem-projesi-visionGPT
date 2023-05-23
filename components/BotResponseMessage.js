import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useState } from 'react'

const BotResponseMessage = ({message}) => {
    
   
  return (
    <View style={styles.botResponseWrapper}>
      <Image source={require('../assets/newVisionGPTIcon.png')} style={{height: 70,width: 70}} />
            <View style={{justifyContent:'flex-start',flex:1,backgroundColor:'#394867',marginRight:'30%',borderTopRightRadius:20,borderBottomRightRadius:20,borderBottomLeftRadius:20}}>
            <Text style={{marginHorizontal:10,marginVertical:15,color:'white'}}>
                {message}
              </Text>
              </View>
    </View>
  )
}

export default BotResponseMessage

const styles = StyleSheet.create({
    botResponseWrapper:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom:10,
        alignItems:'flex-end'
    },
})