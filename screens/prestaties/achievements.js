import React from 'react';
import { globalStyles, Colors } from '../../constants';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from 'react-native-elements';

const achievements = props => {
    const categorie = [
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

    const badges = [
        {

        }
    ]


    return (
        <View style={styles.container}>
            <View style={styles.sectionHead}>
                {
                    categorie.map(
                        item => {
                            return (
                                <TouchableOpacity key={item.id} style={styles.sectionHeadButton}>
                                    <Text>{item.Naam}</Text>
                                </TouchableOpacity>
                            )
                        }
                    )
                }
            </View>
            <View style={styles.sectionContent}>
            </View>
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
        flex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    sectionContent: {
        flex: 5,
        backgroundColor: colors.tertiary,
    },

    sectionHeadButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 4,
        borderBottomColor: Colors.secondary,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: '#fff',
        marginTop: 15,
        margin: 3,
        flex: 1,
    },
});

export default achievements