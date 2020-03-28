import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles, Colors } from '../../constants';

const DashboardScreen = props => {

    return (
        <View style={styles.container}>
            <View style={styles.trainingContainer}>
                <View style={styles.firstChildtrainingContainer}>
                    <View style={styles.secondChildtrainingContainer}>
                        <Text style={{fontSize: 24, fontStyle: "normal", fontWeight: 'bold', color: '#bfbfbf'}}>Volgende Training</Text>
                    </View>
                    <View style={styles.secondChildtrainingContainer}>
                        <View style={styles.thirdChildtrainingContainer}>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <Text>[naam sessie en training]</Text>
                            </View>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>Vervolg Training</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.motivationContainer}>
                <Text>
                    test
                </Text>
            </View>
            <View style={styles.feedContainer}>
                <Text>
                    test
                </Text>
            </View> 
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    trainingContainer: {
        margin: '1%',
        flex: 3,
        backgroundColor: 'white',
        margin: '4%',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        borderRadius: 10

    },
    firstChildtrainingContainer: {
        flex: 1
    },
    secondChildtrainingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    thirdChildtrainingContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    motivationContainer: {
        flex: 3,
        backgroundColor: 'red'
    },
    feedContainer: {
        flex: 10,
        backgroundColor: 'green'
    },
    button: {
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 5,
        padding: 7,
        width: '75%',
    },
    buttonText: {
        color: Colors.primary,
        fontSize: 12,
      },
});

export default DashboardScreen