import React from 'react';
import { globalStyles, Colors } from '../../constants';
import { View, Text, StyleSheet } from 'react-native';

import ProfilePicture from 'react-native-profile-picture';

const ranking = props => {

    return (
        <View style={styles.container}>
            <View style={[styles.sectionTop, styles.shadow]}>
                <Text style={[globalStyles.fontStyle, { color: '#fff' }]}> Dag Leaderboard </Text>
            </View>
            <View style={styles.sectionBottom}>
                <View style={styles.stage}>
                    <View style={styles.stageRow}>
                        <View style={styles.stageSecond}>
                            <Text style={globalStyles.fontStyle}> 2 </Text>
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
                            <Text style={globalStyles.fontStyle}> John </Text>
                        </View>
                    </View>
                    <View style={styles.stageRow}>
                        <View style={styles.stageFirst}>
                            <Text style={globalStyles.fontStyle}> 1 </Text>
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
                            <Text style={globalStyles.fontStyle}> Frans </Text>
                        </View>
                    </View>
                    <View style={styles.stageRow}>
                        <View style={styles.stageThird}>
                            <Text style={globalStyles.fontStyle}> 3 </Text>
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
                            <Text style={globalStyles.fontStyle}> Eric </Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.displayRank, styles.shadow]}>
                    <Text style={[globalStyles.fontStyle, { color: '#fff' }]}> Uw huidige rank bedraagt: 8ste </Text>
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

    stageFirst: {
        backgroundColor: Colors.tertiary,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: '43%',
    },
    stageSecond: {
        backgroundColor: Colors.tertiary,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: '30%',
    },
    stageThird: {
        backgroundColor: Colors.tertiary,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
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