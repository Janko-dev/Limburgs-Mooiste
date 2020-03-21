import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Text } from 'react-native';
import { Input } from 'react-native-elements';

import { globalStyles, Colors } from '../constants';


const SignUpForm = ({ }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailTextHandler = (text) => {
        setEmail(text)
    }

    const passwordTextHandler = (text) => {
        setPassword(text)
    }

    return (
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
    )
}

const style = StyleSheet.create({
    formContainer: {
        width: '80%',
    },

    headerText: {
        fontSize: 25,
        color: Colors.secondary,
        textAlign: 'center'
    },
})

export default SignUpForm;