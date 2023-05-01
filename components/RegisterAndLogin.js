import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import React from "react";

const RegisterAndLogin = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.titleWrapper}>
        <Text style={styles.loginText}>VisionGPT</Text>
      </View>
      <View style={styles.tutorialTips}>
        <Text style={styles.tutorialTipsTitle}>Enter your password</Text>
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput style={styles.input} />
      </View>

      <View style={styles.loginButtonWrapper}>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.buttonTextStyle}>Login {">"} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterAndLogin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  titleWrapper: {
    marginTop: "20%",
    marginHorizontal: 24,
  },
  loginText: {
    fontSize: 36,
    color: "white",
  },
  textInputWrapper: {
    backgroundColor: "#d9d9d9",
    marginHorizontal: 80,
    height: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  input: {
    marginLeft: 10,
    justifyContent: "center",
    color: "black",
    marginTop:4,
    fontSize:20,
  },
  loginButton: {
    backgroundColor: "black",
    width: "30%",
    height: 30,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    textAlign: "auto",
    alignItems: "center",
  },
  loginButtonWrapper: {
    alignItems: "center",
    marginTop: 10,
  },
  buttonTextStyle: {
    color: "#007AFF",
    fontSize: 18,
    fontWeight: "500",
  },
  tutorialTips: {
    marginTop: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  tutorialTipsTitle: {
    marginTop: 10,
    fontSize: 18,
    textAlign: "left",
    color: "#8E8E93",
  },
});
