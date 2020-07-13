import * as React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native'
import {Card} from 'react-native-paper'


export const CurrentDate = (props: any) => {
    if (props.date==='Monday'){
        return(
            <View style={{flexDirection: 'row'}}>
          <View>
            <Card style={[styles.smallImage, {backgroundColor: 'lightblue'}]}/>
            <Text style={styles.imagesubtitle}>M</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>T</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>W</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>Th</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>F</Text>
          </View>
        </View>
        )
    }
    if (props.date==='Tuesday'){
        return(
            <View style={{flexDirection: 'row'}}>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>M</Text>
          </View>
          <View>
            <Card style={[styles.smallImage, {backgroundColor: 'lightblue'}]}/>
            <Text style={styles.imagesubtitle}>T</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>W</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>Th</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>F</Text>
          </View>
        </View>
        )
    }
    if (props.date==='Wednesday'){
        return(
            <View style={{flexDirection: 'row'}}>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>M</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>T</Text>
          </View>
          <View>
            <Card style={[styles.smallImage, {backgroundColor: 'lightblue'}]}/>
            <Text style={styles.imagesubtitle}>W</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>Th</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>F</Text>
          </View>
        </View>
        )
    }
    if (props.date==='Thursday'){
        return(
            <View style={{flexDirection: 'row'}}>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>M</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>T</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>W</Text>
          </View>
          <View>
            <Card style={[styles.smallImage, {backgroundColor: 'lightblue'}]}/>
            <Text style={styles.imagesubtitle}>Th</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>F</Text>
          </View>
        </View>
        )
    }
    if (props.date=='Friday'){
      return(
            <View style={{flexDirection: 'row'}}>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>M</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>T</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>W</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>Th</Text>
          </View>
          <View>
            <Card style={[styles.smallImage, {backgroundColor: 'lightblue'}]}/>
            <Text style={styles.imagesubtitle}>F</Text>
          </View>
        </View>
        )
    }
  return(
            <View style={{flexDirection: 'row'}}>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>M</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>T</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>W</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>Th</Text>
          </View>
          <View>
            <Card style={styles.smallImage}/>
            <Text style={styles.imagesubtitle}>F</Text>
          </View>
        </View>
        )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
    },
    subheader: {
      fontWeight: 'bold',
    },
    smallImage: {
      height: 26,
      width: 26,
      marginHorizontal: 3,
      marginBottom: 5,
      borderRadius: 13,
      borderWidth: 0.2,
      borderColor: 'lightblue',
      shadowOffset: {width: 2, height: 2}
    },
    imagesubtitle: {
      alignSelf: 'center',
      fontSize: 14
      
    },
    calendarButtonStyle: {
      height: 30,
      width: 50
    },
    scheduleFormat:{
      width: '90%',
      justifyContent: 'space-between',
      margin: 15,
      marginLeft: '5%',
      flexDirection: 'row',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    title: {
      fontSize: 90,
      
    },
    separator: {
      marginVertical: 20,
      height: 1,
      width: '90%',
    },
  });
  