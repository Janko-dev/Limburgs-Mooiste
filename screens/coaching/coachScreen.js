import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { globalStyles, Colors, SCREEN_HEIGHT } from '../../constants';
import SendWhatsApp from '../../api/whatsapp';
import {Avatar} from 'react-native-elements';

const CoachCard = ({coach}) => {
    return (
        <View style={styles.coachContainer}>
            <View style={styles.profileContainer}>
                <Avatar source={{uri: coach?.photo}} size="large" rounded ></Avatar>
              <Text style={styles.headerText}>{coach?.name}</Text>
              <Text style={styles.subHeaderText}>{coach?.expertise}</Text>
            </View>     
            <View style={styles.textContainer}>
              <View style={styles.quoteContainer}>
                <Text style={styles.normalText}>"{coach?.quote}"</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => SendWhatsApp(coach?.phonenumber)}>
                  <Text style={styles.buttonText}>Stuur bericht</Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    headerText: {
      fontWeight: '700',
      fontFamily: 'Arial Rounded MT Bold',
      fontSize: SCREEN_HEIGHT * 0.016,
      marginTop: '10%'
    },
  
    subHeaderText: {
      fontWeight: '300',  
    },
  
    buttonText: {
      color: Colors.primary,
      fontSize: SCREEN_HEIGHT * 0.014,
    },
  
    buttonContainer: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      width: '100%',
      height: '20%',
      paddingRight: '5%',
      paddingBottom: '10%',
    },
  
    quoteContainer: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
      height: '80%',
      paddingTop: '5%',
      paddingRight: '5%',
    },
  
    button: {
      height: SCREEN_HEIGHT * 0.04,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderColor: Colors.primary,
      borderWidth: SCREEN_HEIGHT * 0.001,
      borderRadius: SCREEN_HEIGHT * 0.005,
      padding: SCREEN_HEIGHT * 0.01
    },
  
    normalText: {
      fontWeight: '100',
      fontStyle: 'italic',
      color: Colors.secondary,
      fontSize: SCREEN_HEIGHT * 0.015,

    },
  
  
    coachContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderBottomColor: 'lightgray',
      borderBottomWidth: SCREEN_HEIGHT * 0.0005,
      
    },
  
    profileContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      flex: 3,
      height: '100%'
    },
  
    profile: {
      width: '100%'
    },
  
    textContainer: {
      flex: 7,
      backgroundColor: 'white',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default CoachCard

