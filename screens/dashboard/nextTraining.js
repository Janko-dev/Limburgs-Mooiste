import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Colors, globalStyles } from '../../constants';

const nextTraining = props => {
    return (
    <View style={styles.trainingContainer}>
        <View style={styles.firstChildTrainingContainer}>
            <View style={styles.secondChildtrainingContainer}>
                <Text style={[{fontSize: 24, fontStyle: "normal", fontWeight: 'bold', color: Colors.primary}, globalStyles.headerText ]}>Volgende Training</Text>
            </View>
            <View style={styles.secondChildtrainingContainer}>
                <View style={styles.thirdChildtrainingContainer}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={[{fontWeight: '100', fontStyle: 'italic', color: Colors.secondary, textAlign: 'center'}, globalStyles.bodyText ]}>Naam sessie{"\n"} &{"\n"} training</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={[styles.buttonText, globalStyles.bodyText]}>Vervolg Training</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    trainingContainer: {
        padding: 20,
        margin: '1%',
        flex: 3,
        backgroundColor: 'white',
        marginLeft: '4%',
        marginRight: "4%",
        marginTop: '2%',
        marginBottom: '0%',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        borderRadius: 10

    },
    firstChildTrainingContainer: {
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
    buttonText: {
        color: Colors.primary,
        fontSize: 12,
        fontWeight: 'bold'
      },
      button: {
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: Colors.primary,
        borderWidth: 2,
        borderRadius: 5,
        padding: 7,
        width: '75%',
    }
});

export default nextTraining;