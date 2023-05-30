import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Inter_900Black,
  Inter_300Light,
  Inter_200ExtraLight,
  Inter_600SemiBold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import AuthContext from "../context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import secretTokens from "../tokens/SecretTokens";
import AppPreferencesContext from "../context/AppPreferencesContext";
import MainContext from "../context/MainContext";

const RegisterScreen = () => {
  const { loginAnonymously, loading } = useContext(AuthContext);
  const { theme, language } = useContext(AppPreferencesContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const {isTester} = useContext(MainContext);

  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_300Light,
    Inter_200ExtraLight,
    Inter_600SemiBold,
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const startLogin = () => {
    setButtonDisabled(true);
    loginAnonymously();
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.gradientContainer}>
        {loading ? (
          <>
            <LinearGradient colors={["black", "black"]} style={styles.gradient}>
              <Text style={[styles.registerText, { color: "white" }]}>
                {language ==='English' ? 'Getting\nReady...' : 'Hazirlaniyor...'}
              </Text>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={require("../assets/newVisionGPTIcon.png")}
                  style={{ width: 250, height: 250 }}
                />
              </View>
              <Text style={[styles.registerTextSub, { color: "white" }]}>
                {language ==='English' ? "It won't take long" : "Uzun surmeyecek"}
              </Text>
            </LinearGradient>
          </>
        ) : (
          <>
            <LinearGradient colors={["white", "white"]} style={styles.gradient}>
              <Text style={[styles.registerText, { color: "black" }]}>
                Welcome !
              </Text>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={require("../assets/newVisionGPTIcon.png")}
                  style={{ width: 250, height: 250 }}
                />
              </View>
              <Text style={[styles.registerTextSub, { color: "grey" }]}>
                You can scan text{"\n"}with camera or chat with
              </Text>
              <Text
                style={[
                  styles.registerTextSub,
                  { color: "black", fontSize: 36, marginBottom: 20 },
                ]}
              >
                VisionGPT
              </Text>
              <View style={styles.registerButtonWrapper}>
                <TouchableOpacity
                  style={styles.registerButtonEmail}
                  onPress={startLogin}
                  disabled={buttonDisabled}
                >
                  <Text
                    style={[styles.registerButtonTextEmail, { color: "white" }]}
                  >
                    Start{" "}
                  </Text>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    color={"white"}
                    size={18}
                  />
                </TouchableOpacity>
                <View>
                  <Text
                    style={{
                      fontSize: 10,
                      textAlign: "center",
                      color: "black",
                      fontWeight: "300",
                      marginTop: 10,
                    }}
                  >
                    By clicking 'Start', you agree to our Terms of Use. We're
                    committed to respecting your rights and privacy.
                  </Text>
                  <TouchableOpacity
                    onPress={() => alert(secretTokens.termsOfUse)}
                    style={{ marginBottom: 40 }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        textAlign: "center",
                        color: "black",
                        fontWeight: "500",
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    >
                      Terms of Use
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {
                isTester && (
                  <TouchableOpacity
                onPress={() => alert(secretTokens.tester_message.english)}
                style={{
                  elevation: 20,
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 50,
                  alignContent: "center",
                  backgroundColor: "#B70404",
                  marginHorizontal: 100,
                  borderRadius: 10,
                  height: 40,
                }}
              >
                <MaterialIcons name="bug-report" color={"white"} size={20} />
                <Text style={{ color: "white", fontSize: 18 }}>Test User</Text>
              </TouchableOpacity>)

              }
              
            </LinearGradient>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  registerButtonWrapper: {
    marginHorizontal: 40,
  },
  registerButtonEmail: {
    backgroundColor: "#52006A",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRadius: 10,
  },

  registerButtonTextEmail: {
    fontSize: 27,
    fontFamily: "Inter_400Regular",
  },

  registerTextSub: {
    textAlign: "center",
    marginHorizontal: 16,
    fontSize: 24,
    fontFamily: "Inter_900Black",
  },
  registerText: {
    color: "white",
    textAlign: "center",
    fontSize: 50,
    fontFamily: "Inter_900Black",
  },

  imageAndTitleWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  topWrapper: {
    backgroundColor: "black",
    paddingTop: 10,
  },
  gradientContainer: {
    flex: 1,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 60,
    fontFamily: "Inter_200ExtraLight",
    color: "white",
  },
});

export default RegisterScreen;
