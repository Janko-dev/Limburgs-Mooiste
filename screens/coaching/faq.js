import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, Linking } from 'react-native';
import SendWhatsApp from '../../api/whatsapp';
import FaqQuestion from '../../components/faqQuestion';
import firebase from '../../api/firebase';
import React, { useEffect, useState } from 'react';
import { globalStyles, Colors } from '../../constants';

const FaqScreen = props => {

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

    return <View style={{padding: 20}}>
        <Text style={{fontWeight: '100', fontStyle: 'italic', color: Colors.secondary}}>Zie hier de vragen in die je verder kunnen helpen naar de finish van Limburgs Mooiste!</Text>
        <ScrollView style={{height: '100%', marginTop: 20, marginBottom: 20}} showsVerticalScrollIndicator='false'>
            {FAQ.map((item, index) => (

            <FaqQuestion key={index} question={item.vraag} answer={item.antwoord}/>
            ))}
        </ScrollView>
        <Text style={{fontWeight: '100', fontStyle: 'italic', color: Colors.secondary, paddingBottom: 40}}>Staat je vraag er niet tussen? Probeer onze <Text onPress={SendWhatsApp} style={{fontWeight: '500'}}>chatbot</Text> of je <Text onPress={SendWhatsApp} style={{fontWeight: '500'}}>coach</Text>!</Text>
  </View>
}

export default FaqScreen