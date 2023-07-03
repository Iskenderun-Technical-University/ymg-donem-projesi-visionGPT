import { StyleSheet, View, Image, } from 'react-native'
import React, { useContext } from 'react'
import MainContext from '../context/MainContext'

const Picture = () => {
  const { image} = useContext(MainContext);
  return (
    <>
      {
        image &&
        <View style={styles.pictureWrapper}>
          <Image source={{ uri: image }} style={styles.picture} resizeMode="contain" testID="picture" />
        </View>
      }
    </>
  )
}

export default Picture;
const styles = StyleSheet.create({
  picture: {
    width: "96%",
    height: 250,
    borderRadius: 10,
  },
  pictureWrapper: {
    justifyContent: "center",
    alignItems: "center",
    elevation:10,
    marginBottom:20,
    
  },


  

});