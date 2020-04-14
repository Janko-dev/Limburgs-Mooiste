import React, { useState, useEffect } from 'react';
import { globalStyles, Colors } from '../../constants';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import DescriptionAchievementModal from '../modals/descriptionAchievementModal';
import LoadingModal from '../modals/loadingModal';
import firebase from '../../api/firebase';

import { FlatList } from 'react-native-gesture-handler';

const achievements = props => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState();

    const [refresh, setRefresh] = useState(false);

    const [category, setCategory] = useState('Snelheid');

    const [badgesMap, setBadgesMap] = useState([]);
    const [categoryMap, setCategoryMap] = useState([]);

    const [userAchievements, setUserAchievements] = useState([]);

    useEffect(() => {
        firebase.getAchievements().then(result => {
            firebase.getUserFromDB(firebase.getCurrentUser().uid).then(request => {
                setUserAchievements(request.data().achievements);
            });

            setBadgesMap([]);
            setCategoryMap([]);

            return result.docs.map(doc => {
                let badge = doc.data();
                badge.id = doc.id;

                let _category = {};
                _category.id = badge.id;
                _category.naam = badge.type;

                setBadgesMap(prevBadges => [...prevBadges, badge]);
                setCategoryMap(prevCategory => [...prevCategory, _category]);
                return doc.data();
            })
        })

        setIsLoading(false);
    }, [])

    const closeHandler = () => {
        setIsVisible(false);
    }

    const refreshHandler = () => {
        console.log("refreshing!");
        setRefresh(false);
    }

    const listItem = (_badge) => {
        if (userAchievements.includes(_badge.id)) {
            return (
                <View key={_badge.id}>
                    <TouchableOpacity key={_badge.id} style={styles.badge}
                        onPress={() => {
                            setIsVisible(true);
                            setSelectedItem(_badge);
                        }}>
                        <Text> {_badge.naam} ✔ </Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View key={_badge.id}>
                    <TouchableOpacity key={_badge.id} style={styles.badge}
                        onPress={() => {
                            setIsVisible(true);
                            setSelectedItem(_badge);
                        }}>
                        <Text> {_badge.naam} </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <LoadingModal isLoading={isLoading} />
            <DescriptionAchievementModal isVisible={isVisible} onClose={closeHandler} item={selectedItem}></DescriptionAchievementModal>
            <View style={styles.sectionHead}>
                {
                    categoryMap.map(
                        item => {
                            if (category == item.naam) {
                                return (
                                    <TouchableOpacity key={item.id}
                                        style={styles.sectionHeadButtonSelect}
                                        onPress={() => {
                                            setCategory(item.Naam);
                                        }}>
                                        <Text style={[globalStyles.bodyText, { fontSize: 13 }]}>{item.naam}</Text>
                                    </TouchableOpacity>
                                )
                            } else {
                                return (
                                    <TouchableOpacity key={item.id}
                                        style={styles.sectionHeadButton}
                                        onPress={() => {
                                            setCategory(item.naam);
                                        }}>
                                        <Text style={[globalStyles.bodyText, { fontSize: 13 }]}>{item.naam}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        }
                    )
                }
            </View>
            <FlatList data={badgesMap}
                refreshing={refresh}
                onRefresh={refreshHandler}
                renderItem={({ item }) => { if (category == item.type) return listItem(item); }}
            />
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