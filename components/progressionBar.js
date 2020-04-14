import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Text, StyleSheet, ProgressBarAndroid, ProgressViewIOS, Platform, Animated, View, Easing } from 'react-native'
import { Colors, globalStyles } from '../constants';
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
