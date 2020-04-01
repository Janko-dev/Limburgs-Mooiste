import React, { useState, useEffect } from 'react';
import { globalStyles, Colors } from '../../constants';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import firebase from '../../api/firebase';

import { colors, Icon } from 'react-native-elements';
import Animated, { useTransition, Easing } from 'react-native-reanimated';
import { Badge } from 'react-native-paper';

const achievements = props => {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('Snelheid');
    const [badgesMap, setBadgesMap] = useState([]);
    const [categoryMap, setCategoryMap] = useState([]);

    useEffect(() => {
        firebase.getAchievements().then(result => {

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
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.sectionHead}>
                {
                    categoryMap.map(
                        item => {
                            if (category == item.naam) {
                                return (
                                    <TouchableOpacity key={item.id}
                                        style={styles.sectionHeadButtonSelect}
                                        onPress={() => { setCategory(item.naam) }}>
                                        <Text style={globalStyles.fontStyle}>{item.naam}</Text>
                                    </TouchableOpacity>
                                )
                            } else {
                                return (
                                    <TouchableOpacity key={item.id}
                                        style={styles.sectionHeadButton}
                                        onPress={() => { setCategory(item.naam) }}>
                                        <Text>{item.naam}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        }
                    )
                }
            </View>
            <ScrollView style={styles.sectionContent}>
                {
                    badgesMap.map(
                        item => {
                            if (category == item.type) {
                                return (
                                    <View key={item.id}>
                                        <TouchableOpacity key={item.id} style={styles.badge}
                                            onPress={() => setOpen(!open)} >
                                            <Text> {item.naam} </Text>
                                            <Icon name='chevron-down'
                                                type='evilicon'
                                                color='#517fa4'
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        }
                    )
                }
            </ScrollView>
        </View>
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
        flex: 0.20,
    },
    sectionContent: {
        backgroundColor: colors.tertiary,
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