import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, Linking } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import ProfilePicture from 'react-native-profile-picture';
import { globalStyles, Colors } from '../../constants';
import SendWhatsApp from '../../api/whatsapp';
import FaqQuestion from '../../components/faqQuestion';
import firebase from '../../api/firebase';
import ChatBotModal from '../modals/chatBotModal';


const CoachingScreen = props => {

  const [selectedButton, setSelectedButton] = useState(0)
  const [visible, setVisible] = useState(false);

  const [FAQ, setFAQ] = useState([]);

  useEffect(() => {
      firebase.getFAQ().then(result => {
  
        setFAQ(() => {
          return result.docs.map(doc => {
            return doc.data();
          })
        })
  
      })
    }, []);

  const selectedButtonhandler = (index) => {
    setSelectedButton(index)
  }

  const chatBotModalHandler = () => {
    setVisible(!visible);
}

  return (
    <View style={styles.mainContainer}>


      <View style={styles.coachContainer}>
        <View style={styles.profileContainer}>
          <ProfilePicture
            isPicture={true}
            requirePicture={require('../../assets/coachexample.jpg')}
            shape='circle'
            width= {70}
            height= {70}
            backgroundColor= {Colors.primary}
          />
          <Text style={styles.headerText}>Henk Verweij</Text>
          <Text style={styles.subHeaderText}>Fietscoach</Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.quoteContainer}>
            <Text style={styles.normalText}>"Je kunt bij mij terecht met alle vragen over fietsen, core stability of mountainbiken. Gezien mijn ervaring als trainingscoach bij ex-deelnemers van Limburgs Mooiste kan ik jou helpen om in topconditie te komen! "</Text>
          </View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={SendWhatsApp}>
              <Text style={styles.buttonText}>Stuur bericht</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>

        <ButtonGroup
          onPress={selectedButtonhandler}
          selectedIndex={selectedButton}
          buttons={['Veelgestelde vragen', 'Kennisbank']}
          containerStyle={{ height: '7%', width: '100%', marginTop: 0, backgroundColor: Colors.tertiary, borderRadius: 0, borderColor: Colors.tertiary  }}
          textStyle={{fontWeight: '300', fontSize: 12, color: 'black'}}
          innerBorderStyle={{width: 0, borderColor: Colors.tertiary}}
          selectedButtonStyle={{borderColor: 'white', borderBottomColor: Colors.primary, borderBottomWidth: 2, backgroundColor: 'white' }}
          selectedTextStyle={{color: 'black'}}
        />

        {/* Werkt nog niet als los component, er verspringt dan iets */}
        {selectedButton == 0 ? <View style={{padding: 20}}>
                <Text style={{fontWeight: '100', fontStyle: 'italic', color: Colors.secondary}}>Zie hier de vragen in die je verder kunnen helpen naar de finish van Limburgs Mooiste!</Text>
                <ScrollView style={{height: '100%', marginTop: 20, marginBottom: 20}} showsVerticalScrollIndicator='false'>
                    {FAQ.map((item, index) => (

                    <FaqQuestion key={index} question={item.vraag} answer={item.antwoord}/>
                    ))}
                </ScrollView>
                <Text style={{fontWeight: '100', fontStyle: 'italic', color: Colors.secondary, paddingBottom: 40}}>Staat je vraag er niet tussen? Probeer onze <Text onPress={chatBotModalHandler} style={{fontWeight: '500'}}>chatbot</Text> of je <Text onPress={SendWhatsApp} style={{fontWeight: '500'}}>coach</Text>!</Text>
                <ChatBotModal visible={visible} onClose={chatBotModalHandler}></ChatBotModal>
          </View> : null}
        {selectedButton == 1 ? <Text></Text> : null}
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
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.25
    // height: '100%'
    // marginVertical: 30,
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

  contentContainer: {
    flex: 3,
    width: '100%',
    backgroundColor: "white",
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});

export default CoachingScreen