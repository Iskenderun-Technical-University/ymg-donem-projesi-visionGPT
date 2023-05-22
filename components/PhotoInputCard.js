import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React,{useContext} from 'react'
import MainContext from '../context/MainContext'



const PhotoInputCard = () => {
    const {takeAndCropPhoto,pickImage,isInputCardsVisible} = useContext(MainContext)
  return (
    <>
    {
      isInputCardsVisible && (
        <View style={styles.choicesWrapper}>
        <TouchableOpacity style={styles.choicesSectionLeft} onPress={takeAndCropPhoto}>
            <Image source={require('../assets/takeAPhotoIcon.png')} style={styles.sectionIcon} />
            
            <Text style={styles.sectionText}>Take a{'\n'}Photo</Text>    
         </TouchableOpacity>
         <TouchableOpacity style={styles.choicesSectionRight} onPress={pickImage}>
         <Image source={require('../assets/selectImageIcon.png')} style={styles.sectionIcon} />
           
            <Text style={styles.sectionText}>Choose an{'\n'}Image</Text>    
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
    color:'grey'
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