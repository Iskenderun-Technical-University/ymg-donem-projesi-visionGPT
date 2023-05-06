import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'


const MainUITitle = ({navigation}) => {
  return (
    <View style={styles.titleWrapper}>
      <Text style={styles.titleText}>VisionGPT</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
        <Image
          testID="menu-icon"
          source={require("../assets/menuIcon.png")}
          style={styles.menuIcon}
        />
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
    color: "#000000",
  },

});