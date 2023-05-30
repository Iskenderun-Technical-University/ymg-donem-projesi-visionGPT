import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import MainContext from "../context/MainContext";
import AppPreferencesContext from "../context/AppPreferencesContext";
import { MaterialIcons } from "@expo/vector-icons";
import BotResponseMessage from "./BotResponseMessage";
import UserMessage from "./UserMessage";
import ContentLoader from "react-native-easy-content-loader";

const TextInputSection = ({ navigation }) => {
  const {
    count,
    chatGPTResponse,
    setChatGPTResponse,
    startChatWithGPT,
    loadingAnswer,
  } = useContext(MainContext);
  const { theme, language } = useContext(AppPreferencesContext);

  const [userPrompt, setUserPrompt] = useState([]);
  const [userPromptTime, setUserPrompTime] = useState([]);
  const [botResponse, setBotResponse] = useState([]);
  const [botResponseTime, setBotResponseTime] = useState([]);
  const [isPress, setIsPress] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [loading, setLoading] = useState(false);
  

  const scrollViewRef = useRef();

  

  useEffect(() => {
    if (chatGPTResponse !== "") {
      setBotResponse((prevBotResponse) => [
        ...prevBotResponse,
        chatGPTResponse,
      ]);

      setChatGPTResponse("");
    }
  }, [chatGPTResponse]);

  const getCurrentTime = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    let timeString = hours + ":" + minutes;
    return timeString;
  };

  const clearAllMessages = () => {
    setBotResponse([]);
    setUserPrompt([]);
    setUserPrompTime([]);
    setBotResponseTime([]);
    setCurrentMessage("");
  };

  const startChatEngine = () => {
    if (count > 0) {
      if (currentMessage === "") {
        return;
      }
      setUserPrompt([...userPrompt, currentMessage]);
      setUserPrompTime([...userPromptTime, getCurrentTime()]);

      let previousMessages = [];
      for (let i = 0; i < userPrompt.length; i++) {
        previousMessages.push({
          role: "user",
          content: userPrompt[i],
        });

        if (botResponse[i]) {
          previousMessages.push({
            role: "assistant",
            content: botResponse[i],
          });
        }
      }

      previousMessages = previousMessages.slice(-5);
      startChatWithGPT(previousMessages, currentMessage);
      setBotResponseTime([...botResponseTime, getCurrentTime()]);
      setIsPress(true);
      setCurrentMessage("");
    } else {
      setUserPrompt([...userPrompt, currentMessage]);
      setUserPrompTime([...userPromptTime, getCurrentTime()]);
      setBotResponse([...botResponse, language ==='English' ? 'Sorry your attempts are over.' : 'Uzgunum deneme hakkiniz bitti.']);
      setBotResponseTime([...botResponseTime, getCurrentTime()]);
      setIsPress(true);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    if (userPrompt[0] === undefined) {
      setIsPress(false);
    }
  }, [userPrompt]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.titleWrapper}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            color={theme.fontColor.primaryFontColor}
            size={20}
          />
        </TouchableOpacity>
        {userPrompt[0] !== undefined ? (
          <Text
            style={{ color: theme.fontColor.primaryFontColor, fontSize: 20 }}
          >
            {language ==='English' ?'Chat with VisionGPT' : 'VisionGPT ile sohbet et'}
          </Text>
        ) : (
          <Text
            style={[
              styles.TextInput,
              { color: theme.fontColor.primaryFontColor },
            ]}
          >
            {language ==='English' ? 'Text Input' : 'Yazi Girdisi'}
          </Text>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: count > 0 ? "#AA77FF" : "#DF2E38",
            borderRadius: 20,
            justifyContent: "center",
          }}
        >
          <MaterialIcons
            name="local-activity"
            style={{ marginLeft: 10, marginRight: 10 }}
            color={"white"}
            size={20}
          />
          <Text style={[styles.countText, { color: "white" }]}>{count}</Text>
        </View>
      </View>

      <>
        <ScrollView
          style={{ flex: 1 }}
          ref={scrollViewRef}
          onContentSizeChange={() => {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }}
        >
          <View style={styles.howToUseSectionWrapper}>
            {userPrompt[0] === undefined ? (
              <>
                <Image
                  source={require("../assets/newVisionGPTIcon.png")}
                  style={{ height: 150, width: 150 }}
                />

                <Text
                  style={{
                    color: theme.fontColor.secondaryFontColor,
                    fontSize: 20,
                    marginRight: 40,
                  }}
                >
                  {language ==='English' ? 'How can i help you?' : 'Nasil yardimci olabilirim ?'}
                </Text>
              </>
            ) : (
              <BotResponseMessage
                message={language ==='English' ? 'How can i help you? ' : 'Nasil yardimci olabilirim ?'}
                botResponseTime={botResponseTime[0]}
                firstMessage={botResponse.length}
              />
            )}
          </View>

          {isPress === true && userPrompt[0] !== undefined && (
            <View>
              {userPrompt.map((prompt, index) => (
                <React.Fragment key={index}>
                  <UserMessage
                    userPrompt={prompt}
                    userPromptTime={userPromptTime[index]}
                  />
                  {loadingAnswer && index === botResponse.length ? (
                    <View style={{marginBottom:10,marginLeft:10 }}>
                      <ContentLoader
                        active
                        pRows={1}
                        pHeight={[50]}
                        pWidth={['60%']}
                        primaryColor={theme.themeName === "Dark" ? "#394867" : "#EEF1FF"}
                        secondaryColor={theme.themeName === "Dark" ? "#645CBB" : "#E5D1FA"}
                        tHeight={0}
                        paragraphStyles={{borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20}}
                      />
                    </View>
                  ) : (
                    <BotResponseMessage
                      message={botResponse[index]}
                      botResponseTime={botResponseTime[index]}
                    />
                  )}
                </React.Fragment>
              ))}
            </View>
          )}
        </ScrollView>
        <View
          style={[
            styles.textInputMainWrapper,
            {
              justifyContent: "flex-end",
              marginBottom: 40,
              marginTop: 10,
            },
          ]}
        >
          {userPrompt[0] === undefined && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 50,
              }}
            >
              <Text style={{ fontSize: 30, color: "grey" }}>
                
                {language ==='English' ? 'Start Chat' : 'Sohbete Basla'}
              </Text>
              <MaterialIcons
                name="expand-more"
                style={{ marginLeft: 10, marginRight: 10 }}
                color={"grey"}
                size={80}
              />
            </View>
          )}
          <View
            style={[
              styles.textInputWrapper,
              {
                backgroundColor: theme.sectionBoxColor,
                marginRight: userPrompt[0] === undefined ? 20 : 40,
                marginLeft: 20,
              },
            ]}
          >
            <TextInput
              style={[
                styles.inputTextStyle,
                { color: theme.fontColor.primaryFontColor },
              ]}
              placeholderTextColor={theme.fontColor.primaryFontColor}
              placeholder={language ==='English' ? 'Type Here..' : 'Buraya yazin..'}
              onChangeText={setCurrentMessage}
              value={currentMessage}
            />
            <TouchableOpacity 
            onPress={startChatEngine}
            disabled={currentMessage === "" ? true : false}
            >
              <MaterialIcons
                name="arrow-forward-ios"
                style={styles.inputTextIcon}
                color={theme.fontColor.primaryFontColor}
                size={20}
              />
            </TouchableOpacity>
            {userPrompt[0] !== undefined && (
              <TouchableOpacity onPress={clearAllMessages}>
                <MaterialIcons
                  name="cancel"
                  style={{ marginLeft: 5 }}
                  color={"#E74646"}
                  size={30}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </>
    </KeyboardAvoidingView>
  );
};

export default TextInputSection;

const styles = StyleSheet.create({
  textInputMainWrapper: {},
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  countText: {
    fontSize: 20,
    marginRight: 10,
  },
  inputTextIcon: {
    marginRight: 20,
  },
  inputTextStyle: {
    height: 60,
    marginHorizontal: 20,
    width: "75%",
  },
  textInputWrapper: {
    height: 60,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  howToUseSectionWrapper: {
    flexDirection: "row",
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

  tutorialTipsContent: {
    marginTop: 10,
    fontSize: 18,
    textAlign: "left",
    color: "grey",
  },
  titleWrapper: {
    marginTop: 70,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backText: {
    fontSize: 18,
  },
  TextInput: {
    fontSize: 20,
    fontWeight: "300",
  },
});
