import React, { useState } from 'react';
import { globalStyles, Colors } from '../constants';
import { Animated, View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';


const FaqQuestion = ({ question, answer }) => {

    const [animValue] = useState(new Animated.Value(0));
    const [buttonClicked, setButtonClicked] = useState(false);

    const buttonHandler = () => {
        setButtonClicked(!buttonClicked)

        if (buttonClicked) {
            Animated.timing(animValue, {
                toValue: 0,
                duration: 500,
            }).start()
        } else {
            Animated.timing(animValue, {
                toValue: 1,
                duration: 500,
            }).start()
        }
    }

    const iconTransform = {
        transform: [
            {
                rotate: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"]
                })
            }
        ]
    }

    const viewTransform = {
        height: Animated.multiply(animValue, new Animated.Value(40))
    }

    return (
        <View style={{ width: '100%', paddingTop: 10, paddingBottom: 10, alignItems: 'center', borderBottomColor: Colors.tertiary, borderBottomWidth: 1, }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: Colors.secondary, fontWeight: '500', flex: 9 }}>{question}</Text>
                <TouchableOpacity style={{ flex: 1 }} onPress={buttonHandler}>
                    <Animated.Image style={[{ tintColor: Colors.primary, height: 25, width: 25 }, iconTransform]} source={require('../assets/addButton.png')}></Animated.Image>
                </TouchableOpacity>
            </View>
            <Animated.View style={[styles.animatedView, viewTransform]}>
                <Text style={{fontSize: 12}} >{answer}</Text> 
                {/* Dynamische hoogte */}
            </Animated.View>

        </View>
    )
}

const styles = StyleSheet.create({
    animatedView: {
        height: 0,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
    },


})

export default FaqQuestion;
