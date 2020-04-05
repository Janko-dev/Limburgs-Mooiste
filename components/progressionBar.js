import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Text, StyleSheet, ProgressBarAndroid, ProgressViewIOS, Platform, Animated, View } from 'react-native'
import { Colors, globalStyles } from '../constants';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

import firebase from '../api/firebase';
import ProgressionModal from '../screens/modals/progressionModal';

const ProgressionBar = () => {

    const [user, setUser] = useState(firebase.getCurrentUser());
    const [level, setLevel] = useState(null);
    const [exp, setExp] = useState(null);
    const [maxExp, setMaxExp] = useState(null);
    const [progress, setProgress] = useState(0);
    const [expDiff, setExpDiff] = useState(0);
    const [animatedValue] = useState(new Animated.Value(0));
    const [visible, setVisible] = useState(false);

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
                    // let x = 1;
                    // while (doc.data().exp >= doc.data().maxExp){
                    //     let previousMaxExp = 10 * 1.4 * (x - 1) + 10
                    //     let newMaxExp = 10 * 1.4 * x + 10;
                    //     if (newMaxExp > doc.data().exp) {
                    //         firebase.setMaxExp(newMaxExp, previousMaxExp, user.uid);
                    //         break;
                    //     }
                    //     x++;
                    // }

                    // let level = ((doc.data().maxExp - 10) / 14) + 1;

                    let _exp = doc.data().exp;
                    let maxExp = doc.data().maxExp;
                    let level = doc.data().level;
                    let i = 1;
                    while (_exp > maxExp) {
                        _exp -= maxExp;
                        maxExp += 0.01 * maxExp * i;
                        i++;
                        level++;
                    }
                    // console.log("exp: " + exp)
                    // console.log("maxExp: " + maxExp)
                    // console.log("level: " + level)
                    firebase.setProgression(_exp, maxExp, level, user.uid);

                    let diff = doc.data().exp - exp;
                    if (diff > 0 && exp != null) {
                        console.log(diff)
                        setExpDiff(Math.floor(diff));
                        Animated.sequence([
                            Animated.timing(animatedValue, {
                                toValue: 1,
                                duration: 500,
                                useNativeDriver: true
                            }),
                            Animated.timing(animatedValue, {
                                toValue: 0,
                                delay: 1000,
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
        setVisible(!visible);
    }

    return (
        <TouchableOpacity onPress={expModalHandler} style={styles.container}>
            <ProgressionModal visible={visible} onClose={expModalHandler} exp={exp} maxExp={maxExp} progress={progress} level={level} />
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
