import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import ProfilePicture from 'react-native-profile-picture';
import { globalStyles, Colors } from '../../constants';
import firebase from '../../api/firebase';

const CoachingScreen = props => {

  const [FAQ, setFAQ] = useState([])

  useEffect(() => {
    firebase.getFAQ().then(result => {

      setFAQ(() => {
        return result.docs.map(doc => {
          return doc.data();
        })
      })

    })
  }, [])

  return (
    <View style={styles.mainContainer}>


      <View style={styles.coachContainer}>
        <View style={styles.profileContainer}>
          <ProfilePicture
            isPicture={false}
            user="FirstName ListName"
            shape='circle'
            pictureStyle={styles.profile}
          />
          <Text>Dikke vet tieten</Text>
        </View>
        <View style={styles.textContainer}>
          <Text>Willie Wonka</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>

        <ScrollView>
          {FAQ.map((item, index) => (
            <View key={index}>
              <Text>{item.vraag}</Text>
            </View>
          ))}
        </ScrollView>
        
      </View>

    </View>

  )
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: '100%',
    // padding: '0.5%',
    backgroundColor: Colors.tertiary,
  },

  coachContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // height: '100%'
    // marginVertical: 30,
  },

  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    flex: 1,
    height: '100%'
  },

  textContainer: {
    flex: 2,
    backgroundColor: 'yellow',
    height: '100%'
  },

  contentContainer: {
    flex: 4,
    width: '100%',
    backgroundColor: "green",
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default CoachingScreen