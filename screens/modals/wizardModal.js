import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

import { globalStyles, Colors, WINDOW_WIDTH } from '../../constants'
import OptionPicker from '../../components/optionPicker';
import MultiOptionPicker from '../../components/multiOptionPicker';
import WizardButton from '../../components/button';

export default ({ isVisible, onFinish }) => {

    const [moveInX] = useState(new Animated.Value(-WINDOW_WIDTH))
    const [skillOption, setSkillOption] = useState(null);
    const [trainingDaysOption, setTrainingDaysOption] = useState([]);

    useEffect(() => {
        toStepOne();
    }, [])

    const skillOptionHandler = option => {
        setSkillOption(option);
    }

    const trainingDaysOptionHandler = options => {
        setTrainingDaysOption(options);
    }

    const toStepOne = () => {
        Animated.spring(moveInX, {
            toValue: 0,
            delay: 500,
            bounciness: 10,
            useNativeDriver: true
        }).start();
    }

    const toStepTwo = () => {
        Animated.spring(moveInX, {
            toValue: WINDOW_WIDTH,
            delay: 500,
            bounciness: 10,
            useNativeDriver: true
        }).start();
    }

    const toStepThree = () => {
        Animated.spring(moveInX, {
            toValue: WINDOW_WIDTH * 2,
            delay: 500,
            bounciness: 10,
            useNativeDriver: true
        }).start();
    }

    const finishWizard = () => {
        onFinish({skillOption, trainingDaysOption})
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

    const skillOptions = ['Beginner', 'Gevorderd', 'Expert'];
    const daysOfWeek = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'];

    return (
        <Modal animationType='slide' visible={isVisible}>
            <View style={styles.container}>
                <Animated.View style={[transformStepOne, styles.animViewContainer]}>
                    <Text style={[globalStyles.fontStyle, styles.headerText]}>Selecteer je fietsniveau: </Text>
                    <OptionPicker
                        options={skillOptions}
                        onSelect={skillOptionHandler}
                    />
                    <WizardButton title='Verder' isActive={skillOption != null} nextStep={toStepTwo} />
                </Animated.View>

                <Animated.View style={[transformStepTwo, styles.animViewContainer]}>
                    <Text style={[globalStyles.fontStyle, styles.headerText]}>Selecteer je gewenste trainingsmomenten: </Text>
                    <MultiOptionPicker
                        options={daysOfWeek}
                        onSelect={trainingDaysOptionHandler}
                        style={{ height: 50 }}
                    />
                    <View style={styles.buttonGroup}>
                        <WizardButton title='Terug' isActive={true} nextStep={toStepOne} />
                        <WizardButton title='Verder' isActive={trainingDaysOption.length != 0} nextStep={toStepThree} />
                    </View>
                </Animated.View>

                <Animated.View style={[transformStepThree, styles.animViewContainer]}>
                    <Text style={[globalStyles.fontStyle, styles.headerText]}>Klaar!! </Text>
                    <Text style={[globalStyles.fontStyle, styles.bodyText]}>Controleer uw voorkeuren: </Text>
                    <Text style={[globalStyles.fontStyle, styles.bodyText]}>Niveau: <Text style={{color: Colors.secondary}}>{skillOption}</Text></Text>
                    <Text style={[globalStyles.fontStyle, styles.bodyText]}>Beschikbare trainingsdagen: </Text>
                    {trainingDaysOption.map((day, index) => (<Text style={[globalStyles.fontStyle, styles.bodyText, {color: Colors.secondary}]} key={index}> {day} </Text>))}

                    <View style={styles.buttonGroup}>
                        <WizardButton title='Terug' isActive={true} nextStep={toStepTwo} />
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
        position: 'absolute'
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