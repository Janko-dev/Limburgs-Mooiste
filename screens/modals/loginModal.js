import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, KeyboardAvoidingView, Animated } from 'react-native';
import { SocialIcon, Input, Button } from 'react-native-elements'

import { globalStyles, Colors, WINDOW_WIDTH } from '../../constants'
import { TouchableOpacity } from 'react-native-gesture-handler';

import firebase from '../../api/firebase';
import facebook from '../../api/facebook';

export default ({ login, isVisible })=> {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [moveInX] = useState(new Animated.Value(0))

    const loginWithFacebook = async () => {

        try {
            await facebook.initFacebookApi('207297230626076', 'Limburgs Mooiste App')
            const { token, type } = await facebook.loginWithPermissions({
                permissions: ['public_profile', 'email']
            })

            if (type === 'success') {
                const credential = firebase.getFacebookLoginCredential(token);
                firebase.loginWithFacebook(credential);
                login();
            }

        } catch (error) {
            console.error(error)
        }
    }

    const loginWithCredentials = async () => {
        try {
            if (email != '' && password != '') {
                firebase.loginWithCredentials(email, password).then(res => {
                    console.log(res)
                });
            }


        } catch (error) {
            console.error(error)
        }
    }

    const signUpHandler = () => {
        Animated.spring(moveInX, {
            toValue: WINDOW_WIDTH,
            delay: 500,
            bounciness: 10,
            useNativeDriver: true
        }).start();
    }

    const emailTextHandler = (text) => {
        setEmail(text)
    }

    const passwordTextHandler = (text) => {
        setPassword(text)
    }

    const transformStepOne = {
        transform: [
            {
                translateX: moveInX
            }
        ]
    }

    const transformStepTwo = {
        transform: [
            {
                translateX: Animated.subtract(moveInX, new Animated.Value(WINDOW_WIDTH))
            }
        ]
    }

    return (
        <Modal animationType='slide' visible={isVisible}>
            <View style={styles.container}>

                <Animated.View style={[transformStepOne, styles.animationContainer]}>

                    <View style={styles.bodyContainer}>
                        <Text style={[globalStyles.fontStyle, styles.headerText]}>Welkom bij de Limburgs Mooiste Trainingsapp</Text>
                        <Text style={[globalStyles.fontStyle, styles.bodyText]}>Trainingsapp voor beginnende tot ervaren fietsers die  ambities hebben om mee te doen aan de Limburgs Mooiste competitie. </Text>
                    </View>

                    <KeyboardAvoidingView behavior='padding' style={styles.formContainer}>
                        <Text style={[globalStyles.fontStyle, styles.headerText, { marginBottom: 15 }]}>Voer inloggegevens in</Text>
                        <Input
                            placeholder='Email@adress.com'
                            keyboardType='email-address'
                            value={email}
                            onChangeText={emailTextHandler}
                            inputStyle={styles.textInput}
                            containerStyle={styles.textInputContainer}
                            placeholderTextColor={Colors.secondary}
                            autoCapitalize='none'
                        />
                        <Input
                            placeholder='Password'
                            keyboardType='visible-password'
                            secureTextEntry={true}
                            value={password}
                            onChangeText={passwordTextHandler}
                            inputStyle={styles.textInput}
                            containerStyle={styles.textInputContainer}
                            placeholderTextColor={Colors.secondary}
                        />

                        <Button title={'Login'} buttonStyle={{ backgroundColor: Colors.secondary }} onPress={loginWithCredentials} raised />
                    </KeyboardAvoidingView>

                    <View style={styles.buttonContainer}>
                        <SocialIcon
                            onPress={signUpHandler}
                            style={styles.signUpButton}
                            title='Sign up'
                            raised={true}
                            Component={TouchableOpacity}
                            button
                        />

                        <SocialIcon
                            onPress={loginWithFacebook}
                            style={styles.facebookIcon}
                            title='Log In Met Facebook'
                            Component={TouchableOpacity}
                            button
                            type='facebook'
                        />
                    </View>

                </Animated.View>

                <Animated.View style={[transformStepTwo, styles.animationContainer]}>
                    
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.tertiary
    },

    animationContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerText: {
        fontSize: 25,
        color: Colors.secondary,
        textAlign: 'center'
    },

    bodyText: {
        fontSize: 18,
        color: Colors.primary,
        marginTop: 10,
        textAlign: 'center'
    },

    bodyContainer: {
        marginHorizontal: 15,
        marginBottom: 15
    },

    facebookIcon: {
        width: '90%',
        paddingHorizontal: 15,
        justifyContent: 'flex-start',
    },

    signUpButton: {
        width: '90%',
        paddingHorizontal: 15,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textInput: {
        color: Colors.secondary,
        width: '100%',
    },

    textInputContainer: {
        marginVertical: 10
    },

    formContainer: {
        width: '80%',
    },

    buttonContainer: {
        width: '60%',
        marginTop: 30
    }
})