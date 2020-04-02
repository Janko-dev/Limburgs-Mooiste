import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import ProfilePicture from 'react-native-profile-picture';
import { globalStyles, Colors } from '../../constants';
import SendWhatsApp from '../../api/whatsapp';
import FaqQuestion from '../../components/faqQuestion';
import firebase from '../../api/firebase';
import ChatBotModal from '../modals/chatBotModal';
import ArticleCard from '../../components/article';
import CoachCard from '../coaching/coach';


const CoachingScreen = props => {

  const [selectedButton, setSelectedButton] = useState(0)
  const [visible, setVisible] = useState(false);

  const [FAQ, setFAQ] = useState([]);
  const [articles, setArticles]  = useState([]);
  const [coaches, setCoaches]  = useState(null);

  useEffect(() => {
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

      firebase.getCoaches().then(result => {

        setCoaches(() => {
          return result.docs[0].data();
      })
    })
    }, []) 

  useEffect(() => {

  }, [])

  const selectedButtonhandler = (index) => {
    setSelectedButton(index)
  }

  const chatBotModalHandler = () => {
    setVisible(!visible);
  }

  const articleInfoHandler = () => {
    Alert.alert(
      'Artikelen',
      'Wist je dat je ervaring kan verdienen door artikelen te delen?',
      [
        {text: 'Begrepen', onPress: () => (console.log(coaches.name))}
      ],

    )
  }

  return (
    <View style={styles.mainContainer}>
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
        {selectedButton == 0 ? <View style={{padding: 20}}>
                <Text style={{fontWeight: '100', fontStyle: 'italic', color: Colors.secondary}}>Zie hier de vragen in die je verder kunnen helpen naar de finish van Limburgs Mooiste!</Text>
                <ScrollView style={{height: '100%', marginTop: 20, marginBottom: 20}} showsVerticalScrollIndicator='false'>
                    {FAQ.map((item, index) => (

                    <FaqQuestion key={index} question={item.vraag} answer={item.antwoord}/>
                    ))}
                </ScrollView>
                <Text style={{fontWeight: '100', fontStyle: 'italic', color: Colors.secondary, paddingBottom: 40}}>Staat je vraag er niet tussen? Probeer onze <Text onPress={chatBotModalHandler} style={{fontWeight: '400'}}>chatbot</Text> of je <Text onPress={SendWhatsApp} style={{fontWeight: '400'}}>coach</Text>!</Text>
                <ChatBotModal visible={visible} onClose={chatBotModalHandler}></ChatBotModal>
          </View> : null}
        {selectedButton == 1 ? <View style={{padding: 20}}>
                <Text style={{fontWeight: '100', fontStyle: 'italic', color: Colors.secondary}}>Alles wat betreft <Text onPress={articleInfoHandler} style={{fontWeight: '400'}}>artikelen</Text> over Limburgs Mooiste, wielrennen en core stability vind je hier!</Text>
                <ScrollView style={{height: '100%', marginTop: 20, marginBottom: 20}} showsVerticalScrollIndicator='false'>

                    <Text style={{color: Colors.secondary, fontWeight: '500', fontSize: 15, margin: 10}}>Limburgs Mooiste</Text>
                    <ScrollView horizontal={true}  style={{height: 200}} showsHorizontalScrollIndicator={false} >

                    {articles.map((item, index) => {
                      if (item.genre == "LM"){
                        return (<ArticleCard key={index} article={item}></ArticleCard>)
                      } else {
                        return null
                      }
                    })}
                    </ScrollView>

                    <Text style={{color: Colors.secondary, fontWeight: '500', fontSize: 15, marginLeft: 10, marginBottom: 10}}>Wielrennen</Text>
                    <ScrollView horizontal={true}  style={{height: 200}} showsHorizontalScrollIndicator={false}>

                    {articles.map((item, index) => {
                      if (item.genre == "WR"){
                        return (<ArticleCard key={index} article={item}></ArticleCard>)
                      } else {
                        return null
                      }
                    })}
                    </ScrollView>

                    <Text style={{color: Colors.secondary, fontWeight: '500', fontSize: 15, marginLeft: 10, marginBottom: 10}}>Core Stability</Text>
                    <ScrollView horizontal={true}  style={{height: 200}} showsHorizontalScrollIndicator={false} >

                    {articles.map((item, index) => {
                      if (item.genre == "CS"){
                        return (<ArticleCard key={index} article={item}></ArticleCard>)
                      } else {
                        return null
                      }
                    })}
                    </ScrollView>
  
                </ScrollView>
          </View> : null}
      </View>

    </View>

  )
}


const styles = StyleSheet.create({

  headerText: {
    fontWeight: '700',
    fontFamily: globalStyles.fontStyle.fontFamily,
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