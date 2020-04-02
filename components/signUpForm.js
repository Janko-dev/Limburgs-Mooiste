import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { globalStyles, Colors } from '../constants';


const SignUpForm = ({ backToAuth, onSubmit }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const emailTextHandler = (text) => {
        setEmail(text)
    }

    const passwordTextHandler = (text) => {
        setPassword(text)
    }

    const passwordCheckTextHandler = (text) => {
        setPasswordCheck(text)
    }

    const signUpHandler = () => {
        if (password !== passwordCheck) {
            console.log('passwords do not match')
            return;
        }

        if (passwordValidator() || emailValidator()) {
            return;
        }

        onSubmit(email, password);

    }

    const emailValidator = () => {
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!email.match(emailRegex)) {
            return true;
        } else {
            return false;
        }
    }

    const passwordValidator = () => {
        if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
            return true;
        } else {
            return false
        }
    }

    return (
        <View style={styles.formContainer}>
            <Text style={[globalStyles.bodyText, styles.headerText]}>Registratie</Text>
            <Text style={[globalStyles.bodyText, styles.bodyText]}>Voer een gewenst Email adres en wachtwoord in om te registreren</Text>
            <Input
                placeholder='Email@adress.com'
                keyboardType='email-address'
                value={email}
                onChangeText={emailTextHandler}
                inputStyle={styles.textInput}
                containerStyle={styles.textInputContainer}
                placeholderTextColor={Colors.secondary}
                autoCapitalize='none'
                errorStyle={{ color: 'red' }}
                errorMessage={emailValidator() && email !== '' ? 'Email adres moet in de juiste vorm zijn geschreven' : ''}
            />
            <Input
                placeholder='Password'
                secureTextEntry={true}
                value={password}
                onChangeText={passwordTextHandler}
                inputStyle={styles.textInput}
                containerStyle={styles.textInputContainer}
                placeholderTextColor={Colors.secondary}
                errorStyle={{ color: 'red' }}
                errorMessage={passwordValidator() && password !== '' ? 'Minimaal 1 hoofdletter, kleine letter en een nummer' : ''}
            />

            <Input
                placeholder='Password nogmaals'
                secureTextEntry={true}
                value={passwordCheck}
                onChangeText={passwordCheckTextHandler}
                inputStyle={styles.textInput}
                containerStyle={styles.textInputContainer}
                placeholderTextColor={Colors.secondary}
                errorStyle={{ color: 'red'}}
                errorMessage={passwordValidator() && passwordCheck !== '' ? 'Minimaal 1 hoofdletter, kleine letter en een nummer' : ''}
            />

            <Button title={'Registreer'} buttonStyle={styles.buttonStyle} containerStyle={styles.buttonContainer} onPress={signUpHandler} raised />
            <Button title={'Terug'} buttonStyle={styles.buttonStyle} containerStyle={styles.buttonContainer} onPress={backToAuth} raised />

        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        // flex: 1,
        // justifyContent: 'space-around',
        width: '100%',

    },

    bodyText: {
        fontSize: 18,
        color: Colors.primary,
        marginTop: 10,
        textAlign: 'center',
        marginBottom: 15
    },

    headerText: {
        fontSize: 25,
        color: Colors.secondary,
        textAlign: 'center',
        marginBottom: 15
    },

    textInput: {
        color: Colors.secondary,
        width: '100%',
    },

    textInputContainer: {
        marginVertical: 10,
    },

    buttonStyle: {
        backgroundColor: Colors.secondary,
    },

    buttonContainer: {
        marginVertical: 20
    }
})

export default SignUpForm;