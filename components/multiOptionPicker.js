import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { Icon } from 'react-native-elements'

import { globalStyles, Colors } from '../constants'

export default ({ options, onSelect, style }) => {

    const [selectedOptions, setSelectedOptions] = useState(options.map((item, index) => {
        return { value: item, selected: false, index }
    }));

    const activeOptionHandler = (option) => {

        let updatedOptions = selectedOptions.map(item => {
            if (item == option) {
                return { ...item, selected: !item.selected }
            } else {
                return item;
            }
        });

        setSelectedOptions(updatedOptions);
        onSelect(updatedOptions.filter(item => {
            if (item.selected) {
                return item.value
            }
        }).map(item => item.value));
    }

    return (
        <View style={styles.container}>
            {selectedOptions.map((option) => (
                <Option
                    active={option.selected}
                    style={style}
                    option={option.value}
                    key={option.index}
                    onPress={() => activeOptionHandler(option)}
                />
            ))}
        </View>
    )
}

const Option = ({ option, onPress, active, style }) => {

    const [fadeAnim] = useState(new Animated.Value(0))

    const pressHandler = () => {
        onPress();
        Animated.timing(fadeAnim, {
            toValue: active ? 0 : 1,
            duration: 200
        }).start()
    }

    const transform = {
        transform: [
            {
                scaleX: fadeAnim,
                // rotateX: fadeAnim.interpolate({
                //     inputRange: [0, 1],
                //     outputRange: ['0deg', '360deg']
                // })
            }
        ]
    }

    return (
        <TouchableOpacity activeOpacity={1} onPress={pressHandler} style={[styles.option, active ? styles.activeOption : null, style]}>

            <Animated.View style={[{opacity: fadeAnim}, transform]}>
                <Icon
                    type='ionicon'
                    name='ios-checkmark'
                    size={50}
                    iconStyle={styles.optionIcon}
                />
            </Animated.View>
            <Text style={[globalStyles.bodyText, styles.optionText]}>{option}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    option: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },

    optionIcon: {
        color: Colors.primary,

    },

    activeOption: {
        borderColor: Colors.secondary,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: Colors.secondary
    },

    optionText: {
        color: Colors.tertiary,
        fontSize: 24,
    },

    container: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
    }
})

