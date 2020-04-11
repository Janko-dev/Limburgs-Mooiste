import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, Linking } from 'react-native';
import SendWhatsApp from '../../api/whatsapp';
import FaqQuestion from '../../components/faqQuestion';
import firebase from '../../api/firebase';
import React, { useEffect, useState } from 'react';
import { globalStyles, Colors, SCREEN_HEIGHT } from '../../constants';

const FaqScreen = ({ data } ) => {

  const [visible, setVisible] = useState(false);

      const chatBotModalHandler = () => {
        setVisible(!visible);
      }

    return <View style={{padding: '5%', alignItems: 'center'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontWeight: '100', fontStyle: 'italic', color: Colors.secondary, }}>Zie hier de vragen in die je verder kunnen helpen naar de finish van Limburgs Mooiste!</Text>

        </View>
        <ScrollView style={{height: '100%', marginTop: '5%', marginBottom: '5%'}} showsVerticalScrollIndicator='false'>
            {data.map((item, index) => (

            <FaqQuestion key={index} question={item.vraag} answer={item.antwoord}/>
            ))}
        </ScrollView>
        <Text style={{fontWeight: '100', fontStyle: 'italic', color: Colors.secondary, paddingBottom: '5%'}}>Staat je vraag er niet tussen? Probeer onze <Text onPress={chatBotModalHandler} style={{fontWeight: '500'}}>chatbot</Text> of je <Text onPress={() => SendWhatsApp(props.phonenumber)} style={{fontWeight: '500'}}>coach</Text>!</Text>
  </View>
}

export default FaqScreen