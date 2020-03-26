import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

import { globalStyles, Colors, WINDOW_WIDTH } from '../../constants'
import OptionPicker from '../../components/optionPicker';
import MultiOptionPicker from '../../components/multiOptionPicker';
import WizardButton from '../../components/button';

export default ({ isVisible, onFinish }) => {

    const [moveInX] = useState(new Animated.Value(-WINDOW_WIDTH))
    const [skillOption, setSkillOption] = useState('beginner');
    const [antwoord1, setAntwoord1] = useState('');
    const [antwoord2, setAntwoord2] = useState('');
    const [antwoord3, setAntwoord3] = useState([]);

    useEffect(() => {
        toStep(0);
    }, [])

    const toStep = (step) => {
        Animated.spring(moveInX, {
            toValue: WINDOW_WIDTH * step,
            delay: 500,
            bounciness: 10,
            useNativeDriver: true
        }).start();
    }

    const finishWizard = () => {
        onFinish({ skillOption })
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

    const transformStepThree = {
        transform: [
            {
                translateX: Animated.subtract(moveInX, new Animated.Value(WINDOW_WIDTH * 2))
            }
        ]
    }

    const transformStepFour = {
        transform: [
            {
                translateX: Animated.subtract(moveInX, new Animated.Value(WINDOW_WIDTH * 3))
            }
        ]
    }

    return (
        <Modal animationType='slide' visible={isVisible}>
            <View style={styles.container}>
                <Animated.View style={[transformStepOne, styles.animViewContainer]}>
                    <Text style={[globalStyles.fontStyle, styles.headerText]}>Vraag 1: dit is dummyvraag 1?</Text>
                    <OptionPicker
                        options={['antwoord 1', 'antwoord 2', 'antwoord 3']}
                        onSelect={(option) => setAntwoord1(option)}
                    />
                    <WizardButton title='Verder' isActive={antwoord1 != null} nextStep={() => toStep(1)} />
                </Animated.View>

                <Animated.View style={[transformStepTwo, styles.animViewContainer]}>
                    <Text style={[globalStyles.fontStyle, styles.headerText]}>Vraag 2: dit is dummyvraag 2? </Text>
                    <OptionPicker
                        options={['antwoord 1', 'antwoord 2']}
                        onSelect={(option) => setAntwoord2(option)}
                    />

                    <View style={styles.buttonGroup}>
                        <WizardButton title='Terug' isActive={true} nextStep={() => toStep(0)} />
                        <WizardButton title='Verder' isActive={antwoord2 != null} nextStep={() => toStep(2)} />
                    </View>
                </Animated.View>

                <Animated.View style={[transformStepThree, styles.animViewContainer]}>
                    <Text style={[globalStyles.fontStyle, styles.headerText]}>Vraag 3: dit is een multiselect component </Text>
                    <MultiOptionPicker
                        options={['antwoord 1', 'antwoord 2', 'antwoord 3', 'antwoord 4']}
                        onSelect={(options) => setAntwoord3(options)}
                        style={{ height: 50 }}
                    />

                    <View style={styles.buttonGroup}>
                        <WizardButton title='Terug' isActive={true} nextStep={() => toStep(1)} />
                        <WizardButton title='Verder' isActive={antwoord3 != null} nextStep={() => toStep(3)} />
                    </View>
                </Animated.View>



                <Animated.View style={[transformStepFour, styles.animViewContainer]}>
                    <Text style={[globalStyles.fontStyle, styles.headerText]}>Klaar!! </Text>
                    <Text style={[globalStyles.fontStyle, styles.bodyText]}>Niveau: {skillOption} </Text>

                    <View style={styles.buttonGroup}>
                        <WizardButton title='Terug' isActive={true} nextStep={() => toStep(2)} />
                        <WizardButton title='Opslaan' isActive={true} nextStep={finishWizard} />
                    </View>
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
        backgroundColor: Colors.tertiary,
    },

    animViewContainer: {
        position: 'absolute',
        width: '80%'
    },

    headerText: {
        fontSize: 25,
        color: Colors.secondary,
        marginBottom: 20,
    },

    bodyText: {
        fontSize: 18,
        color: Colors.primary,
        marginTop: 10
    },

    bodyContainer: {
        marginHorizontal: 15
    },

    buttonGroup: {
        flexDirection: 'row',
    }
})