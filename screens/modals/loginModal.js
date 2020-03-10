import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { SocialIcon } from 'react-native-elements'

import { globalStyles, Colors } from '../../constants'
import { TouchableOpacity } from 'react-native-gesture-handler';

import firebase from '../../api/firebase';
import facebook from '../../api/facebook';

export default props => {

    // const [user, setUser] = useState(null)

    const loginWithFacebook = async () => {

        try {
            await facebook.initFacebookApi('207297230626076', 'Limburgs Mooiste App')
            const { token, type } = await facebook.loginWithPermissions({
                permissions: ['public_profile', 'email']
            })

            if (type === 'success') {
                const credential = firebase.getFacebookLoginCredential(token);
                firebase.loginWithFacebook(credential);
                props.login();
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Modal animationType='slide' visible={props.isVisible}>
            <View style={styles.container}>

                <View style={styles.bodyContainer}>
                    <Text style={[globalStyles.fontStyle, styles.headerText]}>Welkom bij de Limburgs Mooiste Trainingsapp</Text>
                    <Text style={[globalStyles.fontStyle, styles.bodyText]}>Trainingsapp voor mensen die meedoen aan de limburgs mooiste competitie wawawiewa</Text>
                </View>
                <SocialIcon
                    onPress={loginWithFacebook}
                    style={styles.facebookIcon}
                    title='Log In Met Facebook'
                    Component={TouchableOpacity}
                    button
                    type='facebook'
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: Colors.tertiary
    },

    headerText: {
        fontSize: 25,
        color: Colors.secondary
    },

    bodyText: {
        fontSize: 18,
        color: Colors.primary,
        marginTop: 10
    },

    bodyContainer: {
        marginHorizontal: 15
    },

    facebookIcon: {
        width: '80%',
        paddingHorizontal: 15,
        justifyContent: 'flex-start',
    },
})