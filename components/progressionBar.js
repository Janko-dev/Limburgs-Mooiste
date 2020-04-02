import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Text, StyleSheet, ProgressBarAndroid, ProgressViewIOS, Platform } from 'react-native'
import * as Progress from 'react-native-progress';
import { Colors, globalStyles } from '../constants';

import firebase from '../api/firebase';
import ProgressionModal from '../screens/modals/progressionModal';

const ProgressionBar = () => {

    const [user, setUser] = useState(firebase.getCurrentUser());
    const [level, setLevel] = useState(null);
    const [exp, setExp] = useState(null);
    const [maxExp, setMaxExp] = useState(null);
    const [progress, setProgress] = useState(0);
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
                    setExp(doc.data().exp);
                    setMaxExp(doc.data().maxExp);
                    setProgress(() => doc.data().exp / doc.data().maxExp)
                    setLevel(() => Math.log(doc.data().maxExp / 10) / Math.log(1.2) + 1);
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
            <ProgressionModal visible={visible} onClose={expModalHandler} exp={exp} maxExp={maxExp} progress={progress} level={level}/>
            <Text style={[styles.progressText, globalStyles.progressText]}>Niveau {level}</Text>

            {Platform.OS === 'ios' ? 
            <ProgressViewIOS progress={progress} style={styles.progressStyle} progressTintColor={Colors.tertiary} trackTintColor={Colors.primary}></ProgressViewIOS> : 
            <ProgressBarAndroid progress={progress} color={Colors.tertiary}></ProgressBarAndroid>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        right: 15
    },

    progressText: {
        fontSize: 18,
        color: Colors.primary,
        marginBottom: 5
    },

    progressStyle: {
        transform: [
            {scaleY: 2}
        ]
    }

    
})

export default ProgressionBar
