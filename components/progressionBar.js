import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Text, StyleSheet, ProgressBarAndroid, ProgressViewIOS, Platform } from 'react-native'
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
                    let x = 1;
                    while (doc.data().exp >= doc.data().maxExp){
                        let previousMaxExp = 10 * 1.4 * (x - 1) + 10
                        let newMaxExp = 10 * 1.4 * x + 10;
                        if (newMaxExp > doc.data().exp) {
                            firebase.setMaxExp(newMaxExp, previousMaxExp, user.uid);
                            break;
                        }
                        x++;
                    }

                    let level = ((doc.data().maxExp - 10) / 14) + 1;
                    setExp(doc.data().exp);
                    setMaxExp(doc.data().maxExp);
                    setProgress(() => (doc.data().exp - doc.data().previousMaxExp) / (doc.data().maxExp - doc.data().previousMaxExp))
                    setLevel(level);
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
            <Text style={[globalStyles.headerText, styles.progressText]}>Niveau {level}</Text>
            {Platform.OS === 'ios' ? 
            <ProgressViewIOS progress={progress} style={styles.progressStyle} progressTintColor={Colors.primary} trackTintColor={Colors.tertiary}></ProgressViewIOS> : 
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
