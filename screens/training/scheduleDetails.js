import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Animated, TouchableOpacity, Easing } from 'react-native'
import { globalStyles, Colors } from '../../constants'

const NewTrainingScheduleScreen = ({ route, navigation }) => {

    const [animValue] = useState(new Animated.Value(0))

    const scrollHandler = e => {
        // console.log(e.nativeEvent.contentOffset.y)
        if (e.nativeEvent.contentOffset.y > 33) {
            Animated.spring(animValue, {
                toValue: 50,
                duration: 50,
                bounciness: 0
            }).start()
        } else {
            Animated.spring(animValue, {
                toValue: 0,
                duration: 50,
                bounciness: 0
            }).start()
        }
    }

    const startButtonHandler = () => {

    }

    return (
        <View style={[globalStyles.container, styles.container]}>

            <View style={styles.bodyContainer}>
                <ScrollView contentContainerStyle={styles.scrollView} onScroll={scrollHandler} scrollEventThrottle={50}>
                    <Text style={[globalStyles.fontStyle, styles.headerText, {marginVertical: 10}]}>{route.params.titel}</Text>
                    <Text>{route.params.titel}</Text>
                </ScrollView>
            </View>

            <Animated.View style={[styles.headerContainer, {height: animValue}]}>
                <Text style={[globalStyles.fontStyle, styles.headerText]}>{route.params.titel}</Text>
            </Animated.View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={startButtonHandler}>
                    <Text style={[globalStyles.fontStyle, styles.headerText]}>Starten</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default NewTrainingScheduleScreen

const styles = StyleSheet.create({

    container: {
        // backgroundColor: 'red'
    },

    headerContainer: {
        backgroundColor: Colors.primary,
        width: '95%',
        flex: 1,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 8, height: 9 },
        shadowOpacity: 0.7,
        shadowRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        height: 0
    },

    headerText: {
        fontSize: 20,
        color: Colors.secondary
    },

    bodyContainer: {
        backgroundColor: Colors.tertiary,
        flex: 8,
        width: '90%',
    },

    scrollView: {
        alignItems: 'center'
    },

    buttonContainer: {
        width: '70%',
        position: 'absolute',
        bottom: 10,
        height: '10%',
        borderRadius: 20
    },

    button: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.success,
        borderRadius: 20
    }

})
