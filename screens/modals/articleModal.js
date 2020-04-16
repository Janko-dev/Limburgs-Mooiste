import React, {useState, useEffect} from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text, Share, Image, ScrollView } from 'react-native';
import { globalStyles, Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants'; 
import { SocialIcon, Input, Button } from 'react-native-elements'
import firebase from '../../api/firebase';
import CacheImage from '../../components/cacheImage';
import AchievementModal from '../modals/achievementModal';

const ArticleModal = ({ article, visible, onClose}) => {

    const [receivedAchievement, setReceivedAchievement] = useState(false)
    const [currentAchievement, setCurrentAchievement] = useState(null)
    const [userRecord, setUserRecord] = useState(null)

    useEffect(() => {
      if (firebase.getCurrentUser()){
          const unsubscribe = firebase.onUserDataChange(firebase.getCurrentUser().uid, userDoc => {
              setUserRecord(userDoc.data());
          })

          return unsubscribe;
      }

    }, [userRecord])

    useEffect(() => {
      if (userRecord != null) {
        firebase.getAchievementsByType('Shares').then(data => {
          let achievements = data.docs.map(item => {
            return {...item.data(), id: item.id}
          })
          
          let newAchievementIDs = []
          let achievement
          achievements.forEach(item => {
            if (item.criterium == userRecord.totalShares && !userRecord.achievements.includes(item.id)) {
                newAchievementIDs.push(item.id)
                achievement = item
            }
          })
          if (newAchievementIDs.length > 0) {
              firebase.setUserAchievement(userRecord.achievements, newAchievementIDs).then(() => {
                firebase.setExp(userRecord.exp + achievement.beloning, firebase.getCurrentUser().uid).then(() => {
                setCurrentAchievement(achievement)
                setReceivedAchievement(true)
              })
            })
          }
        })
      }
    }, [userRecord?.totalShares])

    const handleAchievementModal = () => {
      setReceivedAchievement(!receivedAchievement)
    }

    const onShare = async (message, url) => {
        try {
          const result = await Share.share({
            message:
              message,
            url:
                url,
          });
          if (result.action === Share.sharedAction) {
                firebase.setShares(userRecord.totalShares + 1, firebase.getCurrentUser().uid)
                firebase.setExp(userRecord.exp + 2, firebase.getCurrentUser().uid)

          } else if (result.action === Share.dismissedAction) {
          }
        } catch (error) {
          alert(error.message);
        }
      };

    return (
        <Modal animationType='slide' visible={visible}  >
            <AchievementModal isVisible={receivedAchievement} onClose={() => handleAchievementModal()} onModalShow={() => {}} >
              <View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: SCREEN_HEIGHT * 0.01}}>
                  <Text style={{fontSize: SCREEN_HEIGHT * 0.022, color: Colors.secondary, fontWeight: '500'}}>Achievement behaald!</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontWeight: '600', fontSize: SCREEN_HEIGHT * 0.016}}>{currentAchievement?.naam}</Text>
                </View>
                <View style={{flexDirection: 'row', flex: 4, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center', width: '50%'}}>
                    </View>
                    <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={{uri: currentAchievement?.badge}} style={{height: '100%', width: '100%', borderRadius: 2,}}></Image>
                    </View>
                    <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                
                    </View>
                
                    </View>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontWeight: '400', fontSize: SCREEN_HEIGHT * 0.014, color: Colors.tertiary}}>{currentAchievement?.beschrijving}</Text>
                    <Text style={{fontWeight: '600', fontStyle: 'italic', color: Colors.secondary, fontSize: SCREEN_HEIGHT * 0.014}}> +{ currentAchievement?.beloning}</Text>
                  </View>
              </View>
            </AchievementModal>
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