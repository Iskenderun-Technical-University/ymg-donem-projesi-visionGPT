import { StyleSheet, Text, View } from 'react-native'
import React,{useContext} from 'react'
import ClearAnswerButton from './ClearAnswerButton'
import SolutionButton from './SolutionButton'
import MainContext from '../context/MainContext'

const ClearAndSolutionButtons = () => {
  const { chatGPTResponse,googleResponse } = useContext(MainContext);
  return (
        <>
        { googleResponse !== '' &&
    <View style={styles.buttonsWrapper}>
        <SolutionButton />
        <ClearAnswerButton />
    </View>
    }
    </>
  )
}

export default ClearAndSolutionButtons

const styles = StyleSheet.create({
    buttonsWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:16,
        borderRadius:10,
        height:50,
        marginTop:10,
        marginBottom:100,
    }
})