import React, {useState, useEffect} from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text, Share, Image, ScrollView } from 'react-native';
import { globalStyles, Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants'; 
import { SocialIcon, Input, Button } from 'react-native-elements'
import firebase from '../../api/firebase';
import CacheImage from '../../components/cacheImage';

const ArticleModal = ({ article, visible, onClose}) => {

    const [userRecord, setUserRecord] = useState(null)

    useEffect(() => {
      if (firebase.getCurrentUser()){
          const unsubscribe = firebase.onUserDataChange(firebase.getCurrentUser().uid, userDoc => {
              setUserRecord(userDoc.data());
          })

          return unsubscribe;
      }

    }, [userRecord])

    const onShare = async (message, url) => {
        try {
          const result = await Share.share({
            message:
              message,
            url:
                url,
          });
          if (result.action === Share.sharedAction) {
            // if (result.activityType.includes("Facebook")) {
                firebase.setShares(userRecord.totalShares + 1, firebase.getCurrentUser().uid)
                firebase.setExp(userRecord.exp + 2, firebase.getCurrentUser().uid)
                onClose()
            // } else {
            //   // shared
            // }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

    return (
        <Modal animationType='slide' visible={visible}  >
            <ScrollView style={{ height: '100%', width: '100%'}}>
                <View style={{ height: SCREEN_HEIGHT/2.5, width: '100%', opacity: '100%'}}>

                    <CacheImage uri={article.image} style={{height: '100%', width: '100%', borderRadius: 2,}}></CacheImage>
                    <TouchableOpacity onPress={onClose} style={{position: 'absolute', top: "15%", right: "5%", }}>
                        <Image source={require('../../assets/cancelButton.png')} style={{tintColor: Colors.tertiary, height: SCREEN_HEIGHT * 0.04, width: SCREEN_HEIGHT * 0.04}}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ height: '100%', width: '100%'}}>
                    <View style={{padding: SCREEN_HEIGHT * 0.025}}>
                        <Text style={{ color: Colors.secondary, fontWeight: '600', fontSize: SCREEN_HEIGHT * 0.022}}>{article.title}</Text>
                        <Text style={{ color: Colors.tertiary, fontWeight: '600', fontSize: SCREEN_HEIGHT * 0.013, paddingBottom: SCREEN_HEIGHT * 0.0125}}>Auteur: {article.autor}</Text>
                        <Text style={{ color: 'black', fontWeight: '600', fontSize: SCREEN_HEIGHT * 0.0155}}>{article.header}</Text>
                    </View>
                    <View style={{padding: SCREEN_HEIGHT * 0.0125, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Content</Text>
                    </View>
                    <View style={{padding: SCREEN_HEIGHT * 0.0125, alignItems: 'center'} }>
                        <Text style={{fontWeight: '100', fontStyle: 'italic', color: Colors.secondary}}>Wat vond je van het artikel?</Text>
                        <SocialIcon
                            Component={TouchableOpacity}
                            style={{height: SCREEN_HEIGHT * 0.045, width: SCREEN_HEIGHT * 0.045}}
                            type='facebook'
                            onPress={() => {onShare(article.title, article.link)}}
                        />
                    </View>
                </View>
            </ScrollView>

        </Modal>
    )
}

export default ArticleModal