import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { globalStyles, Colors } from '../../constants';

import firebase from '../../api/firebase';
import CoachCard from '../coaching/coach';
import LoadingModal from '../modals/loadingModal';
import FaqScreen from '../coaching/faq';  
import ArticleScreen from '../coaching/articles';

const CoachingScreen = props => {

  const [selectedButton, setSelectedButton] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const [coaches, setCoaches]  = useState(null);

  useEffect(() => {

      firebase.getCoaches().then(result => {

        setCoaches(() => {
          return result.docs[0].data();
      })
    })
    setIsLoading(false);

    }, []) 

  const selectedButtonhandler = (index) => {
    setSelectedButton(index)
  }

  return (
    <View style={styles.mainContainer}>
      <LoadingModal isLoading={isLoading} />
      <CoachCard coach={coaches} ></CoachCard>
      <View style={styles.contentContainer}>

        <ButtonGroup
          onPress={selectedButtonhandler}
          selectedIndex={selectedButton}
          buttons={['Veelgestelde vragen', 'Artikelen']}
          containerStyle={{ height: '7%', width: '100%', marginTop: 0, backgroundColor: Colors.tertiary, borderRadius: 0, borderColor: Colors.tertiary  }}
          textStyle={{fontWeight: '300', fontSize: 12, color: 'black'}}
          innerBorderStyle={{width: 0, borderColor: Colors.tertiary}}
          selectedButtonStyle={{borderColor: 'white', borderBottomColor: Colors.primary, borderBottomWidth: 2, backgroundColor: 'white' }}
          selectedTextStyle={{color: 'black', fontWeight: '500'}}
        />

        {/* Werkt nog niet als los component, er verspringt dan iets */}
      {selectedButton == 0 ? <FaqScreen></FaqScreen> : null}
      {selectedButton == 1 ? <ArticleScreen></ArticleScreen>: null}
      </View>

    </View>

  )
}


const styles = StyleSheet.create({

  headerText: {
    fontWeight: '700',
    fontFamily: globalStyles.headerText.fontFamily,
    marginTop: 10
  },

  subHeaderText: {
    fontWeight: '300',

  },

  normalText: {
    fontWeight: '100',
    fontStyle: 'italic',
    color: Colors.secondary,
  },

  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.tertiary,
  },

  contentContainer: {
    flex: 3,
    width: '100%',
    backgroundColor: "white",
    alignItems: 'center',
    marginTop: 40,
  },
});

export default CoachingScreen