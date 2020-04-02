import React, { useEffect, useState } from 'react';
import { globalStyles, Colors } from '../../constants';
import { View, Text, StyleSheet } from 'react-native';

import firebase from '../../api/firebase';

import ProfilePicture from 'react-native-profile-picture';

const ranking = props => {
    const [ranks, setRanks] = useState([]);
    const [users, setUsers] = useState([]);
    const [userUID, setUserUID] = useState(firebase.getCurrentUser().uid);
    const [exp, setExp] = useState(0);

    useEffect(() => {
        firebase.getUsers().then(result => {

            setUsers([]);
            setRanks([]);

            return result.docs.map(doc => {
                let _user = doc.data();
                _user.id = doc.id;

                let _rank = {
                    id: doc.id,
                    exp: _user.exp
                }

                setUsers(prevUsers => [...prevUsers, _user]);
                setRanks(prevRanks => [...prevRanks, _rank]);

                if (userUID == doc.id) {
                    setExp(_user.exp);
                }

                return doc.data();
            })
        })
    }, [])

    const stageFunc = (rank, i, position) => {
        if (rank != undefined) {
            position += 1;
            let _height;

            if (i == 0) {
                _height = "30%";
            }

            if (i == 1) {
                _height = "43%";
            }

            if (i == 2) {
                _height = "23%";
            }

            return (
                <View style={styles.stageRow} key={i}>
                    <View style={[styles.stagePillar, { height: _height }]}>
                        <Text style={globalStyles.fontStyle}> {position} </Text>
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
                        <Text style={globalStyles.fontStyle}> JDoe </Text>
                    </View>
                </View>
            )
        } else return null;
    }

    return (
        <View style={styles.container}>
            <View style={[styles.sectionTop, styles.shadow]}>
                <Text style={[globalStyles.bodyText, { color: '#fff' }]}> Dag Leaderboard </Text>
            </View>
            <View style={styles.sectionBottom}>
                <View style={styles.stage}>
                    {
                        ranks.sort((a, b) => b.exp - a.exp).map((item, i) => {
                            let _rank;
                            let _i;
                            if (i == 0) {
                                _rank = ranks[i + 1]
                                _i = i + 1;
                                return stageFunc(_rank, i, _i);
                            }
                            if (i == 1) {
                                _rank = ranks[i - 1]
                                _i = i - 1;
                                return stageFunc(_rank, i, _i);
                            }
                            if (i == 2) {
                                _rank = ranks[i]
                                _i = i;
                                return stageFunc(_rank, i, _i);
                            }
                        })
                    }
                </View>
                <View style={[styles.displayRank, styles.shadow]}>
                    <Text style={[globalStyles.fontStyle, { color: '#fff' }]}> Uw huidige experience is: {exp} </Text>
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