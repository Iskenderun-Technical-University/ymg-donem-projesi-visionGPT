import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ContentLoader from "react-native-easy-content-loader";

const AnswerLoading = () => {
  return (
    <>
          <View style={styles.loader}>
            <Text style={styles.loadingText}>Loading answer..</Text>
            <ContentLoader
              active
              primaryColor='rgba(51, 153, 51,1)'
              pRows={5}
              tWidth={"100%"}
              pWidth={["40%", "20%", "30%", "25%", "45%"]}
              back
            ></ContentLoader>
          </View>
    </>
  )
}

export default AnswerLoading;
const styles = StyleSheet.create({
    loadingText: {
      marginTop: 10,
      marginBottom: 5,
      fontSize: 14,
      textAlign: "left",
      marginLeft: 10,
      color: "green",
    },
    
    loader: {
      marginTop: 20,
      marginHorizontal: 50,
    },
    
  });