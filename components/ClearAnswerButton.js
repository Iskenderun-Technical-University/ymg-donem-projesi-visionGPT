import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import MainContext from '../context/MainContext'


const ClearAnswerButton = () => {
    const { chatGPTResponse, clearPicture } = useContext(MainContext);
    return (
        <>
            {chatGPTResponse !== "" ? (
                <View style={styles.clearButtonWrapper}>
                    <TouchableOpacity
                        style={styles.clearPictureButton}
                        onPress={clearPicture}
                    >
                        <Text style={styles.clearButtonText}>Clear</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </>
    )
}

export default ClearAnswerButton

const styles = StyleSheet.create({

    clearPictureButton: {
        backgroundColor: "#CC3636",
        height: 30,
        width:100,
        borderRadius: 10,
        marginTop: 10,
        justifyContent: "center",
        elevation:10,
    },
    clearButtonText: {
        textAlign: "center",
        justifyContent: "center",
        fontSize: 18,
        color: "white",
    },
    clearButtonWrapper: {
        alignItems: 'flex-start',
        marginRight:16,
    },
});