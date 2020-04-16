import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Text, StyleSheet, ProgressBarAndroid, ProgressViewIOS, Platform, Animated, View, Easing, Image } from 'react-native'
import { Colors, globalStyles, SCREEN_HEIGHT } from '../constants';
import { Icon } from 'react-native-elements';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

import firebase from '../api/firebase';
import ProgressionModal from '../screens/modals/progressionModal';
import AchievementModal from '../screens/modals/achievementModal';

const ProgressionBar = () => {

    const [user, setUser] = useState(firebase.getCurrentUser());
    const [level, setLevel] = useState(null);
    const [exp, setExp] = useState(null);
    const [maxExp, setMaxExp] = useState(null);
    const [progress, setProgress] = useState(0);
    const [expDiff, setExpDiff] = useState(0);
    const [animatedValue] = useState(new Animated.Value(0));
    const [levelUpAnimatedValue] = useState(new Animated.Value(0));
    const [visibleProgression, setVisibleProgression] = useState(false);
    const [visibleLevelUp, setVisibleLevelUp] = useState(false);

    const [receivedAchievement, setReceivedAchievement] = useState(false)
    const [currentAchievement, setCurrentAchievement] = useState(null)

    useEffect(() => {
        const unsubscribe = firebase.onAuthChange(user => {
            setUser(user)
        })

        return unsubscribe;

    }, [firebase])

    useEffect(() => {
        if (user) {
            const unsubscribe = firebase.onUserDataChange(user.uid, doc => {
                if (doc.data()) {
                    let _exp = doc.data().exp;
                    let maxExp = doc.data().maxExp;
                    let level = doc.data().level;
                    // let i = 1;
                    while (_exp > maxExp) {
                        _exp -= maxExp;
                        maxExp += 0.01 * maxExp //* i;
                        // i++;
                        level++;
                    }
                    firebase.setProgression(_exp, maxExp, level, user.uid);

                    if (level > doc.data().level) {
                        setVisibleLevelUp(true);
                        firebase.getAchievementsByType('Leveling').then(data => {
                            let achievements = data.docs.map(item => {
                              return {...item.data(), id: item.id}
                            })
                            
                            let newAchievementIDs = []
                            let achievement
                            achievements.forEach(item => {
                              if (item.criterium == userRecord.level && !userRecord.achievements.includes(item.id)) {
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

                    let diff = doc.data().exp - exp;
                    if (diff > 0 && exp != null) {
                        // console.log(diff)
                        setExpDiff(Math.floor(diff));
                        Animated.sequence([
                            Animated.timing(animatedValue, {
                                toValue: 1,
                                duration: 500,
                                useNativeDriver: true
                            }),
                            Animated.timing(animatedValue, {
                                toValue: 0,
                                delay: 1500,
                                duration: 500,
                                useNativeDriver: true
                            }),
                        ]).start()
                    }

                    setExp(doc.data().exp);
                    setMaxExp(doc.data().maxExp);
                    setProgress(() => (doc.data().exp / doc.data().maxExp) * 100)
                    setLevel(doc.data().level);
                }
            })

            return unsubscribe;
        }
    })

    const expModalHandler = () => {
        setVisibleProgression(!visibleProgression)
    }

    const animationHandler = () => {
        Animated.timing(levelUpAnimatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.elastic(4)
        }).start()
    }

    return (
        <TouchableOpacity onPress={expModalHandler} style={styles.container}>
            <ProgressionModal visible={visibleProgression} onClose={expModalHandler} exp={exp} maxExp={maxExp} progress={progress} level={level} />
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
            <AchievementModal isVisible={visibleLevelUp} onClose={() => setVisibleLevelUp(false)} onModalShow={animationHandler}>
                <Animated.View style={{
                    transform:
                        [
                            {
                                scale: levelUpAnimatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.4, 1.5]
                                })
                            }
                        ]
                }}>
                    <Text style={[globalStyles.headerText, {fontSize: 30}]}>Level {level}</Text>
                </Animated.View>

            </AchievementModal>      
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {/* <Text> */}
                <Animated.Text style={[styles.animatedText, {
                    opacity: animatedValue.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0, 0.9, 1]
                    }),
                    transform: [
                        {
                            translateY: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -15]
                            })
                        }
                    ]
                }]}>
                    +{expDiff}
                </Animated.Text>
                <Text style={[globalStyles.headerText, styles.progressText]}>Niveau {level}</Text>
                {/* </Text> */}

            </View>
            <View style={{ alignItems: "flex-end" }}>
                <ProgressBarAnimated
                    width={100}
                    value={progress}
                    // barEasing='cubic'
                    backgroundColor={Colors.primary}
                />
            </View>

            {/* {Platform.OS === 'ios' ?
                <ProgressViewIOS progress={progress} style={styles.progressStyle} progressTintColor={Colors.primary} trackTintColor={Colors.tertiary}></ProgressViewIOS> :
                <ProgressBarAndroid progress={progress} color={Colors.tertiary}></ProgressBarAndroid>} */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        right: 15
    },

    progressText: {
        fontSize: 14,
        textAlign: 'right',
        color: Colors.primary,
        // marginBottom: 5
    },

    animatedText: {
        // position: 'absolute'
        // textAlign: 'left'
        color: Colors.secondary,
        fontWeight: 'bold',
        bottom: -15
    }

    // progressStyle: {
    //     transform: [
    //         { scaleY: 2 }
    //     ]
    // }


})

export default ProgressionBar
