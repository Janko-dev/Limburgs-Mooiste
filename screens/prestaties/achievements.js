import React, { useState } from 'react';
import { globalStyles, Colors } from '../../constants';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, Icon } from 'react-native-elements';

const achievements = props => {
    const [open, setOpen] = useState(false);
    
    const [category, setCategory] = new useState('Snelheid');

    const categoryMap = [
        {
            id: 1,
            Naam: 'Snelheid',
        },
        {
            id: 2,
            Naam: 'Afstand',
        },
        {
            id: 3,
            Naam: 'Shares',
        }
    ]

    const badgesMap = [
        {
            id: 1,
            categorie: 'Snelheid',
            Naam: 'Snelheids Duivel',
            Beschrijving: 'Voltooi een trainingsschema 10% sneller dan de streeftijd!',
        },
        {
            id: 2,
            categorie: 'Afstand',
            Naam: 'Afstands maniak',
            Beschrijving: 'Fiets de afstand van het limburgs Mooiste evenement!',
        },
        {
            id: 3,
            categorie: 'Shares',
            Naam: 'Deler',
            Beschrijving: 'Deel meer dan 3 verschillende resultaten met uw vrienden!',
        },
    ]


    return (
        <View style={styles.container}>
            <View style={styles.sectionHead}>
                {
                    categoryMap.map(
                        item => {
                            if (category == item.Naam) {
                                return (
                                    <TouchableOpacity key={item.id}
                                        style={styles.sectionHeadButtonSelect}
                                        onPress={() => { setCategory(item.Naam) }}>
                                        <Text style={globalStyles.fontStyle}>{item.Naam}</Text>
                                    </TouchableOpacity>
                                )
                            } else {
                                return (
                                    <TouchableOpacity key={item.id}
                                        style={styles.sectionHeadButton}
                                        onPress={() => { setCategory(item.Naam) }}>
                                        <Text>{item.Naam}</Text>
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
                            if (category == item.categorie) {
                                return (
                                    <TouchableOpacity key={item.id} style={styles.badge}
                                        onPress={() => {
                                            return (
                                                <View>
                                                    <Text> {item.Beschrijving} </Text>
                                                </View>
                                            )
                                        }}>
                                        <Text> {item.Naam} </Text>
                                        <Icon name='chevron-down'
                                            type='evilicon'
                                            color='#517fa4'
                                        />
                                    </TouchableOpacity>
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