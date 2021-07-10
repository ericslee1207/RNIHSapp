import React, {useState} from 'react'
import {View, SafeAreaView, Text, StyleSheet, Button, ScrollView, Dimensions} from 'react-native'
import TextInput from "../components/TextInput"
import OnboardingHeader from "../components/OnboardingHeader"

const OnboardingPageTwo = ({navigation}) => {
    const [Period1, setPeriod1] = useState("")
    const [Period2, setPeriod2] = useState("")
    const [Period3, setPeriod3] = useState("")
    const [Period4, setPeriod4] = useState("")
    const [Period5, setPeriod5] = useState("")
    const [Period6, setPeriod6] = useState("")
    const [Period7, setPeriod7] = useState("")
    const [Period8, setPeriod8] = useState("")
    const onSubmit = () => {
        navigation.navigate("Root")
    }
    return(
        <SafeAreaView style={styles.container}>
            <OnboardingHeader style={{justifyContent: 'space-between'}}>
            <View style={styles.transitionButton}>
                    <Button title="Back" onPress={()=>navigation.goBack()}/>
                </View>
                <View style={styles.transitionButton}>
                    <Button title="Next" onPress={onSubmit}/>
                </View>
            </OnboardingHeader>
                <Text style={styles.header}>Set Classes</Text>
                <TextInput onChange={setPeriod1} label="Period 1"/>
                <TextInput onChange={setPeriod2} label="Period 2"/>
                <TextInput onChange={setPeriod3} label="Period 3"/>
                <TextInput onChange={setPeriod4} label="Period 4"/>
                <TextInput onChange={setPeriod5} label="Period 5"/>
                <TextInput onChange={setPeriod6} label="Period 6"/>
                <TextInput onChange={setPeriod7} label="Period 7"/>
                <TextInput onChange={setPeriod8} label="Period 8"/>
            
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',

    },
    header:{
        fontSize: 30,
        fontWeight: 'bold'
    },
    textBox: {
        width: "90%", 
        height: 30, 
        marginTop: "3%"
    },
    transitionButton:{},
    scroll:{
        flex: 1,
    }
})

export default OnboardingPageTwo