import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import { globalStyles, Colors } from '../../constants'
import { Icon } from 'react-native-elements';

const SessionAnalyticsModal = ({ isVisible, data, onClose }) => {
    return (
        <Modal animationType='slide' visible={isVisible} transparent={true}>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={onClose} style={styles.button}>
                        <Icon
                            type='ionicon'
                            name='ios-close-circle-outline'
                            color={Colors.secondary}
                            size={50}
                        />
                    </TouchableOpacity>
                </View>
                <View style={globalStyles.container}>
                    <Text>Aantal waypoints afgevinkt: {data?.waypointReached}/{data?.totalWaypoints}</Text>
                    <Text>Start tijd: {data?.startTime.toLocaleString()}</Text>
                    <Text>Stop tijd: {data?.stopTime.toLocaleString()}</Text>
                    <Text>Huidige sessie: {data?.currentSession}</Text>
                    <Text>Huidige week: {data?.currentWeek}</Text>
                    <Text>Behaalde medaille: {data?.medal}</Text>
                </View>
            </View>

        </Modal>
    )
}

export default SessionAnalyticsModal

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        flex: 0.5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderRadius: 20
    },

    button: {
        right: '5%'
    },

    container: {
        height: '60%',
        backgroundColor: 'white',
        marginTop: '30%',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 20
    }
})
