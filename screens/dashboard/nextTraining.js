import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Colors, globalStyles } from '../../constants';

const nextTraining = props => {

    const nextTrainingHanderler = () => {
        props.navigation.navigate("Sessions", { ...props.schedule });
    }

    return (
    <View style={styles.trainingContainer}>
        <View style={styles.secondChildtrainingContainer}>
            { props.schedule != null ? 
            <View style={styles.thirdChildtrainingContainer}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={[{fontWeight: '100', fontStyle: 'italic', color: Colors.secondary, textAlign: 'center'}, globalStyles.bodyText ]}>
                        Week: {props.schedule.currentWeek}{"\n"}Schema: {props.schedule.currentSession}
                    </Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <TouchableOpacity style={styles.button} onPress={() => nextTrainingHanderler()}>
                        <Text style={[styles.buttonText, globalStyles.bodyText]}>Vervolg Training</Text>
                    </TouchableOpacity>
                </View>
            </View> :
            <Text style={[{fontWeight: '100', fontStyle: 'italic', color: Colors.secondary, textAlign: 'center'}, globalStyles.bodyText ]}>Er is nog geen actief schema</Text>
            }

            
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    trainingContainer: {
        padding: '1%',
        backgroundColor: 'white',
        marginLeft: '2%',
        marginRight: "2%",
        marginBottom: '0%',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10

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