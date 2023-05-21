import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import { StatusBar } from "expo-status-bar";
import React from 'react'
import MainUITitle from './MainUITitle'

const NewMainScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <StatusBar style="dark" />
    <MainUITitle navigation={navigation}/>
    
    <View style={styles.tutorialWrapper}>
    <Image source={require('../assets/newVisionGPTIcon.png')}  style={styles.visionGPTIcon}/>
    <Text style={styles.tutorialText}>Scan texts using camera or{'\n'}get answers by typing.</Text>
    
    </View>

    <View style={styles.choicesWrapper}>
        <TouchableOpacity style={styles.choicesSectionLeft} onPress={() => navigation.navigate("Main")}>
            <Image source={require('../assets/newScanIcon.png')} style={styles.sectionIcon} />
            <Text style={styles.sectionMainTitle}>Visual Input</Text>
            <Text style={styles.sectionText}>Take a Photo</Text>    
         </TouchableOpacity>
         <View style={styles.choicesSectionRight}>
         <Image source={require('../assets/keyboardIcon.png')} style={styles.sectionIcon} />
            <Text style={styles.sectionMainTitle}>Text Input</Text>
            <Text style={styles.sectionText}>Type a Question</Text>    
         </View>
    </View>

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
        backgroundColor:'white',
        flex:1,
    },
    choicesWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',

    },
    choicesSectionLeft:{
        backgroundColor:'#EEF1FF',
        height:140,
        width:140,
        borderRadius:20,
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft:40,
    },
    choicesSectionRight:{
        backgroundColor:'#EEF1FF',
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
        color:'black',
        marginHorizontal:50,
        textAlign:'center',
        fontWeight:'400',
        fontSize:18,
        marginBottom:30,
    }
})

export default NewMainScreen;