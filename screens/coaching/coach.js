import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { globalStyles, Colors } from '../../constants';
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
      marginTop: 10
    },
  
    subHeaderText: {
      fontWeight: '300',  
    },
  
    buttonText: {
      color: Colors.primary,
      fontSize: 12,
    },
  
    buttonContainer: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      width: '100%',
      height: '20%',
      paddingRight: 15,
      paddingBottom: 15,
    },
  
    quoteContainer: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
      height: '80%',
      paddingTop: 20,
      paddingRight: 20,
    },
  
    button: {
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderColor: Colors.primary,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10
    },
  
    normalText: {
      fontWeight: '100',
      fontStyle: 'italic',
      color: Colors.secondary,
    },
  
  
    coachContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderBottomColor: 'lightgray',
      borderBottomWidth: 0.25
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

