import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, Linking } from 'react-native';
import SendWhatsApp from '../../api/whatsapp';
import FaqQuestion from '../../components/faqQuestion';
import firebase from '../../api/firebase';
import React, { useEffect, useState } from 'react';
import { globalStyles, Colors } from '../../constants';

const FaqScreen = props => {

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

      const chatBotModalHandler = () => {
        setVisible(!visible);
      }

    return <View style={{padding: 20, alignItems: 'center'}}>
        <Text style={{fontWeight: '100', fontStyle: 'italic', color: Colors.secondary, }}>Zie hier de vragen in die je verder kunnen helpen naar de finish van Limburgs Mooiste!</Text>
        <ScrollView style={{height: '100%', marginTop: 20, marginBottom: 20}} showsVerticalScrollIndicator='false'>
            {FAQ.map((item, index) => (

            <FaqQuestion key={index} question={item.vraag} answer={item.antwoord}/>
            ))}
        </ScrollView>
        <Text style={{fontWeight: '100', fontStyle: 'italic', color: Colors.secondary, paddingBottom: 40}}>Staat je vraag er niet tussen? Probeer onze <Text onPress={chatBotModalHandler} style={{fontWeight: '500'}}>chatbot</Text> of je <Text onPress={() => SendWhatsApp(props.phonenumber)} style={{fontWeight: '500'}}>coach</Text>!</Text>
  </View>
}

export default FaqScreen