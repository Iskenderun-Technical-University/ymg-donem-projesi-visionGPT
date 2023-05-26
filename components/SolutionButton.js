import { StyleSheet, Text, View, TouchableOpacity, Modal,ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import MainContext from '../context/MainContext'

const SolutionButton = () => {
    const { chatGPTResponse } = useContext(MainContext);
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            {
            chatGPTResponse && 
            (
                <View style={styles.solutionButtonWrapper}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                        
                            <View style={styles.modalView}>
                            <ScrollView>
                                
                                <Text style={styles.solutionText}>
                                    Solution
                                </Text>
                                <View style={styles.solutionTextWrapper}>
                                    <Text style={styles.shortAnswerText}>
                                    {chatGPTResponse}
                                    </Text>
                                    <Text style={styles.modalText}>
                                    {chatGPTResponse}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>{'<'} Back</Text>
                                </TouchableOpacity>
                                </ScrollView>
                            </View>
                            
                        </View>
                    </Modal>
                    <TouchableOpacity
                        style={styles.solutionPictureButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.solutionButtonText}>Solution</Text>
                    </TouchableOpacity>
                </View>

            ) 
            
            }
        </>
    )
}

export default SolutionButton;

const styles = StyleSheet.create({
    centeredView:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        backgroundColor:"rgba(209, 209, 253, 0.5)"      
    },
    shortAnswerText:{
        fontSize:18,
        textAlign:'center',
        marginTop:5,
    },
    solutionTextWrapper:{
        backgroundColor:'white',
        marginHorizontal:16,
        borderRadius:20,
        elevation:5,
        marginBottom:10,
    },  
    solutionText:{
        fontSize:32,
        marginLeft:16,
        marginTop:10,
        marginBottom:10,
    },
    button: {
        borderRadius: 20,
        padding: 10,
       
        marginBottom:20,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
        width:100,
        marginLeft:16,
        elevation:10,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'left',
        marginTop:20,
        marginHorizontal:16,
      },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        width:'90%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 50,
      },
    solutionPictureButton: {
        backgroundColor: "#7372fd",
        width: 100,
        height: 30,
        borderRadius: 10,
        justifyContent: "center",
        elevation: 10,
    },
    solutionButtonText: {
        textAlign: "center",
        justifyContent: "center",
        fontSize: 18,
        color: "white",
    },
    solutionButtonWrapper: {
        alignItems: 'flex-end',
        marginLeft: 16,
        marginTop: 10,
    },
});