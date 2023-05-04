import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import MainContext from '../context/MainContext'

const AddAttemptInput = () => {
  const { count, setInputCode, image, addAttempt } = useContext(MainContext);
  return (
    <>
      {count == 0 && image == null &&
        (
          <>
            <View style={styles.countCodeWrapper}>
              <TextInput
                style={styles.countCodeInput}
                secureTextEntry
                maxLength={8}
                keyboardType="numeric"
                onChangeText={(text) => setInputCode(text)}
              />
            </View>
            <View style={styles.codeButtonWrapper}>
              <TouchableOpacity style={styles.codeButton} onPress={addAttempt}>
                <Text style={styles.codeButtonText}>Activate</Text>
              </TouchableOpacity>
            </View>
          </>
        )
      }

    </>
  )
}

export default AddAttemptInput;

const styles = StyleSheet.create({

  codeButtonText: {
    color: "white",
  },

  codeButtonWrapper: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  codeButton: {
    height: 25,
    backgroundColor: "green",
    width: 60,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
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

});