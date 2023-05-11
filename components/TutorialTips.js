import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import MainContext from '../context/MainContext'

const TutorialTips = () => {
  const { count, image,isVerified } = useContext(MainContext);
  return (
    <>
      {image === null && (
        <View style={styles.tutorialTips}>
          <Text style={styles.tutorialTipsTitle}>How to use. {isVerified ? 'verified' : 'not verified'}</Text>

          <Text style={styles.tutorialTipsContent}>
            1. To get started, take a photo or select an image from your
            gallery. {"\n"}
            2. Wait for the app to analyze the text in the photo. {"\n"}
            3. View the GPT-3.5 Turbo generated text analysis. {"\n"}
          </Text>

          {count == 1 && image === null && (
            <View style={styles.countTextWrapper}>
              <Text style={[styles.countText, { color: "orange" }]}>
                {count} attempt left
              </Text>
            </View>
          )}
          {count > 1 && image === null && (
            <View style={styles.countTextWrapper}>
              <Text style={styles.countText}>{count} attempts left</Text>
            </View>
          )}
          {count == 0 && image === null && (
            <View style={styles.countTextWrapper}>
              <Text style={[styles.countText, { color: "red" }]}>
                Your attempts are over
              </Text>
            </View>
          )}
        </View>
      )}
    </>
  )
}

export default TutorialTips;

const styles = StyleSheet.create({

  countCodeInput: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 3,
  },
  countCodeWrapper: {
    backgroundColor: "grey",
    height: 30,
    marginHorizontal: 100,
    borderRadius: 10,
    marginBottom: 10,
  },

  tutorialTips: {
    marginTop: 80,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  countTextWrapper: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
    marginBottom: 10,
  },
  tutorialTipsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8E8E93",
  },
  countText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "left",
    color: "#8E8E93",
  },
  tutorialTipsContent: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "left",
    color: "#8E8E93",
  },

});
