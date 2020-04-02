import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { globalStyles, Colors } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default ({ options, onSelect, style }) => {

    const [activeOption, setActiveOption] = useState(null);

    const activeOptionHandler = (option) => {
        setActiveOption(option);
        onSelect(option)
    }

    return (
        <View style={styles.container}>
            {options.map((option, index) => (
                <Option
                    active={option === activeOption}
                    style={style}
                    option={option}
                    key={index}
                    onPress={() => activeOptionHandler(option)}
                />
            ))}
        </View>
    )
}

const Option = ({ option, onPress, active, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.option, active ? styles.activeOption : null, style]}>
            <Text style={[globalStyles.bodyText, styles.optionText]}>{option}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    option: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },

    activeOption: {
        borderColor: Colors.secondary,
        borderWidth: 3,
        borderRadius: 20,
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

