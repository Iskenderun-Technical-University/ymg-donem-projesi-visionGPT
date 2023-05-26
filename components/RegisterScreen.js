import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
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
import secretTokens from '../tokens/SecretTokens'

const RegisterScreen = ({ navigation }) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const { loginAnonymously, loading, loggedIn } = useContext(AuthContext);

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
    loginAnonymously();
  };

  return (
    <>
      <StatusBar style="dark" />
        <View style={styles.gradientContainer}>
          <LinearGradient colors={["white", "white","white","white","#7149C6"]} style={styles.gradient}>
              {
                loading ? 
                
                <>
                <Text style={styles.registerText}>
                Tekrar{'\n'}Hoş Geldiniz
              </Text>
              <View style={{justifyContent:'center',alignItems:'center'}}>
              <Image source={require('../assets/newVisionGPTIcon.png')} style={{width:250,height:250}} />
              </View>
                  <Text style={styles.registerTextSub}>
                  Bir saniye bekleyin..{'\n'}
                      Uygulamayı sizin için başlatıyorum
                  </Text>
                  
                  </>
                
                
                : 
                <>
              <Text style={styles.registerText}>
              Hoş Geldiniz
            </Text>
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <Image source={require('../assets/newVisionGPTIcon.png')} style={{width:250,height:250}} />
            </View>
                <Text style={styles.registerTextSub}>
                  VisionGPT{"\n"}Görme engelli insanların hayatını kolaylaştırır
                </Text>
                <Text style={{marginHorizontal:20,
                textAlign:'center',marginBottom:20,}}>Telefonunuzun erişilebilirlik ayarları açık olduğu sürece, uygulamayı kullanırken sesli geri bildirimlerle size yardımcı olacağım</Text>
                <View style={styles.registerButtonWrapper}>
                  <TouchableOpacity
                    style={styles.registerButtonEmail}
                    onPress={startLogin}
                    disabled={false}
                  >
                    <Text style={styles.registerButtonTextEmail}>Uygulamayı başlat</Text>

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
                          marginTop:10,
                        }}
                      >
                        "Uygulamayı başlat" butonuna tıklayarak kullanım şartlarını kabul etmiş olursunuz.
                      </Text>
                      <TouchableOpacity onPress={()=> alert(secretTokens.termsOfUse)} style={{marginBottom:40}}>
                        <Text style={{
                          fontSize: 10,
                          textAlign: "center",
                          color: "black",
                          fontWeight: "500",
                          marginTop:10,
                          marginBottom:10
,                          
                        }}>Kullanım şartları</Text>
                      </TouchableOpacity>
           
                  </View>
                </View>
                </>
              }
              
              
            
          </LinearGradient>
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
    height: 100,
    borderRadius: 20,
  },

  registerButtonTextEmail: {
    color: "white",
    fontSize: 28,
    fontFamily: "Inter_400Regular",
  },


  registerTextSub: {
    color: "#321E1E",
    textAlign: "center",
    marginBottom: 20,
    marginHorizontal: 16,
    fontSize: 24,
    fontFamily: "Inter_900Black",
  },
  registerText: {
    color: "black",
    textAlign: "center",
    fontSize: 50,
    fontFamily: "Inter_900Black",
  },
  
  emailText: {
    color: "black",
    fontFamily: "Inter_200ExtraLight",
    fontSize: 15,
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
    justifyContent:'center',
  },
  welcomeText: {
    fontSize: 60,
    fontFamily: "Inter_200ExtraLight",
    color: "white",
  },
});

export default RegisterScreen;
