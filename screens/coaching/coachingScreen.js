import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { globalStyles, Colors, SCREEN_HEIGHT } from '../../constants';

import firebase from '../../api/firebase';
import CoachCard from '../coaching/coachScreen';
import LoadingModal from '../modals/loadingModal';
import FaqScreen from '../coaching/faqScreen';  
import ArticleScreen from '../coaching/articleScreen';

const CoachingScreen = props => {

  const [selectedButton, setSelectedButton] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const [coaches, setCoaches]  = useState(null);
  const [FAQ, setFAQ] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {

      firebase.getCoaches().then(result => {

        setCoaches(() => {
          return result.docs[0].data();
          
      })
    })

    firebase.getFAQ().then(result => {
  
      setFAQ(() => {
        return result.docs.map(doc => {
          return doc.data();
        })
      })    
    })

    firebase.getArticles().then(result => {

      setArticles(() => {
        return result.docs.map(doc => {
          return doc.data();
        })
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
          containerStyle={{ height: '8%', width: '100%', marginTop: 0, backgroundColor: Colors.tertiary,  borderRadius: 0, borderColor: Colors.tertiary  }}
          textStyle={{fontWeight: '300', fontSize: SCREEN_HEIGHT * 0.014, color: 'black'}}
          innerBorderStyle={{width: 0, borderColor: Colors.tertiary}}
          selectedButtonStyle={{borderColor: 'white', borderBottomColor: Colors.primary, borderBottomWidth: 2, backgroundColor: 'white' }}
          selectedTextStyle={{color: 'black', fontWeight: '500'}}
        />

      {selectedButton == 0 ? <FaqScreen data={FAQ}></FaqScreen> : null}
      {selectedButton == 1 ? <ArticleScreen data={articles}></ArticleScreen>: null}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({

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
    marginTop: SCREEN_HEIGHT * 0.05

  },
});

export default CoachingScreen