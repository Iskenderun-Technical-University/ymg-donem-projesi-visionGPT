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
          <Image source={{ uri: image }} style={styles.picture} testID="picture" />
        </View>
      }
    </>
  )
}

export default Picture;
const styles = StyleSheet.create({
  picture: {
    width: "95%",
    height: 250,
    borderRadius: 10,
    borderWidth:1,
    borderColor:'grey'
  },
  pictureWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },


  

});