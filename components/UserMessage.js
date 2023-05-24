import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import AppPreferencesContext from "../context/AppPreferencesContext";
import { MaterialIcons } from "@expo/vector-icons";

const UserMessage = ({ userPrompt, userPromptTime }) => {
  const { theme } = useContext(AppPreferencesContext);

  return (
    <View style={styles.speechBubbleWrapper}>
      <View
        style={[
          styles.speechBubble,
          {
            backgroundColor: theme.themeName === "Dark" ? "#645CBB" : "#E5D1FA",
          },
        ]}
      >
        <Text
          style={[
            styles.speechBubbleText,
            { color: theme.fontColor.primaryFontColor },
          ]}
        >
          {userPrompt}
        </Text>
        <View style={styles.timeWrapper}>
          <Text
            style={[
              styles.timeText,
              { color: theme.fontColor.primaryFontColor },
            ]}
          >
            {userPromptTime}
          </Text>
          <MaterialIcons
            name="done"
            color={theme.fontColor.primaryFontColor}
            size={15}
          />
        </View>
      </View>
    </View>
  );
};

export default UserMessage;

const styles = StyleSheet.create({
  timeWrapper: {
    flexDirection:'row',
    justifyContent:'flex-end',
    marginRight:5,

  },
  timeText: {
    marginBottom: 5,
    fontWeight: "100",
    fontSize: 12,
  },
  speechBubbleWrapper: {
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 1,
  },
  speechBubble: {
    maxWidth: "70%",
    minWidth: "20%",
    marginRight: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  speechBubbleText: {
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 5,
    color: "white",
  },
});
