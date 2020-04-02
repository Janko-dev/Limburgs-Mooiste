import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { globalStyles, Colors } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default ({ options, onSelect, containerStyle, optionStyle, textStyle, title }) => {

    const [activeOption, setActiveOption] = useState(null);

    const activeOptionHandler = (option) => {
        setActiveOption(option);
        onSelect(option)
    }

    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[globalStyles.headerText, styles.optionText, textStyle]}>{title}</Text>
            {options.map((option, index) => (
                <Option
                    active={option === activeOption}
                    containerStyle={optionStyle}
                    textStyle={textStyle}
                    option={option}
                    key={index}
                    onPress={() => activeOptionHandler(option)}
                />
            ))}
        </View>
    )
}

const Option = ({ option, onPress, active, containerStyle, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.option, active ? styles.activeOption : null, containerStyle]}>
            <Text style={[globalStyles.headerText, styles.optionText, textStyle]}>{option}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    option: {
        // height: 80,
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
    },

    container: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        alignItems: 'center'
    }
})

