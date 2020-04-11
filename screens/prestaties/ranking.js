import React, { useEffect, useState } from 'react';
import { globalStyles, Colors } from '../../constants';
import { View, Text, StyleSheet } from 'react-native';

import firebase from '../../api/firebase';

import ProfilePicture from 'react-native-profile-picture';

const ranking = props => {
    const [ranks, setRanks] = useState([]);
    const [users, setUsers] = useState([]);
    const [userRecord, setUserRecord] = useState(null)
    const [user, setUser] = useState(firebase.getCurrentUser());

    useEffect(() => {
        const unsubscribe = firebase.onUsersChange(result => {
            setUsers(() => {
                return result.docs.map(item => {
                    return { ...item.data(), uid: item.id }
                }).sort((a, b) => b.level - a.level)
            })
            setUserRecord(users.find(item => user.uid === item.uid))
        })
        return unsubscribe;
    })

    const stageFunc = (i) => {
        let _height = 20;
        let combinedHeight = 0;

        for (let index = 0; index < 3; index++) {
            if (users[index]?.level) {
                combinedHeight += users[index].level;
            }
        }

        _height = _height + (combinedHeight / (i+1)) * 2;
        
        return (
            <View style={styles.stageRow} key={i}>
                <View style={[styles.stagePillar, { height: _height }]}>
                    <Text style={globalStyles.bodyText}> {i + 1} </Text>
                </View>
                <View style={styles.profile}>
                    <ProfilePicture
                        isPicture={true}
                        requirePicture={require('../../assets/profilepic_blanco.png')}
                        shape='circle'
                        width={40}
                        height={40}
                        backgroundColor={Colors.primary}
                    />
                    <Text style={globalStyles.bodyText}> {users[i]?.username} </Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={[styles.sectionTop, styles.shadow]}>
                <Text style={[globalStyles.bodyText, { color: '#fff' }]}> Dag Leaderboard </Text>
            </View>
            <View style={styles.sectionBottom}>
                <View style={styles.stage}>
                    {users[1] ? stageFunc(1) : null}
                    {users[0] ? stageFunc(0) : null}
                    {users[2] ? stageFunc(2) : null}
                </View>
                <View style={[styles.displayRank, styles.shadow]}>
                    <Text style={[globalStyles.bodyText, { color: '#fff' }]}> U bent Level: {userRecord?.level} </Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginHorizontal: 15,
        flex: 1,
    },

    sectionTop: {
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        alignItems: 'center',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        flex: 1,
    },
    sectionBottom: {
        justifyContent: 'space-between',
        marginBottom: 10,
        flex: 4,
    },

    displayRank: {
        backgroundColor: Colors.primary,
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
    },

    stage: {
        flexDirection: 'row',
        padding: 4,
        flex: 1,
    },
    stageRow: {
        flexDirection: 'column-reverse',
        marginHorizontal: 10,
        flex: 1,
    },

    stagePillar: {
        backgroundColor: Colors.tertiary,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    profile: {
        alignItems: 'center',
        padding: 5,
    },

    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    }
});

export default ranking