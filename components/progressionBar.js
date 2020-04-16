import React, { useEffect, useState } from 'react'

import { TouchableOpacity, Text, StyleSheet, ScrollView, Animated, View, Easing, Image } from 'react-native'
import { Colors, globalStyles, GROWTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants';

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
    const [earnedExp, setEarnedExp] = useState(0);


    const [newAchievements, setNewAchievements] = useState([])

    useEffect(() => {
        const unsubscribe = firebase.onAuthChange(user => {
            setUser(user)
        })

        return unsubscribe;

    }, [])

    useEffect(() => {
        if (user) {
            const unsubscribe = firebase.onUserDataChange(user.uid, doc => {
                if (doc.data()) {
                    let _exp = doc.data().exp;
                    let maxExp = doc.data().maxExp;
                    let level = doc.data().level;
                    while (_exp > maxExp) {
                        _exp -= maxExp;
                        maxExp += GROWTH * maxExp 
                        level++;
                    }
                    firebase.setProgression(_exp, maxExp, level, user.uid);

                    if (level > doc.data().level) {
                        setVisibleLevelUp(true);
                        firebase.getAchievementsByType('Leveling').then(data => {
                            let achievements = data.docs.map(item => {
                                return { ...item.data(), id: item.id }
                            })

                            let newAchievements = []
                            achievements.forEach(item => {
                                if (item.criterium <= level && !doc.data().achievements.includes(item.id)) {
                                    newAchievements.push(item)
                                }
                            })

                            let newAchievsIds = newAchievements.map(item => item.id)
                            if (newAchievsIds.some(item => !doc.data().achievements.includes(item))) {
                                firebase.setUserAchievement(doc.data().achievements, newAchievsIds)
                            }

                            if (newAchievements.length != 0 ) {
                                setNewAchievements(newAchievements)
                                let levelingExp = 0;
                                newAchievements.forEach(item => levelingExp += item.beloning)
                                setEarnedExp(levelingExp)
                            }

                        })
                    }

                    let diff = doc.data().exp - exp;
                    if (diff > 0 && exp != null) {
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

    const closeModalHandler = () => {
        setVisibleLevelUp(false);
        setNewAchievements([]);
        firebase.setExp(earnedExp, user.uid).then(() => setEarnedExp(0))
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
            <AchievementModal isVisible={visibleLevelUp} onClose={closeModalHandler} onModalShow={animationHandler}>
                <Animated.View style={{
                    marginTop: 30,
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
                    <Text style={[globalStyles.headerText, { fontSize: 30 }]}>Level {level}</Text>
                </Animated.View>

                <View style={styles.newAchievementContainer}>
                    {newAchievements.length != 0 && <Text style={[globalStyles.headerText, { color: 'black' }]}>Behaalde Achievements!</Text>}
                    {newAchievements.length != 0 && 
                        
                        <ScrollView horizontal={true} style={{ width: '100%', marginTop: 10 }}>
                            {newAchievements.map((item, index) =>
                                <View key={index.toString()} style={styles.newAchievement}>
                                    <Image source={{ uri: item.badge }} style={{ width: '70%', height: '50%' }} />
                                    <Text style={[globalStyles.headerText, { fontSize: 18 }]}>{item.naam}</Text>
                                    <Text style={[globalStyles.headerText, { fontSize: 14 }]}>{item.beschrijving}</Text>
                                    <Text style={[globalStyles.headerText, { fontSize: 14, color: Colors.secondary }]}>+{item.beloning} exp</Text>
                                </View>
                            )}
                        </ScrollView>}

                </View>

            </AchievementModal>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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

            </View>
            <View style={{ alignItems: "flex-end" }}>
                <ProgressBarAnimated
                    width={100}
                    value={progress}
                    backgroundColor={Colors.primary}
                />
            </View>
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
    },

    animatedText: {
        color: Colors.secondary,
        fontWeight: 'bold',
        bottom: -15
    },

    newAchievementContainer: {
        height: SCREEN_HEIGHT * 0.45,
        marginVertical: '5%',
        width: SCREEN_WIDTH * 0.8,
        // backgroundColor: 'red'
    },

    newAchievement: {
        marginTop: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        height: SCREEN_HEIGHT * 0.35,
        width: SCREEN_WIDTH * 0.6,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {height: 1, width: 2},
        shadowOpacity: 0.2,
        shadowRadius: 10
    },
})

export default ProgressionBar
