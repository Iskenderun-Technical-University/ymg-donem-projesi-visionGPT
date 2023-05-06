import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ContentLoader from "react-native-easy-content-loader";

const QuestionLoading = () => {

  return (
    <>

      <View style={styles.loader}>
        <Text style={styles.loadingText}>Loading question..</Text>
        <ContentLoader
          active
          pRows={5}
          tWidth={"100%"}
          pWidth={["40%", "20%", "30%", "25%", "45%"]}
          back
        ></ContentLoader>
      </View>

    </>
  )
}

export default QuestionLoading

const styles = StyleSheet.create({

  loadingText: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 14,
    textAlign: "left",
    marginLeft: 10,
    color: "#8E8E93",
  },

  loader: {
    marginTop: 20,
    marginHorizontal: 50,
  },

});