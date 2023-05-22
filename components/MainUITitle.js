import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import MainContext from '../context/MainContext';
import { MaterialIcons } from '@expo/vector-icons';
import AppPreferencesContext from '../context/AppPreferencesContext';


const MainUITitle = ({navigation}) => {
  const {theme,language} = useContext(AppPreferencesContext);
 
  return (
    <View style={styles.titleWrapper}>
      <Text style={[styles.titleText,{color:theme.fontColor.primaryFontColor}]}>VisionGPT</Text>
      <TouchableOpacity testID='menu-icon' onPress={()=>navigation.navigate('Menu')}>
        <MaterialIcons  name="menu" color={theme.fontColor.primaryFontColor} size={30} />
      </TouchableOpacity>
    </View>
    
  )
}

export default MainUITitle

const styles = StyleSheet.create({

  menuIcon: {
    width: 30,
    height: 30,
  },
  titleWrapper: {
    flexDirection: "row",
    marginTop: 70,
    marginHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },

  titleText: {
    fontSize: 32,
  },

});