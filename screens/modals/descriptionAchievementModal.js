import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements';
import { Colors, globalStyles } from '../../constants';


const DescriptionAchievementModal = ({ isVisible, onClose, item }) => {
    return (
        <Modal isVisible={isVisible} useNativeDriver={true}>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <View style={styles.headerButtonContainer}>
                        <Text style={globalStyles.headerText}> {item?.naam} </Text>
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.button}>
                        <Icon
                            type='ionicon'
                            name='ios-close-circle-outline'
                            color={Colors.secondary}
                            size={50}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <Text style={globalStyles.bodyText}> Beschrijving: {item?.beschrijving} </Text>
                    <Text style={globalStyles.bodyText}> Beloning: {item?.beloning} </Text>
                    <Text style={globalStyles.bodyText}> Criterium: {item?.criterium} </Text>
                    <Text style={globalStyles.bodyText}> Type: {item?.type} </Text>
                </View>
            </View>
        </Modal>
    )
}

export default DescriptionAchievementModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '30%',
        borderWidth: 1,
        borderRadius: 10,
    },

    content: {
        justifyContent: 'space-evenly',
        padding: 5,
        flex: 1,
    },

    headerButtonContainer: {
        justifyContent: 'center',
        alignContent: 'center'
    },

    buttonContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        flex: 1,
    },

    button: {
        right: '5%'
    }
})
