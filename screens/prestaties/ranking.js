import React, { useEffect, useState } from 'react';
import { globalStyles, Colors } from '../../constants';
import { View, Text, StyleSheet, Picker } from 'react-native';

import LoadingModal from '../modals/loadingModal';
import firebase from '../../api/firebase';

import ProfilePicture from 'react-native-profile-picture';

const ranking = () => {
    const [users, setUsers] = useState([]);
    const [userRecord, setUserRecord] = useState(null)
    const [user, setUser] = useState(firebase.getCurrentUser());
    const [selectedValue, setSelectedValue] = useState("level");
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        firebase.getUsers().then(result => {
            let _users = result.docs.map(item => {
                return { ...item.data(), uid: item.id }
            }).sort((a, b) => b[selectedValue] - a[selectedValue])
            setUsers(_users)
            setUserRecord({ ..._users.find(item => user.uid === item.uid), rank: _users.findIndex(item => user.uid === item.uid) + 1 })
            setIsLoading(false)
        })
    }, [])

    const map = function (n, start1, stop1, start2, stop2) {
        return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    };

    const stageFunc = (i, criteria) => {
        _height = map(users[i][criteria], users[2][criteria], users[0][criteria] + 5, 20, 50);

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
            <LoadingModal isLoading={isLoading} />
            <View style={[styles.sectionTop, styles.shadow]}>
                <Text style={[globalStyles.bodyText, { color: '#fff' }]}> Dag Leaderboard </Text>
            </View>
            <View style={styles.sectionBottom}>
                <View style={styles.stage}>
                    {users[1] ? stageFunc(1, selectedValue) : null}
                    {users[0] ? stageFunc(0, selectedValue) : null}
                    {users[2] ? stageFunc(2, selectedValue) : null}
                </View>
                <View style={[styles.displayRank, styles.shadow]}>
                    <Text style={[globalStyles.bodyText, { color: '#fff' }]}> U bent gepositioneerd op plaats: {userRecord?.rank} </Text>
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
        flexDirection: 'row',
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