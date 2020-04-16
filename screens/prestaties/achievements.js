import React, { useState, useEffect } from 'react';
import { globalStyles, Colors } from '../../constants';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';

import DescriptionAchievementModal from '../modals/descriptionAchievementModal';
import LoadingModal from '../modals/loadingModal';
import firebase from '../../api/firebase';

const achievements = ({ user }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState();
    const [refresh, setRefresh] = useState(false);

    const [category, setCategory] = useState('Snelheid');

    const [badgesMap, setBadgesMap] = useState([]);
    const [categoryMap, setCategoryMap] = useState([]);

    const [userRecord, setUserRecord] = useState(null)
    const [userAchievements, setUserAchievements] = useState([]);

    useEffect(() => {
        if (user) {
            const unsubscribe = firebase.onUserDataChange(user.uid, doc => {
                setUserAchievements(doc.data().achievements);
            })
            return unsubscribe;
        }
    }, [])

    useEffect(() => {
        getUserData();
        getData();
    }, [])

    // Handlers
    const closeHandler = () => {
        setIsVisible(false);
    }

    const refreshHandler = () => {
        getData();
        setRefresh(false);
    }

    // Get Requests
    const getUserData = async () => {
        setIsLoading(true);
        const result = await firebase.getUsers();

        let _users = result.docs.map(item => {
            return { ...item.data(), uid: item.id }
        });

        setUserRecord({ ..._users.find(item => user.uid === item.uid), rank: _users.findIndex(item => user.uid === item.uid) + 1 });

        setIsLoading(false);
    }

    const getData = async () => {
        setIsLoading(true);


        const result = await firebase.getAchievements();

        let _categoryMap = [];
        let _badgesMap = [];

        result.docs.forEach(doc => {
            let badge = doc.data();
            badge.id = doc.id;

            let _category = {};
            _category.id = badge.id;
            _category.naam = badge.type;

            _badgesMap.push(badge);

            if (!_categoryMap.includes(_category.naam)) {
                _categoryMap.push(_category.naam);
            }

            checkAchievement(_badgesMap);
        })

        setCategoryMap(_categoryMap);
        setBadgesMap(_badgesMap);
        setIsLoading(false);
    }

    // Validation
    const checkAchievement = (_badgesMap) => {
        setIsLoading(true);

        let _achievements = []
        _badgesMap.forEach(item => {
            _achievements.push(validateAchievement(item));
        });

        _achievements.forEach(item => {
            if (!userAchievements.includes(item)) setUserAchievements(prevAchievements => [...prevAchievements, item]);
        })

        setIsLoading(true);
    }

    const validateAchievement = (item) => {
        if (item?.type == "Leveling") {
            if (item?.criterium <= userRecord?.level) {
                if (!userRecord?.achievements.includes(item?.id.toString())) return item.id.toString();
                // User record updaten hier
            }
        }

        if (item?.type == "Shares") {
            if (item?.criterium <= userRecord?.totalShares) {
                if (!userRecord?.achievements.includes(item?.id)) return item.id.toString();
                // User record updaten hier
            }
        }

        if (item?.type == "Snelheid") {
            let count = getMedals();

            if (item?.criterium <= count) {
                if (!userRecord?.achievements.includes(item?.id)) return item.id.toString();
                // User record updaten hier
            }
        }

        return null;
    }

    const getMedals = () => {
        let _prevTraining = userRecord?.previousTrainingSessions;
        let count = 0;

        _prevTraining?.forEach(item => {
            if (item?.medal == "gold") count += 3;
            if (item?.medal == "silver") count += 2;
            if (item?.medal == "bronze") count += 1;
        })

        return count;
    }

    const listItem = (_badge) => {
        return (
            <View key={_badge.id}>
                <TouchableOpacity key={_badge.id} style={styles.badge}
                    onPress={() => {
                        setIsVisible(true);
                        setSelectedItem(_badge);
                    }}>

                    {userAchievements.includes(_badge.id) ?
                        <Text> {_badge.naam} ✔ </Text> :
                        <Text> {_badge.naam} </Text>}

                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <DescriptionAchievementModal isVisible={isVisible} onClose={closeHandler} item={selectedItem}></DescriptionAchievementModal>
            <LoadingModal isLoading={isLoading} />
            <View style={styles.sectionHead}>
                {
                    categoryMap.map(
                        (item, index) => {
                            return (
                                <TouchableOpacity key={index}
                                    style={item === category ? styles.sectionHeadButtonSelect : styles.sectionHeadButton}
                                    onPress={() => {
                                        setCategory(item);
                                    }}>
                                    <Text style={[globalStyles.bodyText, { fontSize: 13 }]}>{item}</Text>
                                </TouchableOpacity>
                            )
                        }
                    )
                }
            </View>
            <View style={{ flex: 1 }}>
                <FlatList data={badgesMap}
                    refreshing={refresh}
                    onRefresh={refreshHandler}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => category == item.type ? listItem(item) : null} />
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        flex: 1,
    },

    sectionHead: {
        flexDirection: "row",
        backgroundColor: Colors.tertiary,
        flex: 0.1,
    },
    sectionContent: {
        backgroundColor: Colors.tertiary,
        flex: 1,
    },

    sectionHeadButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginTop: 8,
        margin: 3,
        flex: 1,
    },
    sectionHeadButtonSelect: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: '#fff',
        marginTop: 8,
        marginHorizontal: 5,
        flex: 1,
    },

    badge: {
        borderBottomColor: Colors.primary,
        borderBottomWidth: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 10,
        padding: 10,
    }
});

export default achievements