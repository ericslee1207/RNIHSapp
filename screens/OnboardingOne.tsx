import React, {useState} from 'react'
import {View,SafeAreaView,  Text, StyleSheet, Button, Dimensions} from 'react-native'
import TextInput from "../components/TextInput"
import OnboardingHeader from "../components/OnboardingHeader"

const OnboardingPageTwo = ({navigation}) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const onSubmit = () =>{
        //store data
        navigation.navigate("OnboardingTwo")
    }
    return(
        <SafeAreaView style={styles.container}>
            <OnboardingHeader style={{justifyContent: 'flex-end'}}>
                <View style={styles.transitionButton}>
                    <Button title="Next" onPress={onSubmit}/>
                </View>
            </OnboardingHeader>
            
            <Text style={styles.header}>Onboarding</Text>
            <TextInput onChange={setFirstName} label="First Name"/>
            <TextInput onChange={setLastName} label="Last Name"/>
            
        </SafeAreaView>
    )
}
const window = Dimensions.get('window')
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white'
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
    transitionButton:{
        
        
    }
})

export default OnboardingPageTwo